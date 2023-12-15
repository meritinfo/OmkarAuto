using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;

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
        public async Task<VehicleFltMasterList> GetVehicleFltMasterList(PageRequest request)
        {
            return await vehicleFltMasterRepository.GetVehicleFltMasterList(request);
        }
        public async Task<ResponseModel> VehicalMasterDetailsDelete(Request req)
        {
            return await vehicleFltMasterRepository.VehicalMasterDetailsDelete(req);
        }
        public async Task<List<DropDownListModel>> GetVehicalTypeList()
        {
            return await vehicleFltMasterRepository.GetVehicalTypeList();
        }
        public async Task<List<DropDownListModel>> GetVehicalLedgerAccountList()
        {
            return await vehicleFltMasterRepository.GetVehicalLedgerAccountList();
        }
        public async Task<List<DropDownListModel>> GetVehicalAssetAccountList()
        {
            return await vehicleFltMasterRepository.GetVehicalAssetAccountList();
        }
        public async Task<List<DropDownListModel>> GetVehicalMfrList()
        {
            return await vehicleFltMasterRepository.GetVehicalMfrList();
        }
        public async Task<ResponseModel> ChkVehicalNoExist(Request req)
        {
            return await vehicleFltMasterRepository.ChkVehicalNoExist(req);
        }
        public async Task<VehicleFltMasterModel> GetVehicleFltInnerGridList(Request req)
        {
            return await vehicleFltMasterRepository.GetVehicleFltInnerGridList(req);
        }
    }
}
