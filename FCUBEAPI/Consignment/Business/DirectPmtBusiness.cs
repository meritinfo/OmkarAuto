using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Models;

namespace Consignment.Business
{
    public class DirectPmtBusiness : IDirectPmtBusiness
    {
        readonly IDirectPmtRepository lorryHireRepository;
        public DirectPmtBusiness(IDirectPmtRepository _lorryHireRepository)
        {
            lorryHireRepository = _lorryHireRepository;
        }

        public async Task<List<DropDownListModel>> GetDirectBankList()
        {
            return await lorryHireRepository.GetDirectBankList();
        }
        public async Task<DirectPmtListModel> GetDirectPaymentList(ReportRequestModel request)
        {
            return await lorryHireRepository.GetDirectPaymentList(request);
        }
        public async Task<ResponseModel> DownLoadDirectExcel(DirectPmtListModel lorryHire)
        {
            return await lorryHireRepository.DownLoadDirectExcel(lorryHire);
        }
        public async Task<DirectPmtListModel> GetDirectPmtDownloadedList(ReportRequestModel request)
        {
            return await lorryHireRepository.GetDirectPmtDownloadedList(request);
        }
        public async Task<ResponseModel> UpdateDirectPmt(DirectPmtListModel lorryHire)
        {
            return await lorryHireRepository.UpdateDirectPmt(lorryHire);
        }
        public async Task<List<DropDownListModel>> GetPmtList(RequestModel request)
        {
            return await lorryHireRepository.GetPmtList(request);
        }
    }
}
