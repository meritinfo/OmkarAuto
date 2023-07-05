using FleetMasters.Models;
using FleetMasters.Repository;

namespace FleetMasters.Business
{
    public class VehicleFltMasterBusiness : IVehicleFltMasterBusiness
    {
        readonly IVehicleFltMasterRepository vehicleFltMasterRepository;
        public VehicleFltMasterBusiness(IVehicleFltMasterRepository _vehicleFltMasterRepository)
        {
            vehicleFltMasterRepository = _vehicleFltMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        public async Task<ResponseModel> VehicleFltMasterSave(VehicleFltMasterModel vehicleFltMasterModel)
        {
            return await vehicleFltMasterRepository.VehicleFltMasterSave(vehicleFltMasterModel);
        }
        public async Task<VehicleFltMasterList> GetVehicleFltMasterList(VehicleFltMasterListRequest request)
        {
            return await vehicleFltMasterRepository.GetVehicleFltMasterList(request);
        }
    }
}
