using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetTrans.Repository
{
    public class TripPaymentsRptRepository: ITripPaymentsRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public TripPaymentsRptRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<TripPaymentsRptListModel> GetTripPaymentsRptList(ReportRequestModel request)
        {
            TripPaymentsRptListModel tripPaymentsRpt = new();
            List<TripPaymentsRptModel> tripPaymentsRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",         request.PageNumber),
                            new SqlParameter("@PageSize",           request.PageSize),
                            new SqlParameter("@SortColumn",         request.SortColumn),
                            new SqlParameter("@SortOrder",          request.SortOrder),
                            new SqlParameter("@Search",             request.Search),
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@Branch",             request.FilterStr),
                            new SqlParameter("@VehicleMasterID",    request.FilterStr1),
                            new SqlParameter("@TransType",          request.FilterStr2),
                            new SqlParameter("@PmtType",            request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripPaymentsRptList.Add(new TripPaymentsRptModel
                            {
                                PaymentBr = Convert.ToString(dataSet.Tables[0].Rows[i]["PaymentBr"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TransType = Convert.ToString(dataSet.Tables[0].Rows[i]["TransType"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAffect = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAffect"]),
                                TripAdj = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAdj"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                FillingStnName = Convert.ToString(dataSet.Tables[0].Rows[i]["FillingStnName"]),

                            });
                        }

                        tripPaymentsRpt.TripPaymentsRptlist = tripPaymentsRptList;

                        tripPaymentsRpt.PageMetaData = new PaginationMetaData
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
            return tripPaymentsRpt;
        }
        public async Task<ResponseModel> ExcelTripPaymentsRptList(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@Branch",          request.FilterStr),
                            new SqlParameter("@VehicleMasterID",            request.FilterStr1),
                            new SqlParameter("@TransType",    request.FilterStr2),
                            new SqlParameter("@PmtType",           request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Trip Payments From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Trip Payments Report", filter);
                    
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public async Task<List<DropDownListModel>> GetTripPaymentsCreditList()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsCreditList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }



    }
}
