using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Repository
{
    public class MenuFormTypesRepository : IMenuFormTypesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public MenuFormTypesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> MenuFormTypesSave(MenuFormTypesModel menuFormTypesModel)
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
                            new SqlParameter("@MenuId", menuFormTypesModel.MenuId),
                            new SqlParameter("@MenuCode", menuFormTypesModel.MenuCode),
                            new SqlParameter("@MenuName", menuFormTypesModel.MenuName),
                            new SqlParameter("@MenuType", menuFormTypesModel.MenuType),
                            new SqlParameter("@ModuleId", menuFormTypesModel.ModuleId),
                            new SqlParameter("@ActiveYN", menuFormTypesModel.ActiveYN)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "MenuFormTypes_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
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
