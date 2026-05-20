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

    public class FleetGroupMasterBusiness : IFleetGroupMasterBusiness
    {
        readonly IFleetGroupMasterRepository fleetGroupMasterRepository;

        public FleetGroupMasterBusiness(IFleetGroupMasterRepository _fleetGroupMasterRepository)
        {
            fleetGroupMasterRepository = _fleetGroupMasterRepository;
        }
        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="Fleet Group Master"></param>

        public async Task<ResponseModel> FleetGroupMasterSave(FleetGroupMasterModel fleetGroupMasterModel)
        {
            return await fleetGroupMasterRepository.FleetGroupMasterSave(fleetGroupMasterModel);
        }

        public async Task<FleetGroupMasterList> GetFleetGroupMasterList(PageRequest request)
        {
            return await fleetGroupMasterRepository.GetFleetGroupMasterList(request);
        }

        public async Task<ResponseModel> chkDesGroup(RequestModel req)
        {

            return await fleetGroupMasterRepository.chkDesGroup(req);
        }
        public async Task<ResponseModel> FleetGroupMasterDelete(RequestModel req)
        {

            return await fleetGroupMasterRepository.FleetGroupMasterDelete(req);
        }

    }
}

