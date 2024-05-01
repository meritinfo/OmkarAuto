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
        public async Task<DprVehiPlacedListModel> GetDprVehiPlacedList(ReportRequestModel request)
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
        public async Task<ResponseModel> DprVehiPlacedSave(DprVehiPlacedModel dprVehi)
        {
            return await dprRepository.DprVehiPlacedSave(dprVehi);
        }
    }
}
