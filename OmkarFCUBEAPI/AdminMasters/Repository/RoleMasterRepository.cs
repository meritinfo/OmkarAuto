
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using AdminMasters.Models;

namespace AdminMasters.Repository
{
    public class RoleMasterRepository : IRoleMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public RoleMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> RoleMasterSave(RoleMasterModel roleMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RoleId", roleMasterModel.RoleId),
                            new SqlParameter("@RoleName", roleMasterModel.RoleName),
                            new SqlParameter("@RoleDesc", roleMasterModel.RoleDesc),
                            new SqlParameter("@ActiveYN", roleMasterModel.ActiveYN),
                             new SqlParameter("@LoggedInUser", roleMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "RoleType_Insert", param);

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
