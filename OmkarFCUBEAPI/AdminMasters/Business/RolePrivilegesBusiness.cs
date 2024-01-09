using AdminMasters.Models;
using AdminMasters.Repository;
using Shared.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class RolePrivilegesBusiness : IRolePrivilegesBusiness
    {
        readonly IRolePrivilegesRepository rolePrivilegesRepository;
        public RolePrivilegesBusiness(IRolePrivilegesRepository _rolePrivilegesRepository)
        {
            rolePrivilegesRepository = _rolePrivilegesRepository;
        }

        public async Task<RolePrivilegesListModel> GetRolePrivileges(Request request)
        {
            return await rolePrivilegesRepository.GetRolePrivileges(request);
        }
        public async Task<ResponseModel> RolePrivilegesListSave(RolePrivilegesListModel rolePrivilegesList)
        {
            return await rolePrivilegesRepository.RolePrivilegesListSave(rolePrivilegesList);
        }
    }
}