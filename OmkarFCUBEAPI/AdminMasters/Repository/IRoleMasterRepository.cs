using AdminMasters.Models;

namespace AdminMasters.Repository
{
    /// <summary>
    /// User Master service interface methods
    /// </summary>
    public interface IRoleMasterRepository
    {
        Task<ResponseModel> RoleMasterSave(RoleMasterModel roleMasterModel);
    }
}
