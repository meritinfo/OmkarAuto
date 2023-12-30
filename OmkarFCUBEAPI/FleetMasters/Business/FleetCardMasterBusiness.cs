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
    public class FleetCardMasterBusiness: IFleetCardMasterBusiness
    {
        readonly IFleetCardMasterRepository fleetCardMasterRepository;
        public FleetCardMasterBusiness(IFleetCardMasterRepository _fleetCardMasterRepository)
        {
            fleetCardMasterRepository = _fleetCardMasterRepository;
        }
        public async Task<ResponseModel> FleetCardMasterSave(FleetCardMasterModel fleetCardMasterModel)
        {
            return await fleetCardMasterRepository.FleetCardMasterSave(fleetCardMasterModel);
        }
        public async Task<FleetCardMasterList> GetFleetCardMasterList(PageRequest request)
        {
            return await fleetCardMasterRepository.GetFleetCardMasterList(request);
        }

    }
}
