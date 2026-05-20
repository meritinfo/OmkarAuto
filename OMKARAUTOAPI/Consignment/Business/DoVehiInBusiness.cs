using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class DoVehiInBusiness : IDoVehiInBusiness
    {
        readonly IDoVehiInRepository doRepository;
        public DoVehiInBusiness(IDoVehiInRepository _doRepository)
        {
            doRepository = _doRepository;
        }
     
        public async Task<DoVehicleInListModel> GetDoVehicleInList(ReportRequestModel request)
        {
            return await doRepository.GetDoVehicleInList(request);
        }
        public async Task<ResponseModel> DoVehicleInSave(DoVehicleInModel dprModel)
        {
            return await doRepository.DoVehicleInSave(dprModel);
        }
        public async Task<ResponseModel> DoVehicleInDelete(RequestModel requestModel)
        {
            return await doRepository.DoVehicleInDelete(requestModel);
        }
        public async Task<DoVehicleInModel> GetDoVehiPlacedDetails(RequestModel request)
        {
            return await doRepository.GetDoVehiPlacedDetails(request);
        }
        public async Task<DoVehicleInModel> GetTruckDetails(RequestModel request)
        {
            return await doRepository.GetTruckDetails(request);
        }
    }
}
