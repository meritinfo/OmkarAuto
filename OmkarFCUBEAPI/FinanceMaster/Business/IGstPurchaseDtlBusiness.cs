using FinanceMaster.Models;
using FinanceMaster.Models;
using FinanceMasters.Models;
namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IGstPurchaseDtlBusiness
    {
        Task<ResponseModel> GstPurchaseDtlSave(GstPurchaseDtlModel gstPurchaseDtlModel);
        Task<GstPurchaseDtlList> GetGstPurchaseDtlList(GstPurchaseDtlListRequest request);
    }

}