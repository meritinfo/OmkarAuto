

using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Models;
using FinanceMasters.Repository;

namespace FinanceMasters.Business
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
    }
}
