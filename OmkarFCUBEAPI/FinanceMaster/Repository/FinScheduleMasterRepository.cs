using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FinanceMasters.Repository
{
    public class FinScheduleMasterRepository : IFinScheduleMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FinScheduleMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin schedule master  details
        /// </summary>
        /// <param name="finScheduleMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finScheduleMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SchID", finScheduleMasterModel.SchID),
                            new SqlParameter("@SchType", finScheduleMasterModel.SchType),
                            new SqlParameter("@SchDesc", finScheduleMasterModel.SchDesc),
                            new SqlParameter("@SortId", finScheduleMasterModel.SortId),
                            new SqlParameter("@IsActive", finScheduleMasterModel.IsActive),
                            new SqlParameter("@LoggedInUser", finScheduleMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FinScheduleMaster_Insert", param);

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
