using FleetTrans.Models;


using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class SparesPurchaseRptBusiness : ISparesPurchaseRptBusiness
    {
        readonly ISparesPurchaseRptRepository sparesPurchaseRptRepository;
        public SparesPurchaseRptBusiness(ISparesPurchaseRptRepository _sparesPurchaseRptRepository)
        {
            sparesPurchaseRptRepository = _sparesPurchaseRptRepository;
        }

        public async Task<SparesPurchaseRptListModel> GetSparesPurchaseRptList(ReportRequestModel request)
        {
            return await sparesPurchaseRptRepository.GetSparesPurchaseRptList(request);
        }
        public async Task<ResponseModel> GetSparesPurchaseRptExcel(ReportRequestModel request)
        {
            return await sparesPurchaseRptRepository.GetSparesPurchaseRptExcel(request);
        }
    }
}

