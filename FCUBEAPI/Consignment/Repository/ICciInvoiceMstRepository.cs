using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public interface ICciInvoiceMstRepository
    {
        Task<CciInvoiceMstList> GetCciInvoiceMstMasterList(ReportRequestModel request);
        Task<CciInvoiceMstModel> GetCciInvoiceDtlInnerGridList(RequestModel request);
        Task<ResponseModel> CciInvoiceMstSave(CciInvoiceMstModel cciInvoiceMstModel);
        Task<ResponseModel> CciInvoiceMstDelete(RequestModel req);
        Task<List<DropDownListModel>> GetChCostList();
        Task<List<DropDownListModel>> GetCnDetail(RequestModel request);
        Task<ResponseModel> GetChCostDetail(RequestModel request);
        Task<ConsignmentModel> GetLRDetails(RequestModel req);
        Task<ResponseModel> GetCciInvoiceExcel(ReportRequestModel request);

    }
}
