using FinanceMasters.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// ChequeAllotment service interface methods
    /// </summary>
    public interface IChequeAllotmentDtlRepository
    {
        Task<ResponseModel> ChequeAllotmentDtlSave(ChequeAllotmentDtlModel chequeAllotmentDtlModel);
    }
}
