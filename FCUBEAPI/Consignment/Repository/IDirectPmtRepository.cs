using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface IDirectPmtRepository
    {
        Task<List<DropDownListModel>> GetDirectBankList();
        Task<DirectPmtListModel> GetDirectPaymentList(ReportRequestModel request);
        Task<ResponseModel> DownLoadDirectExcel(DirectPmtListModel lorryHire);
        Task<DirectPmtListModel> GetDirectPmtDownloadedList(ReportRequestModel request);
        Task<ResponseModel> UpdateDirectPmt(DirectPmtListModel lorryHire);
    }
}
