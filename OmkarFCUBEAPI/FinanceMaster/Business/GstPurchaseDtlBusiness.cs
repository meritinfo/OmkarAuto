

using FinanceMaster.Models;
using FinanceMaster.Repository;
using FinanceMasters.Models;
using FinanceMasters.Repository;

namespace FinanceMasters.Business
{
    public class GstPurchaseDtlBusiness : IGstPurchaseDtlBusiness
    {
        readonly IGstPurchaseDtlRepository gstPurchaseDtlRepository;
        public GstPurchaseDtlBusiness(IGstPurchaseDtlRepository _gstPurchaseDtlRepository)
        {
            gstPurchaseDtlRepository = _gstPurchaseDtlRepository;
        }

        /// <summary>
        /// Business method for save fin schedule master details
        /// </summary>
        /// <param name="gstpurchaseDtlModel"></param>
        public async Task<ResponseModel> GstPurchaseDtlSave(GstPurchaseDtlModel gstPurchaseDtlModel)
        {
            return await gstPurchaseDtlRepository.GstPurchaseDtlSave(gstPurchaseDtlModel);
        }
    }
}
