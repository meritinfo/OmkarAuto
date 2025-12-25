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
        public async Task<List<DropDownListModel>> GetCardledgerAcList()
        {
            return await fleetCardMasterRepository.GetCardledgerAcList();
        }
        public async Task<ResponseModel> FleetCardMasterDelete(RequestModel requestModel)
        {
            return await fleetCardMasterRepository.FleetCardMasterDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateCardNo(RequestModel request)
        {
            return await fleetCardMasterRepository.CheckDuplicateCardNo(request);
        }
        public async Task<ResponseModel> CheckDuplicateCardCode(RequestModel request)
        {
            return await fleetCardMasterRepository.CheckDuplicateCardCode(request);
        }
        public async Task<ResponseModel> CheckVehicleCardLinked(RequestModel request)
        {
            return await fleetCardMasterRepository.CheckVehicleCardLinked(request);
        }


    }
}
