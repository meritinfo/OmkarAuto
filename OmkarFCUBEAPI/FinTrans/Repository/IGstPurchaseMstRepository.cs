using FinTrans.Models;
using Shared.Models;


namespace FinTrans.Repository
{
    public interface IGstPurchaseMstRepository
    {
        Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel GstPurchaseMstModel);
        Task<ResponseModel> GstPurchageDelete(Request request);
        Task<GstPurchaseMstList> GetGstPurchaseList(PageFromDtToDtRequest request);
        Task<GstPurchaseMstModel> GetGstPurchaseInnerGridList(Request req);
        Task<List<DropDownListModel>> GetGstVendorList();

    }
}
