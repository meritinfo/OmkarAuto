using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IRoleMasterBusiness
    {
        Task<ResponseModel> RoleMasterSave(RoleMasterModel roleMasterModel);
        Task<RoleTypeList> GetRoleTypeList(PageRequest request);
    }
}
