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
    public class FleetGodownMasterBusiness: IFleetGodownMasterBusiness
    {

        readonly IFleetGodownMasterRepository fleetGodownMasterRepository;
        public FleetGodownMasterBusiness(IFleetGodownMasterRepository _fleetGodownMasterRepository)
        {
            fleetGodownMasterRepository = _fleetGodownMasterRepository;
        }

        public async Task<FleetGodownMasterList> GetFleetGodownMaserList(PageRequest request)
        {
            return await fleetGodownMasterRepository.GetFleetGodownMaserList(request);
        }

        public async Task<ResponseModel> FleetGodownMaserSave(FleetGodownMasterModel obj)
        {
            return await fleetGodownMasterRepository.FleetGodownMaserSave(obj);
        }

        public async Task<ResponseModel> FleetGodownMasterDelete(RequestModel requestModel)
        {
            return await fleetGodownMasterRepository.FleetGodownMasterDelete(requestModel);
        }

        public async Task<ResponseModel> CheckDuplicateGodownShortCode(RequestModel request)
        {
            return await fleetGodownMasterRepository.CheckDuplicateGodownShortCode(request);
        }

        public async Task<ResponseModel> CheckDuplicateGodownDesc(RequestModel request)
        {
            return await fleetGodownMasterRepository.CheckDuplicateGodownDesc(request);
        }


    }
}
