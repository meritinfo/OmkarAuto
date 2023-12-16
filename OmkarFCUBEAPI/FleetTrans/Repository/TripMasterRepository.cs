using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetTrans.Repository
{
    public class TripMasterRepository : ITripMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public TripMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save Branch master details
        /// </summary>
        /// <param name=" DocRenewalEntry"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> TripMasterSave(TripMasterModel tripMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripId", tripMasterModel.TripId),
                            new SqlParameter("@TripBranch", tripMasterModel.TripBranch),
                            new SqlParameter("@YearId", tripMasterModel.YearId),
                            new SqlParameter("@VehicleMasterID", tripMasterModel.VehicleMasterID),
                            new SqlParameter("@TripNo", tripMasterModel.TripNo),
                            new SqlParameter("@LastTripCloseDate", tripMasterModel.LastTripCloseDate),
                            new SqlParameter("@NewTripDate", tripMasterModel.NewTripDate),
                            new SqlParameter("@OpenThrough", tripMasterModel.OpenThrough),
                            new SqlParameter("@TripOpenBy", tripMasterModel.TripOpenBy),
                            new SqlParameter("@TripOpenDate", tripMasterModel.TripOpenDate),
                            new SqlParameter("@TripStatus", tripMasterModel.TripStatus),
                            new SqlParameter("@DriverMasterID", tripMasterModel.DriverMasterID),
                            new SqlParameter("@ConsignorPayParty", tripMasterModel.ConsignorPayParty),
                            new SqlParameter("@CompNonCompStatus", tripMasterModel.CompNonCompStatus),
                            new SqlParameter("@ChallanNo", tripMasterModel.ChallanNo),
                            new SqlParameter("@LoadingFrom", tripMasterModel.LoadingFrom),
                            new SqlParameter("@Destination", tripMasterModel.Destination),
                            new SqlParameter("@Destination2", tripMasterModel.Destination2),

                                new SqlParameter("@Destination3", tripMasterModel.Destination3),
                            new SqlParameter("@DistanceTripKM_1", tripMasterModel.DistanceTripKM_1),
                            new SqlParameter("@Contents", tripMasterModel.Contents),
                            new SqlParameter("@LoadEmptyType", tripMasterModel.LoadEmptyType),
                            new SqlParameter("@ExpectedReportingDt", tripMasterModel.ExpectedReportingDt),
                            new SqlParameter("@ExpectedReportingDays", tripMasterModel.ExpectedReportingDays),
                            new SqlParameter("@LtsDslToBe_1", tripMasterModel.LtsDslToBe_1),
                            new SqlParameter("@LtsAdblueToBe_1", tripMasterModel.LtsAdblueToBe_1),
                            new SqlParameter("@AdvPayable_1", tripMasterModel.AdvPayable_1),
                            new SqlParameter("@ReportingDt_1", tripMasterModel.ReportingDt_1),
                            new SqlParameter("@AdvanceDays_1", tripMasterModel.AdvanceDays_1),
                            new SqlParameter("@DelayedDays_1", tripMasterModel.DelayedDays_1),
                            new SqlParameter("@GraceDays_1", tripMasterModel.GraceDays_1),
                            new SqlParameter("@DeliveryDate", tripMasterModel.DeliveryDate),
                            new SqlParameter("@DetentionDays", tripMasterModel.DetentionDays),
                            new SqlParameter("@NextReportingBranch", tripMasterModel.NextReportingBranch),
                            new SqlParameter("@DistanceTripKM_2", tripMasterModel.DistanceTripKM_2),
                            new SqlParameter("@NextExpectedReportingDt", tripMasterModel.NextExpectedReportingDt),
                                new SqlParameter("@NextExpectedReportingDays", tripMasterModel.NextExpectedReportingDays),

                            new SqlParameter("@LtsDslToBe_2", tripMasterModel.LtsDslToBe_2),
                            new SqlParameter("@LtsAdblueToBe_2", tripMasterModel.LtsAdblueToBe_2),
                            new SqlParameter("@AdvPayable_2", tripMasterModel.AdvPayable_2),
                            new SqlParameter("@ReportingDt_2", tripMasterModel.ReportingDt_2),
                            new SqlParameter("@AdvanceDays_2", tripMasterModel.AdvanceDays_2),
                            new SqlParameter("@DelayedDays_2", tripMasterModel.DelayedDays_2),
                            new SqlParameter("@GraceDays_2", tripMasterModel.GraceDays_2),
                            new SqlParameter("@OpBalDriver", tripMasterModel.OpBalDriver),
                            new SqlParameter("@OpBalDsl", tripMasterModel.OpBalDsl),
                            new SqlParameter("@OpBalAdblue", tripMasterModel.OpBalAdblue),
                            new SqlParameter("@PaidDriverAdvance", tripMasterModel.PaidDriverAdvance),
                            new SqlParameter("@FreightCollByDriver", tripMasterModel.FreightCollByDriver),
                            new SqlParameter("@IssuedDslLtrs", tripMasterModel.IssuedDslLtrs),
                            new SqlParameter("@IssuedAdblueLtrs", tripMasterModel.IssuedAdblueLtrs),
                            new SqlParameter("@RepairsByDriver", tripMasterModel.RepairsByDriver),
                            new SqlParameter("@ChallanByDriver", tripMasterModel.ChallanByDriver),
                            new SqlParameter("@ParkingByDriver", tripMasterModel.ParkingByDriver),
                            new SqlParameter("@AccidentByDriver", tripMasterModel.AccidentByDriver),
                            new SqlParameter("@WeighmentByDriver", tripMasterModel.WeighmentByDriver),
                            new SqlParameter("@OtherExpByDriver", tripMasterModel.OtherExpByDriver),
                            new SqlParameter("@TollExpByDriver", tripMasterModel.TollExpByDriver),
                            new SqlParameter("@CashDslPlace", tripMasterModel.CashDslPlace),
                            new SqlParameter("@CashDslLtrs", tripMasterModel.CashDslLtrs),
                            new SqlParameter("@CashDslAmt", tripMasterModel.CashDslAmt),
                            new SqlParameter("@TotalBhattaDays", tripMasterModel.TotalBhattaDays),
                            new SqlParameter("@BhattaRate", tripMasterModel.BhattaRate),
                            new SqlParameter("@AllowedBhatta", tripMasterModel.AllowedBhatta),
                            new SqlParameter("@OnTimeIncentiveAmt", tripMasterModel.OnTimeIncentiveAmt),
                            new SqlParameter("@MultiDelIncentiveAmt", tripMasterModel.MultiDelIncentiveAmt),
                            new SqlParameter("@PenaltyChargedToDr", tripMasterModel.PenaltyChargedToDr),
                            new SqlParameter("@PoolAcAmt", tripMasterModel.PoolAcAmt),
                            new SqlParameter("@TotalDriverAc", tripMasterModel.TotalDriverAc),
                            new SqlParameter("@TripBalance", tripMasterModel.TripBalance),
                            new SqlParameter("@RecdFromDriver", tripMasterModel.RecdFromDriver),
                            new SqlParameter("@NetTripBalance", tripMasterModel.NetTripBalance),
                            new SqlParameter("@ClBalDsl", tripMasterModel.ClBalDsl),
                            new SqlParameter("@ClBalAdBlue", tripMasterModel.ClBalAdBlue),
                            new SqlParameter("@TiclStatus", tripMasterModel.TiclStatus),
                            new SqlParameter("@TiclRemarks", tripMasterModel.TiclRemarks),
                            new SqlParameter("@TripCloseBy", tripMasterModel.TripCloseBy),
                            new SqlParameter("@TripCloseDt", tripMasterModel.TripCloseDt),
                            new SqlParameter("@TripCloseUpdateDt", tripMasterModel.TripCloseUpdateDt),
                            new SqlParameter("@TripLinkYN", tripMasterModel.TripLinkYN),
                            new SqlParameter("@TripSalDoneYN", tripMasterModel.TripSalDoneYN),
                               new SqlParameter("@ActualDays_1", tripMasterModel.ActualDays_1),
                            new SqlParameter("@ActualDays_2", tripMasterModel.ActualDays_2),
                            new SqlParameter("@Findocid", tripMasterModel.Findocid),
                            new SqlParameter("@CreatedBy", tripMasterModel.CreatedBy),
                            new SqlParameter("@CreatedDate", tripMasterModel.CreatedDate),
                            new SqlParameter("@ModifiedBy", tripMasterModel.ModifiedBy),
                            new SqlParameter("@ModifiedDate", tripMasterModel.ModifiedDate),
                            new SqlParameter("@LoggedInUser", tripMasterModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripMaster_Insert", param);

                    string TripID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        TripID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // Miss Details insert or update
                        //if (tripMasterModel.MiscList.Count > 0 && tripMasterModel.MiscList[0].ExpType != "" )
                        if (tripMasterModel.MiscList.Count > 0 && tripMasterModel.MiscList[0].ExpType != "" && TripID!="0")
                        {
                            for (int i = 0; i < tripMasterModel.MiscList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@TripId", TripID),
                                    new SqlParameter("@ExpType", tripMasterModel.MiscList[i].ExpType),
                                    new SqlParameter("@ExpParticulars", tripMasterModel.MiscList[i].Narration),
                                    new SqlParameter("@Expmt", tripMasterModel.MiscList[i].MiscAmount),
                                    new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0")
                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripDrExpDetails_Insert", paramMisc);
                            }
                        }

                        // AdBlue Details insert or update
                        //  if (tripMasterModel.AdblueList.Count > 0 && tripMasterModel.AdblueList[0].AdbluefillingStation != "")
                        if (tripMasterModel.AdblueList.Count > 0 && tripMasterModel.AdblueList[0].AdbluefillingStation != "" && TripID != "0")
                        {
                            for (int i = 0; i < tripMasterModel.AdblueList.Count; i++)
                            {
                                SqlParameter[] paramAdBlue =
                                {
                                    new SqlParameter("@TripId", TripID),
                                    new SqlParameter("@IssueBranch", tripMasterModel.AdblueList[i].AdbluefillingStation),
                                    new SqlParameter("@AdblueLtrs", tripMasterModel.AdblueList[i].AdbluedieselLiter),
                                    new SqlParameter("@AdblueAmt", tripMasterModel.AdblueList[i].AdbluedieselAmount),
                                    new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0")
                                };
                                var statusAdBlue = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripAdblueDetails_Insert", paramAdBlue);
                            }
                        }

                        //// LR Details insert or update
                        //if (tripMasterModel.TripSheetInnerGridList.LRDetailsList.Count > 0)
                        //{
                        //    for (int i = 0; i < tripMasterModel.TripSheetInnerGridList.LRDetailsList.Count; i++)
                        //    {
                        //        SqlParameter[] paramLR =
                        //        {
                        //            new SqlParameter("@TripId", TripID),
                        //            new SqlParameter("@GcNoteNo", tripMasterModel.TripSheetInnerGridList.LRDetailsList[i].GcNoteNo),
                        //            new SqlParameter("@ConsignmentId", tripMasterModel.TripSheetInnerGridList.LRDetailsList[i].ConsignmentID),
                        //            new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0"),
                        //            new SqlParameter("@LoggedInUser", tripMasterModel.LoggedInUser)
                        //        };
                        //        var statusLR = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripLRDetails_Insert", paramLR);
                        //    }
                        //}

                        //// DSL Details insert or update
                        //if (tripMasterModel.TripSheetInnerGridList.DieselDetailsList.Count > 0)
                        //{
                        //    for (int i = 0; i < tripMasterModel.TripSheetInnerGridList.DieselDetailsList.Count; i++)
                        //    {
                        //        SqlParameter[] paramLR =
                        //        {
                        //            new SqlParameter("@TripId", TripID),
                        //            new SqlParameter("@TripPaymentId", tripMasterModel.TripSheetInnerGridList.DieselDetailsList[i].PmtId),
                        //            new SqlParameter("@PmtDate", tripMasterModel.TripSheetInnerGridList.DieselDetailsList[i].PmtDate),
                        //            new SqlParameter("@DslLtrs", tripMasterModel.TripSheetInnerGridList.DieselDetailsList[i].QtyLtrs),
                        //            new SqlParameter("@DslAmt", tripMasterModel.TripSheetInnerGridList.DieselDetailsList[i].AmountPaid),
                        //            new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0"),
                        //            new SqlParameter("@LoggedInUser", tripMasterModel.LoggedInUser)
                        //        };
                        //        var statusDSL = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripDslDetails_Insert", paramLR);
                        //    }
                        //}

                        //// DR Payment Details insert or update
                        //if (tripMasterModel.TripSheetInnerGridList.DriverAdvanceList.Count > 0)
                        //{
                        //    //for (int i = 0; i < tripMasterModel.TripSheetInnerGridList.DriverAdvanceList.Count; i++)
                        //    //{
                        //    //    SqlParameter[] paramLR =
                        //    //    {
                        //    //        new SqlParameter("@TripId", TripID),
                        //    //        new SqlParameter("@TripPaymentId", tripMasterModel.TripSheetInnerGridList.DriverAdvanceList[i].PmtId),
                        //    //        new SqlParameter("@PmtDate", tripMasterModel.TripSheetInnerGridList.DriverAdvanceList[i].PmtDate),
                        //    //        new SqlParameter("@PmtAmt", tripMasterModel.TripSheetInnerGridList.DriverAdvanceList[i].AmountPaid),
                        //    //        new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0"),
                        //    //        new SqlParameter("@LoggedInUser", tripMasterModel.LoggedInUser)
                        //    //    };
                        //    //    var statusDR = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripDrPaymentDetails_Insert", paramLR);
                        //    //}
                        //}
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
        public async Task<TripSheetList> GetTripSheetList(TripSheetListRequest request)
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
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@Branch", request.Branch == "" ? DBNull.Value : request.Branch),
                            new SqlParameter("@Vehicle", request.Vehicle == "" ? DBNull.Value : request.Vehicle)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripSheetList_Select", param);

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

                                LastTripCloseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LastTripCloseDate"]),
                                NewTripDate = Convert.ToString(dataSet.Tables[0].Rows[i]["NewTripDate"]),
                                TripTime = Convert.ToString(dataSet.Tables[0].Rows[i]["TripTime"]),


                                OpenThrough = Convert.ToString(dataSet.Tables[0].Rows[i]["OpenThrough"]),

                                TripOpenBy = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOpenBy"]),
                                TripOpenDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOpenDate"]),
                                TripStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TripStatus"]),

                                DriverMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterID"]),

                                ConsignorPayParty = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignorPayParty"]),

                                CompNonCompStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["CompNonCompStatus"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                LoadingFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFrom"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),

                                Destination2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination2"]),
                                Destination3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination3"]),
                                DistanceTripKM_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM_1"]),
                                Contents = Convert.ToString(dataSet.Tables[0].Rows[i]["Contents"]),
                                LoadEmptyType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadEmptyType"]),
                                ExpectedReportingDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedReportingDt"]),
                                ExpectedReportingDays = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedReportingDays"]),
                                LtsDslToBe_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsDslToBe_1"]),
                                LtsAdblueToBe_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsAdblueToBe_1"]),
                                AdvPayable_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvPayable_1"]),
                                ReportingDt_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["ReportingDt_1"]),
                                AdvanceDays_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvanceDays_1"]),
                                DelayedDays_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DelayedDays_1"]),
                                GraceDays_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["GraceDays_1"]),
                                DeliveryDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryDate"]),
                                DetentionDays = Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionDays"]),
                                NextReportingBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["NextReportingBranch"]),
                                DistanceTripKM_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM_2"]),
                                NextExpectedReportingDt = Convert.ToString(dataSet.Tables[0].Rows[i]["NextExpectedReportingDt"]),
                                NextExpectedReportingDays = Convert.ToString(dataSet.Tables[0].Rows[i]["NextExpectedReportingDays"]),
                                LtsDslToBe_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsDslToBe_2"]),
                                LtsAdblueToBe_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsAdblueToBe_2"]),
                                AdvPayable_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvPayable_2"]),
                                ReportingDt_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["ReportingDt_2"]),
                                GraceDays_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["GraceDays_2"]),
                                OpBalDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDriver"]),
                                OpBalDsl = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDsl"]),
                                OpBalAdblue = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalAdblue"]),
                                PaidDriverAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["PaidDriverAdvance"]),
                                FreightCollByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightCollByDriver"]),
                                IssuedDslLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["IssuedDslLtrs"]),
                                IssuedAdblueLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["IssuedAdblueLtrs"]),
                                RepairsByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["RepairsByDriver"]),
                                ChallanByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanByDriver"]),
                                ParkingByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["ParkingByDriver"]),
                                AccidentByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["AccidentByDriver"]),
                                WeighmentByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["WeighmentByDriver"]),
                                OtherExpByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherExpByDriver"]),
                                TollExpByDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["TollExpByDriver"]),
                                CashDslPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["CashDslPlace"]),
                                CashDslLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["CashDslLtrs"]),
                                CashDslAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CashDslAmt"]),
                                TotalBhattaDays = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBhattaDays"]),
                                BhattaRate = Convert.ToString(dataSet.Tables[0].Rows[i]["BhattaRate"]),
                                AllowedBhatta = Convert.ToString(dataSet.Tables[0].Rows[i]["AllowedBhatta"]),
                                OnTimeIncentiveAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnTimeIncentiveAmt"]),
                                MultiDelIncentiveAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["MultiDelIncentiveAmt"]),
                                PenaltyChargedToDr = Convert.ToString(dataSet.Tables[0].Rows[i]["PenaltyChargedToDr"]),
                                PoolAcAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PoolAcAmt"]),
                                TotalDriverAc = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDriverAc"]),
                                TripBalance = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBalance"]),
                                RecdFromDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdFromDriver"]),
                                NetTripBalance = Convert.ToString(dataSet.Tables[0].Rows[i]["NetTripBalance"]),
                                ClBalDsl = Convert.ToString(dataSet.Tables[0].Rows[i]["ClBalDsl"]),
                                ClBalAdBlue = Convert.ToString(dataSet.Tables[0].Rows[i]["ClBalAdBlue"]),
                                TiclStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["TiclStatus"]),
                                TiclRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["TiclRemarks"]),
                                TripCloseBy = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseBy"]),
                                TripCloseDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TripCloseDt"]),
                                TripLinkYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripLinkYN"]),
                                TripSalDoneYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripSalDoneYN"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                TripBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBrName"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DrName = Convert.ToString(dataSet.Tables[0].Rows[i]["DrName"]),
                                FrPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FrPlace"]),
                                TPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TPlace"]),
                                VehicleTypeGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeGroupId"]),
                                ActualDays_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualDays_1"]),
                                ActualDays_2 = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualDays_2"])

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
            return tripSheetList;
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
                            new SqlParameter("@TripKms", request.TripKms)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetIncentiveRate", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                      //  responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
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
        public async Task<DriverDetailModel> GetDriverDetail(DriverRequestModel request)
        {
            DriverDetailModel driverDetailModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DriverMasterID", request.DriverMasterID),

                 
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
        public async Task<TripSheetInnerGridListModel> GetTripSheetInnerGridList(TripSheetInnerGridListRequest request)
        {
            TripSheetInnerGridListModel tripSheetInnerGridList = new()
            {
                LRDetailsList = new List<LRDetailsModel>(),
                DieselDetailsList = new List<DieselDetailsModel>(),
                DriverAdvanceList = new List<DriverAdvanceModel>(),
                MiscList = new List<MiscListModel>(),
                AdblueList = new List<AdblueListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripId", request.TripId),
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripSheetInnerGridList_Select", param);

                    //LR Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.LRDetailsList.Add(new LRDetailsModel
                            {
                                ConsignmentID = Convert.ToString(resultData.Tables[0].Rows[i]["ConsignmentID"]),
                                GcNoteNo = Convert.ToString(resultData.Tables[0].Rows[i]["GcNoteNo"]),
                                CneeCode = Convert.ToString(resultData.Tables[0].Rows[i]["CneeCode"]),
                                CnorInvNo = Convert.ToString(resultData.Tables[0].Rows[i]["CnorInvNo"]),
                                EwayBillNo = Convert.ToString(resultData.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(resultData.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(resultData.Tables[0].Rows[i]["EwayBillExpDate"]),
                            });
                        }
                    }
                    //Diseal Details
                    if (resultData != null && resultData.Tables[1].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[1].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DieselDetailsList.Add(new DieselDetailsModel
                            {
                                PmtId = Convert.ToString(resultData.Tables[1].Rows[i]["PmtId"]),
                                PmtDate = Convert.ToString(resultData.Tables[1].Rows[i]["PmtDate"]),
                                QtyLtrs = Convert.ToString(resultData.Tables[1].Rows[i]["QtyLtrs"]),
                                AmountPaid = Convert.ToString(resultData.Tables[1].Rows[i]["AmountPaid"]),
                                VendorName = Convert.ToString(resultData.Tables[1].Rows[i]["VendorName"]),
                            });
                        }
                    }
                    //Driver Adv Details
                    if (resultData != null && resultData.Tables[2].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[2].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DriverAdvanceList.Add(new DriverAdvanceModel
                            {
                                PmtId = Convert.ToString(resultData.Tables[2].Rows[i]["PmtId"]),
                                PmtDate = Convert.ToString(resultData.Tables[2].Rows[i]["PmtDate"]),
                                AmountPaid = Convert.ToString(resultData.Tables[2].Rows[i]["AmountPaid"]),
                                Ptype = Convert.ToString(resultData.Tables[2].Rows[i]["Ptype"]),
                            });
                        }
                    }

                    //Misc Details
                    if (resultData != null && resultData.Tables[3].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[3].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.MiscList.Add(new MiscListModel
                            {
                                ExpType = Convert.ToString(resultData.Tables[3].Rows[i]["ExpType"]),
                                Narration = Convert.ToString(resultData.Tables[3].Rows[i]["Narration"]),
                                MiscAmount = Convert.ToString(resultData.Tables[3].Rows[i]["MiscAmount"]),
                            });
                        }
                    }

                    //Adblue Details
                    if (resultData != null && resultData.Tables[4].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[4].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.AdblueList.Add(new AdblueListmodel
                            {
                                AdbluefillingStation = Convert.ToString(resultData.Tables[4].Rows[i]["AdbluefillingStation"]),
                                AdbluedieselLiter = Convert.ToString(resultData.Tables[4].Rows[i]["AdbluedieselLiter"]),
                                AdbluedieselAmount = Convert.ToString(resultData.Tables[4].Rows[i]["AdbluedieselAmount"]),
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
            return tripSheetInnerGridList;
        }

        public async Task<TripSheetList> GetOtherTripOpenList(TripSheetListRequest request)
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
                            new SqlParameter("@Branch", request.Branch)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOtherTripOpenList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            otherTripList.Add(new TripMasterModel
                            {
                                TripId = Convert.ToString(dataSet.Tables[0].Rows[i]["OthTripOpenId"]),
                                TripBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                TripBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                VehicleMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TripNo"]),
                                NewTripDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripDate"]),
                                OpenThrough = Convert.ToString(dataSet.Tables[0].Rows[i]["OpenThrough"]),
                                DriverMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterID"]),
                                CompNonCompStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["CompNonCompStatus"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RCM_Chno"]),
                                LoadingFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFrom"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                DistanceTripKM_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceTripKM_1"]),
                                Contents = Convert.ToString(dataSet.Tables[0].Rows[i]["ContentsDesc"]),
                                LoadEmptyType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadEmptyType"]),
                                ExpectedReportingDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedReportingDt"]),
                                ExpectedReportingDays = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedReportingDays"]),
                                LtsDslToBe_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsDslToBe_1"]),
                                LtsAdblueToBe_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["LtsAdblueToBe_1"]),
                                AdvPayable_1 = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvPayable_1"]),
                                OpBalDriver = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDriver"]),
                                OpBalDsl = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalDsl"]),
                                OpBalAdblue = Convert.ToString(dataSet.Tables[0].Rows[i]["OpBalAdblue"]),                                
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
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@OthTripOpenId"           , tripMasterModel.TripId),
                            new SqlParameter("@BranchCode"              , tripMasterModel.TripBranch),
                            new SqlParameter("@YearId"                  , tripMasterModel.YearId),
                            new SqlParameter("@VehicleMasterID"         , tripMasterModel.VehicleMasterID),
                            new SqlParameter("@TripNo"                  , tripMasterModel.TripNo),
                            new SqlParameter("@TripDate"                , tripMasterModel.NewTripDate),
                            new SqlParameter("@OpenThrough"             , tripMasterModel.OpenThrough),
                            new SqlParameter("@DriverMasterID"          , tripMasterModel.DriverMasterID),
                            new SqlParameter("@CompNonCompStatus"       , tripMasterModel.CompNonCompStatus),
                            new SqlParameter("@RCM_Chno"                , tripMasterModel.ChallanNo),
                            new SqlParameter("@LoadingFrom"             , tripMasterModel.LoadingFrom),
                            new SqlParameter("@Destination"             , tripMasterModel.Destination),
                            new SqlParameter("@DistanceTripKM_1"        , tripMasterModel.DistanceTripKM_1),
                            new SqlParameter("@ContentsDesc"            , tripMasterModel.Contents),
                            new SqlParameter("@LoadEmptyType"           , tripMasterModel.LoadEmptyType),
                            new SqlParameter("@ExpectedReportingDt"     , tripMasterModel.ExpectedReportingDt),
                            new SqlParameter("@ExpectedReportingDays"   , tripMasterModel.ExpectedReportingDays),
                            new SqlParameter("@LtsDslToBe_1"            , tripMasterModel.LtsDslToBe_1),
                            new SqlParameter("@LtsAdblueToBe_1"         , tripMasterModel.LtsAdblueToBe_1),
                            new SqlParameter("@AdvPayable_1"            , tripMasterModel.AdvPayable_1),
                            new SqlParameter("@OpBalDriver"             , tripMasterModel.OpBalDriver),
                            new SqlParameter("@OpBalDsl"                , tripMasterModel.OpBalDsl),
                            new SqlParameter("@OpBalAdblue"             , tripMasterModel.OpBalAdblue),
                            new SqlParameter("@LoggedInUser"            , tripMasterModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_OtherTripOpenSave", param);

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

        public async Task<ResponseModel> OtherTripOpenDelete(Request request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@OthTripOpenId", request.strRequest),                           
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_OtherTripOpenDelete", param);

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
        public async Task<ResponseModel> GetNextTripNo(OpBalModel tripNoFilter)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterID", tripNoFilter.VehicleMasterID),
                            new SqlParameter("@YearID", tripNoFilter.Yearid),
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

    }

}
