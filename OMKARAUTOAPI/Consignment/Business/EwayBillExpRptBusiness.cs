using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class EwayBillExpRptBusiness : IEwayBillExpRptBusiness
    {
        readonly IEwayBillExpRptRepository ewayBillRepository;
        public EwayBillExpRptBusiness(IEwayBillExpRptRepository _ewayBillRepository)
        {
            ewayBillRepository = _ewayBillRepository;
        }

        public async Task<EwayBillExtListModel> GetEWayBillExtRptList(ReportRequestModel request)
        {
            return await ewayBillRepository.GetEWayBillExtRptList(request);
        }
        public async Task<ResponseModel> GetEWayBillExtRptExcel(ReportRequestModel request)
        {
            return await ewayBillRepository.GetEWayBillExtRptExcel(request);
        }
    }
}
