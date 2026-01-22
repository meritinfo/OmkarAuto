using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class DoBusiness : IDoBusiness
    {
        readonly IDoRepository doRepository;
        public DoBusiness(IDoRepository _doRepository)
        {
            doRepository = _doRepository;
        }

        public async Task<DoListModel> GetDoList(ReportRequestModel request)
        {
            return await doRepository.GetDoList(request);
        }
        public async Task<ResponseModel> DoSave(DoModel dprModel)
        {
            return await doRepository.DoSave(dprModel);
        }
        public async Task<ResponseModel> DoDelete(RequestModel request)
        {
            return await doRepository.DoDelete(request);
        }
        public async Task<DoVehiPlacedModel> GetDoVehiDetails(RequestModel request)
        {
            return await doRepository.GetDoVehiDetails(request);
        }
        public async Task<DoVehiPlacedListModel> GetDoVehiPlacedList(ReportRequestModel request)
        {
            return await doRepository.GetDoVehiPlacedList(request);
        }
        public async Task<ResponseModel> DoVehiPlacedSave(DoVehiPlacedModel dprModel)
        {
            return await doRepository.DoVehiPlacedSave(dprModel);
        }
        public async Task<ResponseModel> DoVehiPlacedDelete(RequestModel requestModel)
        {
            return await doRepository.DoVehiPlacedDelete(requestModel);
        }
    }
}
