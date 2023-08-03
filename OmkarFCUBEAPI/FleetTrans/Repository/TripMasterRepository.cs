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
    }
}
