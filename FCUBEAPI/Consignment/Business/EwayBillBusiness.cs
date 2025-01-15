using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office.CustomUI;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;

namespace Consignment.Business
{
    public class EwayBillBusiness : IEwayBillBusiness
    {
        readonly IEwayBillRepository ewayBill;
        public EwayBillBusiness(IEwayBillRepository _ewayBillRepository)
        {
            ewayBill = _ewayBillRepository;
        }

        public async Task<EwayBillExtListModel> GetEWayBillExtList(ReportRequestModel request)
        {
            return await ewayBill.GetEWayBillExtList(request);
        }
        public async Task<ResponseModel> EWayBillExtend(EwayBillExtModel request)
        {
            return await ewayBill.EWayBillExtend(request);
        }
        public async Task<ResponseModel> GetKmsFromApi(DropDownListModel dropDown)
        {
            return await ewayBill.GetKmsFromApi(dropDown);
        }
        public async Task<ResponseModel> GetCurrentLocFromApi(RequestModel request)
        {
            return await ewayBill.GetCurrentLocFromApi(request);
        }
        public async Task<ResponseModel> GetStateNameWithPin(RequestModel request)
        {
            return await ewayBill.GetStateNameWithPin(request);
        }
    }
}
