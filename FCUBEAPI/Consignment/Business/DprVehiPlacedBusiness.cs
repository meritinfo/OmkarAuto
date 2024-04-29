using Consignment.Models;
using Consignment.Repository;
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

        public async Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request)
        {
            return await dprRepository.GetDprVehiPlacedDetails(request);
        }
        public async Task<ResponseModel> DprMasterDelete(RequestModel request)
        {
            return await dprRepository.DprMasterDelete(request);
        }
    }
}
