
using Microsoft.Extensions.Options;
using FreightMasters.Models;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;

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

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Booking Register", filter);
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
