using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Repository
{
    /// <summary>
    /// User Master service interface methods
    /// </summary>
    public interface IRolePrivilegesRepository
    {
        Task<RolePrivilegesListModel> GetRolePrivileges(Request request);
        Task<ResponseModel> RolePrivilegesListSave(RolePrivilegesListModel rolePrivilegesList);
    }
}
