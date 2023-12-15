using FinanceMaster.Models;
using FinanceMasters.Models;
using Shared.Models;


namespace FinanceMaster.Repository
{
    public interface IGstPurchaseDtlRepository
    {
        Task<ResponseModel> GstPurchaseDtlSave(GstPurchaseDtlModel GstPurchaseDtlModel);
        Task<GstPurchaseDtlList> GetGstPurchaseDtlList(PageRequest request);
    }
}
