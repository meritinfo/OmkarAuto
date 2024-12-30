
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
    public class BookingRegisterRptRepository : IBookingRegisterRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public BookingRegisterRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBookingRegisterRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            bookingRegisterRptList.Add(new BookingRegisterRptModel
                            {
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                BookingStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocation"]),
                                CnorName = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorName"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                CneeName = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeName"]),
                                ProductName = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductName"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                BusinessIncharge = Convert.ToString(dataSet.Tables[0].Rows[i]["BusinessIncharge"]),
                                BillingParty = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingParty"]),
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
                            new SqlParameter("@Party",     request.FilterStr1),
                            new SqlParameter("@Origin",     request.FilterStr2),
                            new SqlParameter("@Destination",     request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBookingRegisterRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter  + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dataSet.Tables[0].Rows[i]["Invoice No"] =  "'" + dataSet.Tables[0].Rows[i]["Invoice No"].ToString();
                            dataSet.Tables[0].Rows[i]["Eway Bill No"] = "'" + dataSet.Tables[0].Rows[i]["Eway Bill No"].ToString();
                        }

                        response = await GetExcelReport(dataSet.Tables[0], "Booking Register", filter);
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


    }
}
