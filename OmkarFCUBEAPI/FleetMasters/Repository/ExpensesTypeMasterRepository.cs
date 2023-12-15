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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ExpensesTypeMaster_Insert", param);

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
