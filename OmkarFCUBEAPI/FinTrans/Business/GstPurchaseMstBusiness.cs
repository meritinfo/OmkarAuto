

using FinTrans.Models;
using FinTrans.Repository;
using Shared.Models;

namespace FinTrans.Business
{
    public class GstPurchaseMstBusiness : IGstPurchaseMstBusiness
    {
        readonly IGstPurchaseMstRepository gstPurchaseMstRepository;
        public GstPurchaseMstBusiness(IGstPurchaseMstRepository _gstPurchaseMstRepository)
        {
            gstPurchaseMstRepository = _gstPurchaseMstRepository;
        }

        /// <summary>
        /// Business method for save fin schedule master details
        /// </summary>
        /// <param name="gstpurchaseDtlModel"></param>
        public async Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel gstPurchaseMstModel)
        {
            return await gstPurchaseMstRepository.GstPurchaseMstSave(gstPurchaseMstModel);
        }

        public async Task<ResponseModel> GstPurchageDelete(RequestModel request)
        {
            return await gstPurchaseMstRepository.GstPurchageDelete(request);
        }

        public async Task<GstPurchaseMstList> GetGstPurchaseList(PageFromDtToDtRequest request)
        {
            return await gstPurchaseMstRepository.GetGstPurchaseList(request);
        }

        public async Task<GstPurchaseMstModel> GetGstPurchaseInnerGridList(RequestModel req)
        {
            return await gstPurchaseMstRepository.GetGstPurchaseInnerGridList(req);
        }

        public async Task<List<DropDownListModel>> GetGstVendorList()
        {
            return await gstPurchaseMstRepository.GetGstVendorList();
        }
        public async Task<List<DropDownListModel>> GetGstTdsAcList()
        {
            return await gstPurchaseMstRepository.GetGstTdsAcList();
        }
    }
}
