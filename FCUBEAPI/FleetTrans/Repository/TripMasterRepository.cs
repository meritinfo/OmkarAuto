using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Office2016.Excel;

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
                            new SqlParameter("@TripTotalExpenses" , tripMasterModel.TripTotalExpenses),
                            new SqlParameter("@TripCloseDt" , tripMasterModel.TripCloseDt),
                            new SqlParameter("@TripLinkYN" , tripMasterModel.TripLinkYN),
                            new SqlParameter("@LoggedInUser" , tripMasterModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripMasterSave", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tripMasterModel.DriverList.Count; i++)
                            {
                                SqlParameter[] paramdr =
                                {
                                    new SqlParameter("@TripId", MasterID),
                                    new SqlParameter("@TripPaymentId", tripMasterModel.DriverList[i].PmtId),
                                    new SqlParameter("@PmtType", tripMasterModel.DriverList[i].PmtType),
                                    new SqlParameter("@PmtDate", tripMasterModel.DriverList[i].PmtDate),
                                    new SqlParameter("@PmtRemarks", tripMasterModel.DriverList[i].Remarks),
                                    new SqlParameter("@PmtAmt", tripMasterModel.DriverList[i].AmountPaid),
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripDrPaymentSave", paramdr);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.DriverList.Count;
                                        transaction.Rollback();
                                    }
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tripMasterModel.RouteList.Count; i++)
                            {
                                SqlParameter[] paramdr =
                                {
                                    new SqlParameter("@TripId",     MasterID),
                                    new SqlParameter("@ChallanId",  tripMasterModel.RouteList[i].LoadId),
                                    new SqlParameter("@ChallanNo",  tripMasterModel.RouteList[i].LoadMemoNo),
                                    new SqlParameter("@FromPlace",  tripMasterModel.RouteList[i].LoadingFrom),
                                    new SqlParameter("@ToPlace",    tripMasterModel.RouteList[i].LoadingTo),
                                    new SqlParameter("@OwnMarket",  tripMasterModel.RouteList[i].LoadType),
                                    new SqlParameter("@TotalHire",  tripMasterModel.RouteList[i].HireAmt),
                                    new SqlParameter("@Remarks",    tripMasterModel.RouteList[i].Remarks),
                                    new SqlParameter("@YearId",     tripMasterModel.YearId),
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripRouteSave", paramdr);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.RouteList.Count;
                                        transaction.Rollback();
                                    }
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tripMasterModel.ExpList.Count; i++)
                            {
                                SqlParameter[] paramdr =
                                {
                                    new SqlParameter("@TripId",     MasterID),
                                    new SqlParameter("@ExpId",  tripMasterModel.ExpList[i].ExpId),
                                    new SqlParameter("@ExpParticulars",  tripMasterModel.ExpList[i].ExpParticulars),
                                    new SqlParameter("@ExpAmt",  tripMasterModel.ExpList[i].ExpAmt),
                                
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripDrExpDetailsSave", paramdr);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.ExpList.Count;
                                        transaction.Rollback();
                                    }
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tripMasterModel.DieselList.Count; i++)
                            {
                                SqlParameter[] paramdr =
                                {
                                    new SqlParameter("@TripId", MasterID),
                                    new SqlParameter("@DfdDtlId", tripMasterModel.DieselList[i].DetailID),
                                    new SqlParameter("@PmtDate", tripMasterModel.DieselList[i].TransDate),
                                    new SqlParameter("@PmtRemarks", tripMasterModel.DieselList[i].Remarks),
                                    new SqlParameter("@DslLtrs", tripMasterModel.DieselList[i].DslQty),
                                    new SqlParameter("@DslRate", tripMasterModel.DieselList[i].DslRate),
                                    new SqlParameter("@DslAmt", tripMasterModel.DieselList[i].Amount),
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripDslSave", paramdr);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.DieselList.Count;
                                        transaction.Rollback();
                                    }
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tripMasterModel.FasttagList.Count; i++)
                            {
                                SqlParameter[] paramft =
                                {
                                    new SqlParameter("@TripId", MasterID),
                                    new SqlParameter("@FtDtlId", tripMasterModel.FasttagList[i].DetailID),
                                    new SqlParameter("@FtDate", tripMasterModel.FasttagList[i].TransDate),
                                    new SqlParameter("@FtRemarks", tripMasterModel.FasttagList[i].Remarks),
                                    new SqlParameter("@FtAmt", tripMasterModel.FasttagList[i].FtAmount),
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripFastagDetailsSave", paramft);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.FasttagList.Count;
                                        transaction.Rollback();
                                    }
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }                       
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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
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
                                TripTotalExpenses = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalExpenses"]),
                                TripCloseBy = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseBy"]),
                                TripCloseDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseDt"]),
                                TripCloseUpdateDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseUpdateDt"]),
                                TripLinkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripLinkYN"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                TripBr = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBr"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DrName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrName"]),
                                NextTrip = Convert.ToString(dataSet.Tables[0].Rows[i]["NextTrip"]),
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
                FasttagList = new List<FasttagDetails>(),
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
                    //FastTag Details
                    if (resultData != null && resultData.Tables[3].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[3].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.FasttagList.Add(new FasttagDetails
                            {
                                DetailID = Convert.ToString(resultData.Tables[3].Rows[i]["DetailID"]),
                                AccountName= Convert.ToString(resultData.Tables[3].Rows[i]["AccountName"]),
                                TransDate = Convert.ToString(resultData.Tables[3].Rows[i]["TransDate"]),
                                FtAmount = Convert.ToString(resultData.Tables[3].Rows[i]["FtAmount"]),
                                Remarks = Convert.ToString(resultData.Tables[3].Rows[i]["Remarks"]),
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
        public async Task<ResponseModel> GetDslMileage(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterId", request.strRequest),                       
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetMileageLt", param);

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

            }
            return responseModel;
        }
        public async Task<ResponseModel> GetBhattaRate(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripDate", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBhattaRate", param);

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

            }
            return responseModel;
        }
        public async Task<TripMasterModel> GetTripSheetInnerGridList(RequestModel request)
        {
            TripMasterModel tripSheetInnerGridList = new()
            {
                DriverList = new List<DriverDetails>(),
                RouteList = new List<RouteDetails>(),
                DieselList = new List<DieselDetails>(),
                FasttagList = new List<FasttagDetails>(),
                ExpList = new List<TripDrExpDetails>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripId",   request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSheetInnerGridList", param);

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
                    //FastTag Details
                    if (resultData != null && resultData.Tables[3].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[3].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.FasttagList.Add(new FasttagDetails
                            {
                                DetailID = Convert.ToString(resultData.Tables[3].Rows[i]["DetailID"]),
                                AccountName= Convert.ToString(resultData.Tables[3].Rows[i]["AccountName"]),
                                TransDate = Convert.ToString(resultData.Tables[3].Rows[i]["TransDate"]),
                                FtAmount = Convert.ToString(resultData.Tables[3].Rows[i]["FtAmount"]),
                                Remarks = Convert.ToString(resultData.Tables[3].Rows[i]["Remarks"]),
                            });
                        }
                    }

                    //Driver Exp Details
                    if (resultData != null && resultData.Tables[4].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[4].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.ExpList.Add(new TripDrExpDetails
                            {
                                TripId = Convert.ToString(resultData.Tables[4].Rows[i]["TripId"]),
                                ExpId = Convert.ToString(resultData.Tables[4].Rows[i]["ExpId"]),
                                ExpParticulars = Convert.ToString(resultData.Tables[4].Rows[i]["ExpParticulars"]),
                                ExpAmt = Convert.ToString(resultData.Tables[4].Rows[i]["ExpAmt"]),

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
                
            }
            return driverList;
        }
        public async Task<List<DropDownListModel>> GetExpList()
        {
            List<DropDownListModel> expList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDrExpList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            expList.Add(new DropDownListModel
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
            return expList;
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
                
            }
            return responseModel;
        }
        public async Task<ReportRequestModel> GetOpeningBal(ReportRequestModel request)
        {
            ReportRequestModel open = new();
            open.FilterStr = "0";
            open.FilterStr1 = "0";
            open.FilterStr2 = "0";

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterID", request.FilterStr),
                            new SqlParameter("@TripNo", request.FilterStr1),
                            new SqlParameter("@YearID", request.FilterStr2),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetTripOpeningBal", param);
                    
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        open.FilterStr = Convert.ToString(statusData.Tables[0].Rows[0]["OpeningKMR"]);
                        open.FilterStr1 = Convert.ToString(statusData.Tables[0].Rows[0]["OpBalDsl"]);
                        open.FilterStr2 = Convert.ToString(statusData.Tables[0].Rows[0]["OpBalDriver"]);
                    }                   
                }
            }
            catch (Exception ex)
            {

            }
            return open;
        }        


    }

}
