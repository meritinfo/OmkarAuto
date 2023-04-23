
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using AdminMasters.Models;

namespace AdminMasters.Repository
{
    public class MenuFormTypesRepository : IMenuFormTypesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public MenuFormTypesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> MenuFormTypesSave(MenuFormTypesModel menuFormTypesModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MenuId", menuFormTypesModel.MenuId),
                            new SqlParameter("@MenuCode", menuFormTypesModel.MenuCode),
                            new SqlParameter("@MenuName", menuFormTypesModel.MenuName),
                            new SqlParameter("@MenuType", menuFormTypesModel.MenuType),
                             new SqlParameter("@ModuleId", menuFormTypesModel.ModuleId),
                               new SqlParameter("@ActiveYN", menuFormTypesModel.ActiveYN)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "MenuFormTypes_Insert", param);

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
