using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace Consignment.Repository
{
    public class ConsignmentRepository : IConsignmentRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ConsignmentRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin accounts master details
        /// </summary>
        /// <param name="ConsignmentModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ConsignmentSave(ConsignmentModel ConsignmentModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ConsignmentID", ConsignmentModel.ConsignmentID),
                            new SqlParameter("@BookingPlace", ConsignmentModel.BookingPlace),
                            new SqlParameter("@GcSeries", ConsignmentModel.GcSeries),
                            new SqlParameter("@GcAlpha", ConsignmentModel.GcAlpha),
                            new SqlParameter("@GcNoteNo", ConsignmentModel.GcNoteNo),
                            new SqlParameter("@BookingDate", ConsignmentModel.BookingDate),
                            new SqlParameter("@BookingStatus", ConsignmentModel.BookingStatus),
                            new SqlParameter("@GcAlpha", ConsignmentModel.GcAlpha),
                            new SqlParameter("@EwayBillEntryType", ConsignmentModel.EwayBillEntryType),
                            new SqlParameter("@EwayBillNo", ConsignmentModel.EwayBillNo),
                            new SqlParameter("@EwayBillDate", ConsignmentModel.EwayBillDate),
                            new SqlParameter("@EwayBillExpDate", ConsignmentModel.EwayBillExpDate),
                            new SqlParameter("@EwayBillExpExtDate", ConsignmentModel.EwayBillExpExtDate),
                            new SqlParameter("@FromPlace", ConsignmentModel.FromPlace),
                            new SqlParameter("@ToPlace", ConsignmentModel.ToPlace),
                            new SqlParameter("@Kms", ConsignmentModel.Kms),
                            new SqlParameter("@BillingBranch", ConsignmentModel.BillingBranch),
                            new SqlParameter("@CnorCode", ConsignmentModel.CnorCode),
                            new SqlParameter("@CneeCode", ConsignmentModel.CneeCode),
                            new SqlParameter("@CnorInvNo", ConsignmentModel.CnorInvNo),
                            new SqlParameter("@CnorInvDate", ConsignmentModel.CnorInvDate),
                            new SqlParameter("@IndentNo1", ConsignmentModel.IndentNo1),
                            new SqlParameter("@IndentDt1", ConsignmentModel.IndentDt1),
                            new SqlParameter("@PoNo", ConsignmentModel.PoNo),
                            new SqlParameter("@PoDate", ConsignmentModel.PoDate),
                            new SqlParameter("@WoNo", ConsignmentModel.WoNo),
                            new SqlParameter("@WoDate", ConsignmentModel.WoDate),
                            new SqlParameter("@ProjectNo", ConsignmentModel.ProjectNo),
                            new SqlParameter("@ProjectDt", ConsignmentModel.ProjectDt),
                            new SqlParameter("@ShipmentNo", ConsignmentModel.ShipmentNo),
                            new SqlParameter("@ShipmentDt", ConsignmentModel.ShipmentDt),
                            new SqlParameter("@DeliveryNo", ConsignmentModel.DeliveryNo),
                            new SqlParameter("@DeliveryDt", ConsignmentModel.DeliveryDt),
                            new SqlParameter("@RiskBy", ConsignmentModel.RiskBy),
                            new SqlParameter("@InsCoName", ConsignmentModel.InsCoName),
                            new SqlParameter("@InsPolicyNo", ConsignmentModel.InsPolicyNo),
                            new SqlParameter("@InsValidDt", ConsignmentModel.InsValidDt),
                            new SqlParameter("@InsuredValue", ConsignmentModel.InsuredValue),
                            new SqlParameter("@BillingParty", ConsignmentModel.BillingParty),
                            new SqlParameter("@OwnTruck", ConsignmentModel.OwnTruck),
                            new SqlParameter("@TruckId", ConsignmentModel.TruckId),
                            new SqlParameter("@TruckNo", ConsignmentModel.TruckNo),
                            new SqlParameter("@ProductId", ConsignmentModel.ProductId),
                            new SqlParameter("@ClassId", ConsignmentModel.ClassId),
                            new SqlParameter("@GstHSN", ConsignmentModel.GstHSN),
                            new SqlParameter("@NoPackages", ConsignmentModel.NoPackages),
                            new SqlParameter("@LooseFlag", ConsignmentModel.LooseFlag),
                            new SqlParameter("@WeightType", ConsignmentModel.WeightType),
                            new SqlParameter("@ActualWt", ConsignmentModel.ActualWt),
                            new SqlParameter("@SenderWt", ConsignmentModel.SenderWt),
                            new SqlParameter("@Chargewt", ConsignmentModel.Chargewt),
                            new SqlParameter("@BulkYN", ConsignmentModel.BulkYN),
                            new SqlParameter("@LoadLength", ConsignmentModel.LoadLength),
                            new SqlParameter("@LoadWidth", ConsignmentModel.LoadWidth),
                            new SqlParameter("@LoadHeight", ConsignmentModel.LoadHeight),
                            new SqlParameter("@LoadCFT", ConsignmentModel.LoadCFT),
                            new SqlParameter("@DelType", ConsignmentModel.DelType),
                            new SqlParameter("@DelType", ConsignmentModel.DelType),
                            new SqlParameter("@LoadType", ConsignmentModel.LoadType),
                            new SqlParameter("@RateType", ConsignmentModel.RateType),
                            new SqlParameter("@PrivateMark", ConsignmentModel.PrivateMark),
                            new SqlParameter("@StaxGstBy", ConsignmentModel.StaxGstBy),
                            new SqlParameter("@DeclaredValue", ConsignmentModel.DeclaredValue),
                            new SqlParameter("@DeliveredYN", ConsignmentModel.DeliveredYN),
                            new SqlParameter("@LdReportingDateTime", ConsignmentModel.LdReportingDateTime),
                            new SqlParameter("@DespatchDateTime", ConsignmentModel.DespatchDateTime),
                            new SqlParameter("@LdDetentionDays", ConsignmentModel.LdDetentionDays),
                            new SqlParameter("@UlReportingDateTime", ConsignmentModel.UlReportingDateTime),
                            new SqlParameter("@DeliveryDateTime", ConsignmentModel.DeliveryDateTime),
                            new SqlParameter("@UlDetentionDays", ConsignmentModel.UlDetentionDays),
                            new SqlParameter("@CnBilledYN", ConsignmentModel.CnBilledYN),
                            new SqlParameter("@CnBilledYN", ConsignmentModel.CnBilledYN),
                            new SqlParameter("@CnBillDate", ConsignmentModel.CnBillDate),
                            new SqlParameter("@GeneralRemarks", ConsignmentModel.GeneralRemarks),
                            new SqlParameter("@IncludeCnYn", ConsignmentModel.IncludeCnYn),
                            new SqlParameter("@IncludeCnNo", ConsignmentModel.IncludeCnNo),
                            new SqlParameter("@Attachedfile", ConsignmentModel.Attachedfile),
                            new SqlParameter("@YearId", ConsignmentModel.YearId),
                            new SqlParameter("@DeleteFlag", ConsignmentModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", ConsignmentModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Consignment_Insert", param);

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
