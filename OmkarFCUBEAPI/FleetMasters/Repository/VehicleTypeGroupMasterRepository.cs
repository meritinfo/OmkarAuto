using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetMasters.Repository
{    public class VehicleTypeGroupMasterRepository : IVehicleTypeGroupMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleTypeGroupMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleTypeGroupId", vehicleTypeGroupMasterModel.VehicleTypeGroupId),
                            new SqlParameter("@VehicleTypeGroupName", vehicleTypeGroupMasterModel.VehicleTypeGroupName),
                            new SqlParameter("@IsActive", vehicleTypeGroupMasterModel.IsActive),
                             new SqlParameter("@LoggedInUser", vehicleTypeGroupMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleTypeGroupMaster_Insert", param);

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
