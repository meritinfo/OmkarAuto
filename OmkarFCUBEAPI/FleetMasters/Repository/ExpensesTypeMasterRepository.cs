using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FleetMasters.Repository
{
    public class ExpensesTypeMasterRepository : IExpensesTypeMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ExpensesTypeMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ExpensesTypeMasterSave(ExpensesTypeMasterModel expensesTypeMasterModel)
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
                            new SqlParameter("@ExpTypeMasterID", expensesTypeMasterModel.ExpTypeMasterID),
                            new SqlParameter("@ExpCode", expensesTypeMasterModel.ExpCode),
                            new SqlParameter("@ExpDesc", expensesTypeMasterModel.ExpDesc),
                            new SqlParameter("@AffectAcYN", expensesTypeMasterModel.AffectAcYN),
                            new SqlParameter("@LoggedInUser", expensesTypeMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "ExpensesTypeMaster_Insert", param);

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
    }
}
