using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetMasters.Repository
{
    public class DocRenewalMasterRepository : IDocRenewalMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DocRenewalMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type master details
        /// </summary>
        /// <param name="DocRenewalMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel docRenewalMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocRenewalID", docRenewalMasterModel.DocRenewalID),
                            new SqlParameter("@DocCode", docRenewalMasterModel.DocCode),
                            new SqlParameter("@DocDescription", docRenewalMasterModel.DocDescription),
                               new SqlParameter("@DocDescription", docRenewalMasterModel.DocDescription),
                                  new SqlParameter("@ReminderDays", docRenewalMasterModel.ReminderDays),
                                        new SqlParameter("@DebitType", docRenewalMasterModel.DebitType),
                                           new SqlParameter("@DebitType", docRenewalMasterModel.DebitType),
                            new SqlParameter("@IsActive", docRenewalMasterModel.IsActive),
                             new SqlParameter("@LoggedInUser", docRenewalMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DocRenewalMaster_Insert", param);

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
