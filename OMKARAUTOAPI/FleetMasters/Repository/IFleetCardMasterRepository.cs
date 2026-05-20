using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface IFleetCardMasterRepository
    {
        Task<ResponseModel> FleetCardMasterSave(FleetCardMasterModel fleetCardMasterModel);
        Task<FleetCardMasterList> GetFleetCardMasterList(ReportRequestModel request);
        Task<List<DropDownListModel>> GetCardledgerAcList();
        Task<ResponseModel> FleetCardMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateCardNo(RequestModel request);
        Task<ResponseModel> CheckDuplicateCardCode(RequestModel request);
        Task<ResponseModel> CheckVehicleCardLinked(RequestModel request);
    }
}
