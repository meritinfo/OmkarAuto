
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public class FreightRatesDtlRepository : IFreightRatesDtlRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FreightRatesDtlRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name="productMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FreightRatesDtlSave(FreightRatesDtlModel freightRatesDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DtlId", freightRatesDtlModel.DtlId),
                            new SqlParameter("@MasterID", freightRatesDtlModel.MasterID),
                            new SqlParameter("@DestState", freightRatesDtlModel.DestState),
                            new SqlParameter("@ToPlace", freightRatesDtlModel.ToPlace),
                            new SqlParameter("@RateTypeId", freightRatesDtlModel.RateTypeId),
                            new SqlParameter("@Rate", freightRatesDtlModel.Rate),
                        
                    

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "freightRatesDtl_Insert", param);

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
