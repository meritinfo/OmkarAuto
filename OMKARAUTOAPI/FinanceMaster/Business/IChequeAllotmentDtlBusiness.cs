using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IChequeAllotmentDtlBusiness
    {
        Task<ResponseModel> ChequeAllotmentDtlSave(ChequeAllotmentDtlModel chequeAllotmentDtlModel);
    }

}
