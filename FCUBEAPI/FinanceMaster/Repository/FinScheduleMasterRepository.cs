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
                            new SqlParameter("@SchID", finScheduleMasterModel.SchID),
                            new SqlParameter("@SchType", finScheduleMasterModel.SchType),
                            new SqlParameter("@SchDesc", finScheduleMasterModel.SchDesc),
                            new SqlParameter("@SortId", finScheduleMasterModel.SortId),
                            new SqlParameter("@IsActive", finScheduleMasterModel.IsActive),
                            new SqlParameter("@LoggedInUser", finScheduleMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "FinScheduleMaster_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
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
                transaction.Rollback();
            }
            return responseModel;
        }
    }
}
