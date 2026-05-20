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
    public class VehicleMfrMasterBusiness: IVehicleMfrMasterBusiness
    {
        readonly IVehicleMfrMasterRepository vehicleMfrMasterRepository;

        public VehicleMfrMasterBusiness(IVehicleMfrMasterRepository _vehicleMfrMasterRepository)
        {
            vehicleMfrMasterRepository = _vehicleMfrMasterRepository;
        }
        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="Vehicle Fin Comp Master"></param>

        public async Task<ResponseModel> VehicleMfrMasterSave(VehicleMfrMasterModel vehicleMfrMasterModel)
        {
            return await vehicleMfrMasterRepository.VehicleMfrMasterSave(vehicleMfrMasterModel);
        }

        public async Task<VehicleMfrMasterList> GetVehicleMfrMasterList(PageRequest request)
        {
            return await vehicleMfrMasterRepository.GetVehicleMfrMasterList(request);
        }

        public async Task<ResponseModel> VehicleMfrMasterChkActName(RequestModel req)
        {
            return await vehicleMfrMasterRepository.VehicleMfrMasterChkActName(req);
        }
        public async Task<ResponseModel> VehicleMfrMasterDelete(RequestModel req)
        {
            return await vehicleMfrMasterRepository.VehicleMfrMasterDelete(req);
        }
    }
}
