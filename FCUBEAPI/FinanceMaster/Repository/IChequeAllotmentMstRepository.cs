using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// ChequeAllotment service interface methods
    /// </summary>
    public interface IChequeAllotmentMstRepository
    {
        Task<ResponseModel> ChequeAllotmentMstSave(ChequeAllotmentMstModel chequeAllotmentMstModel);
    }
}