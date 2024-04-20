using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class EwayBillBusiness : IEwayBillBusiness
    {
        readonly IEwayBillRepository ewayBillRepository;
        public EwayBillBusiness(IEwayBillRepository _ewayBillRepository)
        {
            ewayBillRepository = _ewayBillRepository;
        }

        public async Task<EwayBillExtListModel> GetEWayBillExtList(PageRequest request)
        {
            return await ewayBillRepository.GetEWayBillExtList(request);
        }
        public async Task<ResponseModel> EWayBillExtend(EwayBillExtModel request)
        {
            return await ewayBillRepository.EWayBillExtend(request);
        }
    }
}
