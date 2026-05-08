using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing;
using System.ComponentModel;

namespace FreightMasters.Repository
{
    public class FreightRptRepository : IFreightRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public FreightRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
       
        public async Task<ResponseModel> GetAgeingSummRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "AS"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 10;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "AGEING SUMMARY";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            
                            ws.Cell(5, 1).Value = dataSet.Tables[0].Columns[1].ColumnName;
                            ws.Cell(5, 2).Value = "<=" + request.Age1.ToString();
                            ws.Cell(5, 3).Value = ">=" + request.Age1.ToString() + " & <" +request.Age2.ToString();
                            ws.Cell(5, 4).Value = ">=" + request.Age2.ToString() + " & <" +request.Age3.ToString();
                            ws.Cell(5, 5).Value = ">=" + request.Age3.ToString() + " & <" +request.Age4.ToString();
                            ws.Cell(5, 6).Value = ">=" + request.Age4.ToString() + " & <" +request.Age5.ToString();
                            ws.Cell(5, 7).Value = ">=" + request.Age5.ToString();
                            ws.Cell(5, 8).Value = dataSet.Tables[0].Columns[8].ColumnName;
                            ws.Cell(5, 9).Value = dataSet.Tables[0].Columns[9].ColumnName;
                            ws.Cell(5, 10).Value = dataSet.Tables[0].Columns[10].ColumnName;


                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var BillStnName = "";

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count - 1; j++)
                            {
                                if (BillStnName != dataSet.Tables[0].Rows[j][0].ToString())
                                {
                                    BillStnName = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[j][8].ToString();
                                ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[j][9].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j][10].ToString();

                                if (dataSet.Tables[0].Rows[j][1].ToString()=="ZZZZ")
                                {
                                    ws.Cell(r, 1).Value = "Station Wise Total";
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                                }
                                else
                                {
                                    ws.Cell(r, 1).Value = dataSet.Tables[0].Rows[j][1].ToString();
                                }
                                r++;

                               
                            }
                            int k = dataSet.Tables[0].Rows.Count - 1;

                            ws.Cell(r, 1).Value = "Grand Total";
                            ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[k][2].ToString();
                            ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[k][3].ToString();
                            ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[k][4].ToString();
                            ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[k][5].ToString();
                            ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[k][6].ToString();
                            ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[k][7].ToString();
                            ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[k][8].ToString();
                            ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[k][9].ToString();
                            ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[k][10].ToString();
                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }

                            ws.Range(6, 2, r, 10).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "ASB"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 10;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "AGEING SUMMARY BRANCH";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                           
                            ws.Cell(5, 1).Value = dataSet.Tables[0].Columns[0].ColumnName;
                            ws.Cell(5, 2).Value = "<=" + request.Age1.ToString();
                            ws.Cell(5, 3).Value = ">=" + request.Age1.ToString() + " & <" +request.Age2.ToString();
                            ws.Cell(5, 4).Value = ">=" + request.Age2.ToString() + " & <" +request.Age3.ToString();
                            ws.Cell(5, 5).Value = ">=" + request.Age3.ToString() + " & <" +request.Age4.ToString();
                            ws.Cell(5, 6).Value = ">=" + request.Age4.ToString() + " & <" +request.Age5.ToString();
                            ws.Cell(5, 7).Value = ">=" + request.Age5.ToString();
                            ws.Cell(5, 8).Value = dataSet.Tables[0].Columns[7].ColumnName;
                            ws.Cell(5, 9).Value = dataSet.Tables[0].Columns[8].ColumnName;
                            ws.Cell(5, 10).Value = dataSet.Tables[0].Columns[9].ColumnName;

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count - 1; j++)
                            {
                                ws.Cell(r, 1).Value = dataSet.Tables[0].Rows[j][0].ToString();
                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j][1].ToString();
                                ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[j][8].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j][9].ToString();

                                r++;

                            }
                            int k = dataSet.Tables[0].Rows.Count - 1;

                            ws.Cell(r, 1).Value = "Grand Total";
                            ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[k][1].ToString();
                            ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[k][2].ToString();
                            ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[k][3].ToString();
                            ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[k][4].ToString();
                            ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[k][5].ToString();
                            ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[k][6].ToString();
                            ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[k][7].ToString();
                            ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[k][8].ToString();
                            ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[k][9].ToString();

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }

                            ws.Range(6, 2, r, 10).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "ASP"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 10;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "AGEING SUMMARY PARTY";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;


                            ws.Cell(5, 1).Value = dataSet.Tables[0].Columns[0].ColumnName;
                            ws.Cell(5, 2).Value = "<=" + request.Age1.ToString();
                            ws.Cell(5, 3).Value = ">=" + request.Age1.ToString() + " & <" +request.Age2.ToString();
                            ws.Cell(5, 4).Value = ">=" + request.Age2.ToString() + " & <" +request.Age3.ToString();
                            ws.Cell(5, 5).Value = ">=" + request.Age3.ToString() + " & <" +request.Age4.ToString();
                            ws.Cell(5, 6).Value = ">=" + request.Age4.ToString() + " & <" +request.Age5.ToString();
                            ws.Cell(5, 7).Value = ">=" + request.Age5.ToString();
                            ws.Cell(5, 8).Value = dataSet.Tables[0].Columns[7].ColumnName;
                            ws.Cell(5, 9).Value = dataSet.Tables[0].Columns[8].ColumnName;
                            ws.Cell(5, 10).Value = dataSet.Tables[0].Columns[9].ColumnName;

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count - 1; j++)
                            {
                                ws.Cell(r, 1).Value = dataSet.Tables[0].Rows[j][0].ToString();
                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j][1].ToString();
                                ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[j][8].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j][9].ToString();

                                r++;

                            }
                            int k = dataSet.Tables[0].Rows.Count - 1;

                            ws.Cell(r, 1).Value = "Grand Total";
                            ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[k][1].ToString();
                            ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[k][2].ToString();
                            ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[k][3].ToString();
                            ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[k][4].ToString();
                            ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[k][5].ToString();
                            ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[k][6].ToString();
                            ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[k][7].ToString();
                            ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[k][8].ToString();
                            ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[k][9].ToString();
                            ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }

                            ws.Range(6, 2, r, 10).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetAgeingDetailRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "AD"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 13;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "AGEING DETAIL";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value  = "Ref";
                            ws.Cell(5, 2).Value  = "Ref No";
                            ws.Cell(5, 3).Value  = "Ref Date";
                            ws.Cell(5, 4).Value  = "Sub Date";
                            ws.Cell(5, 5).Value = "<=" + request.Age1.ToString();
                            ws.Cell(5, 6).Value = ">=" + request.Age1.ToString() + " & <" +request.Age2.ToString();
                            ws.Cell(5, 7).Value = ">=" + request.Age2.ToString() + " & <" +request.Age3.ToString();
                            ws.Cell(5, 8).Value = ">=" + request.Age3.ToString() + " & <" +request.Age4.ToString();
                            ws.Cell(5, 9).Value = ">=" + request.Age4.ToString() + " & <" +request.Age5.ToString();
                            ws.Cell(5, 10).Value = ">=" + request.Age5.ToString();
                            ws.Cell(5, 11).Value = dataSet.Tables[0].Columns[12].ColumnName;
                            ws.Cell(5, 12).Value = dataSet.Tables[0].Columns[13].ColumnName;
                            ws.Cell(5, 13).Value = dataSet.Tables[0].Columns[14].ColumnName;

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var BillStnName = "";
                            var Party = "";
                            decimal day30 = 0,      brday30 = 0,    totday30 = 0;
                            decimal day60 = 0,      brday60 = 0,    totday60 = 0;
                            decimal day90 = 0,      brday90 = 0,    totday90 = 0;
                            decimal day120 = 0,     brday120 = 0,   totday120 = 0;
                            decimal day150 = 0,     brday150 = 0,   totday150 = 0;
                            decimal day180 = 0,     brday180 = 0,   totday180 = 0;
                            decimal tot = 0,        brtot = 0,      tottot = 0;
                            decimal onac = 0,       bronac = 0,     totonac = 0;


                            for (int j = 0; j < dataSet.Tables[0].Rows.Count; j++)
                            {
                               
                                if (Party != dataSet.Tables[0].Rows[j][1].ToString())
                                {
                                    if (j>0)
                                    {
                                        ws.Range(r, 1, r, 4).Merge();
                                        ws.Range(r, 1, r, 4).Value = "Party Total";
                                        ws.Cell(r, 5).Value  = day30;
                                        ws.Cell(r, 6).Value  = day60;
                                        ws.Cell(r, 7).Value  = day90;
                                        ws.Cell(r, 8).Value  = day120;
                                        ws.Cell(r, 9).Value  = day150;
                                        ws.Cell(r, 10).Value = day180;
                                        ws.Cell(r, 11).Value = tot;
                                        ws.Cell(r, 12).Value = onac;
                                        ws.Cell(r, 13).Value = tot - onac ;

                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                        r++;

                                        day30 = 0;   
                                        day60 = 0;   
                                        day90 = 0;   
                                        day120 = 0;  
                                        day150 = 0;  
                                        day180 = 0;  
                                        tot = 0;     
                                        onac = 0;    
                                    }

                                    if (BillStnName != dataSet.Tables[0].Rows[j][0].ToString())
                                    {
                                        if (j>0)
                                        {
                                            ws.Range(r, 1, r, 4).Merge();
                                            ws.Range(r, 1, r, 4).Value = "Branch Total";
                                            ws.Cell(r, 5).Value  = brday30;
                                            ws.Cell(r, 6).Value  = brday60;
                                            ws.Cell(r, 7).Value  = brday90;
                                            ws.Cell(r, 8).Value  = brday120;
                                            ws.Cell(r, 9).Value  = brday150;
                                            ws.Cell(r, 10).Value = brday180;
                                            ws.Cell(r, 11).Value = brtot;
                                            ws.Cell(r, 12).Value = bronac;
                                            ws.Cell(r, 13).Value = brtot - bronac;

                                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                            r++;

                                            brday30 = 0;
                                            brday60 = 0;
                                            brday90 = 0;
                                            brday120 = 0;
                                            brday150 = 0;
                                            brday180 = 0;
                                            brtot = 0;
                                            bronac = 0;
                                        }

                                        BillStnName = dataSet.Tables[0].Rows[j][0].ToString();
                                        ws.Range(r, 1, r, colcnt).Merge();
                                        ws.Range(r, 1, r, colcnt).Value = BillStnName;
                                        ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                        r++;
                                    }

                                    Party = dataSet.Tables[0].Rows[j][1].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = Party;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 1).Value  = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 2).Value  = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 3).Value  = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 4).Value  = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 5).Value  = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 6).Value  = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 7).Value  = dataSet.Tables[0].Rows[j][8].ToString();
                                ws.Cell(r, 8).Value  = dataSet.Tables[0].Rows[j][9].ToString();
                                ws.Cell(r, 9).Value  = dataSet.Tables[0].Rows[j][10].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j][11].ToString();
                                ws.Cell(r, 11).Value = dataSet.Tables[0].Rows[j][12].ToString();
                                ws.Cell(r, 12).Value = dataSet.Tables[0].Rows[j][13].ToString();
                                ws.Cell(r, 13).Value = dataSet.Tables[0].Rows[j][14].ToString();

                                day30   = day30  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                day60   = day60  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                day90   = day90  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                day120  = day120 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                day150  = day150 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                day180  = day180 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                tot     = tot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());
                                onac    = onac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][13].ToString());

                                brday30     = brday30  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                brday60     = brday60  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                brday90     = brday90  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                brday120    = brday120 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                brday150    = brday150 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                brday180    = brday180 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                brtot       = brtot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());
                                bronac      = bronac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][13].ToString());

                                totday30    = totday30  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                totday60    = totday60  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                totday90    = totday90  + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                totday120   = totday120 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                totday150   = totday150 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                totday180   = totday180 + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                tottot      = tottot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());
                                totonac     = totonac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][13].ToString());

                                r++;
                            }
                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Party Total";
                            ws.Cell(r, 5).Value  = day30;
                            ws.Cell(r, 6).Value  = day60;
                            ws.Cell(r, 7).Value  = day90;
                            ws.Cell(r, 8).Value  = day120;
                            ws.Cell(r, 9).Value  = day150;
                            ws.Cell(r, 10).Value = day180;
                            ws.Cell(r, 11).Value = tot;
                            ws.Cell(r, 12).Value = onac;
                            ws.Cell(r, 13).Value = tot - onac;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Branch Total";
                            ws.Cell(r, 5).Value  = brday30;
                            ws.Cell(r, 6).Value  = brday60;
                            ws.Cell(r, 7).Value  = brday90;
                            ws.Cell(r, 8).Value  = brday120;
                            ws.Cell(r, 9).Value  = brday150;
                            ws.Cell(r, 10).Value = brday180;
                            ws.Cell(r, 11).Value = brtot;
                            ws.Cell(r, 12).Value = bronac;
                            ws.Cell(r, 13).Value = brtot - bronac;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Grand Total";
                            ws.Cell(r, 5).Value  = totday30;
                            ws.Cell(r, 6).Value  = totday60;
                            ws.Cell(r, 7).Value  = totday90;
                            ws.Cell(r, 8).Value  = totday120;
                            ws.Cell(r, 9).Value  = totday150;
                            ws.Cell(r, 10).Value = totday180;
                            ws.Cell(r, 11).Value = tottot;
                            ws.Cell(r, 12).Value = totonac;
                            ws.Cell(r, 13).Value = tottot - totonac;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }

                            ws.Column(1).Width = 12;
                            ws.Column(2).Width = 12;
                            ws.Column(3).Width = 12;
                            ws.Column(4).Width = 12;

                            ws.Range(6, 5, r, 13).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetOutstandingSummRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "OS"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 4;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "OUTSTANDING SUMMARY";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            for (int i = 1; i <= colcnt; i++)
                            {
                                ws.Cell(5, i).Value = dataSet.Tables[0].Columns[i].ColumnName;
                            }

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var BillStnName = "";

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count - 1; j++)
                            {
                                if (BillStnName != dataSet.Tables[0].Rows[j][0].ToString())
                                {
                                    BillStnName = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[j][4].ToString();

                                if (dataSet.Tables[0].Rows[j][1].ToString()=="ZZZZ")
                                {
                                    ws.Cell(r, 1).Value = "Station Wise Total";
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                                }
                                else
                                {
                                    ws.Cell(r, 1).Value = dataSet.Tables[0].Rows[j][1].ToString();
                                }
                                r++;


                            }
                            int k = dataSet.Tables[0].Rows.Count - 1;

                            ws.Cell(r, 1).Value = "Grand Total";
                            ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[k][2].ToString();
                            ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[k][3].ToString();
                            ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[k][4].ToString();

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }
                            ws.Column(1).Width = 50;
                            ws.Range(6, 2, r, 4).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetOutstandingDetailRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "OD"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 12;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "OUTSTANDING DETAIL";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value  = "Ref";
                            ws.Cell(5, 2).Value  = "Ref No";
                            ws.Cell(5, 3).Value  = "Ref Date";
                            ws.Cell(5, 4).Value  = "Sub Date";
                            ws.Cell(5, 5).Value  = dataSet.Tables[0].Columns[6].ColumnName;
                            ws.Cell(5, 6).Value  = dataSet.Tables[0].Columns[7].ColumnName;
                            ws.Cell(5, 7).Value  = dataSet.Tables[0].Columns[8].ColumnName;
                            ws.Cell(5, 8).Value = dataSet.Tables[0].Columns[9].ColumnName;
                            ws.Cell(5, 9).Value = dataSet.Tables[0].Columns[10].ColumnName;
                            ws.Cell(5, 10).Value = dataSet.Tables[0].Columns[11].ColumnName;
                            ws.Cell(5, 11).Value = dataSet.Tables[0].Columns[12].ColumnName;
                            ws.Cell(5, 12).Value = dataSet.Tables[0].Columns[13].ColumnName;

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var BillStnName = "";
                            var Party = "";
                            decimal tot = 0,    brtot = 0,      tottot = 0;
                            decimal onac = 0,   bronac = 0,     totonac = 0;
                            decimal due = 0,    brdue = 0,      totdue = 0;
                            decimal recv = 0,   brrecv = 0,     totrecv = 0;
                            decimal ded = 0,    brded = 0,      totded = 0;
                            decimal tds = 0,    brtds = 0,      tottds = 0;
                            decimal netdue = 0, brnetdue = 0,   totnetdue = 0;

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count; j++)
                            {

                                if (Party != dataSet.Tables[0].Rows[j][1].ToString())
                                {
                                    if (j>0)
                                    {
                                        ws.Range(r, 1, r, 4).Merge();
                                        ws.Range(r, 1, r, 4).Value = "Party Total";
                                        ws.Cell(r, 6).Value = tot;
                                        ws.Cell(r, 7).Value = recv;
                                        ws.Cell(r, 8).Value = ded;
                                        ws.Cell(r, 9).Value = tds;
                                        ws.Cell(r, 10).Value = due;
                                        ws.Cell(r, 11).Value = onac;
                                        ws.Cell(r, 12).Value = netdue;

                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                        r++;

                                        tot = 0;
                                        onac = 0;
                                        due = 0;
                                        recv = 0;
                                        ded = 0;
                                        tds = 0;
                                        netdue = 0;   
                                        
                                    }

                                    if (BillStnName != dataSet.Tables[0].Rows[j][0].ToString())
                                    {
                                        if (j>0)
                                        {
                                            ws.Range(r, 1, r, 4).Merge();
                                            ws.Range(r, 1, r, 4).Value = "Branch Total";
                                            ws.Cell(r, 6).Value  = brtot;
                                            ws.Cell(r, 7).Value  = brrecv;
                                            ws.Cell(r, 8).Value  = brded;
                                            ws.Cell(r, 9).Value  = brtds;
                                            ws.Cell(r, 10).Value = brdue;
                                            ws.Cell(r, 11).Value = bronac;
                                            ws.Cell(r, 12).Value = brnetdue;

                                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                            r++;


                                            brtot = 0;
                                            bronac = 0;
                                            brdue = 0;
                                            brrecv = 0;
                                            brded = 0;
                                            brtds = 0;
                                            brnetdue = 0;
                                        }

                                        BillStnName = dataSet.Tables[0].Rows[j][0].ToString();
                                        ws.Range(r, 1, r, colcnt).Merge();
                                        ws.Range(r, 1, r, colcnt).Value = BillStnName;
                                        ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                        r++;
                                    }

                                    Party = dataSet.Tables[0].Rows[j][1].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = Party;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 1).Value  = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 2).Value  = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 3).Value  = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 4).Value  = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 5).Value  = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 6).Value  = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 7).Value  = dataSet.Tables[0].Rows[j][8].ToString();
                                ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[j][9].ToString();
                                ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[j][10].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j][11].ToString();
                                ws.Cell(r, 11).Value = dataSet.Tables[0].Rows[j][12].ToString();
                                ws.Cell(r, 12).Value = dataSet.Tables[0].Rows[j][13].ToString();


                                tot     = tot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                recv    = recv + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                ded     = ded + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                tds     = tds + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                due     = due + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                onac    = onac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());
                                netdue  = netdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][13].ToString());

                                brtot       = brtot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                brrecv      = brrecv + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                brded       = brded + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                brtds       = brtds + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                brdue       = brdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                bronac      = bronac + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());
                                brnetdue    = brnetdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][13].ToString());

                                tottot      = tottot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                totrecv     = totrecv + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                totded      = totded + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                tottds      = tottds + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                totdue      = totdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                totonac     = totonac + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());
                                totnetdue   = totnetdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][13].ToString());

                                r++;
                            }
                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Party Total";
                            ws.Cell(r, 6).Value     = tot;
                            ws.Cell(r, 7).Value     = recv;
                            ws.Cell(r, 8).Value     = ded;
                            ws.Cell(r, 9).Value     = tds;
                            ws.Cell(r, 10).Value    = due;
                            ws.Cell(r, 11).Value    = onac;
                            ws.Cell(r, 12).Value    = netdue;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Branch Total";
                            ws.Cell(r, 6).Value     = brtot;
                            ws.Cell(r, 7).Value     = brrecv;
                            ws.Cell(r, 8).Value     = brded;
                            ws.Cell(r, 9).Value     = brtds;
                            ws.Cell(r, 10).Value    = brdue;
                            ws.Cell(r, 11).Value    = bronac;
                            ws.Cell(r, 12).Value    = brnetdue;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Grand Total";
                            ws.Cell(r, 6).Value  = tottot;
                            ws.Cell(r, 7).Value  = totrecv;
                            ws.Cell(r, 8).Value  = totded;
                            ws.Cell(r, 9).Value  = tottds;
                            ws.Cell(r, 10).Value = totdue;
                            ws.Cell(r, 11).Value = totonac;
                            ws.Cell(r, 12).Value = totnetdue;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }
                            ws.Column(1).Width = 12;
                            ws.Column(2).Width = 12;
                            ws.Column(3).Width = 12;
                            ws.Column(4).Width = 12;
                            ws.Column(5).Width = 12;

                            ws.Range(6, 6, r, 12).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetOutstandingDetailPartyRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "ODP"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 12;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "OUTSTANDING DETAIL PARTYWISE";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Ref";
                            ws.Cell(5, 2).Value = "Ref No";
                            ws.Cell(5, 3).Value = "Ref Date";
                            ws.Cell(5, 4).Value = "Sub Date";
                            ws.Cell(5, 5).Value = dataSet.Tables[0].Columns[5].ColumnName;
                            ws.Cell(5, 6).Value = dataSet.Tables[0].Columns[6].ColumnName;
                            ws.Cell(5, 7).Value = dataSet.Tables[0].Columns[7].ColumnName;
                            ws.Cell(5, 8).Value = dataSet.Tables[0].Columns[8].ColumnName;
                            ws.Cell(5, 9).Value = dataSet.Tables[0].Columns[9].ColumnName;
                            ws.Cell(5, 10).Value = dataSet.Tables[0].Columns[10].ColumnName;
                            ws.Cell(5, 11).Value = dataSet.Tables[0].Columns[11].ColumnName;
                            ws.Cell(5, 12).Value = dataSet.Tables[0].Columns[12].ColumnName;

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var Party = "";
                            decimal tot = 0, tottot = 0;
                            decimal onac = 0, totonac = 0;
                            decimal due = 0, totdue = 0;
                            decimal recv = 0, totrecv = 0;
                            decimal ded = 0, totded = 0;
                            decimal tds = 0, tottds = 0;
                            decimal netdue = 0, totnetdue = 0;

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count; j++)
                            {

                                if (Party != dataSet.Tables[0].Rows[j][0].ToString())
                                {
                                    if (j > 0)
                                    {
                                        ws.Range(r, 1, r, 4).Merge();
                                        ws.Range(r, 1, r, 4).Value = "Party Total";
                                        ws.Cell(r, 6).Value = tot;
                                        ws.Cell(r, 7).Value = recv;
                                        ws.Cell(r, 8).Value = ded;
                                        ws.Cell(r, 9).Value = tds;
                                        ws.Cell(r, 10).Value = due;
                                        ws.Cell(r, 11).Value = onac;
                                        ws.Cell(r, 12).Value = netdue;

                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                        r++;

                                        tot = 0;
                                        onac = 0;
                                        due = 0;
                                        recv = 0;
                                        ded = 0;
                                        tds = 0;
                                        netdue = 0;

                                    }                                   

                                    Party = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = Party;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 1).Value = dataSet.Tables[0].Rows[j][1].ToString();
                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 3).Value = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 4).Value = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 5).Value = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 6).Value = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 7).Value = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 8).Value = dataSet.Tables[0].Rows[j][8].ToString();
                                ws.Cell(r, 9).Value = dataSet.Tables[0].Rows[j][9].ToString();
                                ws.Cell(r, 10).Value = dataSet.Tables[0].Rows[j][10].ToString();
                                ws.Cell(r, 11).Value = dataSet.Tables[0].Rows[j][11].ToString();
                                ws.Cell(r, 12).Value = dataSet.Tables[0].Rows[j][12].ToString();


                                tot = tot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                recv = recv + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                ded = ded + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                tds = tds + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                due = due + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                onac = onac + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                netdue = netdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());

                                tottot = tottot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                totrecv = totrecv + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());
                                totded = totded + Convert.ToDecimal(dataSet.Tables[0].Rows[j][8].ToString());
                                tottds = tottds + Convert.ToDecimal(dataSet.Tables[0].Rows[j][9].ToString());
                                totdue = totdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][10].ToString());
                                totonac = totonac + Convert.ToDecimal(dataSet.Tables[0].Rows[j][11].ToString());
                                totnetdue = totnetdue + Convert.ToDecimal(dataSet.Tables[0].Rows[j][12].ToString());

                                r++;
                            }
                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Party Total";
                            ws.Cell(r, 6).Value = tot;
                            ws.Cell(r, 7).Value = recv;
                            ws.Cell(r, 8).Value = ded;
                            ws.Cell(r, 9).Value = tds;
                            ws.Cell(r, 10).Value = due;
                            ws.Cell(r, 11).Value = onac;
                            ws.Cell(r, 12).Value = netdue;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Grand Total";
                            ws.Cell(r, 6).Value = tottot;
                            ws.Cell(r, 7).Value = totrecv;
                            ws.Cell(r, 8).Value = totded;
                            ws.Cell(r, 9).Value = tottds;
                            ws.Cell(r, 10).Value = totdue;
                            ws.Cell(r, 11).Value = totonac;
                            ws.Cell(r, 12).Value = totnetdue;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }
                            ws.Column(1).Width = 12;
                            ws.Column(2).Width = 12;
                            ws.Column(3).Width = 12;
                            ws.Column(4).Width = 12;
                            ws.Column(5).Width = 12;

                            ws.Range(6, 6, r, 12).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<BillOutstandingRptListModel> GetOutstandingDetailPartyRptList(ReportAgeModel request)
        {
            BillOutstandingRptListModel billRegisterRpt = new();

            List<BillOutstandingRptModel> billRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.Search),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@IncUnBilled",    request.FilterStr1),
                            new SqlParameter("@SubmitYN",       request.FilterStr2),
                            new SqlParameter("@Party",          request.FilterStr3),
                            new SqlParameter("@RptType",        "ODP"),
                            new SqlParameter("@Age1",           request.Age1),
                            new SqlParameter("@Age2",           request.Age2),
                            new SqlParameter("@Age3",           request.Age3),
                            new SqlParameter("@Age4",           request.Age4),
                            new SqlParameter("@Age5",           request.Age5),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billRegisterRptList.Add(new BillOutstandingRptModel
                            {
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i][0]),
                                Ref = Convert.ToString(dataSet.Tables[0].Rows[i][1]),
                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i][2]),
                                RefDate = Convert.ToString(dataSet.Tables[0].Rows[i][3]) != "" ? Convert.ToDateTime(dataSet.Tables[0].Rows[i][3]).ToString("dd/MM/yyyy") : "",
                                SubDate = Convert.ToString(dataSet.Tables[0].Rows[i][4]) != "" ? Convert.ToDateTime(dataSet.Tables[0].Rows[i][4]).ToString("dd/MM/yyyy") : "",
                                BillAge = Convert.ToString(dataSet.Tables[0].Rows[i][5]),
                                BillAmount = Convert.ToString(dataSet.Tables[0].Rows[i][6]),
                                RecdAmount = Convert.ToString(dataSet.Tables[0].Rows[i][7]),
                                DedAmount = Convert.ToString(dataSet.Tables[0].Rows[i][8]),
                                TdsAmount = Convert.ToString(dataSet.Tables[0].Rows[i][9]),
                                DueAmount = Convert.ToString(dataSet.Tables[0].Rows[i][10]),
                                OnAccount = Convert.ToString(dataSet.Tables[0].Rows[i][11]),
                                NetDue = Convert.ToString(dataSet.Tables[0].Rows[i][12]),
                            });
                        }

                        billRegisterRpt.BillOutstandingRptList = billRegisterRptList;

                        billRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = 0,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return billRegisterRpt;
        }

        public async Task<ResponseModel> GetBillSubmittedSummRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillSubmitSummRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = " AS On " + Convert.ToDateTime(request.FilterStr).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 2;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "BILL SUBMIT OUTSTANDING SUMMARY";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Cell(5, 1).Value = "Ref No";
                            ws.Cell(5, 2).Value = "Amount";

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var Party = "";

                            for (int j = 0; j < dataSet.Tables[0].Rows.Count - 1; j++)
                            {
                                if (Party != dataSet.Tables[0].Rows[j][0].ToString())
                                {
                                    Party = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = dataSet.Tables[0].Rows[j][0].ToString();
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 1).Value = dataSet.Tables[0].Rows[j][1].ToString();
                                ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[j][2].ToString();
                               
                                r++;
                            }

                            int k = dataSet.Tables[0].Rows.Count - 1;

                            ws.Cell(r, 1).Value = "Grand Total";
                            ws.Cell(r, 2).Value = dataSet.Tables[0].Rows[k][2].ToString();

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 1).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }
                            ws.Column(1).Width = 50;
                            ws.Range(6, 2, r, 4).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetBillSubmittedDetailRptExcel(ReportAgeModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillSubmitDetailRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = " AS On " + Convert.ToDateTime(request.FilterStr).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = 7;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "BILL SUBMIT OUTSTANDING DETAIL";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            for (int i = 2; i < dataSet.Tables[0].Columns.Count; i++)
                            {
                                ws.Cell(5, i-1).Value = dataSet.Tables[0].Columns[i].ColumnName;
                            }

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var Party = "";
                            var SubmitNo = "";
                            decimal tot = 0;
                            decimal partytot = 0;
                            decimal gtot = 0;


                            for (int j = 0; j < dataSet.Tables[0].Rows.Count; j++)
                            {
                                if (SubmitNo != dataSet.Tables[0].Rows[j][1].ToString())
                                {
                                    if (j>0)
                                    {
                                        ws.Range(r, 1, r, 2).Merge();
                                        ws.Range(r, 1, r, 2).Value = "Total";
                                        ws.Cell(r, 3).Value  = tot;

                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                        r++;

                                        tot = 0;
                                    }

                                    if (Party != dataSet.Tables[0].Rows[j][0].ToString())
                                    {
                                        if (j>0)
                                        {
                                            ws.Range(r, 1, r, 2).Merge();
                                            ws.Range(r, 1, r, 2).Value = "Party Total";
                                            ws.Cell(r, 3).Value  = partytot;

                                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                            r++;

                                            partytot = 0;
                                        }

                                        Party = dataSet.Tables[0].Rows[j][0].ToString();
                                        ws.Range(r, 1, r, colcnt).Merge();
                                        ws.Range(r, 1, r, colcnt).Value = Party;
                                        ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                                        r++;
                                    }

                                    SubmitNo = dataSet.Tables[0].Rows[j][1].ToString();
                                    ws.Range(r, 1, r, colcnt).Merge();
                                    ws.Range(r, 1, r, colcnt).Value = SubmitNo;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 11;
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    r++;
                                }

                                ws.Cell(r, 1).Value  = dataSet.Tables[0].Rows[j][2].ToString();
                                ws.Cell(r, 2).Value  = dataSet.Tables[0].Rows[j][3].ToString();
                                ws.Cell(r, 3).Value  = dataSet.Tables[0].Rows[j][4].ToString();
                                ws.Cell(r, 4).Value  = dataSet.Tables[0].Rows[j][5].ToString();
                                ws.Cell(r, 5).Value  = dataSet.Tables[0].Rows[j][6].ToString();
                                ws.Cell(r, 6).Value  = dataSet.Tables[0].Rows[j][7].ToString();
                                ws.Cell(r, 7).Value  = dataSet.Tables[0].Rows[j][8].ToString();

                                tot     = tot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][5].ToString());
                                partytot = partytot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][5].ToString());
                                gtot = gtot + Convert.ToDecimal(dataSet.Tables[0].Rows[j][5].ToString());

                                r++;
                            }
                            ws.Range(r, 1, r, 2).Merge();
                            ws.Range(r, 1, r, 2).Value = "Grand Total";
                            ws.Cell(r, 3).Value  = gtot;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            for (int m = 1; m <= colcnt; m++)
                            {
                                ws.Column(m).AdjustToContents();
                            }
                            ws.Column(1).Width = 12;
                            ws.Column(2).Width = 12;
                            ws.Column(3).Width = 12;

                            ws.Range(6, 3, r, 3).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            responseModel.Status = true;
                            responseModel.Message = filename;
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<ResponseModel> GetOutstandingAnalysisRptExcel(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                   
                    if(request.FilterStr1 == "S")
                    {
                        SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.FilterStr),
                        };
                        var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOutstandingSummRptExcel", param);
                        if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                        {
                            var filter = "To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                            filter = filter  + " As on Date " + Convert.ToDateTime(request.FilterStr).ToString("dd/MM/yyyy");

                            responseModel = await GetOutstandSummExcelReport(dataSet.Tables[0], "OUTSTANDING ANALYSIS REPORT", filter);
                        }
                        else
                        {
                            responseModel.Status = false;
                            responseModel.Message = "No Data Found";
                        }
                    }
                    else
                    {
                        SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@AsOnDate",   request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr2),
                        };
                        var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOutstandingDetailRptExcel", param);
                        if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                        {
                            var filter = "To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                            filter = filter  + " As on Date " + Convert.ToDateTime(request.FilterStr).ToString("dd/MM/yyyy");

                            responseModel = await GetOutstandDetailExcelReport(dataSet, "OUTSTANDING ANALYSIS DETAIL REPORT", filter, request.FilterStr2);
                        }
                        else
                        {
                            responseModel.Status = false;
                            responseModel.Message = "No Data Found";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetOutstandSummExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = dt.Columns.Count;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 0; i < colcnt; i++)
                    {
                        ws.Cell(5, i+1).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        for (int i = 0; i < colcnt; i++)
                        {
                            ws.Cell(j + 6, i + 1).Value = Convert.ToString(dt.Rows[j][i]);
                        }
                        if (Convert.ToDecimal(dt.Rows[j]["Net Bill Due"])!=Convert.ToDecimal(dt.Rows[j]["Ledger Amt"]))
                        {
                            ws.Range(j+6, 1, j+6, colcnt).Style.Font.FontColor = XLColor.Red;
                        }

                    }
                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, j + 5, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, j + 5, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> GetOutstandDetailExcelReport(DataSet ds, string rptheader, string filter, string rpttype)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    DataTable dt = ds.Tables[0];
                    DataTable dt1 = ds.Tables[1];
                    int colcnt = dt.Columns.Count-2;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 2; i < dt.Columns.Count; i++)
                    {
                        ws.Cell(5, i-1).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int r = 6;
                    var type = ""; var party = "";

                    for (int j = 0; j < dt.Rows.Count; j++)
                    {
                        if (party!=Convert.ToString(dt.Rows[j]["AccountName"]))
                        {
                            if(party != "")
                            {
                                var partySumm = dt1.AsEnumerable().Where(row => row.Field<string>("Party")== party);
                                DataTable partydt = partySumm.CopyToDataTable<DataRow>();

                                if (partydt.Rows.Count>0)
                                {
                                    ws.Cell(r, 1).Value = "BILLS DUE";
                                    ws.Cell(r, 2).Value = partydt.Rows[0]["BilledDueAmt"];
                                    ws.Cell(r, 3).Value = "UNBILLED";
                                    ws.Cell(r, 4).Value = partydt.Rows[0]["UnbilledAmt"];
                                    ws.Cell(r, 5).Value = "ADHOC";
                                    ws.Cell(r, 6).Value = partydt.Rows[0]["AdhocRecd"];
                                    ws.Cell(r, 7).Value = "NET DUE";
                                    ws.Cell(r, 8).Value = partydt.Rows[0]["NetDue"];
                                    ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.Blue;

                                    r++;

                                    ws.Range(r, 1, r, colcnt).Merge();
                                    r++;
                                }
                            }
                           

                            party=Convert.ToString(dt.Rows[j]["AccountName"]);
                            ws.Range(r, 1, r, colcnt).Merge();
                            ws.Range(r, 1, r, colcnt).Value = party;
                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                            ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            r++;                                                        
                           
                            type = "";
                        }
                        if (type!=Convert.ToString(dt.Rows[j]["Type"]))
                        {
                            type=Convert.ToString(dt.Rows[j]["Type"]);
                            ws.Range(r, 1, r, colcnt).Merge();
                            if (type=="L")
                            {
                                ws.Range(r, 1, r, colcnt).Value = "PENDING INVOICE LR";
                            }
                            else if(type=="B")
                            {
                                ws.Range(r, 1, r, colcnt).Value = "INVOICES";
                            }
                            else
                            {
                                ws.Range(r, 1, r, colcnt).Value = "MR";
                            }
                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                            r++;
                        }
                        for (int i = 2; i < dt.Columns.Count; i++)
                        {
                            ws.Cell(r, i-1).Value = Convert.ToString(dt.Rows[j][i]);
                        }
                        r++;
                    }

                    var partySum = dt1.AsEnumerable().Where(row => row.Field<string>("Party")== party);
                    DataTable partyd = partySum.CopyToDataTable<DataRow>();

                    if (partyd.Rows.Count>0)
                    {
                        ws.Cell(r, 1).Value = "BILLS DUE";
                        ws.Cell(r, 2).Value = partyd.Rows[0]["BilledDueAmt"];
                        ws.Cell(r, 3).Value = "UNBILLED";
                        ws.Cell(r, 4).Value = partyd.Rows[0]["UnbilledAmt"];
                        ws.Cell(r, 5).Value = "ADHOC";
                        ws.Cell(r, 6).Value = partyd.Rows[0]["AdhocRecd"];
                        ws.Cell(r, 7).Value = "NET DUE";
                        ws.Cell(r, 8).Value = partyd.Rows[0]["NetDue"];
                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                        ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.Blue;

                        r++;

                        ws.Range(r, 1, r, colcnt).Merge();
                        r++;
                    }

                    if (rpttype == "")
                    {
                        var TotSum = dt1.AsEnumerable().Where(row => row.Field<string>("Party") == "Total");
                        DataTable totd = TotSum.CopyToDataTable<DataRow>();

                        if (totd.Rows.Count > 0)
                        {
                            ws.Cell(r, 1).Value = "BILLS DUE";
                            ws.Cell(r, 2).Value = totd.Rows[0]["BilledDueAmt"];
                            ws.Cell(r, 3).Value = "UNBILLED";
                            ws.Cell(r, 4).Value = totd.Rows[0]["UnbilledAmt"];
                            ws.Cell(r, 5).Value = "ADHOC";
                            ws.Cell(r, 6).Value = totd.Rows[0]["AdhocRecd"];
                            ws.Cell(r, 7).Value = "NET DUE";
                            ws.Cell(r, 8).Value = totd.Rows[0]["NetDue"];
                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.Maroon;

                            r++;

                            ws.Range(r, 1, r, colcnt).Merge();
                            r++;
                        }
                    }

                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<OutstandingAnalRptListModel> GetOutstandingAnalysisRptList(ReportRequestModel request)
        {
            OutstandingAnalRptListModel ledgerRptListModel = new();
            List<OutstandingAnalRptModel> ledgerRpts = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@AsOnDate",   request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOutstandingSummRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ledgerRpts.Add(new OutstandingAnalRptModel
                            {
                                Party               = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                BilledDueAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledDueAmt"]),
                                AdhocRecd           = Convert.ToString(dataSet.Tables[0].Rows[i]["AdhocRecd"]),
                                ActualBillDue       = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualBillDue"]),
                                LedgerAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["LedgerAmt"]),
                                TotalUnbilledAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalUnbilledAmt"]),
                            });
                        }

                        ledgerRptListModel.OutstandingAnalList = ledgerRpts;

                        ledgerRptListModel.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return ledgerRptListModel;
        }
       
        public async Task<BillRegisterRptListModel> GetBillRegisterRptList(ReportRequestModel request)
        {
            BillRegisterRptListModel billRegisterRpt = new();

            List<BillRegisterRptModel> billRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),
                           // new SqlParameter("@Destination",     request.FilterStr3),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillRegisterRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billRegisterRptList.Add(new BillRegisterRptModel
                            {
                                BillStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStnName"]),
                                CollStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["CollStnName"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                DueDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DueDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                PartyGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyGstNo"]),
                                TotalGtotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalGtotal"]),
                                MrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),

                            });
                        }

                        billRegisterRpt.BillRegisterRptList = billRegisterRptList;

                        billRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return billRegisterRpt;
        }
        public async Task<ResponseModel> GetBillRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),
                          //  new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Bill Register", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<BookingRegisterRptListModel> GetBookingRegisterRptList(ReportRequestModel request)
        {
            BookingRegisterRptListModel bookingRegisterRpt = new();
            List<BookingRegisterRptModel> bookingRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",request.FilterStr3),
                            new SqlParameter("@VehicleNo",  request.Search),
                            new SqlParameter("@GcSeries",   request.SortColumn),
                            new SqlParameter("@RptType",    request.SortOrder),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBookingRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = 0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            bookingRegisterRptList.Add(new BookingRegisterRptModel
                            {
                                BookedAt            = Convert.ToString(dataSet.Tables[0].Rows[i][0]),
                                BookingDate         = Convert.ToDateTime(dataSet.Tables[0].Rows[i][1]).ToString("dd/MM/yyyy"),
                                BookingStatus       = Convert.ToString(dataSet.Tables[0].Rows[i][2]),
                                GcNoteNo            = Convert.ToString(dataSet.Tables[0].Rows[i][3]),
                                FromLocation        = Convert.ToString(dataSet.Tables[0].Rows[i][4]),
                                ToLocation          = Convert.ToString(dataSet.Tables[0].Rows[i][5]),
                                Kms                 = Convert.ToString(dataSet.Tables[0].Rows[i][6]),
                                Consignor           = Convert.ToString(dataSet.Tables[0].Rows[i][7]),
                                CnorGst             = Convert.ToString(dataSet.Tables[0].Rows[i][8]),
                                InvoiceNo           = Convert.ToString(dataSet.Tables[0].Rows[i][9]),
                                EwayBillNo          = Convert.ToString(dataSet.Tables[0].Rows[i][10]),
                                EwayBillExpDate     = Convert.ToString(dataSet.Tables[0].Rows[i][11])!=""?Convert.ToDateTime(dataSet.Tables[0].Rows[i][11]).ToString("dd/MM/yyyy"):"",
                                Consignee           = Convert.ToString(dataSet.Tables[0].Rows[i][12]),
                                CneeGst             = Convert.ToString(dataSet.Tables[0].Rows[i][13]),
                                CneeMobile          = Convert.ToString(dataSet.Tables[0].Rows[i][14]),
                                TruckNo             = Convert.ToString(dataSet.Tables[0].Rows[i][15]),
                                ActualWt            = Convert.ToString(dataSet.Tables[0].Rows[i][16]),
                                Chargewt            = Convert.ToString(dataSet.Tables[0].Rows[i][17]),
                                ProductName         = Convert.ToString(dataSet.Tables[0].Rows[i][18]),
                                ProductDesc         = Convert.ToString(dataSet.Tables[0].Rows[i][19]),
                                PackingType         = Convert.ToString(dataSet.Tables[0].Rows[i][20]),
                                NoPackages          = Convert.ToString(dataSet.Tables[0].Rows[i][21]),
                                VehType             = Convert.ToString(dataSet.Tables[0].Rows[i][22]),
                                Freight             = Convert.ToString(dataSet.Tables[0].Rows[i][23]),
                                Statistical         = Convert.ToString(dataSet.Tables[0].Rows[i][24]),
                                Fov                 = Convert.ToString(dataSet.Tables[0].Rows[i][25]),
                                DoorColl            = Convert.ToString(dataSet.Tables[0].Rows[i][26]),
                                Handling            = Convert.ToString(dataSet.Tables[0].Rows[i][27]),
                                LoadingDetn         = Convert.ToString(dataSet.Tables[0].Rows[i][28]),
                                Enroute             = Convert.ToString(dataSet.Tables[0].Rows[i][29]),
                                Misc                = Convert.ToString(dataSet.Tables[0].Rows[i][30]),
                                DoorDelv            = Convert.ToString(dataSet.Tables[0].Rows[i][31]),
                                UnLoading           = Convert.ToString(dataSet.Tables[0].Rows[i][32]),
                                UnLoadingDetn       = Convert.ToString(dataSet.Tables[0].Rows[i][33]),
                                Extras              = Convert.ToString(dataSet.Tables[0].Rows[i][34]),
                                Others              = Convert.ToString(dataSet.Tables[0].Rows[i][35]),
                                SubTotal            = Convert.ToString(dataSet.Tables[0].Rows[i][36]),
                                GrandTotal          = Convert.ToString(dataSet.Tables[0].Rows[i][37]),
                                BusinessIncharge    = Convert.ToString(dataSet.Tables[0].Rows[i][38]),
                                BillingParty        = Convert.ToString(dataSet.Tables[0].Rows[i][39]),
                                BilledYN            = Convert.ToString(dataSet.Tables[0].Rows[i][40]),
                                BillNo              = Convert.ToString(dataSet.Tables[0].Rows[i][41]),
                                BillDate            = Convert.ToString(dataSet.Tables[0].Rows[i][42]) != "" ? Convert.ToDateTime(dataSet.Tables[0].Rows[i][42]).ToString("dd/MM/yyyy") : "",
                            });
                        }

                        bookingRegisterRpt.BookingRegisterRptList = bookingRegisterRptList;

                        bookingRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return bookingRegisterRpt;
        }
        public async Task<ResponseModel> GetBookingRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",request.FilterStr3),
                            new SqlParameter("@VehicleNo",  request.Search),
                            new SqlParameter("@GcSeries",   request.SortColumn),
                            new SqlParameter("@RptType",    request.SortOrder),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBookingRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                        if (request.SortOrder == "L")
                        {
                            for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                            {
                                dataSet.Tables[0].Rows[i]["Invoice No"] = "'" + dataSet.Tables[0].Rows[i]["Invoice No"].ToString();
                                dataSet.Tables[0].Rows[i]["Eway Bill No"] = "'" + dataSet.Tables[0].Rows[i]["Eway Bill No"].ToString();
                            }
                            response = await GetBookingRegisterExcelReport(dataSet.Tables[0], "Booking Register", filter);
                        }
                        if(request.SortOrder=="S")
                        {
                            response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Booking Register", filter);
                        }

                        
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetBookingRegisterExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = dt.Columns.Count;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 1; i < colcnt; i++)
                    {
                        ws.Cell(5, i).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    var branch = "";
                    decimal freight = 0, statistical = 0, fov = 0,
                     coll = 0, handling = 0, lDetn = 0,
                     enroute = 0, misc = 0, delv = 0, unLoading = 0, uLDetn = 0, extras = 0,
                     others = 0, sTotal = 0, gTotal = 0;

                    decimal gfreight = 0, gstatistical = 0, gfov = 0,
                     gcoll = 0, ghandling = 0, glDetn = 0,
                     genroute = 0, gmisc = 0, gdelv = 0, gunLoading = 0, guLDetn = 0, gextras = 0,
                     gothers = 0, gsTotal = 0, ggTotal = 0;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        if (branch != dt.Rows[j]["Booked At"].ToString())
                        {
                            if (branch != "")
                            {
                                ws.Cell(row, 23).Value =  freight.ToString();
                                ws.Cell(row, 24).Value =  statistical.ToString();
                                ws.Cell(row, 25).Value =  fov.ToString();
                                ws.Cell(row, 26).Value =  coll.ToString();
                                ws.Cell(row, 27).Value =  handling.ToString();
                                ws.Cell(row, 28).Value =  lDetn.ToString();
                                ws.Cell(row, 29).Value =  enroute.ToString();
                                ws.Cell(row, 30).Value =  misc.ToString();
                                ws.Cell(row, 31).Value =  delv.ToString();
                                ws.Cell(row, 32).Value =  unLoading.ToString();
                                ws.Cell(row, 33).Value =  uLDetn.ToString();
                                ws.Cell(row, 34).Value =  extras.ToString();
                                ws.Cell(row, 35).Value =  others.ToString();
                                ws.Cell(row, 36).Value =  sTotal.ToString();
                                ws.Cell(row, 37).Value =  gTotal.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                                row++;

                                freight = 0; statistical = 0; fov = 0;
                                coll = 0; handling = 0; lDetn = 0;
                                enroute = 0; misc = 0; delv = 0; unLoading = 0; uLDetn = 0; extras = 0;
                                others = 0; sTotal = 0; gTotal = 0;
                            }

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = dt.Rows[j]["Booked At"].ToString();
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                            branch = dt.Rows[j]["Booked At"].ToString();
                            row++;

                        }
                        for (int i = 1; i < colcnt; i++)
                        {
                            ws.Cell(row, i).Value = dt.Rows[j][i].ToString();
                        }
                        row++;

                        freight     = freight     + Convert.ToDecimal(dt.Rows[j]["Freight"]);
                        statistical = statistical + Convert.ToDecimal(dt.Rows[j]["Statistical"]);
                        fov         = fov         + Convert.ToDecimal(dt.Rows[j]["Fov"]);
                        coll        = coll        + Convert.ToDecimal(dt.Rows[j]["Door Coll"]);
                        handling    = handling    + Convert.ToDecimal(dt.Rows[j]["Handling"]);
                        lDetn       = lDetn       + Convert.ToDecimal(dt.Rows[j]["Loading Detn"]);
                        enroute     = enroute     + Convert.ToDecimal(dt.Rows[j]["Enroute"]);
                        misc        = misc        + Convert.ToDecimal(dt.Rows[j]["Misc"]);
                        delv        = delv        + Convert.ToDecimal(dt.Rows[j]["Door Delv"]);
                        unLoading   = unLoading   + Convert.ToDecimal(dt.Rows[j]["UnLoading"]);
                        uLDetn      = uLDetn      + Convert.ToDecimal(dt.Rows[j]["UnLoading Detn"]);
                        extras      = extras      + Convert.ToDecimal(dt.Rows[j]["Extras"]);
                        others      = others      + Convert.ToDecimal(dt.Rows[j]["Others"]);
                        sTotal      = sTotal      + Convert.ToDecimal(dt.Rows[j]["Sub Total"]);
                        gTotal      = gTotal      + Convert.ToDecimal(dt.Rows[j]["Grand Total"]);

                        gfreight     = gfreight     + Convert.ToDecimal(dt.Rows[j]["Freight"]);
                        gstatistical = gstatistical + Convert.ToDecimal(dt.Rows[j]["Statistical"]);
                        gfov         = gfov         + Convert.ToDecimal(dt.Rows[j]["Fov"]);
                        gcoll        = gcoll        + Convert.ToDecimal(dt.Rows[j]["Door Coll"]);
                        ghandling    = ghandling    + Convert.ToDecimal(dt.Rows[j]["Handling"]);
                        glDetn       = glDetn       + Convert.ToDecimal(dt.Rows[j]["Loading Detn"]);
                        genroute     = genroute     + Convert.ToDecimal(dt.Rows[j]["Enroute"]);
                        gmisc        = gmisc        + Convert.ToDecimal(dt.Rows[j]["Misc"]);
                        gdelv        = gdelv        + Convert.ToDecimal(dt.Rows[j]["Door Delv"]);
                        gunLoading   = gunLoading   + Convert.ToDecimal(dt.Rows[j]["UnLoading"]);
                        guLDetn      = guLDetn      + Convert.ToDecimal(dt.Rows[j]["UnLoading Detn"]);
                        gextras      = gextras      + Convert.ToDecimal(dt.Rows[j]["Extras"]);
                        gothers      = gothers      + Convert.ToDecimal(dt.Rows[j]["Others"]);
                        gsTotal      = gsTotal      + Convert.ToDecimal(dt.Rows[j]["Sub Total"]);
                        ggTotal      = ggTotal      + Convert.ToDecimal(dt.Rows[j]["Grand Total"]);
                    }
                    ws.Cell(row, 23).Value =  freight.ToString();
                    ws.Cell(row, 24).Value =  statistical.ToString();
                    ws.Cell(row, 25).Value =  fov.ToString();
                    ws.Cell(row, 26).Value =  coll.ToString();
                    ws.Cell(row, 27).Value =  handling.ToString();
                    ws.Cell(row, 28).Value =  lDetn.ToString();
                    ws.Cell(row, 29).Value =  enroute.ToString();
                    ws.Cell(row, 30).Value =  misc.ToString();
                    ws.Cell(row, 31).Value =  delv.ToString();
                    ws.Cell(row, 32).Value =  unLoading.ToString();
                    ws.Cell(row, 33).Value =  uLDetn.ToString();
                    ws.Cell(row, 34).Value =  extras.ToString();
                    ws.Cell(row, 35).Value =  others.ToString();
                    ws.Cell(row, 36).Value =  sTotal.ToString();
                    ws.Cell(row, 37).Value =  gTotal.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    row++;

                    ws.Cell(row, 23).Value =  gfreight.ToString();
                    ws.Cell(row, 24).Value =  gstatistical.ToString();
                    ws.Cell(row, 25).Value =  gfov.ToString();
                    ws.Cell(row, 26).Value =  gcoll.ToString();
                    ws.Cell(row, 27).Value =  ghandling.ToString();
                    ws.Cell(row, 28).Value =  glDetn.ToString();
                    ws.Cell(row, 29).Value =  genroute.ToString();
                    ws.Cell(row, 30).Value =  gmisc.ToString();
                    ws.Cell(row, 31).Value =  gdelv.ToString();
                    ws.Cell(row, 32).Value =  gunLoading.ToString();
                    ws.Cell(row, 33).Value =  guLDetn.ToString();
                    ws.Cell(row, 34).Value =  gextras.ToString();
                    ws.Cell(row, 35).Value =  gothers.ToString();
                    ws.Cell(row, 36).Value =  gsTotal.ToString();
                    ws.Cell(row, 37).Value =  ggTotal.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    for (int k = 1; k < colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<BusinessSummRptListModel> GetBusinessSummRptList(ReportRequestModel request)
        {
            BusinessSummRptListModel businessSummRpt = new();

            List<BusinessSummRptModel> businessSummRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBusinessSummRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            businessSummRptList.Add(new BusinessSummRptModel
                            {
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                FrtAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["FrtAmt"]),

                            });
                        }

                        businessSummRpt.BusinessSummRptList = businessSummRptList;

                        businessSummRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return businessSummRpt;
        }
        public async Task<ResponseModel> GetBusinessSummRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@IncSupply",  request.FilterStr1),  
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBusinessSummRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await GetBusiSummExcelReport(dataSet.Tables[0], "Business Summary(LR)", filter);

                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> GetBusiSummExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = 2;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 1; i < dt.Columns.Count; i++)
                    {
                        ws.Cell(5, i).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0; int r = 6;
                    var branch = "";

                    for (j = 0; j < dt.Rows.Count-1; j++)
                    {
                        if (branch!=Convert.ToString(dt.Rows[j][0]))
                        {
                            branch=Convert.ToString(dt.Rows[j][0]);

                            ws.Range(r, 1, r, colcnt).Merge();
                            ws.Range(r, 1, r, colcnt).Value = branch;
                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, colcnt).Style.Font.FontSize = 12;
                            ws.Range(r, 1, r, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;

                            r++;
                        }
                        ws.Cell(r, 1).Value = Convert.ToString(dt.Rows[j][1]);
                        ws.Cell(r, 2).Value = Convert.ToString(dt.Rows[j][2]);
                        ws.Range(r, 2, r, 2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                        if(Convert.ToString(dt.Rows[j][1])=="Branch Total")
                        {
                            ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.Blue;
                        }
                        r++;
                    }
                    ws.Cell(r, 1).Value = "Grand Total";
                    ws.Cell(r, 2).Value = Convert.ToString(dt.Rows[j][2]);
                    ws.Range(r, 2, r, 2).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(r, 1, r, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, r, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, r, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }


        public async Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request)
        {
            ChallanRegisterRptListModel challanRegisterRpt = new();

            List<ChallanRegisterRptModel> challanRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Origin",         request.FilterStr),
                            new SqlParameter("@Destination",    request.FilterStr1),
                            new SqlParameter("@BrokerId",       request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanRegisterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanRegisterRptList.Add(new ChallanRegisterRptModel
                            {
                                ChBookStnname = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBookStnname"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStatus"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                                ExpArrivalDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpArrivalDate"]),
                                FromPlaceName = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlaceName"]),
                                ToPlaceName = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlaceName"]),
                                BrokerName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                VehicleOwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerName"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAdvance"]),
                                Balance = Convert.ToString(dataSet.Tables[0].Rows[i]["Balance"]),
                                BalPayAtBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["BalPayAtBrName"]),
                                LrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LrNo"]),

                            });
                        }

                        challanRegisterRpt.ChallanRegisterRptList = challanRegisterRptList;

                        challanRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challanRegisterRpt;
        }
        public async Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Origin",         request.FilterStr),
                            new SqlParameter("@Destination",    request.FilterStr1),
                            new SqlParameter("@BrokerId",       request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanRegisterExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Challan Register", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ChallanRegisterRptListModel> GetChallanTdsStatementRptList(ReportRequestModel request)
        {
            ChallanRegisterRptListModel challanRegisterRpt = new();

            List<ChallanRegisterRptModel> challanRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Origin",         request.FilterStr),
                            new SqlParameter("@Destination",    request.FilterStr1),
                            new SqlParameter("@BrokerId",       request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanTDSStatementList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanRegisterRptList.Add(new ChallanRegisterRptModel
                            {
                                ChBookStnname = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBookStnname"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                            //   ChStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStatus"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                              //  ExpArrivalDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpArrivalDate"]),
                                FromPlaceName = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlaceName"]),
                                ToPlaceName = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlaceName"]),
                                BrokerName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                VehicleOwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerPanNo"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                            //    Balance = Convert.ToString(dataSet.Tables[0].Rows[i]["Balance"]),
                             //   BalPayAtBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["BalPayAtBrName"]),
                             //   LrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LrNo"]),

                            });
                        }

                        challanRegisterRpt.ChallanRegisterRptList = challanRegisterRptList;

                        challanRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challanRegisterRpt;
        }
        public async Task<ResponseModel> GetChallanTdsStatementRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Origin",         request.FilterStr),
                            new SqlParameter("@Destination",    request.FilterStr1),
                            new SqlParameter("@BrokerId",       request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanTDSStatementExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Challan  Tds Register", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<DistanceMasterFrtRptListModel> GetDistanceMasterFrtRptList(ReportRequestModel request)
        {
            DistanceMasterFrtRptListModel distanceMasterRpt = new();
            List<DistanceMasterFrtRptModel> distanceMasterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromLocation",   request.FilterStr),
                            new SqlParameter("@ToLocation",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterFrtRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceMasterRptList.Add(new DistanceMasterFrtRptModel
                            {
                                OriginPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["OriginPlace"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                KMS = Convert.ToString(dataSet.Tables[0].Rows[i]["KMS"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                            });
                        }

                        distanceMasterRpt.DistanceMasterRptList = distanceMasterRptList;

                        distanceMasterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return distanceMasterRpt;
        }

        public async Task<ResponseModel> ExcelDistanceMasterFrtRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromLocation",   request.FilterStr),
                            new SqlParameter("@ToLocation",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterFrtRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + dataSet.Tables[0].Rows[0]["Origin Place"].ToString();

                        if (request.FilterStr1!= "")
                        {
                            filter = filter  + " To " + dataSet.Tables[0].Rows[0]["Destination"].ToString();
                        }

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Distance Freight Report", filter);
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<DistanceMasterTripRptListModel> GetDistanceMasterTripRptList(ReportRequestModel request)
        {
            DistanceMasterTripRptListModel distanceMasterTripRpt = new();
            List<DistanceMasterTripRptModel> distanceMasterTripRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromLocation",   request.FilterStr),
                            new SqlParameter("@ToLocation",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterTripRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceMasterTripRptList.Add(new DistanceMasterTripRptModel
                            {
                                OriginPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["OriginPlace"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                KMS = Convert.ToString(dataSet.Tables[0].Rows[i]["KMS"]),
                                EnrouteExpTruck = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpTruck"]),
                                EnrouteExpTrailer = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpTrailer"]),
                                EnrouteExpCarCarrier = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
                                EnrouteExpEmpty = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpEmpty"]),
                                EnrouteExpRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteExpRemarks"]),
                            });
                        }

                        distanceMasterTripRpt.DistanceMasterTripRptList = distanceMasterTripRptList;

                        distanceMasterTripRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return distanceMasterTripRpt;
        }
        public async Task<ResponseModel> ExcelDistanceMasterTripRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromLocation",   request.FilterStr),
                            new SqlParameter("@ToLocation",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterTripRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + dataSet.Tables[0].Rows[0]["Origin Place"].ToString();

                        if (request.FilterStr1!= "")
                        {
                            filter = filter  + " To " + dataSet.Tables[0].Rows[0]["Destination"].ToString();
                        }

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Distance Trip Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<GSTRegisterRptListModel> GetGSTRegisterRptList(ReportRequestModel request)
        {
            GSTRegisterRptListModel gSTRegisterRpt = new();

            List<GSTRegisterRptModel> gSTRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@RptType",     request.FilterStr1),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGSTRegisterRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gSTRegisterRptList.Add(new GSTRegisterRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                BillInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillInvNo"]),
                                BillInvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillInvDate"]),
                                PartyVendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyVendorName"]),
                                PartyVendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyVendorGstNo"]),
                                Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Amt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                GrandTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["GrandTotal"]),


                            });
                        }

                        gSTRegisterRpt.GSTRegisterRptList = gSTRegisterRptList;

                        gSTRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return gSTRegisterRpt;
        }
        public async Task<ResponseModel> GetGSTRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Vendor",   request.FilterStr1),
                            new SqlParameter("@RptType",    request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGSTRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "GST Purchase Register", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<LHExtraPmtReconRptListModel> GetLHExtraPmtReconRptList(ReportRequestModel request)
        {
            LHExtraPmtReconRptListModel lHExtraPmtReconRpt = new();

            List<LHExtraPmtReconRptModel> lHExtraPmtReconRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Branch",         request.FilterStr),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHExtraPmtReconRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lHExtraPmtReconRptList.Add(new LHExtraPmtReconRptModel
                            {
                                ChBookStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChBookStnName"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDate"]),
                                ChFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ChFrom"]),
                                ChTo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChTo"]),
                                LrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LrNo"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                LrFrt = Convert.ToString(dataSet.Tables[0].Rows[i]["LrFrt"]),
                                LorryHire = Convert.ToString(dataSet.Tables[0].Rows[i]["LorryHire"]),
                                ExtHamaliPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtHamaliPaid"]),
                                ExtDetnPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtDetnPaid"]),
                                ExtOthersPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtOthersPaid"]),
                                BilledHamali = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledHamali"]),
                                BilledDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledDetn"]),
                                BilledOthers = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledOthers"]),
                                BilledExtraSupp = Convert.ToString(dataSet.Tables[0].Rows[i]["BilledExtraSupp"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                MRNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MRNo"]),
                                MR_NR_Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["MR_NR_Amt"]),

                            });
                        }

                        lHExtraPmtReconRpt.LHExtraPmtReconRptList = lHExtraPmtReconRptList;

                        lHExtraPmtReconRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lHExtraPmtReconRpt;
        }
        public async Task<ResponseModel> GetLHExtraPmtReconRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            //new SqlParameter("@Party",     request.FilterStr1),
                            //new SqlParameter("@Origin",     request.FilterStr2),
                            //new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHExtraPmtReconRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "LH Extra Pmt Reconciliation", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        
        public async Task<LhPayableStatusRptListModel> GetLhPayableStatusRptList(ReportRequestModel request)
        {
            LhPayableStatusRptListModel lhPayableStatusRpt = new();

            List<LhPayableStatusRptModel> lhPayableStatusRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@RptType",     request.FilterStr),
                            new SqlParameter("@Broker",    request.FilterStr1),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLhPayableStatusRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lhPayableStatusRptList.Add(new LhPayableStatusRptModel
                            {
                                ChStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStnName"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                                ChFromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ChFromPlace"]),
                                ChToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ChToPlace"]),
                                BalPayAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalPayAt"]),
                                BrokerName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                BrokerMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerMblNo"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                HirePaid = Convert.ToString(dataSet.Tables[0].Rows[i]["HirePaid"]),
                                TotDed = Convert.ToString(dataSet.Tables[0].Rows[i]["TotDed"]),
                                ExtHamali = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtHamali"]),
                                ExtDeten = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtDeten"]),
                                ExtOth = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtOth"]),
                            });
                        }

                        lhPayableStatusRpt.LhPayableStatusRptList = lhPayableStatusRptList;

                        lhPayableStatusRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lhPayableStatusRpt;
        }
        public async Task<ResponseModel> GetLhPayableStatusRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@AsOnDate",   request.Search),
                            new SqlParameter("@RptType",    request.FilterStr),
                            new SqlParameter("@Broker",     request.FilterStr1),
                            new SqlParameter("@Branch",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLhPayableStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");


                        response = await GetLhPayableStatusExcelReport(dataSet.Tables[0], "Lorry Hire Payable", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetLhPayableStatusExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = dt.Columns.Count;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 1; i < colcnt; i++)
                    {
                        ws.Cell(5, i).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    var branch = "";
                    decimal HireAmt = 0, HirePaid = 0, TotalDed = 0, Due = 0;

                    decimal gHireAmt = 0, gHirePaid = 0, gTotalDed = 0, gDue = 0;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        if (branch != dt.Rows[j]["Ch Stn Name"].ToString())
                        {
                            if (branch != "")
                            {
                                ws.Cell(row, 9).Value   =  HireAmt.ToString();
                                ws.Cell(row, 10).Value  =  HirePaid.ToString();
                                ws.Cell(row, 11).Value  =  TotalDed.ToString();
                                ws.Cell(row, 12).Value  =  Due.ToString();

                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                                row++;

                            }

                            HireAmt = 0; HirePaid = 0; TotalDed = 0; Due = 0;

                            branch = dt.Rows[j]["Ch Stn Name"].ToString();

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = branch;
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                            row++;

                        }
                        for (int i = 1; i < colcnt; i++)
                        {
                            ws.Cell(row, i).Value = dt.Rows[j][i].ToString();
                        }
                        row++;

                        HireAmt     = HireAmt   + Convert.ToDecimal(dt.Rows[j]["Hire Amt"]);
                        HirePaid    = HirePaid  + Convert.ToDecimal(dt.Rows[j]["Hire Paid"]);
                        TotalDed    = TotalDed  + Convert.ToDecimal(dt.Rows[j]["Total Ded"]);
                        Due         = Due       + Convert.ToDecimal(dt.Rows[j]["Due Amt"]);

                        gHireAmt    = gHireAmt  + Convert.ToDecimal(dt.Rows[j]["Hire Amt"]);
                        gHirePaid   = gHirePaid + Convert.ToDecimal(dt.Rows[j]["Hire Paid"]);
                        gTotalDed   = gTotalDed + Convert.ToDecimal(dt.Rows[j]["Total Ded"]);
                        gDue        = gDue      + Convert.ToDecimal(dt.Rows[j]["Due Amt"]);
                    }
                    ws.Cell(row, 9).Value   =  HireAmt.ToString();
                    ws.Cell(row, 10).Value  =  HirePaid.ToString();
                    ws.Cell(row, 11).Value  =  TotalDed.ToString();
                    ws.Cell(row, 12).Value  =  Due.ToString();

                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    row++;

                    ws.Cell(row, 9).Value   =  gHireAmt.ToString();
                    ws.Cell(row, 10).Value  =  gHirePaid.ToString();
                    ws.Cell(row, 11).Value  =  gTotalDed.ToString();
                    ws.Cell(row, 12).Value  =  gDue.ToString();

                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    for (int k = 1; k < colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<LHPMVarianceRptListModel> GetLHPMVarianceRptList(ReportRequestModel request)
        {
            LHPMVarianceRptListModel lHPMVarianceRpt = new();

            List<LHPMVarianceRptModel> lHPMVarianceRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@BrokerId",     request.FilterStr1),
                            new SqlParameter("@VarType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHPMVarianceRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lHPMVarianceRptList.Add(new LHPMVarianceRptModel
                            {
                                ChStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStnName"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDate"]),
                                VehGroupCode = Convert.ToString(dataSet.Tables[0].Rows[i]["VehGroupCode"]),
                                VehicleDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleDesc"]),
                                TptName = Convert.ToString(dataSet.Tables[0].Rows[i]["TptName"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                EstimateAdvLhpm = Convert.ToString(dataSet.Tables[0].Rows[i]["EstimateAdvLhpm"]),
                                EstimateBalLhpm = Convert.ToString(dataSet.Tables[0].Rows[i]["EstimateBalLhpm"]),

                            });
                        }

                        lHPMVarianceRpt.LHPMVarianceRptList = lHPMVarianceRptList;

                        lHPMVarianceRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lHPMVarianceRpt;
        }
        public async Task<ResponseModel> GetLHPMVarianceRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@BrokerId",     request.FilterStr1),
                            new SqlParameter("@VarType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHPMVarianceRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");


                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "LHPM Variation Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<LRCostingRptListModel> GetLRCostingRptList(ReportRequestModel request)
        {
            LRCostingRptListModel lRCostingRpt = new();

            List<LRCostingRptModel> lRCostingRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Party",     request.FilterStr),
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",     request.FilterStr2),
                            new SqlParameter("@VarType",     request.FilterStr3),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRCostingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        // int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lRCostingRptList.Add(new LRCostingRptModel
                            {
                                CnStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["CnStnName"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                GcFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["GcFrom"]),
                                GcTo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcTo"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                ChallanStnNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanStnNo"]),
                                GrossFrt = Convert.ToString(dataSet.Tables[0].Rows[i]["GrossFrt"]),
                                SuppFrt = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppFrt"]),
                                LH_Hire = Convert.ToString(dataSet.Tables[0].Rows[i]["LH_Hire"]),


                            });
                        }

                        lRCostingRpt.LRCostingRptList = lRCostingRptList;

                        lRCostingRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lRCostingRpt;
        }
        public async Task<ResponseModel> GetLRCostingRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Party",          request.FilterStr),
                            new SqlParameter("@Origin",         request.FilterStr1),
                            new SqlParameter("@Destination",    request.FilterStr2),
                            new SqlParameter("@VarType",        request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRCostingRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Consignment/LR Costing", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetLRwiseCostingLlpRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@GcNoteNo",          request.FilterStr),
                            new SqlParameter("@InvoiceNo",         request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRwiseCostingLlpRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "'Consignment Margin", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<LRWithOutChallanRptListModel> GetLRWithOutChallanRptList(ReportRequestModel request)
        {
            LRWithOutChallanRptListModel lRWithOutChallanRpt = new();

            List<LRWithOutChallanRptModel> lRWithOutChallanRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",     request.FilterStr3),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRWithOutChallanRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lRWithOutChallanRptList.Add(new LRWithOutChallanRptModel
                            {
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                BookingStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingStatus"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocation"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                Billparty = Convert.ToString(dataSet.Tables[0].Rows[i]["Billparty"]),
                                VehTypeDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehTypeDesc"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),

                            });
                        }

                        lRWithOutChallanRpt.LRWithOutChallanRptList = lRWithOutChallanRptList;

                        lRWithOutChallanRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lRWithOutChallanRpt;
        }
        public async Task<ResponseModel> GetLRWithOutChallanRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRWithOutChallanRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "CN Not Dispatched", filter);
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<MRRegisterRptListModel> GetMRRegisterRptList(ReportRequestModel request)
        {
            MRRegisterRptListModel mRRegisterRpt = new();

            List<MRRegisterRptModel> mRRegisterRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),
                           // new SqlParameter("@Destination",     request.FilterStr3),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMRRegisterRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            mRRegisterRptList.Add(new MRRegisterRptModel
                            {
                                MrStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["MrStnName"]),
                                MrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),
                                MrType = Convert.ToString(dataSet.Tables[0].Rows[i]["MrType"]),
                                MrReceiptType = Convert.ToString(dataSet.Tables[0].Rows[i]["MrReceiptType"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                CheqCashAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqCashAmt"]),
                                OnAcAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjAmt"]),
                                OnAcNewAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcNewAmt"]),
                                OnAcStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcStatus"]),
                                DebitAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),

                            });
                        }

                        mRRegisterRpt.MRRegisterRptList = mRRegisterRptList;

                        mRRegisterRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return mRRegisterRpt;
        }
        public async Task<ResponseModel> GetMRRegisterRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),
                          //  new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMRRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "MR Register", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<OnAccountMRStatusRptListModel> GetOnAccountMRStatusRptList(ReportRequestModel request)
        {
            OnAccountMRStatusRptListModel onAccountMRStatusRpt = new();

            List<OnAccountMRStatusRptModel> onAccountMRStatusRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOnAccountMRStatusRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            onAccountMRStatusRptList.Add(new OnAccountMRStatusRptModel
                            {
                                MrStn = Convert.ToString(dataSet.Tables[0].Rows[i]["MrStn"]),
                                MrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                CrAdviceNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAdviceNo"]),
                                OnAcAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAmt"]),
                                OnAcStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcStatus"]),
                                MrType = Convert.ToString(dataSet.Tables[0].Rows[i]["MrType"]),
                                OnAcAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjAmt"]),
                                PendingAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PendingAdjAmt"]),
                                AdjInmr = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjInmr"]),
                                AdjMrdate = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjMrdate"]),
                                AdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjAmt"]),
                                AsOndate = Convert.ToString(dataSet.Tables[0].Rows[i]["AsOndate"]),

                            });
                        }

                        onAccountMRStatusRpt.OnAccountMRStatusRptList = onAccountMRStatusRptList;

                        onAccountMRStatusRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return onAccountMRStatusRpt;
        }
        public async Task<ResponseModel> GetOnAccountMRStatusRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOnAccountMRStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "On A/c MR Status Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<UnBilledRptListModel> GetUnBilledRptList(RepReqModel request)
        {
            UnBilledRptListModel unBilledRpt = new();

            List<UnBilledRptModel> unBilledRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@Origin",         request.FilterStr2),
                            new SqlParameter("@Destination",    request.FilterStr3),
                            new SqlParameter("@AsOnDate",       request.FilterStr4),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUnBilledRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            unBilledRptList.Add(new UnBilledRptModel
                            {
                                BookingStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingStnName"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                FromStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["FromStnName"]),
                                ToStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["ToStnName"]),
                                BillStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStnName"]),
                                Consignor = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignor"]),
                                Consignee = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignee"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                BilledAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["unBilledAmt"]),
                                ContainerNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ContainerNo"]),

                            });
                        }

                        unBilledRpt.UnBilledRptList = unBilledRptList;

                        unBilledRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return unBilledRpt;
        }
        public async Task<ResponseModel> GetUnBilledRptExcel(RepReqModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@Origin",         request.FilterStr2),
                            new SqlParameter("@Destination",    request.FilterStr3),
                            new SqlParameter("@AsOnDate",       request.FilterStr4),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUnBilledRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        if (dataSet.Tables[0].Rows.Count>0)
                        {
                            response = await GetUnBilledExcelReport(dataSet.Tables[0], "UnBilled Consignment", filter, request.SortOrder);
                        }
                        else
                        {
                            response.Status = false;
                            response.Message = "No Data Found";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetUnBilledExcelReport(DataTable dt, string rptheader, string filter, string rptType)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = 0;
                    if (rptType == "S")
                    {
                        colcnt = 2;
                    }
                    else
                    {
                        if (responseModel.Message == "LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED")
                        {
                            colcnt = 17;
                        }
                        else
                        {
                            colcnt = 16;
                        }
                    }


                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    if (rptType == "S")
                    {
                        ws.Cell(5, 1).Value = "Billing Party";
                        ws.Cell(5, 2).Value = "Total Unbilled Amt";
                    }
                    else
                    {
                        ws.Cell(5, 1).Value = "Booked At";
                        ws.Cell(5, 2).Value = "Booking Date";
                        ws.Cell(5, 3).Value = "LR No";
                        ws.Cell(5, 4).Value = "Booking Status";
                        ws.Cell(5, 5).Value = "From Location";
                        ws.Cell(5, 6).Value = "To Location";
                        ws.Cell(5, 7).Value = "Truck No";
                        ws.Cell(5, 8).Value = "Veh Type";
                        ws.Cell(5, 9).Value = "No of Packages";
                        ws.Cell(5, 10).Value = "Actual Wt";
                        ws.Cell(5, 11).Value = "Charge Wt";
                        ws.Cell(5, 12).Value = "Unbilled Amt";
                        ws.Cell(5, 13).Value = "Broker Name";
                        ws.Cell(5, 14).Value = "Broker Mobile";
                        ws.Cell(5, 15).Value = "Vehicle Engaged By";
                        ws.Cell(5, 16).Value = "Pod Recd";
                        if (responseModel.Message == "LALITA LOGISTICS AND AGENCIES PRIVATE LIMITED")
                        {
                            ws.Cell(5, 17).Value = "Container No";
                        }
                    }


                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    var branch = ""; var party = "";
                    decimal unbillamt = 0, brunbill = 0, gunbill = 0;


                    branch = dt.Rows[0]["Billing Station"].ToString();

                    ws.Range(row, 1, row, colcnt).Merge();
                    ws.Range(row, 1, row, colcnt).Value = branch;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                    ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                    row++;

                    if (rptType != "S")
                    {
                        party = dt.Rows[0]["Billing Party"].ToString();

                        ws.Range(row, 1, row, colcnt).Merge();
                        ws.Range(row, 1, row, colcnt).Value = party;
                        ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                        ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 12;
                        ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                        row++;
                    }
                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        if (rptType == "S")
                        {
                            if (branch != dt.Rows[j]["Billing Station"].ToString())
                            {
                                ws.Cell(row, 1).Value = "Station Total";
                                ws.Cell(row, 2).Value = brunbill.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                                row++;

                                brunbill = 0;
                                branch = dt.Rows[j]["Billing Station"].ToString();

                                ws.Range(row, 1, row, colcnt).Merge();
                                ws.Range(row, 1, row, colcnt).Value = branch;
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                                ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                                row++;
                            }
                        }
                        else
                        {
                            if (party != dt.Rows[j]["Billing Party"].ToString())
                            {
                                ws.Cell(row, 1).Value = "Party Total";
                                ws.Cell(row, 12).Value = unbillamt.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                                row++;

                                if (branch != dt.Rows[j]["Billing Station"].ToString())
                                {
                                    ws.Cell(row, 1).Value = "Station Total";
                                    ws.Cell(row, 12).Value = brunbill.ToString();
                                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                                    row++;

                                    brunbill = 0;
                                    branch = dt.Rows[j]["Billing Station"].ToString();

                                    ws.Range(row, 1, row, colcnt).Merge();
                                    ws.Range(row, 1, row, colcnt).Value = branch;
                                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                    ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                                    ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                                    row++;
                                }

                                unbillamt = 0;
                                party = dt.Rows[j]["Billing Party"].ToString();

                                ws.Range(row, 1, row, colcnt).Merge();
                                ws.Range(row, 1, row, colcnt).Value = party;
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 12;
                                ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                                row++;
                            }
                        }
                        if (rptType == "S")
                        {
                            ws.Cell(row, 1).Value = dt.Rows[j]["Billing Party"].ToString();
                            ws.Cell(row, 2).Value = dt.Rows[j]["Unbilled Amt"].ToString();
                        }
                        else
                        {
                            for (int i = 2; i < colcnt+2; i++)
                            {
                                ws.Cell(row, i-1).Value = dt.Rows[j][i].ToString();
                            }
                        }
                        row++;
                        unbillamt   = unbillamt + Convert.ToDecimal(dt.Rows[j]["Unbilled Amt"]);
                        brunbill    = brunbill  + Convert.ToDecimal(dt.Rows[j]["Unbilled Amt"]);
                        gunbill     = gunbill   + Convert.ToDecimal(dt.Rows[j]["Unbilled Amt"]);

                    }
                    if (rptType == "S")
                    {
                        ws.Cell(row, 1).Value = "Station Total";
                        ws.Cell(row, 2).Value = brunbill.ToString();
                        ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                        row++;

                        ws.Cell(row, 1).Value = "Grand Total";
                        ws.Cell(row, 2).Value = gunbill.ToString();
                        ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    }
                    else
                    {
                        ws.Cell(row, 1).Value = "Party Total";
                        ws.Cell(row, 12).Value = unbillamt.ToString();
                        ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                        row++;

                        ws.Cell(row, 1).Value = "Station Total";
                        ws.Cell(row, 12).Value = brunbill.ToString();
                        ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                        row++;

                        ws.Cell(row, 1).Value = "Grand Total";
                        ws.Cell(row, 12).Value = gunbill.ToString();
                        ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    }

                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<ResponseModel> GetPendingDelvAckRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@Party",          request.FilterStr1),
                            new SqlParameter("@Origin",         request.FilterStr2),
                            new SqlParameter("@Destination",    request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPendingDelvPodRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter =" From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +" To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy")+ " ("+ "Ageing  " + request.SortOrder +") ";

                        if (dataSet.Tables[0].Rows.Count>0)
                        {
                            response = await GetPendingDelvAckExcelReport(dataSet.Tables[0], "Pending Delivery Ack Report", filter);
                        }
                        else
                        {
                            response.Status = false;
                            response.Message = "No Data Found";
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetPendingDelvAckExcelReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = 18;

                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                   
                    ws.Cell(5, 1).Value = "Booked At";
                    ws.Cell(5, 2).Value = "Booking Date";
                    ws.Cell(5, 3).Value = "LR No";
                    ws.Cell(5, 4).Value = "Booking Status";
                    ws.Cell(5, 5).Value = "From Location";
                    ws.Cell(5, 6).Value = "To Location";
                    ws.Cell(5, 7).Value = "Truck No";
                    ws.Cell(5, 8).Value = "Veh Type";
                    ws.Cell(5, 9).Value = "No of Packages";
                    ws.Cell(5, 10).Value = "Actual Wt";
                    ws.Cell(5, 11).Value = "Charge Wt";
                    ws.Cell(5, 12).Value = "Unbilled Amt";
                    ws.Cell(5, 13).Value = "Broker Name";
                    ws.Cell(5, 14).Value = "Broker Mobile";
                    ws.Cell(5, 15).Value = "Vehicle Engaged By";
                    ws.Cell(5, 16).Value = "Pod Recd";
                    ws.Cell(5, 17).Value = "Challan No";
                    ws.Cell(5, 18).Value = "Driver Mobile";


                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    var branch = ""; var party = "";
                    decimal unbillamt = 0, brunbill = 0, gunbill = 0;


                    branch = dt.Rows[0]["Billing Station"].ToString();

                    ws.Range(row, 1, row, colcnt).Merge();
                    ws.Range(row, 1, row, colcnt).Value = branch;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                    ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                    row++;

                    
                    party = dt.Rows[0]["Billing Party"].ToString();

                    ws.Range(row, 1, row, colcnt).Merge();
                    ws.Range(row, 1, row, colcnt).Value = party;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 12;
                    ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                    row++;

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                       
                        if (party != dt.Rows[j]["Billing Party"].ToString())
                        {
                            ws.Cell(row, 1).Value = "Party Total";
                            ws.Cell(row, 12).Value = unbillamt.ToString();
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                            row++;

                            if (branch != dt.Rows[j]["Billing Station"].ToString())
                            {
                                ws.Cell(row, 1).Value = "Station Total";
                                ws.Cell(row, 12).Value = brunbill.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                                row++;

                                brunbill = 0;
                                branch = dt.Rows[j]["Billing Station"].ToString();

                                ws.Range(row, 1, row, colcnt).Merge();
                                ws.Range(row, 1, row, colcnt).Value = branch;
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                                ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                                row++;
                            }

                            unbillamt = 0;
                            party = dt.Rows[j]["Billing Party"].ToString();

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = party;
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 12;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                            row++;
                        }

                        for (int i = 2; i < colcnt+2; i++)
                        {
                            ws.Cell(row, i-1).Value = dt.Rows[j][i].ToString();
                        }

                        row++;
                        unbillamt   = unbillamt + Convert.ToDecimal(dt.Rows[j]["Unbilled Amt"]);
                        brunbill    = brunbill  + Convert.ToDecimal(dt.Rows[j]["Unbilled Amt"]);
                        gunbill     = gunbill   + Convert.ToDecimal(dt.Rows[j]["Unbilled Amt"]);

                    }
                    
                    ws.Cell(row, 1).Value = "Party Total";
                    ws.Cell(row, 12).Value = unbillamt.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    row++;

                    ws.Cell(row, 1).Value = "Station Total";
                    ws.Cell(row, 12).Value = brunbill.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;

                    row++;

                    ws.Cell(row, 1).Value = "Grand Total";
                    ws.Cell(row, 12).Value = gunbill.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;


                    for (int k = 1; k <= colcnt; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }


        public async Task<DriverLicRptListModel> GetDriverLicRptList(ReportRequestModel request)
        {
            DriverLicRptListModel driverLicRpt = new();
            List<DriverLicRptModel> driverLicRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@Active",     request.FilterStr),
                            new SqlParameter("@ExpiryLic",  request.FilterStr1),
                            new SqlParameter("@DriverName", request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverLicRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverLicRptList.Add(new DriverLicRptModel
                            {
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                FatherName = Convert.ToString(dataSet.Tables[0].Rows[i]["FatherName"]),
                                DateOfBirth = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfBirth"]),
                                IntroBy = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroBy"]),
                                IntroByMobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["IntroByMobileNo"]),
                                DateOfAppoint = Convert.ToString(dataSet.Tables[0].Rows[i]["DateOfAppoint"]),
                                LicenseNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseNo"]),
                                LicenseIssuAuth= Convert.ToString(dataSet.Tables[0].Rows[i]["LicenseIssuAuth"]),
                                LicValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["LicValidUpto"]),
                                BloodGroup = Convert.ToString(dataSet.Tables[0].Rows[i]["BloodGroup"]),
                                DriverMobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile1"]),
                                DriverMobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile2"]),
                                TempAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["TempAddPhone"]),
                                PermanentAddr = Convert.ToString(dataSet.Tables[0].Rows[i]["PermanentAddr"]),
                                PermAddPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["PermAddPhone"]),
                                DriverAadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAadharNo"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                GroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupName"]),
                                DrBankAccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrBankAccountName"]),
                                BankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankIfsCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIfsCode"]),

                            });
                        }

                        driverLicRpt.DriverLicRptList = driverLicRptList;

                        driverLicRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return driverLicRpt;
        }
        public async Task<ResponseModel> ExcelDriverLicRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Active",     request.FilterStr),
                            new SqlParameter("@ExpiryLic",  request.FilterStr1),
                            new SqlParameter("@DriverName", request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverLicRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";

                        if (request.FilterStr1 == "V")
                        {
                            filter = filter  + " Drivers Having Valid License ";
                        }
                        else if (request.FilterStr1 == "E")
                        {
                            filter = filter  + " Drivers Having Expired License ";
                        }
                        else if (request.FilterStr1 == "M")
                        {
                            filter = filter  + " Drivers with License Expire in 1 Month  ";
                        }
                        else
                        {
                            filter = filter  + " All Drivers";
                        }

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Driver License Report", filter);

                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<DprRptListModel> GetDPRRptList(ReportRequestModel request)
        {
            DprRptListModel dprRpt = new();
            List<DprRptModel> dprList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@PayParty",   request.FilterStr),
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",request.FilterStr2),
                            new SqlParameter("@VehicleNo",  request.FilterStr3),
                            new SqlParameter("@Branch",     request.SortOrder),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDPRRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprList.Add(new DprRptModel
                            {
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                OrderPerson = Convert.ToString(dataSet.Tables[0].Rows[i]["OrderPerson"]),
                                DprDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DprDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                Fplace = Convert.ToString(dataSet.Tables[0].Rows[i]["Fplace"]),
                                Tplace = Convert.ToString(dataSet.Tables[0].Rows[i]["Tplace"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                VehOwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["VehOwnerName"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverMob1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMob1"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                TotFreightAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotFreightAmt"]),
                                UpdBookingAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["UpdBookingAmt"]),
                                Tonnage = Convert.ToString(dataSet.Tables[0].Rows[i]["Tonnage"]),
                                RatePerTon = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerTon"]),
                                LorryHire = Convert.ToString(dataSet.Tables[0].Rows[i]["LorryHire"]),
                                AdvanceAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvanceAmt"]),
                                BalanceAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalanceAmt"]),
                                BrokerName = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                TrafficPerson = Convert.ToString(dataSet.Tables[0].Rows[i]["TrafficPerson"]),
                                VehiclePlacedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["VehiclePlacedBy"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        dprRpt.DprRptList = dprList;

                        dprRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dprRpt;
        }
        public async Task<ResponseModel> GetDPRRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@PayParty",   request.FilterStr),
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",request.FilterStr2),
                            new SqlParameter("@VehicleNo",  request.FilterStr3),
                            new SqlParameter("@Branch",     request.SortOrder),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDPRRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "DPR Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> GetLHPaymentSummRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@YearId",   request.FilterStr),
                            new SqlParameter("@Branch",   request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLHPaymentSummRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = request.FilterStr2==""?"":"For the Branch: "+ request.FilterStr2;

                        response = await GetLhSummReport(dataSet.Tables[0], "LH Payment Summary Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetLhSummReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = dt.Columns.Count - 1;


                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 1; i < dt.Columns.Count; i++)
                    {
                        ws.Cell(5, i).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    var pmtType = "";


                    for (j = 0; j < dt.Rows.Count; j++)
                    {                       
                        if (pmtType != dt.Rows[j]["PmtType"].ToString())
                        {
                            pmtType = dt.Rows[j]["PmtType"].ToString();

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = pmtType;
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                            row++;
                        }
                        for (int i = 1; i < dt.Columns.Count; i++)
                        {
                            ws.Cell(row, i).Value = dt.Rows[j][i].ToString();
                        }

                        row++;

                    }

                    for (int k = 1; k < dt.Columns.Count; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row-1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row-1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<DetentionRptListModel> GetDetentionRptList(ReportRequestModel request)
        {
            DetentionRptListModel dprRpt = new();
            List<DetentionRptModel> dprList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDetentionRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprList.Add(new DetentionRptModel
                            {
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                Party = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                OriginDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["OriginDetn"]),
                                DestDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["DestDetn"]),
                                Paid = Convert.ToString(dataSet.Tables[0].Rows[i]["Paid"]),
 
                            });
                        }

                        dprRpt.DetentionList = dprList;

                        dprRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dprRpt;
        }
        public async Task<ResponseModel> GetDetentionRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDetentionRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";

                        response = await GetDetnReport(dataSet.Tables[0], "Detention Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetDetnReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = dt.Columns.Count - 2;


                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 2; i < dt.Columns.Count; i++)
                    {
                        ws.Cell(5, i-1).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    Decimal gLDetn = 0, gUnDetn = 0, gPaid = 0;
                    Decimal brLDetn = 0, brUnDetn = 0, brPaid = 0;
                    Decimal partyLDetn = 0, partyUnDetn = 0, partyPaid = 0;

                    var party = "";  var brnm = "";

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        if (party != dt.Rows[j][1].ToString())
                        {
                            if (party!="")
                            {
                                ws.Range(row, 1, row, 6).Merge();
                                ws.Range(row, 1, row, 6).Value = "Party Total";
                                ws.Cell(row, 7).Value = partyLDetn.ToString();
                                ws.Cell(row, 8).Value = partyUnDetn.ToString();
                                ws.Cell(row, 9).Value = partyPaid.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Blue;
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                row++;
                            }
                        }
                        if (brnm != dt.Rows[j][0].ToString())
                        {
                            if (brnm!="")
                            {
                                ws.Range(row, 1, row, 6).Merge();
                                ws.Range(row, 1, row, 6).Value = "Branch Total";
                                ws.Cell(row, 7).Value = brLDetn.ToString();
                                ws.Cell(row, 8).Value = brUnDetn.ToString();
                                ws.Cell(row, 9).Value = brPaid.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Maroon;
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                row++;
                                ws.Range(row, 1, row, colcnt).Merge();
                                row++;
                            }
                            brLDetn = 0; brUnDetn = 0; brPaid = 0;
                            brnm = dt.Rows[j][0].ToString();

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = brnm;
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                            ws.Range(row, 1, row, colcnt).Style.Font.Underline =  XLFontUnderlineValues.Single;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                            row++;
                        }
                        if (party != dt.Rows[j][1].ToString())
                        {
                            partyLDetn = 0; partyUnDetn = 0; partyPaid = 0;
                            party = dt.Rows[j][1].ToString();

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = party;
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 12;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;
                            
                            row++;
                        }
                        for (int i = 2; i < dt.Columns.Count; i++)
                        {
                            ws.Cell(row, i-1).Value = dt.Rows[j][i].ToString();
                        }
                        partyLDetn = partyLDetn + Convert.ToDecimal(dt.Rows[j][8]);
                        partyUnDetn = partyUnDetn + Convert.ToDecimal(dt.Rows[j][9]);
                        partyPaid = partyPaid + Convert.ToDecimal(dt.Rows[j][10]);

                        brLDetn = brLDetn + Convert.ToDecimal(dt.Rows[j][8]);
                        brUnDetn = brUnDetn + Convert.ToDecimal(dt.Rows[j][9]);
                        brPaid = brPaid + Convert.ToDecimal(dt.Rows[j][10]);

                        gLDetn = gLDetn + Convert.ToDecimal(dt.Rows[j][8]);
                        gUnDetn = gUnDetn + Convert.ToDecimal(dt.Rows[j][9]);
                        gPaid = gPaid + Convert.ToDecimal(dt.Rows[j][10]);

                        row++;

                    }

                    ws.Range(row, 1, row, 6).Merge();
                    ws.Range(row, 1, row, 6).Value = "Party Total";
                    ws.Cell(row, 7).Value = partyLDetn.ToString();
                    ws.Cell(row, 8).Value = partyUnDetn.ToString();
                    ws.Cell(row, 9).Value = partyPaid.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    row++;

                    ws.Range(row, 1, row, 6).Merge();
                    ws.Range(row, 1, row, 6).Value = "Branch Total";
                    ws.Cell(row, 7).Value = brLDetn.ToString();
                    ws.Cell(row, 8).Value = brUnDetn.ToString();
                    ws.Cell(row, 9).Value = brPaid.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    row++;

                    ws.Range(row, 1, row, 6).Merge();
                    ws.Range(row, 1, row, 6).Value = "Grand Total";
                    ws.Cell(row, 7).Value = gLDetn.ToString();
                    ws.Cell(row, 8).Value = gUnDetn.ToString();
                    ws.Cell(row, 9).Value = gPaid.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.DarkBlue;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    row++;


                    for (int k = 1; k < colcnt + 1; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row-1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row-1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<MrListModel> GetDeductionRptList(ReportRequestModel request)
        {
            MrListModel dprRpt = new();
            List<MrList> dprList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeductionRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprList.Add(new MrList
                            {
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                MrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),
                                BillLrOthType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                TotalDed = Convert.ToString(dataSet.Tables[0].Rows[i]["Deduction"]),
                                MrRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        dprRpt.MrList = dprList;

                        dprRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dprRpt;
        }
        public async Task<ResponseModel> GetDeductionRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeductionRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "";

                        response = await GetDednReport(dataSet.Tables[0], "DEDUCTION STATEMENT", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetDednReport(DataTable dt, string rptheader, string filter)
        {
            ResponseModel responseModel = new();
            try
            {
                using (XLWorkbook wb = new XLWorkbook())
                {
                    responseModel = await sharedRepository.GetCompanyDetail();
                    int colcnt = dt.Columns.Count - 1;


                    var ws = wb.Worksheets.Add("worksheet");
                    ws.Range(1, 1, 1, colcnt).Merge();
                    ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                    ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                    ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                    ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(2, 1, 2, colcnt).Merge();
                    ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                    ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                    ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                    ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                    ws.Range(3, 1, 3, colcnt).Merge();
                    ws.Range(3, 1, 3, colcnt).Value = rptheader;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                    ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                    ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    ws.Range(4, 1, 4, colcnt).Merge();
                    ws.Range(4, 1, 4, colcnt).Value = filter;
                    ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                    ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                    ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                    for (int i = 1; i < dt.Columns.Count; i++)
                    {
                        ws.Cell(5, i).Value = dt.Columns[i].ColumnName;
                    }

                    ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                    ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                    int j = 0, row = 6;
                    Decimal partyDed = 0,grandDed = 0;

                    var party = "";

                    for (j = 0; j < dt.Rows.Count; j++)
                    {
                        if (party != dt.Rows[j][0].ToString())
                        {
                            if (party!="")
                            {
                                ws.Range(row, 1, row, 3).Merge();
                                ws.Range(row, 1, row, 3).Value = "Party Total";
                                ws.Cell(row, 4).Value = partyDed.ToString();
                                ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Blue;
                                ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                                row++;
                                ws.Range(row, 1, row, colcnt).Merge();
                                row++;
                            }
                            party = dt.Rows[j][0].ToString();
                            partyDed = 0;

                            ws.Range(row, 1, row, colcnt).Merge();
                            ws.Range(row, 1, row, colcnt).Value = party;
                            ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                            ws.Range(row, 1, row, colcnt).Style.Font.FontSize = 14;
                            ws.Range(row, 1, row, colcnt).Style.Font.Underline =  XLFontUnderlineValues.Single;
                            ws.Range(row, 1, row, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Left;

                            row++;
                        }
                       
                        for (int i = 1; i < dt.Columns.Count; i++)
                        {
                            ws.Cell(row, i).Value = dt.Rows[j][i].ToString();
                        }
                        partyDed = partyDed + Convert.ToDecimal(dt.Rows[j][4]);
                        grandDed = grandDed + Convert.ToDecimal(dt.Rows[j][4]);

                        row++;

                    }

                    ws.Range(row, 1, row, 3).Merge();
                    ws.Range(row, 1, row, 3).Value = "Party Total";
                    ws.Cell(row, 4).Value = partyDed.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    row++;

                    ws.Range(row, 1, row, 3).Merge();
                    ws.Range(row, 1, row, 3).Value = "Grand Total";
                    ws.Cell(row, 4).Value = grandDed.ToString();
                    ws.Range(row, 1, row, colcnt).Style.Font.FontColor = XLColor.Blue;
                    ws.Range(row, 1, row, colcnt).Style.Font.Bold = true;
                    row++;

                    for (int k = 1; k < colcnt + 1; k++)
                    {
                        ws.Column(k).AdjustToContents();
                    }

                    ws.Range(5, 1, row-1, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                    ws.Range(5, 1, row-1, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                    var foldername = System.IO.Path.Combine("reports", "Download");
                    var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                    var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                    var fullPath = System.IO.Path.Combine(pathToSave, filename);
                    bool exists = System.IO.Directory.Exists(pathToSave);

                    if (!exists)
                    {
                        Directory.CreateDirectory(pathToSave);
                    }

                    if (File.Exists(fullPath))
                        File.Delete(fullPath);

                    wb.SaveAs(fullPath);

                    responseModel.Status = true;
                    responseModel.Message = filename;

                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<DocumentAllotmentListModel> GetMissingDocRptList(ReportRequestModel request)
        {
            DocumentAllotmentListModel dprRpt = new();
            List<DocumentAllotmentModel> dprList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@DocType",    request.FilterStr1),
                            new SqlParameter("@RangeFrom",  request.FromDate),
                            new SqlParameter("@RangeTo",    request.ToDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMissingDocRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprList.Add(new DocumentAllotmentModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                DocNumCode = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        dprRpt.DocumentAllotmentLists = dprList;

                        dprRpt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dprRpt;
        }
        public async Task<ResponseModel> GetMissingDocRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@DocType",    request.FilterStr1),
                            new SqlParameter("@RangeFrom",  request.FromDate),
                            new SqlParameter("@RangeTo",    request.ToDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMissingDocRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Document Type : " + request.FilterStr2;

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Missing Document Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetBillGstRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@BillSeries", request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillGstRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Bill GST Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetGstSalesRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@BillSeries", request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstSalesRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Bill GST Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }


        public async Task<ResponseModel> GetDeliveryDisputeRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@Broker",     request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeliveryDisputeRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Delivery Dispute Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<ResponseModel> GetPartyMISRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@RptType",    request.FilterStr2),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyMISRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Party MIS Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<List<DropDownListModel>> GetPartyMisList()
        {
            List<DropDownListModel> partyList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyMisList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            partyList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return partyList;
        }
        public async Task<ResponseModel> GetBillInterestLossRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            ResponseModel responseModel = new();            
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@Party",      request.FilterStr1),
                            new SqlParameter("@IntPct",     request.FilterStr2),
                            new SqlParameter("@DaysAfter",  request.FilterStr3),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillInterestLossRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            DataTable dt = dataSet.Tables[0];
                            DataTable dt1 = dataSet.Tables[1];
                            responseModel = await sharedRepository.GetCompanyDetail();
                            int colcnt = dt.Columns.Count;

                            var ws = wb.Worksheets.Add("worksheet");
                            ws.Range(1, 1, 1, colcnt).Merge();
                            ws.Range(1, 1, 1, colcnt).Value = responseModel.Message;
                            ws.Range(1, 1, 1, colcnt).Style.Font.Bold = true;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontSize = 18;
                            ws.Range(1, 1, 1, colcnt).Style.Font.FontColor = XLColor.Maroon;
                            ws.Range(1, 1, 1, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(2, 1, 2, colcnt).Merge();
                            ws.Range(2, 1, 2, colcnt).Value = "Print Date : " + DateTime.Now.ToString("dd-MMM-yyyy hh:mm:ss tt");
                            ws.Range(2, 1, 2, colcnt).Style.Font.Bold = true;
                            ws.Range(2, 1, 2, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;
                            ws.Range(2, 1, 2, colcnt).Style.Font.FontSize = 11;

                            ws.Range(3, 1, 3, colcnt).Merge();
                            ws.Range(3, 1, 3, colcnt).Value = "BILL INTEREST LOSS REPORT";
                            ws.Range(3, 1, 3, colcnt).Style.Font.Bold = true;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontSize = 14;
                            ws.Range(3, 1, 3, colcnt).Style.Font.FontColor = XLColor.Blue;
                            ws.Range(3, 1, 3, colcnt).Style.Font.Underline = XLFontUnderlineValues.Single;
                            ws.Range(3, 1, 3, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            ws.Range(4, 1, 4, colcnt).Merge();
                            ws.Range(4, 1, 4, colcnt).Value = filter;
                            ws.Range(4, 1, 4, colcnt).Style.Font.Bold = true;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontSize = 12;
                            ws.Range(4, 1, 4, colcnt).Style.Font.FontColor = XLColor.Green;
                            ws.Range(4, 1, 4, colcnt).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                            for (int i = 0; i < colcnt; i++)
                            {
                                ws.Cell(5, i + 1).Value = dt.Columns[i].ColumnName;
                            }

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int k = 6; Int64 intAmt = 0;

                            for (int j = 0; j < dt.Rows.Count; j++)
                            {
                                for (int i = 0; i < colcnt; i++)
                                {
                                    if(dt.Columns[i].ColumnName!="MR Date")
                                    {
                                        ws.Cell(k, i + 1).Value = Convert.ToString(dt.Rows[j][i]);
                                    }
                                    else if (Convert.ToDateTime(dt.Rows[j][i]).ToString("dd-MM-yyyy") != "01-01-1900")
                                    {
                                        ws.Cell(k, i + 1).Value = Convert.ToString(dt.Rows[j][i]);
                                    }
                                    intAmt = intAmt + Convert.ToInt64(dt.Rows[j][9]);
                                }
                                k++;
                            }
                            ws.Cell(k, 10).Value = intAmt;
                            ws.Range(k, 1, k, colcnt).Style.Font.Bold = true;
                            k++;

                            ws.Range(5, 1, k, colcnt).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, k, colcnt).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

                            k++;


                            var colct = dt1.Columns.Count;

                            ws.Range(k, 1, k, colct).Merge();
                            ws.Range(k, 1, k, colct).Value = "Unadjusted on a/c MRs";
                            ws.Range(k, 1, k, colct).Style.Font.Bold = true;
                            ws.Range(k, 1, k, colct).Style.Font.FontSize = 12;
                            ws.Range(k, 1, k, colct).Style.Font.FontColor = XLColor.Red;
                            k++;
                            
                            for (int i = 0; i < colct; i++)
                            {
                                ws.Cell(k, i + 1).Value = dt1.Columns[i].ColumnName;
                            }

                            ws.Range(k, 1, k, colct).Style.Font.Bold = true;
                            ws.Range(k, 1, k, colct).Style.Font.FontSize = 12;
                            ws.Range(k, 1, k, colct).Style.Font.FontColor = XLColor.DarkBlue;

                            k++;

                            for (int j = 0; j < dt1.Rows.Count; j++)
                            {
                                for (int i = 0; i < colct; i++)
                                {
                                    ws.Cell(k, i + 1).Value = Convert.ToString(dt1.Rows[j][i]);
                                }
                               
                                k++;
                            }

                            //ws.Range(6, 4, k, 5).Style.NumberFormat.Format = "0.00";
                            //ws.Range(6, 9, k, 9).Style.NumberFormat.Format = "0.00";

                            ws.Range(5, 1, k, colct).Style.Border.InsideBorder = XLBorderStyleValues.Thin;
                            ws.Range(5, 1, k, colct).Style.Border.OutsideBorder = XLBorderStyleValues.Thin;


                            for (int l = 1; l <= colcnt; l++)
                            {
                                ws.Column(l).AdjustToContents();
                            }

                            var foldername = System.IO.Path.Combine("reports", "Download");
                            var pathToSave = System.IO.Path.Combine(dbconnection.Value.UploadFolderPath, foldername);
                            var filename = "ExcelReport_" + System.DateTime.Now.ToString("ddMMyyyyHHmmssfff") + ".xlsx";

                            var fullPath = System.IO.Path.Combine(pathToSave, filename);
                            bool exists = System.IO.Directory.Exists(pathToSave);

                            if (!exists)
                            {
                                Directory.CreateDirectory(pathToSave);
                            }

                            if (File.Exists(fullPath))
                                File.Delete(fullPath);

                            wb.SaveAs(fullPath);

                            response.Status = true;
                            response.Message = filename;
                        }
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<ResponseModel> GetCountOfDocEnteredRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocType",    request.FilterStr),
                            new SqlParameter("@EntryType",  request.FilterStr1),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocEntered", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = request.FilterStr2 + " " + request.FilterStr3;
                        filter = filter + " From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Count of Doc Entry", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}