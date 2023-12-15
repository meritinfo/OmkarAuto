using AdminMasters.Models;
using Shared.Models;

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
