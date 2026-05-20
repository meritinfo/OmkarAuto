using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class VehicleFinCompMasterBusiness: IVehicleFinCompMasterBusiness
    {

        readonly IVehicleFinCompMasterRepository vehicleFinCompMasterRepository;

        public VehicleFinCompMasterBusiness(IVehicleFinCompMasterRepository _vehicleFinCompMasterRepository)
        {
            vehicleFinCompMasterRepository = _vehicleFinCompMasterRepository;
        }
        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="Vehicle Fin Comp Master"></param>
        public async Task<ResponseModel> VehicleFinCompMasterSave(VehicleFinCompModel vehicleFinCompModel)
        {
            return await vehicleFinCompMasterRepository.VehicleFinCompMasterSave(vehicleFinCompModel);
        }

        public async Task<VehicleFinCompList> GetVehicleFinCompMasterList(PageRequest request)
        {
            return await vehicleFinCompMasterRepository.GetVehicleFinCompMasterList(request);
        }

        public async Task<ResponseModel> VehicleFinCompMasterChkActName(RequestModel req)
        {
            return await vehicleFinCompMasterRepository.VehicleFinCompMasterChkActName(req);
        }

        public async Task<ResponseModel> VehicleFinCompMasterDelete(RequestModel req)
        {
            return await vehicleFinCompMasterRepository.VehicleFinCompMasterDelete(req);
        }
    }
}
