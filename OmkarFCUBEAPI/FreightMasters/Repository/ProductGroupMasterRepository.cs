
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public class ProductGroupMasterRepository : IProductGroupMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ProductGroupMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="ProductGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel ProductGroupMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ProductGroupId", ProductGroupMasterModel.ProductGroupId),
                            new SqlParameter("@GroupName", ProductGroupMasterModel.GroupName),
                            new SqlParameter("@GstHSN", ProductGroupMasterModel.GstHSN),
                             new SqlParameter("@LoggedInUser", ProductGroupMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ProductGroupMasterDetails_Insert", param);

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
