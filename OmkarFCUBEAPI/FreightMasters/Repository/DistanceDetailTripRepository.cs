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
                          //  new SqlParameter("@EnrouteExpTaurus", distanceDetailTripModel.EnrouteExpTaurus),
                            new SqlParameter("@EnrouteExpTruck", distanceDetailTripModel.EnrouteExpTruck),
                            new SqlParameter("@EnrouteExpTrailer", distanceDetailTripModel.EnrouteExpTrailer),
                            new SqlParameter("@EnrouteExpCarCarrier", distanceDetailTripModel.EnrouteExpCarCarrier),
                            new SqlParameter("@EnrouteExpEmpty", distanceDetailTripModel.EnrouteExpEmpty),
                            new SqlParameter("@EnrouteExpRemarks", distanceDetailTripModel.EnrouteExpRemarks),
                            new SqlParameter("@DefineTollExp", distanceDetailTripModel.DefineTollExp),
                       




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
