using FinTrans.Models;
using Shared.Models;


namespace FinTrans.Repository
{
    public interface IGstPurchaseMstRepository
    {
        Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel GstPurchaseMstModel);
        Task<ResponseModel> GstPurchageDelete(RequestModel request);
        Task<GstPurchaseMstList> GetGstPurchaseList(PageFromDtToDtRequest request);
        Task<GstPurchaseMstModel> GetGstPurchaseInnerGridList(RequestModel req);
        Task<List<DropDownListModel>> GetGstVendorList();
        Task<List<DropDownListModel>> GetGstTdsAcList();

    }
}
