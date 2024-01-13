using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetTrans.Repository
{
    public class TripPaymentsRepository : ITripPaymentsRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public TripPaymentsRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save Branch master details
        /// </summary>
        /// <param name=" DocRenewalEntry"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> TripPaymentsSave(TripPaymentsModel tripPaymentsModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PmtId", tripPaymentsModel.PmtId),
                            new SqlParameter("@PmtBranch", tripPaymentsModel.PmtBranch),
                            new SqlParameter("@PmtDate", tripPaymentsModel.PmtDate),
                            new SqlParameter("@VehicleMasterID", tripPaymentsModel.VehicleMasterID),
                            new SqlParameter("@TripNo", tripPaymentsModel.TripNo),
                            new SqlParameter("@TripMasterId", tripPaymentsModel.TripMasterId),
                            new SqlParameter("@TransType", tripPaymentsModel.TransType),
                            new SqlParameter("@AmountPaid", tripPaymentsModel.AmountPaid),
                            new SqlParameter("@Remarks", tripPaymentsModel.Remarks),
                            new SqlParameter("@PmtType", tripPaymentsModel.PmtType),
                            new SqlParameter("@NeftPmt", tripPaymentsModel.NeftPmt),
                            new SqlParameter("@CreditAc", tripPaymentsModel.CreditAc),
                            new SqlParameter("@ChequeNo", tripPaymentsModel.ChequeNo),
                            new SqlParameter("@ChequeDate", tripPaymentsModel.ChequeDate),
                            new SqlParameter("@Findocid", tripPaymentsModel.Findocid),
                            new SqlParameter("@AdjInTrip", tripPaymentsModel.AdjInTrip),
                            new SqlParameter("@QtyLtrs", tripPaymentsModel.QtyLtrs),
                            new SqlParameter("@RatePerLtr", tripPaymentsModel.RatePerLtr),
                            new SqlParameter("@YearId", tripPaymentsModel.YearId),
                            new SqlParameter("@LoggedInUser", tripPaymentsModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripPayments_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return responseModel;
        }
        public async Task<ResponseModel> TripPaymentsSaveNew(TripPaymentsModel tripPaymentsModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PmtId", tripPaymentsModel.PmtId),
                            new SqlParameter("@PmtBranch", tripPaymentsModel.PmtBranch),
                            new SqlParameter("@PmtDate", tripPaymentsModel.PmtDate),
                            new SqlParameter("@VehicleMasterID", tripPaymentsModel.VehicleMasterID),
                            new SqlParameter("@TripNo", tripPaymentsModel.TripNo),
                            new SqlParameter("@TripMasterId", tripPaymentsModel.TripMasterId),
                            new SqlParameter("@TransType", tripPaymentsModel.TransType),
                            new SqlParameter("@AmountPaid", tripPaymentsModel.AmountPaid),
                            new SqlParameter("@Remarks", tripPaymentsModel.Remarks),
                            new SqlParameter("@PmtType", tripPaymentsModel.PmtType),
                            new SqlParameter("@NeftPmt", tripPaymentsModel.NeftPmt),
                            new SqlParameter("@CreditAc", tripPaymentsModel.CreditAc),
                            new SqlParameter("@ChequeNo", tripPaymentsModel.ChequeNo),
                            new SqlParameter("@ChequeDate", tripPaymentsModel.ChequeDate),
                            new SqlParameter("@Findocid", tripPaymentsModel.Findocid),
                            new SqlParameter("@AdjInTrip", tripPaymentsModel.AdjInTrip),
                            new SqlParameter("@QtyLtrs", tripPaymentsModel.QtyLtrs),
                            new SqlParameter("@RatePerLtr", tripPaymentsModel.RatePerLtr),
                            new SqlParameter("@YearId", tripPaymentsModel.YearId),
                            new SqlParameter("@LoggedInUser", tripPaymentsModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripPayments_InsertNew", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return responseModel;
        }
        public async Task<ResponseModel> TripPaymentsEdit(TripPaymentsModel tripPaymentsModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PmtId", tripPaymentsModel.PmtId),
                            new SqlParameter("@PmtBranch", tripPaymentsModel.PmtBranch),
                            new SqlParameter("@PmtDate", tripPaymentsModel.PmtDate),
                            new SqlParameter("@VehicleMasterID", tripPaymentsModel.VehicleMasterID),
                            new SqlParameter("@TripNo", tripPaymentsModel.TripNo),
                            new SqlParameter("@TripMasterId", tripPaymentsModel.TripMasterId),
                            new SqlParameter("@TransType", tripPaymentsModel.TransType),
                            new SqlParameter("@AmountPaid", tripPaymentsModel.AmountPaid),
                            new SqlParameter("@Remarks", tripPaymentsModel.Remarks),
                            new SqlParameter("@PmtType", tripPaymentsModel.PmtType),
                            new SqlParameter("@NeftPmt", tripPaymentsModel.NeftPmt),
                            new SqlParameter("@CreditAc", tripPaymentsModel.CreditAc),
                            new SqlParameter("@ChequeNo", tripPaymentsModel.ChequeNo),
                            new SqlParameter("@ChequeDate", tripPaymentsModel.ChequeDate),
                            new SqlParameter("@Findocid", tripPaymentsModel.Findocid),
                            new SqlParameter("@AdjInTrip", tripPaymentsModel.AdjInTrip),
                            new SqlParameter("@QtyLtrs", tripPaymentsModel.QtyLtrs),
                            new SqlParameter("@RatePerLtr", tripPaymentsModel.RatePerLtr),
                            new SqlParameter("@YearId", tripPaymentsModel.YearId),
                            new SqlParameter("@LoggedInUser", tripPaymentsModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripPayments_Modify", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return responseModel;
        }
        public async Task<TripModel> GetTripDetail(TripVehicleModel request)
        {
            TripModel tripModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                       {
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),
                          
               
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetTripDetail", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        tripModel.TripNo = Convert.ToString(userData.Tables[0].Rows[0]["TripNo"]);
                        tripModel.LoadEmptyType = Convert.ToString(userData.Tables[0].Rows[0]["LoadEmptyType"]);
                        tripModel.FP = Convert.ToString(userData.Tables[0].Rows[0]["FP"]);
                        tripModel.TP = Convert.ToString(userData.Tables[0].Rows[0]["TP"]);
                        tripModel.LtsDslToBe_1 = Convert.ToString(userData.Tables[0].Rows[0]["LtsDslToBe_1"]);
                        //tripModel.AdvPayable_1 = Convert.ToString(userData.Tables[0].Rows[0]["AdvPayable_1"]);
                        tripModel.TravelAllowance = Convert.ToString(userData.Tables[0].Rows[0]["TravelAllowance"]);
                        tripModel.TripId = Convert.ToString(userData.Tables[0].Rows[0]["TripId"]);
                        //  tripKmsModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        //   tripKmsModel.Message = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {

                        //tripKmsModel.Status = false;
                        // tripKmsModel.Message = "data not found";
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
            }
            return tripModel;
        }
        public async Task<TripDslDetail> GetTripDslDetail(TripVehicleModel request)
        {
            TripDslDetail tripDslDetail = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                       {
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),
                              new SqlParameter("@TripNo", request.TripNo),
                                new SqlParameter("@YearId", request.YearId),
                                 


                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetTripDslDetail", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        tripDslDetail.DslIssued = Convert.ToString(userData.Tables[0].Rows[0]["Message1"]);
                        tripDslDetail.AdvIssued = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                  
                    }
                    else
                    {

                        //tripKmsModel.Status = false;
                        // tripKmsModel.Message = "data not found";
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
            }
            return tripDslDetail;
        }
        public async Task<ResponseModel> TripPaymentsDelete(Request req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PmtId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_TripPaymentsDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
            }
            return responseModel;
        }
        public async Task<List<DropDownListModel>> GetCreditAcList()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CreditAcList_Select", null);

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
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return creditacList;
        }
        public async Task<List<DropDownListModel>> GetCreditAcList2(AcModel request)
        {
            List<DropDownListModel> creditacList = new();
          
                try
                {
                    if (dbconnection != null)
                    {
                        SqlParameter[] param =
                            {
                            new SqlParameter("@PType", request.PType),
                        
                        };

                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CreditAcList_Select2", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["AccountId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["AccountName"]),
                            });
                        }
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
            }
            return creditacList;
        }
        /// <summary>
        /// Service method for get branch list
        /// </summary>
        /// <returns>List<BranchListModel></returns>
        //public async Task<ResponseModel> TripPaymentsDelete(Request req)
        //{
        //    ResponseModel responseModel = new();
        //    try
        //    {
        //        if (dbconnection != null)
        //        {
        //            SqlParameter[] param =
        //                {
        //                    new SqlParameter("@MasterID", req.strRequest),
        //                };
        //            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_TripPaymentsDelete", param);

        //            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
        //            {
        //                responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
        //                responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
        //            }
        //            else
        //            {
        //                responseModel.Status = false;
        //                responseModel.Message = "Unable to process";
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log exception on database
        //        //ExceptionModel exceptionModel = new()
        //        //{
        //        //    ExceptionMessage = Convert.ToString(ex.Message),
        //        //    ExceptionType = Convert.ToString(ex.GetType().Name),
        //        //    ExceptionSource = Convert.ToString(ex.StackTrace)
        //        //};

        //        //ExceptionRepository exception = new(dbconnection);
        //        //await exception.SaveExceptionDetails(exceptionModel);
        //    }
        //    return responseModel;
        //}
        public async Task<TripPaymentsList> GetTripPaymentsList(PageRequestDtBrVh request)
        {
            TripPaymentsList tripPaymentsList = new();
            List<TripPaymentsModel> tripPayList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@Branch", request.Branch == "" ? DBNull.Value : request.Branch),
                            new SqlParameter("@Vehicle", request.Vehicle == "" ? DBNull.Value : request.Vehicle)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripPaymentsList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripPayList.Add(new TripPaymentsModel
                            {
                                PmtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtId"]),
                                PmtBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtBranch"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),

                                VehicleMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),

                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                TripMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["TripMasterId"]),
                           
                                TransType = Convert.ToString(dataSet.Tables[0].Rows[i]["TransType"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),

                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),

                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),

                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),

                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),

                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                AdjInTrip = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjInTrip"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                RatePerLtr = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerLtr"]),

                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                BName = Convert.ToString(dataSet.Tables[0].Rows[i]["BName"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),


                            });
                        }

                        tripPaymentsList.tripPaymentsList = tripPayList;

                        tripPaymentsList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
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
            }
            return tripPaymentsList;
        }
    }
}
