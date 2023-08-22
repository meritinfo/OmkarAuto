using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

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
                            new SqlParameter("@Findocid", tripMasterModel.Findocid),
                            new SqlParameter("@CreatedBy", tripMasterModel.CreatedBy),
                            new SqlParameter("@CreatedDate", tripMasterModel.CreatedDate),
                            new SqlParameter("@ModifiedBy", tripMasterModel.ModifiedBy),
                            new SqlParameter("@ModifiedDate", tripMasterModel.ModifiedDate),
                            new SqlParameter("@LoggedInUser", tripMasterModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripMaster_Insert", param);

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
        public async Task<List<BranchListModel>> GetDriverList()
        {
            List<BranchListModel> driverList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            driverList.Add(new BranchListModel
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
                            new SqlParameter("@Search", request.Search)
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
    }

}
