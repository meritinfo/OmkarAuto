using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetMasters.Repository
{
    public class VehicleFltMasterRepository : IVehicleFltMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleFltMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle flt master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                           new SqlParameter("@VehicleMasterID", vehicleFltMasterModel.VehicleMasterID),
                           new SqlParameter("@VehicleNo", vehicleFltMasterModel.VehicleNo),
                           new SqlParameter("@FleetStation", vehicleFltMasterModel.FleetStation),
                           new SqlParameter("@RegnDate", vehicleFltMasterModel.RegnDate),
                           new SqlParameter("@RegdOwner", vehicleFltMasterModel.RegdOwner),
                           new SqlParameter("@ChasisNo", vehicleFltMasterModel.ChasisNo),
                           new SqlParameter("@EngineNo", vehicleFltMasterModel.EngineNo),
                           new SqlParameter("@VehicleTypeID", vehicleFltMasterModel.VehicleTypeID),
                       
                           new SqlParameter("@VehMfrId", vehicleFltMasterModel.VehMfrId),
                           new SqlParameter("@MfrModelName", vehicleFltMasterModel.MfrModelName),
                           new SqlParameter("@FuelType", vehicleFltMasterModel.FuelType),
                           new SqlParameter("@MakeYear", vehicleFltMasterModel.MakeYear),
                           new SqlParameter("@TankCap", vehicleFltMasterModel.TankCap),
                           new SqlParameter("@GrossWt", vehicleFltMasterModel.GrossWt),
                           new SqlParameter("@UnLadenWT", vehicleFltMasterModel.UnLadenWT),
                           new SqlParameter("@NoOfTyres", vehicleFltMasterModel.NoOfTyres),
                           new SqlParameter("@MileageLt", vehicleFltMasterModel.MileageLt),
                           new SqlParameter("@VehLength", vehicleFltMasterModel.VehLength),
                           new SqlParameter("@VehBreadth", vehicleFltMasterModel.VehBreadth),
                           new SqlParameter("@VehHeight", vehicleFltMasterModel.VehHeight),
                           new SqlParameter("@VehVolumeCFT", vehicleFltMasterModel.VehVolumeCFT),
                           new SqlParameter("@Remarks", vehicleFltMasterModel.Remarks),
                           new SqlParameter("@OwnershipType", vehicleFltMasterModel.OwnershipType),
                           new SqlParameter("@FastTagYN", vehicleFltMasterModel.FastTagYN),
                           new SqlParameter("@FastTagCo", vehicleFltMasterModel.FastTagCo),
                           new SqlParameter("@FastTagNo", vehicleFltMasterModel.FastTagNo),
                           new SqlParameter("@PetroCardYN", vehicleFltMasterModel.PetroCardYN),
                           new SqlParameter("@PetroCo", vehicleFltMasterModel.PetroCo),
                           new SqlParameter("@PetroCardNo", vehicleFltMasterModel.PetroCardNo),
                           new SqlParameter("@PetroCardPin", vehicleFltMasterModel.PetroCardPin),
                           new SqlParameter("@HappayCardYN", vehicleFltMasterModel.HappayCardYN),
                           new SqlParameter("@HappayCardNo", vehicleFltMasterModel.HappayCardNo),
                           new SqlParameter("@HappayCardPin", vehicleFltMasterModel.HappayCardPin),
                           new SqlParameter("@FipYN", vehicleFltMasterModel.FipYN),
                           new SqlParameter("@FipNo", vehicleFltMasterModel.FipNo),
                           new SqlParameter("@SoldYN", vehicleFltMasterModel.SoldYN),
                           new SqlParameter("@SoldTo", vehicleFltMasterModel.SoldTo),
                           new SqlParameter("@SoldDate", vehicleFltMasterModel.SoldDate),
                           new SqlParameter("@SoldValue", vehicleFltMasterModel.SoldValue),
                           new SqlParameter("@TfrYN", vehicleFltMasterModel.TfrYN),
                           new SqlParameter("@TfrDate", vehicleFltMasterModel.TfrDate),
                           new SqlParameter("@TfrVehicleNo", vehicleFltMasterModel.TfrVehicleNo),
                           new SqlParameter("@TfrVehicleId", vehicleFltMasterModel.TfrVehicleId),
                           new SqlParameter("@VehicleLedgerAc", vehicleFltMasterModel.VehicleLedgerAc),
                           new SqlParameter("@VehicleAssetAc", vehicleFltMasterModel.VehicleAssetAc),
                           new SqlParameter("@Attach1Desc", vehicleFltMasterModel.Attach1Desc),
                           new SqlParameter("@Attach1Link", vehicleFltMasterModel.Attach1Link),
                           new SqlParameter("@Attach2Desc", vehicleFltMasterModel.Attach2Desc),
                           new SqlParameter("@Attach2Link", vehicleFltMasterModel.Attach2Link),
                           new SqlParameter("@Attach3Desc", vehicleFltMasterModel.Attach3Desc),
                           new SqlParameter("@Attach3Desc", vehicleFltMasterModel.Attach3Desc),
                           new SqlParameter("@DeleteFlag", vehicleFltMasterModel.DeleteFlag),
                           new SqlParameter("@LoggedInUser", vehicleFltMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleFltMaster_Insert", param);

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
