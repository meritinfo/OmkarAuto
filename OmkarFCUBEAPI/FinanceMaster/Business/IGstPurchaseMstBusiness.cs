using FinanceMaster.Models;
using FinanceMaster.Models;
using FinanceMasters.Models;
namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IGstPurchaseMstBusiness
    {
        Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel gstPurchaseMstModel);
    }

}