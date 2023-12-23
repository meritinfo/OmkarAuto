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
        Task<ResponseModel> GstPurchageDelete(Request request);
        Task<GstPurchaseMstList> GetGstPurchaseList(PageFromDtToDtRequest request);
        Task<GstPurchaseMstModel> GetGstPurchaseInnerGridList(Request req);
        Task<List<DropDownListModel>> GetGstVendorList();
    }

}