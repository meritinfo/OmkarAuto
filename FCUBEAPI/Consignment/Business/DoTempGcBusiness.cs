using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class DoTempGcBusiness : IDoTempGcBusiness
    {
        readonly IDoTempGcRepository tempGcRepository;
        public DoTempGcBusiness(IDoTempGcRepository _tempGcRepository)
        {
            tempGcRepository = _tempGcRepository;
        }

        public async Task<DoTempGcListModel> GetDoTempgcList(RepReqModel request)
        {
            return await tempGcRepository.GetDoTempgcList(request);
        }
        public async Task<DoTempGcModel> GetDoTempgcInnerGridList(RequestModel request)
        {
            return await tempGcRepository.GetDoTempgcInnerGridList(request);
        }
        public async Task<ResponseModel> DoTempgcSave(DoTempGcModel tempgc)
        {
            return await tempGcRepository.DoTempgcSave(tempgc);
        }
        public async Task<ResponseModel> DoTempGcDelete(RequestModel request)
        {
            return await tempGcRepository.DoTempGcDelete(request);
        }
    }
}
