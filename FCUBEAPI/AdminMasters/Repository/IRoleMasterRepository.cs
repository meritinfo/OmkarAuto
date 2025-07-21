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
        Task<RoleTypeList> GetRoleTypeList(PageRequest request);
        Task<ResponseModel> ChkDuplicateRoleDesc(RequestModel req);
        Task<ResponseModel> ChkDuplicateRoleName(RequestModel req);
        Task<ResponseModel> RoleTypesDelete(RequestModel req);
    }
}
