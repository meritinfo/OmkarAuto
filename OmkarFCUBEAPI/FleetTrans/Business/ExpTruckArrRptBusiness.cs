using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class ExpTruckArrRptBusiness : IExpTruckArrRptBusiness
    {
        readonly IExpTruckArrRptRepository expTruckArrRptRepository;
        public ExpTruckArrRptBusiness(IExpTruckArrRptRepository _expTruckArrRptRepository)
        {
            expTruckArrRptRepository = _expTruckArrRptRepository;
        }
        
        public async Task<ExpTruckArrRptListModel> GetExpTruckArrRPTList(ReportRequestModel request)
        {
            return await expTruckArrRptRepository.GetExpTruckArrRPTList(request);
        }
        public async Task<ResponseModel> ExcelExpTruckArrRPTList(ReportRequestModel request)
        {
            return await expTruckArrRptRepository.ExcelExpTruckArrRPTList(request);
        }
    }
}
