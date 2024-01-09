using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IRolePrivilegesBusiness
    {
        Task<RolePrivilegesListModel> GetRolePrivileges(Request request);
        Task<ResponseModel> RolePrivilegesListSave(RolePrivilegesListModel rolePrivilegesList);
    }
}
