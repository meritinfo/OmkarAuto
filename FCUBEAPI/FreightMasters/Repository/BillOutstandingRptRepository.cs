using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using ClosedXML.Excel;

namespace FreightMasters.Repository
{
    public class BillOutstandingRptRepository : IBillOutstandingRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public BillOutstandingRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
       
        public async Task<ResponseModel> GetAgeingSummRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",        "AS"),
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
        public async Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",        "ASB"),
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

                            for (int i = 0; i < colcnt; i++)
                            {
                                ws.Cell(5, i + 1).Value = dataSet.Tables[0].Columns[i].ColumnName;
                            }

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
        public async Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",        "ASP"),
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

                            for (int i = 0; i < colcnt; i++)
                            {
                                ws.Cell(5, i + 1).Value = dataSet.Tables[0].Columns[i].ColumnName;
                            }

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
        public async Task<ResponseModel> GetAgeingDetailRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",        "AD"),
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
                            ws.Cell(5, 5).Value  = dataSet.Tables[0].Columns[6].ColumnName;
                            ws.Cell(5, 6).Value  = dataSet.Tables[0].Columns[7].ColumnName;
                            ws.Cell(5, 7).Value  = dataSet.Tables[0].Columns[8].ColumnName;
                            ws.Cell(5, 8).Value  = dataSet.Tables[0].Columns[9].ColumnName;
                            ws.Cell(5, 9).Value  = dataSet.Tables[0].Columns[10].ColumnName;
                            ws.Cell(5, 10).Value = dataSet.Tables[0].Columns[11].ColumnName;
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
        public async Task<ResponseModel> GetOutstandingSummRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",        "OS"),
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
        public async Task<ResponseModel> GetOutstandingDetailRptExcel(ReportRequestModel request)
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
                            new SqlParameter("@RptType",        "OD"),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillOutstandingRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

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

                            ws.Range(5, 1, 5, colcnt).Style.Font.Bold = true;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontSize = 12;
                            ws.Range(5, 1, 5, colcnt).Style.Font.FontColor = XLColor.DarkBlue;

                            int r = 6;
                            var BillStnName = "";
                            var Party = "";
                            decimal tot = 0, brtot = 0, tottot = 0;
                            decimal onac = 0, bronac = 0, totonac = 0;


                            for (int j = 0; j < dataSet.Tables[0].Rows.Count; j++)
                            {

                                if (Party != dataSet.Tables[0].Rows[j][1].ToString())
                                {
                                    if (j>0)
                                    {
                                        ws.Range(r, 1, r, 4).Merge();
                                        ws.Range(r, 1, r, 4).Value = "Party Total";
                                        ws.Cell(r, 5).Value  = tot;
                                        ws.Cell(r, 6).Value  = onac;
                                        ws.Cell(r, 7).Value  = tot - onac;

                                        ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                        ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                        r++;

                                        
                                        tot = 0;
                                        onac = 0;
                                    }

                                    if (BillStnName != dataSet.Tables[0].Rows[j][0].ToString())
                                    {
                                        if (j>0)
                                        {
                                            ws.Range(r, 1, r, 4).Merge();
                                            ws.Range(r, 1, r, 4).Value = "Branch Total";
                                            ws.Cell(r, 5).Value  = brtot;
                                            ws.Cell(r, 6).Value  = bronac;
                                            ws.Cell(r, 7).Value  = brtot - bronac; 

                                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                                            r++;

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

                                tot     = tot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                onac    = onac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());

                                brtot       = brtot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                bronac      = bronac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());

                                tottot      = tottot    + Convert.ToDecimal(dataSet.Tables[0].Rows[j][6].ToString());
                                totonac     = totonac   + Convert.ToDecimal(dataSet.Tables[0].Rows[j][7].ToString());

                                r++;
                            }
                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Party Total";
                            ws.Cell(r, 5).Value  = tot;
                            ws.Cell(r, 6).Value  = onac;
                            ws.Cell(r, 7).Value  = tot - onac;

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Branch Total";
                            ws.Cell(r, 5).Value  = brtot;
                            ws.Cell(r, 6).Value  = bronac;
                            ws.Cell(r, 7).Value  = brtot - bronac; 

                            ws.Range(r, 1, r, colcnt).Style.Font.Bold = true;
                            ws.Range(r, 1, r, 4).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

                            r++;

                            ws.Range(r, 1, r, 4).Merge();
                            ws.Range(r, 1, r, 4).Value = "Grand Total";
                            ws.Cell(r, 5).Value  = tottot;
                            ws.Cell(r, 6).Value  = totonac;
                            ws.Cell(r, 7).Value  = tottot - totonac;

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

                            ws.Range(6, 5, r, 7).Style.NumberFormat.Format = "0.00";

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
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@AsOnDate",       request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOutstandingSummRptList", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        responseModel = await sharedRepository.GetExcelReport(dataSet.Tables[0], "OUTSTANDING ANALYSIS REPORT", filter);
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
                                Year                = Convert.ToString(dataSet.Tables[0].Rows[i]["Year"]),
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

    }
}
