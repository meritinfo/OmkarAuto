using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IGstPurchaseMstBusiness
    {
        Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel gstPurchaseMstModel);
        Task<ResponseModel> GstPurchageDelete(RequestModel request);
        Task<GstPurchaseMstList> GetGstPurchaseList(ReportRequestModel request);
        Task<GstPurchaseMstModel> GetGstPurchaseInnerGridList(RequestModel req);
        Task<List<DropDownListModel>> GetGstVendorList();
        Task<List<DropDownListModel>> GetGstTdsAcList();
    }

}