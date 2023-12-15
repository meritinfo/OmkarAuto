using FinanceMaster.Models;
using FinanceMasters.Models;
using Shared.Models;


namespace FinanceMaster.Repository
{
    public interface IGstPurchaseMstRepository
    {
        Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel GstPurchaseMstModel);
    }
}
