
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public class FreightRatesMstRepository : IFreightRatesMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FreightRatesMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name="productMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FreightRatesMstSave(FreightRatesMstModel freightRatesMstModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", freightRatesMstModel.MasterID),
                            new SqlParameter("@Accountid", freightRatesMstModel.Accountid),
                            new SqlParameter("@FromPlace", freightRatesMstModel.FromPlace),
                            new SqlParameter("@ValidFrom", freightRatesMstModel.ValidFrom),
                            new SqlParameter("@ValidUpto", freightRatesMstModel.ValidUpto),
                            new SqlParameter("@RateTypeId", freightRatesMstModel.RateTypeId),
                            new SqlParameter("@RateMethod", freightRatesMstModel.RateMethod),
                            new SqlParameter("@RateForStateOrToPlace", freightRatesMstModel.RateForStateOrToPlace),
                            new SqlParameter("@CreatedBy", freightRatesMstModel.CreatedBy),
                            new SqlParameter("@CreatedDate", freightRatesMstModel.RateMethod),
                            new SqlParameter("@ModifiedBy", freightRatesMstModel.RateForStateOrToPlace),
                            new SqlParameter("@ModifiedDate", freightRatesMstModel.CreatedBy),

                           new SqlParameter("@LoggedInUser", freightRatesMstModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "freightRatesMst_Insert", param);

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
