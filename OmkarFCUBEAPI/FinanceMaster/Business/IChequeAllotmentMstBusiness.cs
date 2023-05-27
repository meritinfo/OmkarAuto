using FinanceMaster.Models;
using FinanceMasters.Models;
namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IChequeAllotmentMstBusiness
    {
        Task<ResponseModel> ChequeAllotmentMstSave(ChequeAllotmentMstModel chequeAllotmentMstModel);
    }

}
