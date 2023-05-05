using HRMasters.Models;

namespace HRMasters.Repository
{
    /// <summary>
    /// Product group Master service interface methods
    /// </summary>
    public interface IHRMasterRepository
    {
        Task<ResponseModel> HRMasterSave(HRMasterModel hrMasterModel);
    }
}
