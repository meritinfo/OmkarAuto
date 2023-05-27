using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FreightMasters.Repository
{
    public class DistanceDetailTripRepository : IDistanceDetailTripRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DistanceDetailTripRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DistanceDtlID", distanceDetailTripModel.DistanceDtlID),
                            new SqlParameter("@MasterID", distanceDetailTripModel.MasterID),
                            new SqlParameter("@FromLocation", distanceDetailTripModel.FromLocation),
                            new SqlParameter("@ToLocation", distanceDetailTripModel.ToLocation),
                            new SqlParameter("@KMS", distanceDetailTripModel.KMS),
                            new SqlParameter("@EnrouteExpTaurus", distanceDetailTripModel.EnrouteExpTaurus),
                            new SqlParameter("@EnrouteExpTaurusRemarks", distanceDetailTripModel.EnrouteExpTaurusRemarks),
                            new SqlParameter("@TollTaxTaurus", distanceDetailTripModel.TollTaxTaurus),
                            new SqlParameter("@TollTaxTaurusRemarks", distanceDetailTripModel.TollTaxTaurusRemarks),
                            new SqlParameter("@OthExpTaurus", distanceDetailTripModel.OthExpTaurus),
                            new SqlParameter("@OthExpTaurusRemarks", distanceDetailTripModel.OthExpTaurusRemarks),
                            new SqlParameter("@EnrouteExpTrailer", distanceDetailTripModel.EnrouteExpTrailer),
                            new SqlParameter("@EnrouteExpTrailerRemarks", distanceDetailTripModel.EnrouteExpTrailerRemarks),
                            new SqlParameter("@TollTaxTrailer", distanceDetailTripModel.TollTaxTrailer),
                            new SqlParameter("@TollTaxTrailerRemarks", distanceDetailTripModel.TollTaxTrailerRemarks),
                            new SqlParameter("@OthExpTrailer", distanceDetailTripModel.OthExpTrailer),
                            new SqlParameter("@OthExpTrailerRemarks", distanceDetailTripModel.OthExpTrailerRemarks),
                            new SqlParameter("@EnrouteExpEmpty", distanceDetailTripModel.EnrouteExpEmpty),
                            new SqlParameter("@EnrouteExpEmptyRemarks", distanceDetailTripModel.OthExpTrailerRemarks),
                            new SqlParameter("@TollTaxEmpty", distanceDetailTripModel.TollTaxEmpty),
                            new SqlParameter("@TollTaxEmptyRemarks", distanceDetailTripModel.TollTaxEmptyRemarks),
                            new SqlParameter("@OthExpEmpty", distanceDetailTripModel.OthExpEmpty),
                            new SqlParameter("@OthExpEmptyRemarks", distanceDetailTripModel.OthExpEmptyRemarks),




                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistannceDetailTrip_Insert", param);

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
