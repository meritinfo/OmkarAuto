using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;

namespace Consignment.Business
{
    public class DprVehiPlacedBusiness : IDprVehiPlacedBusiness
    {
        readonly IDprVehiPlacedRepository dprRepository;
        public DprVehiPlacedBusiness(IDprVehiPlacedRepository _dprRepository)
        {
            dprRepository = _dprRepository;
        }
        public async Task<DprVehiPlacedListModel> GetDprVehiPlacedList(RepReqModel request)
        {
            return await dprRepository.GetDprVehiPlacedList(request);
        }
        public async Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request)
        {
            return await dprRepository.GetDprVehiPlacedDetails(request);
        }
        public async Task<DprVehiPlacedModel> GetVehicleDetails(RequestModel request)
        {
            return await dprRepository.GetVehicleDetails(request);
        }
        public async Task<List<DropDownListModel>> GetBrokerList()
        {
            return await dprRepository.GetBrokerList();
        }
        public async Task<List<DropDownListModel>> GetBrokerListLLP()
        {
            return await dprRepository.GetBrokerListLLP();
        }
        public async Task<ResponseModel> DprVehiPlacedSave(DprVehiPlacedModel dprVehi)
        {
            return await dprRepository.DprVehiPlacedSave(dprVehi);
        }
        public async Task<ResponseModel> DprVehiUpdateAdvance(DprVehiPlacedModel dprVehi)
        {
            return await dprRepository.DprVehiUpdateAdvance(dprVehi);
        }
        public async Task<ResponseModel> DprVehiPlacedDelete(RequestModel requestModel)
        {
            return await dprRepository.DprVehiPlacedDelete(requestModel);
        }
        public async Task<ResponseModel> DprVehiPlacedAdvUpd(ReportRequestModel requestModel)
        {
            return await dprRepository.DprVehiPlacedAdvUpd(requestModel);
        }
        public async Task<ResponseModel> DprVehiPlacedAddLr(DprVehiPlacedModel dprVehi)
        {
            return await dprRepository.DprVehiPlacedAddLr(dprVehi);
        }
        public async Task<ResponseModel> DprVehiPlacedDeleteLr(RequestModel request)
        {
            return await dprRepository.DprVehiPlacedDeleteLr(request);
        }
        public async Task<ResponseModel> UpdateAssign(RequestModel requestModel)
        {
            return await dprRepository.UpdateAssign(requestModel);
        }
    }
}
