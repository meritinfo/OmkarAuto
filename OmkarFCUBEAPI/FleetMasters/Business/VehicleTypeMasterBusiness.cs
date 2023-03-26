using FleetMasters.Models;
using FleetMasters.Repository;

namespace FleetMasters.Business
{
    public class VehicleTypeMasterBusiness : IVehicleTypeMasterBusiness
    {
        readonly IVehicleTypeMasterRepository vehicleTypeMasterRepository;
        public VehicleTypeMasterBusiness(IVehicleTypeMasterRepository _vehicleTypeMasterRepository)
        {
            vehicleTypeMasterRepository = _vehicleTypeMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        public async Task<ResponseModel> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel)
        {
            return await vehicleTypeMasterRepository.VehicleTypeMasterSave(vehicleTypeMasterModel);
        }
    }
}
