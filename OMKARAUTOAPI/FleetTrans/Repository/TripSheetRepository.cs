using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace FleetTrans.Repository
{
    public class TripSheetRepository : ITripSheetRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public TripSheetRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> TripSheetSave(TripSheetModel tripMasterModel)
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
                            new SqlParameter("@EmptyMileage" , tripMasterModel.EmptyMileage),
                            new SqlParameter("@EmptyKMs" , tripMasterModel.EmptyKMs),
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
                            new SqlParameter("@TotalAdblueExp" , tripMasterModel.TotalAdblueExp),                            
                            new SqlParameter("@TripBalance" , tripMasterModel.TripBalance),
                            new SqlParameter("@RecdFromDriver" , tripMasterModel.RecdFromDriver),
                            new SqlParameter("@NetTripBalance" , tripMasterModel.NetTripBalance),
                            new SqlParameter("@FastagAmount" , tripMasterModel.FastagAmount),
                            new SqlParameter("@TripTotalFreight" , tripMasterModel.TripTotalFreight),
                            new SqlParameter("@TripTotalExpenses" , tripMasterModel.TripTotalExpenses),
                            new SqlParameter("@ExpensesByComp" , tripMasterModel.ExpensesByComp),                            
                            new SqlParameter("@TripCloseDt" , tripMasterModel.TripCloseDt),
                            new SqlParameter("@TripLinkYN" , tripMasterModel.TripLinkYN),
                            new SqlParameter("@ReportDateTime" , tripMasterModel.ReportDateTime),
                            new SqlParameter("@UnloadDateTime" , tripMasterModel.UnloadDateTime),
                            new SqlParameter("@DetentionDays" , tripMasterModel.DetentionDays),
                            new SqlParameter("@DetnRate" , tripMasterModel.DetnRate),
                            new SqlParameter("@DetnAmount" , tripMasterModel.DetnAmount),
                            new SqlParameter("@Food_Sal_PerDay" , tripMasterModel.Food_Sal_PerDay),
                            new SqlParameter("@Food_Sal_FromDt" , tripMasterModel.Food_Sal_FromDt),
                            new SqlParameter("@Food_Sal_ToDt" , tripMasterModel.Food_Sal_ToDt),
                            new SqlParameter("@Food_Sal_Days" , tripMasterModel.Food_Sal_Days),
                            new SqlParameter("@Food_Sal_Less_Days" , tripMasterModel.Food_Sal_Less_Days),
                            new SqlParameter("@Food_Sal_Less_Desc" , tripMasterModel.Food_Sal_Less_Desc),
                            new SqlParameter("@Food_Sal_Amt" , tripMasterModel.Food_Sal_Amt),
                            new SqlParameter("@RtaChallanDesc" , tripMasterModel.RtaChallanDesc),
                            new SqlParameter("@RtaChallanAmt" , tripMasterModel.RtaChallanAmt),
                            new SqlParameter("@PaidToDriver" , tripMasterModel.PaidToDriver),
                            new SqlParameter("@Remarks" , tripMasterModel.Remarks),
                            new SqlParameter("@LoggedInUser" , tripMasterModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripSheetSave", param);

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
                                    new SqlParameter("@TripId",         MasterID),
                                    new SqlParameter("@ChallanId",      tripMasterModel.RouteList[i].LoadId),
                                    new SqlParameter("@ChallanNo",      tripMasterModel.RouteList[i].LoadMemoNo),
                                    new SqlParameter("@FromPlace",      tripMasterModel.RouteList[i].LoadingFrom),
                                    new SqlParameter("@ToPlace",        tripMasterModel.RouteList[i].LoadingTo),
                                    new SqlParameter("@OwnMarket",      tripMasterModel.RouteList[i].LoadType),
                                    new SqlParameter("@UnloadWt",       tripMasterModel.RouteList[i].UnloadWt),
                                    new SqlParameter("@ExtDetention",   tripMasterModel.RouteList[i].ExtDetention),
                                    new SqlParameter("@TotalHire",      tripMasterModel.RouteList[i].HireAmt),
                                    new SqlParameter("@Remarks",        tripMasterModel.RouteList[i].Remarks),
                                    new SqlParameter("@YearId",         tripMasterModel.YearId),
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
                            for (int i = 0; i < tripMasterModel.DrExpList.Count; i++)
                            {
                                SqlParameter[] paramdr =
                                {
                                    new SqlParameter("@TripId",     MasterID),
                                    new SqlParameter("@ExpId",  tripMasterModel.DrExpList[i].ExpId),
                                    new SqlParameter("@ExpParticulars",  tripMasterModel.DrExpList[i].ExpParticulars),
                                    new SqlParameter("@ExpAmt",  tripMasterModel.DrExpList[i].ExpAmt),
                                
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripDrExpDetailsSave", paramdr);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.DrExpList.Count;
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
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripDslJetSave", paramdr);

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
                            for (int i = 0; i < tripMasterModel.AdblueList.Count; i++)
                            {
                                SqlParameter[] paramdr =
                                {
                                    new SqlParameter("@TripId", MasterID),
                                    new SqlParameter("@PmtId", tripMasterModel.AdblueList[i].PmtId),
                                    new SqlParameter("@IssueBranch", tripMasterModel.AdblueList[i].IssueBranch),
                                    new SqlParameter("@IssueDate", tripMasterModel.AdblueList[i].IssueDate),
                                    new SqlParameter("@IssueParticulars", tripMasterModel.AdblueList[i].IssueParticulars),
                                    new SqlParameter("@AdblueLtrs", tripMasterModel.AdblueList[i].AdblueLtrs),
                                    new SqlParameter("@AdblueAmt", tripMasterModel.AdblueList[i].AdblueAmt),
                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripAdblueSave", paramdr);

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
                            for (int i = 0; i < tripMasterModel.CmpExpList.Count; i++)
                            {
                                SqlParameter[] paramcmp =
                                {
                                    new SqlParameter("@TripId",     MasterID),
                                    new SqlParameter("@EnrouteExpId", tripMasterModel.CmpExpList[i].EnrouteExpId),
                                    new SqlParameter("@ExpId",  tripMasterModel.CmpExpList[i].ExpId),
                                    new SqlParameter("@ExpParticulars",  tripMasterModel.CmpExpList[i].ExpParticulars),
                                    new SqlParameter("@ExpAmt",  tripMasterModel.CmpExpList[i].ExpAmt),

                                };
                                var statusDatadr = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripCmpExpDetailsSave", paramcmp);

                                if (statusDatadr != null && statusDatadr.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusDatadr.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusDatadr.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = tripMasterModel.CmpExpList.Count;
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
        public async Task<ResponseModel> GetNextTripSalDate(RequestModel request)
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

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetNextTripSalDate", param);

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
        public async Task<TripSheetList> GetTripSheetList(ReportRequestModel request)
        {
            TripSheetList tripSheetList = new();
            List<TripSheetModel> tripList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripSheetList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripList.Add(new TripSheetModel
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
                                EmptyMileage = Convert.ToString(dataSet.Tables[0].Rows[i]["EmptyMileage"]),
                                EmptyKMs = Convert.ToString(dataSet.Tables[0].Rows[i]["EmptyKMs"]),
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
                                TotalAdblueExp = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAdblueExp"]),
                                TripBalance = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBalance"]),
                                RecdFromDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdFromDriver"]),
                                NetTripBalance = Convert.ToString(dataSet.Tables[0].Rows[i]["NetTripBalance"]),
                                FastagAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["FastagAmount"]),
                                TripTotalFreight = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalFreight"]),
                                TripTotalExpenses = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTotalExpenses"]),
                                ExpensesByComp = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpensesByComp"]),
                                TripCloseBy = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseBy"]),
                                TripCloseDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseDt"]),
                                TripCloseUpdateDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseUpdateDt"]),
                                TripLinkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripLinkYN"]),
                                ReportDateTime= Convert.ToString(dataSet.Tables[0].Rows[i]["ReportDateTime"]),
                                UnloadDateTime= Convert.ToString(dataSet.Tables[0].Rows[i]["UnloadDateTime"]),
                                DetentionDays= Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionDays"]),
                                DetnRate = Convert.ToString(dataSet.Tables[0].Rows[i]["DetnRate"]),
                                DetnAmount= Convert.ToString(dataSet.Tables[0].Rows[i]["DetnAmount"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                TripBr = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBr"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DrName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrName"]),
                                NextTrip = Convert.ToString(dataSet.Tables[0].Rows[i]["NextTrip"]),
                                Food_Sal_PerDay = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_PerDay"]),
                                Food_Sal_FromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_FromDt"]),
                                Food_Sal_ToDt = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_ToDt"]),
                                Food_Sal_Days = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_Days"]),
                                Food_Sal_Less_Days = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_Less_Days"]),
                                Food_Sal_Less_Desc = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_Less_Desc"]),
                                Food_Sal_Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Food_Sal_Amt"]),
                                RtaChallanDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["RtaChallanDesc"]),
                                RtaChallanAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RtaChallanAmt"]),
                                PaidToDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["PaidToDriver"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

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
        public async Task<TripSheetModel> GetTripSheetInnerSearchList(ReportRequestModel request)
        {
            TripSheetModel tripSheetInnerGridList = new()
            {
                DriverList = new List<DriverDetails>(),
                RouteList = new List<RouteDetails>(),
                DieselList = new List<DieselDetails>(),
               // AdblueList = new List<AdblueDetails>(),
              //  FasttagList = new List<FasttagDetails>(),
                CmpExpList = new List<TripCmpExpDetails>(),
                AdblueList = new List<AdblueDetails>(),
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
                                LoadWt  = Convert.ToString(resultData.Tables[1].Rows[i]["LoadWt"]),
                                UnloadWt = Convert.ToString(resultData.Tables[1].Rows[i]["UnloadWt"]),
                                ExtDetention = Convert.ToString(resultData.Tables[1].Rows[i]["ExtDetention"]),
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
                                TransDate = Convert.ToString(resultData.Tables[2].Rows[i]["TransDate"]),
                                DslQty = Convert.ToString(resultData.Tables[2].Rows[i]["DslQty"]),
                                DslRate = Convert.ToString(resultData.Tables[2].Rows[i]["DslRate"]),
                                Amount = Convert.ToString(resultData.Tables[2].Rows[i]["Amount"]),
                                Remarks = Convert.ToString(resultData.Tables[2].Rows[i]["Remarks"]),
                            });
                        }
                    }
                  
                    //FastTag Details
                    //if (resultData != null && resultData.Tables[3].Rows.Count > 0)
                    //{
                    //    for (int i = 0; i < resultData.Tables[3].Rows.Count; i++)
                    //    {
                    //        tripSheetInnerGridList.FasttagList.Add(new FasttagDetails
                    //        {
                    //            DetailID = Convert.ToString(resultData.Tables[3].Rows[i]["DetailID"]),
                    //            TransDate = Convert.ToString(resultData.Tables[3].Rows[i]["TransDate"]),
                    //            FtAmount = Convert.ToString(resultData.Tables[3].Rows[i]["FtAmount"]),
                    //            Remarks = Convert.ToString(resultData.Tables[3].Rows[i]["Remarks"]),
                    //        });
                    //    }
                    //}
                    if (resultData != null && resultData.Tables[4].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[4].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.CmpExpList.Add(new TripCmpExpDetails
                            {
                                EnrouteExpId = Convert.ToString(resultData.Tables[4].Rows[i]["EnrouteExpId"]),
                                ExpId = Convert.ToString(resultData.Tables[4].Rows[i]["ExpId"]),
                                ExpParticulars = Convert.ToString(resultData.Tables[4].Rows[i]["ExpParticulars"]),
                                ExpAmt = Convert.ToString(resultData.Tables[4].Rows[i]["ExpAmount"]),

                            });
                        }
                    }
                    //Adblue Details
                    if (resultData != null && resultData.Tables[5].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[5].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.AdblueList.Add(new AdblueDetails
                            {
                                //TripDtlId = Convert.ToString(resultData.Tables[5].Rows[i]["TripDtlId"]),
                                PmtId = Convert.ToString(resultData.Tables[5].Rows[i]["PmtId"]),
                                IssueBranch = Convert.ToString(resultData.Tables[5].Rows[i]["IssueBranch"]),
                                IssueDate = Convert.ToString(resultData.Tables[5].Rows[i]["IssueDate"]),
                                IssueParticulars = Convert.ToString(resultData.Tables[5].Rows[i]["IssueParticulars"]),
                                AdblueLtrs = Convert.ToString(resultData.Tables[5].Rows[i]["AdblueLtrs"]),
                                AdblueAmt = Convert.ToString(resultData.Tables[5].Rows[i]["AdblueAmt"]),
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
        public async Task<TripSheetModel> GetTripSheetInnerGridList(RequestModel request)
        {
            TripSheetModel tripSheetInnerGridList = new()
            {
                DriverList = new List<DriverDetails>(),
                RouteList = new List<RouteDetails>(),
                DieselList = new List<DieselDetails>(),
                FasttagList = new List<FasttagDetails>(),
                DrExpList = new List<TripDrExpDetails>(),
                CmpExpList= new List<TripCmpExpDetails>(),
                AdblueList = new List<AdblueDetails>(),
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
                                LoadWt  = Convert.ToString(resultData.Tables[1].Rows[i]["LoadWt"]),
                                UnloadWt = Convert.ToString(resultData.Tables[1].Rows[i]["UnloadWt"]),
                                ExtDetention = Convert.ToString(resultData.Tables[1].Rows[i]["ExtDetention"]),
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
                                DetailID = Convert.ToString(resultData.Tables[2].Rows[i]["DfdDtlId"]),
                                TransDate = Convert.ToString(resultData.Tables[2].Rows[i]["PmtDate"]),
                                DslQty = Convert.ToString(resultData.Tables[2].Rows[i]["DslLtrs"]),
                                DslRate = Convert.ToString(resultData.Tables[2].Rows[i]["DslRate"]),
                                Amount = Convert.ToString(resultData.Tables[2].Rows[i]["DslAmt"]),
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
                                DetailID = Convert.ToString(resultData.Tables[3].Rows[i]["FtDtlId"]),
                                TransDate = Convert.ToString(resultData.Tables[3].Rows[i]["FtDate"]),
                                FtAmount = Convert.ToString(resultData.Tables[3].Rows[i]["FtAmt"]),
                                Remarks = Convert.ToString(resultData.Tables[3].Rows[i]["Remarks"]),
                            });
                        }
                    }

                    //Driver Exp Details
                    if (resultData != null && resultData.Tables[4].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[4].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DrExpList.Add(new TripDrExpDetails
                            {
                                ExpId = Convert.ToString(resultData.Tables[4].Rows[i]["ExpId"]),
                                ExpParticulars = Convert.ToString(resultData.Tables[4].Rows[i]["ExpParticulars"]),
                                ExpAmt = Convert.ToString(resultData.Tables[4].Rows[i]["ExpAmt"]),

                            });
                        }
                    }


                    //Company Exp Details
                    if (resultData != null && resultData.Tables[5].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[5].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.CmpExpList.Add(new TripCmpExpDetails
                            {
                                EnrouteExpId = Convert.ToString(resultData.Tables[5].Rows[i]["EnrouteExpId"]),
                                ExpId = Convert.ToString(resultData.Tables[5].Rows[i]["ExpId"]),
                                ExpParticulars = Convert.ToString(resultData.Tables[5].Rows[i]["ExpParticulars"]),
                                ExpAmt = Convert.ToString(resultData.Tables[5].Rows[i]["ExpAmt"]),

                            });
                        }
                    }
                    //Adblue Details
                    if (resultData != null && resultData.Tables[6].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[6].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.AdblueList.Add(new AdblueDetails
                            {
                                TripId = Convert.ToString(resultData.Tables[6].Rows[i]["TripId"]),
                                PmtId = Convert.ToString(resultData.Tables[6].Rows[i]["PmtId"]),
                                IssueBranch = Convert.ToString(resultData.Tables[6].Rows[i]["IssueBranch"]),
                                IssueDate = Convert.ToString(resultData.Tables[6].Rows[i]["IssueDate"]),
                                IssueParticulars = Convert.ToString(resultData.Tables[6].Rows[i]["IssueParticulars"]),
                                AdblueLtrs = Convert.ToString(resultData.Tables[6].Rows[i]["AdblueLtrs"]),
                                AdblueAmt = Convert.ToString(resultData.Tables[6].Rows[i]["AdblueAmt"]),
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
        public async Task<ResponseModel> TripSheetDelete(RequestModel requestModel)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripSheetDelete", param);

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
        public async Task<ResponseModel> GetTripJetPrintPdf(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/Tripjet/";

                string UrlParam = "?TripId=" + request.strRequest;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data!="500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
    }

}
