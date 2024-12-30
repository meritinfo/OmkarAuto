using ClosedXML.Excel;
using DocumentFormat.OpenXml.Drawing;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.Metrics;

namespace FreightMasters.Repository
{
    public class LhPayableStatusRptRepository:ILhPayableStatusRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public LhPayableStatusRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
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
                            new SqlParameter("@RptType",    request.FilterStr),
                            new SqlParameter("@Broker",     request.FilterStr1),
                            new SqlParameter("@Branch",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLhPayableStatusRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                       

                        response = await GetExcelReport(dataSet.Tables[0], "Lorry Hire Payable", filter);
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

        public async Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter)
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


    }
}
