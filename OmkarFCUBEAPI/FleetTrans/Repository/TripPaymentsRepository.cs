using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

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
                            new SqlParameter("@DriverMasterID", tripPaymentsModel.DriverMasterID),
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

        /// <summary>
        /// Service method for get branch list
        /// </summary>
        /// <returns>List<BranchListModel></returns>


    }
}
