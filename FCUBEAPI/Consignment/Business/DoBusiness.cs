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
        public async Task<DoModel> GetDoVehiDetails(RequestModel request)
        {
            return await doRepository.GetDoVehiDetails(request);
        }
    }
}
