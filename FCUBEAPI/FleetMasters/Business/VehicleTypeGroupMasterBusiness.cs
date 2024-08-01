using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;

namespace FleetMasters.Business
{
    public class VehicleTypeGroupMasterBusiness : IVehicleTypeGroupMasterBusiness
    {
        readonly IVehicleTypeGroupMasterRepository vehicleTypeGroupMasterRepository;
        public VehicleTypeGroupMasterBusiness(IVehicleTypeGroupMasterRepository _vehicleTypeGroupMasterRepository)
        {
            vehicleTypeGroupMasterRepository = _vehicleTypeGroupMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        public async Task<ResponseModel> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel)
        {
            return await vehicleTypeGroupMasterRepository.VehicleTypeGroupMasterSave(vehicleTypeGroupMasterModel);
        }
        public async Task<VehicleTypeGroupMasterList> GetVehicleTypeGroupMasterList(PageRequest request)
        {
            return await vehicleTypeGroupMasterRepository.GetVehicleTypeGroupMasterList(request);
        }
    }
}
