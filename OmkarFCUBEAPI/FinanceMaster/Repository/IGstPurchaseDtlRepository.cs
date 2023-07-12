using FinanceMaster.Models;
using FinanceMasters.Models;


namespace FinanceMaster.Repository
{
    public interface IGstPurchaseDtlRepository
    {
        Task<ResponseModel> GstPurchaseDtlSave(GstPurchaseDtlModel GstPurchaseDtlModel);
        Task<GstPurchaseDtlList> GetGstPurchaseDtlList(GstPurchaseDtlListRequest request);
    }
}
