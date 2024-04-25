using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class DprBusiness : IDprBusiness
    {
        readonly IDprRepository dprRepository;
        public DprBusiness(IDprRepository _dprRepository)
        {
            dprRepository = _dprRepository;
        }

        public async Task<DprListModel> GetDprMasterList(ReportRequestModel request)
        {
            return await dprRepository.GetDprMasterList(request);
        }
        public async Task<DprModel> GetDprInnerGridList(RequestModel request)
        {
            return await dprRepository.GetDprInnerGridList(request);
        }
        public async Task<ResponseModel> DprMasterSave(DprModel dprModel)
        {
            return await dprRepository.DprMasterSave(dprModel);
        }
        public async Task<ResponseModel> DprMasterDelete(RequestModel request)
        {
            return await dprRepository.DprMasterDelete(request);
        }
    }
}
