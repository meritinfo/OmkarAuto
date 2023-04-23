using FinanceMasters.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// Finance Account Master service interface methods
    /// </summary>
    public interface IFinAccountsMasterRepository
    {
        Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel);
    }
}
