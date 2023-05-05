using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FreightMasters.Repository
{
    public class RatetypesRepository:IRatetypesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public RatetypesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="ratetypesModel"></param>
        /// <returns>ResponseModel</returns>
        /// 

        public async Task<ResponseModel> RatetypesDetailsSave(RatetypesModel ratetypesModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RateTypeId", ratetypesModel.RateTypeId),
                            new SqlParameter("@RateDesc", ratetypesModel.RateDesc),
                            new SqlParameter("@RateMethod", ratetypesModel.RateMethod),
                            new SqlParameter("@DeleteFlag", ratetypesModel.DeleteFlag),
                            new SqlParameter("@LoggedInUser", ratetypesModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "Ratetypes_Insert", param);

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
               
            }
            return responseModel;
        }

    }
}
