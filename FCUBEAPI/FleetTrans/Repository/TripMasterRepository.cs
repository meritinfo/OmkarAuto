using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;

namespace FleetTrans.Repository
{
    public class TripMasterRepository : ITripMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public TripMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripId" , tripMasterModel.TripId),
                            new SqlParameter("@TripBranch" , tripMasterModel.TripBranch),
                            new SqlParameter("@YearId" , tripMasterModel.YearId),
                            new SqlParameter("@VehicleMasterID" , tripMasterModel.VehicleMasterID),
                            new SqlParameter("@TripNo" , tripMasterModel.TripNo),
                            new SqlParameter("@DeptDate" , tripMasterModel.DeptDate),
                            new SqlParameter("@EndDate" , tripMasterModel.EndDate),
                            new SqlParameter("@StmtDate" , tripMasterModel.StmtDate),
                            new SqlParameter("@TripStatus" , tripMasterModel.TripStatus),
                            new SqlParameter("@DriverMasterID" , tripMasterModel.DriverMasterID),
                            new SqlParameter("@DefinedMileage" , tripMasterModel.DefinedMileage),
                            new SqlParameter("@ClosingKMR" , tripMasterModel.ClosingKMR),
                            new SqlParameter("@OpeningKMR" , tripMasterModel.OpeningKMR),
                            new SqlParameter("@DistanceTripKM" , tripMasterModel.DistanceTripKM),
                            new SqlParameter("@LtsDslToBe" , tripMasterModel.LtsDslToBe),
                            new SqlParameter("@OpBalDsl" , tripMasterModel.OpBalDsl),
                            new SqlParameter("@IssuedDslLtrs" , tripMasterModel.IssuedDslLtrs),
                            new SqlParameter("@IssuedDslAmt" , tripMasterModel.IssuedDslAmt),
                            new SqlParameter("@DieselPassedLtrs" , tripMasterModel.DieselPassedLtrs),
                            new SqlParameter("@DieselPassedAmt" , tripMasterModel.DieselPassedAmt),
                            new SqlParameter("@DieselVarianceAmt" , tripMasterModel.DieselVarianceAmt),
                            new SqlParameter("@ClBalDsl" , tripMasterModel.ClBalDsl),
                            new SqlParameter("@OpBalDriver" , tripMasterModel.OpBalDriver),
                            new SqlParameter("@PaidDriverAdvance" , tripMasterModel.PaidDriverAdvance),
                            new SqlParameter("@FreightCollByDriver" , tripMasterModel.FreightCollByDriver),
                            new SqlParameter("@ExpensesByDriver" , tripMasterModel.ExpensesByDriver),
                            new SqlParameter("@TotalBhattaDays" , tripMasterModel.TotalBhattaDays),
                            new SqlParameter("@BhattaRate" , tripMasterModel.BhattaRate),
                            new SqlParameter("@BhattaAmt" , tripMasterModel.BhattaAmt),
                            new SqlParameter("@OnTimeIncentiveAmt" , tripMasterModel.OnTimeIncentiveAmt),
                            new SqlParameter("@MultiDelIncentiveAmt" , tripMasterModel.MultiDelIncentiveAmt),
                            new SqlParameter("@PenaltyChargedToDr" , tripMasterModel.PenaltyChargedToDr),
                            new SqlParameter("@PenaltyRemarks" , tripMasterModel.PenaltyRemarks),
                            new SqlParameter("@TotalDriverAc" , tripMasterModel.TotalDriverAc),
                            new SqlParameter("@TripBalance" , tripMasterModel.TripBalance),
                            new SqlParameter("@RecdFromDriver" , tripMasterModel.RecdFromDriver),
                            new SqlParameter("@NetTripBalance" , tripMasterModel.NetTripBalance),
                            new SqlParameter("@FastagAmount" , tripMasterModel.FastagAmount),
                            new SqlParameter("@TripTotalFreight" , tripMasterModel.TripTotalFreight),
                            new SqlParameter("@TripTotalAdvance" , tripMasterModel.TripTotalAdvance),
                            new SqlParameter("@TripCloseDt" , tripMasterModel.TripCloseDt),
                            new SqlParameter("@TripLinkYN" , tripMasterModel.TripLinkYN),
                            new SqlParameter("@LoggedInUser" , tripMasterModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripMasterSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
      
        public async Task<TripSheetList> GetTripSheetList(ReportRequestModel request)
        {
            TripSheetList tripSheetList = new();
            List<TripMasterModel> tripList = new();
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
                            new SqlParameter("@Vehicle",    request.FilterStr1)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripList.Add(new TripMasterModel
                            {
                                TripId = Convert.ToString(dataSet.Tables[0].Rows[i]["TripId"]),
                                TripBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBranch"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                VehicleMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                DeptDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeptDate"]),
                                EndDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EndDate"]),
                                StmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["StmtDate"]),
                                TripStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TripStatus"]),
                                DriverMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterID"]),
                                DefinedMileage = Convert.ToString(dataSet.Tables[0].Rows[i]["DefinedMileage"]),
                                ClosingKMR = Convert.ToString(dataSet.Tables[0].Rows[i]["ClosingKMR"]),
                                OpeningKMR = Convert.ToString(dataSet.Tables[0].Rows[i]["OpeningKMR"]),
                                DistanceTripKM = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM"]),
                                LtsDslToBe = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsDslToBe"]),
                                OpBalDsl = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDsl"]),
                                IssuedDslLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["IssuedDslLtrs"]),
                                IssuedDslAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IssuedDslAmt"]),
                                DieselPassedLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["DieselPassedLtrs"]),
                                DieselPassedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DieselPassedAmt"]),
                                DieselVarianceAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DieselVarianceAmt"]),
                                ClBalDsl = Convert.ToString(dataSet.Tables[0].Rows[i]["ClBalDsl"]),
                                OpBalDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDriver"]),
                                PaidDriverAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["PaidDriverAdvance"]),
                                FreightCollByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightCollByDriver"]),
                                ExpensesByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpensesByDriver"]),
                                TotalBhattaDays = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBhattaDays"]),
                                BhattaRate = Convert.ToString(dataSet.Tables[0].Rows[i]["BhattaRate"]),
                                BhattaAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BhattaAmt"]),
                                OnTimeIncentiveAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnTimeIncentiveAmt"]),
                                MultiDelIncentiveAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["MultiDelIncentiveAmt"]),
                                PenaltyChargedToDr = Convert.ToString(dataSet.Tables[0].Rows[i]["PenaltyChargedToDr"]),
                                PenaltyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["PenaltyRemarks"]),
                                TotalDriverAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDriverAc"]),
                                TripBalance = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBalance"]),
                                RecdFromDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdFromDriver"]),
                                NetTripBalance = Convert.ToString(dataSet.Tables[0].Rows[i]["NetTripBalance"]),
                                FastagAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["FastagAmount"]),
                                TripTotalFreight = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalFreight"]),
                                TripTotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalAdvance"]),
                                TripCloseBy = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseBy"]),
                                TripCloseDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseDt"]),
                                TripCloseUpdateDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseUpdateDt"]),
                                TripLinkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripLinkYN"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                TripBr      = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBr"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DrName= Convert.ToString(dataSet.Tables[0].Rows[i]["DrName"]),
                            });
                        }

                        tripSheetList.tripSheetList = tripList;

                        tripSheetList.PageMetaData = new PaginationMetaData
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
            return tripSheetList;
        }
        public async Task<TripMasterModel> GetTripSheetInnerSearchList(ReportRequestModel request)
        {
            TripMasterModel tripSheetInnerGridList = new()
            {
                DriverList = new List<DriverDetails>(),
                RouteList = new List<RouteDetails>(),
                DieselList = new List<DieselDetails>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@VehicleMasterId",    request.FilterStr)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSheetInnerSearchList", param);

                    //Driver Adv Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DriverList.Add(new DriverDetails
                            {
                                PmtId       = Convert.ToString(resultData.Tables[0].Rows[i]["PmtId"]),
                                PmtBranch   = Convert.ToString(resultData.Tables[0].Rows[i]["PmtBranch"]),
                                PmtDate     = Convert.ToString(resultData.Tables[0].Rows[i]["PmtDate"]),
                                TransType   = Convert.ToString(resultData.Tables[0].Rows[i]["TransType"]),
                                AmountPaid  = Convert.ToString(resultData.Tables[0].Rows[i]["AmountPaid"]),
                                Remarks     = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                                PmtType     = Convert.ToString(resultData.Tables[0].Rows[i]["PmtType"]),
                            });
                        }
                    }
                    //Route Details
                    if (resultData != null && resultData.Tables[1].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[1].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.RouteList.Add(new RouteDetails
                            {
                                LoadId  = Convert.ToString(resultData.Tables[1].Rows[i]["LoadId"]),
                                LoadBranch  = Convert.ToString(resultData.Tables[1].Rows[i]["LoadBranch"]),
                                LoadDate  = Convert.ToString(resultData.Tables[1].Rows[i]["LoadDate"]),
                                LoadType = Convert.ToString(resultData.Tables[1].Rows[i]["LoadType"]),
                                LoadFor = Convert.ToString(resultData.Tables[1].Rows[i]["LoadFor"]),
                                LoadMemoNo = Convert.ToString(resultData.Tables[1].Rows[i]["LoadMemoNo"]),
                                LoadingFrom  = Convert.ToString(resultData.Tables[1].Rows[i]["LoadingFrom"]),
                                ConsignorName = Convert.ToString(resultData.Tables[1].Rows[i]["ConsignorName"]),
                                LoadingTo = Convert.ToString(resultData.Tables[1].Rows[i]["LoadingTo"]),
                                ConsigneeName = Convert.ToString(resultData.Tables[1].Rows[i]["ConsigneeName"]),
                                HireAmt = Convert.ToString(resultData.Tables[1].Rows[i]["HireAmt"]),
                                AdvAmt = Convert.ToString(resultData.Tables[1].Rows[i]["AdvAmt"]),
                                Remarks = Convert.ToString(resultData.Tables[1].Rows[i]["Remarks"]),                                
                            });
                        }
                    }
                    //Diesel Details
                    if (resultData != null && resultData.Tables[2].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[2].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DieselList.Add(new DieselDetails
                            {
                                DetailID = Convert.ToString(resultData.Tables[2].Rows[i]["DetailID"]),
                                AccountName= Convert.ToString(resultData.Tables[2].Rows[i]["AccountName"]),
                                TransDate = Convert.ToString(resultData.Tables[2].Rows[i]["TransDate"]),
                                DslQty = Convert.ToString(resultData.Tables[2].Rows[i]["DslQty"]),
                                DslRate = Convert.ToString(resultData.Tables[2].Rows[i]["DslRate"]),
                                Amount = Convert.ToString(resultData.Tables[2].Rows[i]["Amount"]),
                                Remarks = Convert.ToString(resultData.Tables[2].Rows[i]["Remarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tripSheetInnerGridList;
        }

        public async Task<ResponseModel> GetNextTripNo(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterID", request.strRequest),
                            new SqlParameter("@YearID", request.strRequest1),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetTripNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<ResponseModel> TripMasterDelete(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripMasterDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<ResponseModel> GetLastTripDriver(OpBalModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Tripdate", request.Tripdate),
                            new SqlParameter("@VehicleMasterID",request.VehicleMasterID),
                         // new SqlParameter("@DriverMasterID", request.DriverMasterID),
                            new SqlParameter("@Yearid", request.Yearid),
                            new SqlParameter("@TripNo", request.TripNo)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetLastTripDriver", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<List<DropDownListModel>> GetDriverList()
        {
            List<DropDownListModel> driverList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            driverList.Add(new DropDownListModel
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
            return driverList;
        }

        public async Task<ResponseModel> GetOpeningBal(OpBalModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Tripdate", request.Tripdate),
                            new SqlParameter("@VehicleMasterID", request.VehicleMasterID),
                            new SqlParameter("@DriverMasterID", request.DriverMasterID),
                            new SqlParameter("@Yearid", request.Yearid),
                            new SqlParameter("@TripNo", request.TripNo)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetDrOpeningBal", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    
                    }
                    else
                    {
                        responseModel.Status = false;
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
       
        public async Task<ResponseModel> GetDslOpeningBal(OpBalModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Tripdate", request.Tripdate),
                            new SqlParameter("@VehicleMasterID", request.VehicleMasterID),
                         //   new SqlParameter("@DriverMasterID", request.DriverMasterID),
                            new SqlParameter("@Yearid", request.Yearid),
                            new SqlParameter("@TripNo", request.TripNo)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetDslOpeningBal", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<ResponseModel> GetDslOpeningBalforPmt(OpBalModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                           //new SqlParameter("@Tripdate", request.Tripdate),
                            new SqlParameter("@VehicleMasterID", request.VehicleMasterID),
                         //   new SqlParameter("@DriverMasterID", request.DriverMasterID),
                            new SqlParameter("@Yearid", request.Yearid),
                            new SqlParameter("@TripNo", request.TripNo)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetDslOpeningBalforPmt", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<ResponseModel> GetAdblueOpeningBal(OpBalModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Tripdate", request.Tripdate),
                            new SqlParameter("@VehicleMasterID", request.VehicleMasterID),
                         //   new SqlParameter("@DriverMasterID", request.DriverMasterID),
                            new SqlParameter("@Yearid", request.Yearid),
                            new SqlParameter("@TripNo", request.TripNo)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetAdblueOpeningBal", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<ResponseModel> GetIncentiveRate(IncentiveRateModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Transdate", request.Transdate),            
                            new SqlParameter("@TripKms", request.TripKms),
                            new SqlParameter("@FromPlace", request.FromPlace),
                            new SqlParameter("@ToPlace", request.ToPlace),
                        };
                    //   var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetIncentiveRate", param);
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetIncentiveRate", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = true;
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<DriverDetailModel> GetDriverDetail(RequestModel request)
        {
            DriverDetailModel driverDetailModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DriverMasterID", request.strRequest),

                 
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_DriverDetail", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        driverDetailModel.LicenseNo = Convert.ToString(userData.Tables[0].Rows[0]["LicenseNo"]);
                        driverDetailModel.LicValidUpto = Convert.ToString(userData.Tables[0].Rows[0]["LicValidUpto"]);
                        driverDetailModel.DriverMobile1 = Convert.ToString(userData.Tables[0].Rows[0]["DriverMobile1"]);
                        driverDetailModel.DrPhoto = Convert.ToString(userData.Tables[0].Rows[0]["DrPhoto"]);
                        driverDetailModel.IsActive = Convert.ToString(userData.Tables[0].Rows[0]["IsActive"]);
                        driverDetailModel.DriverAadharNo = Convert.ToString(userData.Tables[0].Rows[0]["DriverAadharNo"]);
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
            return driverDetailModel;
        }
    
        public async Task<ResponseModel> GetPenaltyRate(PenaltyRateModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Transdate", request.Transdate),

                 //     new SqlParameter("@TripKms", request.TripKms)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetPenaltyRate", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        //  responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                       // responseModel.Message2 = Convert.ToString(statusData.Tables[0].Rows[0]["Message2"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        public async Task<PenaltyModel> GetPenaltyRateNew(PenaltyRateModel request)
        {
            PenaltyModel penaltyModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Transdate", request.Transdate),

                 //     new SqlParameter("@TripKms", request.TripKms)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetPenaltyRateNew", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        //  responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        penaltyModel.LoadPenalty = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        penaltyModel.EmptyPenalty = Convert.ToString(statusData.Tables[0].Rows[0]["Message2"]);

                    }
                    else
                    {
                      //  penaltyModel.Status = false;
                      //  penaltyModel.Message = "Unable to process";
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
            return penaltyModel;
        }
        public async Task<ResponseModel> GetBhattaRate(BhattaRateModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Transdate", request.Transdate),                    
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetBhattaRate", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        //  responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                    else
                    {
                        responseModel.Status = false;
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
        //public async Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request)
        //{
            //TripSheetInnerGridListModel tripSheetInnerGridList = new()
            //{
            //    LRDetailsList = new List<LRDetailsModel>(),
            //    DieselDetailsList = new List<DieselDetailsModel>(),
            //    DriverAdvanceList = new List<DriverAdvanceModel>(),
            //    MiscList = new List<MiscListModel>(),
            //    AdblueList = new List<AdblueListmodel>(),
            //};
            //try
            //{
            //    if (dbconnection != null)
            //    {
            //        SqlParameter[] param =
            //            {
            //                new SqlParameter("@TripId", request.TripId),
            //                new SqlParameter("@VehicleMasterId", request.VehicleMasterId)
            //            };

            //        var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripSheetInnerGridList_Select", param);
            //        tripSheetInnerGridList.Incentive = "0";
            //        //LR Details
            //        if (resultData != null && resultData.Tables[0].Rows.Count > 0)
            //        {
            //            for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
            //            {
            //                tripSheetInnerGridList.LRDetailsList.Add(new LRDetailsModel
            //                {
            //                    ConsignmentID = Convert.ToString(resultData.Tables[0].Rows[i]["ConsignmentID"]),
            //                    GcNoteNo = Convert.ToString(resultData.Tables[0].Rows[i]["GcNoteNo"]),
            //                    CneeCode = Convert.ToString(resultData.Tables[0].Rows[i]["CneeCode"]),
            //                    CnDest = Convert.ToString(resultData.Tables[0].Rows[i]["CnDest"]),
            //                    CnorInvNo = Convert.ToString(resultData.Tables[0].Rows[i]["CnorInvNo"]),
            //                    EwayBillNo = Convert.ToString(resultData.Tables[0].Rows[i]["EwayBillNo"]),
            //                    EwayBillDate = Convert.ToString(resultData.Tables[0].Rows[i]["EwayBillDate"]),
            //                    EwayBillExpDate = Convert.ToString(resultData.Tables[0].Rows[i]["EwayBillExpDate"]),
            //                });
            //            }
            //        }
            //        //Diseal Details
            //        if (resultData != null && resultData.Tables[1].Rows.Count > 0)
            //        {
            //            for (int i = 0; i < resultData.Tables[1].Rows.Count; i++)
            //            {
            //                tripSheetInnerGridList.DieselDetailsList.Add(new DieselDetailsModel
            //                {
            //                    PmtId = Convert.ToString(resultData.Tables[1].Rows[i]["PmtId"]),
            //                    PmtDate = Convert.ToString(resultData.Tables[1].Rows[i]["PmtDate"]),
            //                    QtyLtrs = Convert.ToString(resultData.Tables[1].Rows[i]["QtyLtrs"]),
            //                    AmountPaid = Convert.ToString(resultData.Tables[1].Rows[i]["AmountPaid"]),
            //                    VendorName = Convert.ToString(resultData.Tables[1].Rows[i]["VendorName"]),
            //                    Adj = Convert.ToString(resultData.Tables[1].Rows[i]["AdjInTrip"]),
            //                });
            //            }
            //        }
            //        //Driver Adv Details
            //        if (resultData != null && resultData.Tables[2].Rows.Count > 0)
            //        {
            //            for (int i = 0; i < resultData.Tables[2].Rows.Count; i++)
            //            {
            //                tripSheetInnerGridList.DriverAdvanceList.Add(new DriverAdvanceModel
            //                {
            //                    PmtId = Convert.ToString(resultData.Tables[2].Rows[i]["PmtId"]),
            //                    PmtDate = Convert.ToString(resultData.Tables[2].Rows[i]["PmtDate"]),
            //                    AmountPaid = Convert.ToString(resultData.Tables[2].Rows[i]["AmountPaid"]),
            //                    Ptype = Convert.ToString(resultData.Tables[2].Rows[i]["Ptype"]),
            //                    Adj2 = Convert.ToString(resultData.Tables[2].Rows[i]["AdjInTrip"]),
            //                });
            //            }
            //        }

            //        //Misc Details
            //        if (resultData != null && resultData.Tables[3].Rows.Count > 0)
            //        {
            //            for (int i = 0; i < resultData.Tables[3].Rows.Count; i++)
            //            {
            //                tripSheetInnerGridList.MiscList.Add(new MiscListModel
            //                {
            //                    ExpType = Convert.ToString(resultData.Tables[3].Rows[i]["ExpType"]),
            //                    Narration = Convert.ToString(resultData.Tables[3].Rows[i]["Narration"]),
            //                    MiscAmount = Convert.ToString(resultData.Tables[3].Rows[i]["MiscAmount"]),
            //                });
            //            }
            //        }

            //        //Adblue Details 
            //        if (resultData != null && resultData.Tables[4].Rows.Count > 0)
            //        {
            //            for (int i = 0; i < resultData.Tables[4].Rows.Count; i++)
            //            {
            //                tripSheetInnerGridList.AdblueList.Add(new AdblueListmodel
            //                {
            //                    AdbluefillingStation = Convert.ToString(resultData.Tables[4].Rows[i]["AdbluefillingStation"]),
            //                    AdbluedieselLiter = Convert.ToString(resultData.Tables[4].Rows[i]["AdbluedieselLiter"]),
            //                    AdbluedieselAmount = Convert.ToString(resultData.Tables[4].Rows[i]["AdbluedieselAmount"]),
            //                });
            //            }
            //        }
            //        if (resultData != null && resultData.Tables[5].Rows.Count > 0)
            //        {
            //            tripSheetInnerGridList.Incentive = ((resultData.Tables[5].Rows.Count-1) * 1000).ToString();
            //        }
            //    }
            //}
            //catch (Exception ex)
            //{
            //    // Log exception on database
            //    //ExceptionModel exceptionModel = new()
            //    //{
            //    //    ExceptionMessage = Convert.ToString(ex.Message),
            //    //    ExceptionType = Convert.ToString(ex.GetType().Name),
            //    //    ExceptionSource = Convert.ToString(ex.StackTrace)
            //    //};

            //    //ExceptionRepository exception = new(dbconnection);
            //    //await exception.SaveExceptionDetails(exceptionModel);
            //}
            //return tripSheetInnerGridList;
      //  }

        public async Task<TripSheetList> GetOtherTripOpenList(ReportRequestModel request)
        {
            TripSheetList otherTripSheetList = new();

            List<TripMasterModel> otherTripList = new();
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
                            new SqlParameter("@Branch", request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOtherTripOpenList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            otherTripList.Add(new TripMasterModel
                            {
                                //TripId = Convert.ToString(dataSet.Tables[0].Rows[i]["OthTripOpenId"]),
                                //TripBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                //TripBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                //YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                //VehicleMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),
                                //VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                //TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                //NewTripDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripDate"]),
                                //OpenThrough = Convert.ToString(dataSet.Tables[0].Rows[i]["OpenThrough"]),
                                //DriverMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterID"]),
                                //CompNonCompStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["CompNonCompStatus"]),
                                //ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RCM_Chno"]),
                                //LoadingFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFrom"]),
                                //Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                //DistanceTripKM_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM_1"]),
                                //Contents = Convert.ToString(dataSet.Tables[0].Rows[i]["ContentsDesc"]),
                                //LoadEmptyType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadEmptyType"]),
                                //ExpectedReportingDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedReportingDt"]),
                                //ExpectedReportingDays = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedReportingDays"]),
                                //LtsDslToBe_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsDslToBe_1"]),
                                //LtsAdblueToBe_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsAdblueToBe_1"]),
                                //AdvPayable_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvPayable_1"]),
                                //OpBalDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDriver"]),
                                //OpBalDsl = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDsl"]),
                                //OpBalAdblue = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalAdblue"]),                                
                            });
                        }

                        otherTripSheetList.tripSheetList = otherTripList;

                        otherTripSheetList.PageMetaData = new PaginationMetaData
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
            return otherTripSheetList;
        }
        public async Task<ResponseModel> OtherTripOpenSave(TripMasterModel tripMasterModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            //new SqlParameter("@OthTripOpenId"           , tripMasterModel.TripId),
                            //new SqlParameter("@BranchCode"              , tripMasterModel.TripBranch),
                            //new SqlParameter("@YearId"                  , tripMasterModel.YearId),
                            //new SqlParameter("@VehicleMasterID"         , tripMasterModel.VehicleMasterID),
                            //new SqlParameter("@TripNo"                  , tripMasterModel.TripNo),
                            //new SqlParameter("@TripDate"                , tripMasterModel.NewTripDate),
                            //new SqlParameter("@OpenThrough"             , tripMasterModel.OpenThrough),
                            //new SqlParameter("@DriverMasterID"          , tripMasterModel.DriverMasterID),
                            //new SqlParameter("@CompNonCompStatus"       , tripMasterModel.CompNonCompStatus),
                            //new SqlParameter("@RCM_Chno"                , tripMasterModel.ChallanNo),
                            //new SqlParameter("@LoadingFrom"             , tripMasterModel.LoadingFrom),
                            //new SqlParameter("@Destination"             , tripMasterModel.Destination),
                            //new SqlParameter("@DistanceTripKM_1"        , tripMasterModel.DistanceTripKM_1),
                            //new SqlParameter("@ContentsDesc"            , tripMasterModel.Contents),
                            //new SqlParameter("@LoadEmptyType"           , tripMasterModel.LoadEmptyType),
                            //new SqlParameter("@ExpectedReportingDt"     , tripMasterModel.ExpectedReportingDt),
                            //new SqlParameter("@ExpectedReportingDays"   , tripMasterModel.ExpectedReportingDays),
                            //new SqlParameter("@LtsDslToBe_1"            , tripMasterModel.LtsDslToBe_1),
                            //new SqlParameter("@LtsAdblueToBe_1"         , tripMasterModel.LtsAdblueToBe_1),
                            //new SqlParameter("@AdvPayable_1"            , tripMasterModel.AdvPayable_1),
                            //new SqlParameter("@OpBalDriver"             , tripMasterModel.OpBalDriver),
                            //new SqlParameter("@OpBalDsl"                , tripMasterModel.OpBalDsl),
                            //new SqlParameter("@OpBalAdblue"             , tripMasterModel.OpBalAdblue),
                            //new SqlParameter("@LoggedInUser"            , tripMasterModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_OtherTripOpenSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<ResponseModel> OtherTripOpenDelete(RequestModel request)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@OthTripOpenId", request.strRequest),                           
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_OtherTripOpenDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<UserTripRightsModel> GetUserDetails(RequestModel request)
        {
            UserTripRightsModel userTrip = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", request.strRequest),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUserTripDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        userTrip.CanEditTripAfterClose = statusData.Tables[0].Rows[0]["CanEditTripAfterClose"].ToString()=="Y"?true:false;
                        userTrip.CanLinkTrip = statusData.Tables[0].Rows[0]["CanLinkTrip"].ToString()=="Y" ? true : false;
                        userTrip.EnableLastNewTripDate = statusData.Tables[0].Rows[0]["EnableLastNewTripDate"].ToString()=="Y" ? true : false;
                        userTrip.EnableFromTo = statusData.Tables[0].Rows[0]["EnableFromTo"].ToString()=="Y" ? true : false;
                        userTrip.EnableDriver = statusData.Tables[0].Rows[0]["EnableDriver"].ToString()=="Y" ? true : false;
                        userTrip.AttachLRtoSameTrip = statusData.Tables[0].Rows[0]["EnableDriver"].ToString()=="Y" ? true : false;
                        userTrip.CanCancelBill= statusData.Tables[0].Rows[0]["CanCancelBill"].ToString()=="Y" ? true : false;
                    }
                    else
                    {
                        userTrip.CanEditTripAfterClose = false;
                        userTrip.CanLinkTrip = false;
                        userTrip.EnableLastNewTripDate = false;
                        userTrip.EnableFromTo = false;
                        userTrip.EnableDriver = false;
                        userTrip.AttachLRtoSameTrip = false;
                        userTrip.CanCancelBill = false;
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
            return userTrip;
        }


    }

}
