using FinanceMasters.Models;

namespace FinanceMasters.Repository
{
    /// <summary>
    /// Finance Schedule Master service interface methods
    /// </summary>
    public interface IFinScheduleMasterRepository
    {
        Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finSheduleMasterModel);
    }
}
