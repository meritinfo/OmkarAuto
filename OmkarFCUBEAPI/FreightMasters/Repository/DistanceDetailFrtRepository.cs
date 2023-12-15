using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace FreightMasters.Repository
{
    public class DistanceDetailFrtRepository : IDistanceDetailFrtRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DistanceDetailFrtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          new SqlParameter("@DistanceDtlID", distanceDetailFrtModel.DistanceDtlID),
                            new SqlParameter("@MasterID", distanceDetailFrtModel.MasterID),
                            new SqlParameter("@FromLocation", distanceDetailFrtModel.FromLocation),
                            new SqlParameter("@ToLocation", distanceDetailFrtModel.ToLocation),
                            new SqlParameter("@KMS", distanceDetailFrtModel.KMS)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistannceDetailFrt_Insert2", param);

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
