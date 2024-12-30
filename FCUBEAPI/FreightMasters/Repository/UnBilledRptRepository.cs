
using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using ClosedXML.Excel;

namespace FreightMasters.Repository
{
    public class UnBilledRptRepository : IUnBilledRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public UnBilledRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<UnBilledRptListModel> GetUnBilledRptList(ReportRequestModel request)
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
        public async Task<ResponseModel> GetUnBilledRptExcel(ReportRequestModel request)
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUnBilledRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        if(dataSet.Tables[0].Rows.Count>0)
                        {
                            response = await GetExcelReport(dataSet.Tables[0], "UnBilled Consignment", filter, request.SortOrder);
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

        public async Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter, string rptType)
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
                        colcnt = 16;
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

                    if(rptType == "S")
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
