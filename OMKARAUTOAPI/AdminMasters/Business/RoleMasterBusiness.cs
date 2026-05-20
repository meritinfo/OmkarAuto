using AdminMasters.Models;
using AdminMasters.Repository;
using Shared.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class RoleMasterBusiness : IRoleMasterBusiness
    {
        readonly IRoleMasterRepository roleMasterRepository;
        public RoleMasterBusiness(IRoleMasterRepository _roleMasterRepository)
        {
            roleMasterRepository = _roleMasterRepository;
        }

        /// <summary>
        /// Business method for save role master details
        /// </summary>
        /// <param name="roleMasterModel"></param>
        public async Task<ResponseModel> RoleMasterSave(RoleMasterModel roleMasterModel)
        {
            return await roleMasterRepository.RoleMasterSave(roleMasterModel);
        }
        public async Task<RoleTypeList> GetRoleTypeList(PageRequest request)
        {
            return await roleMasterRepository.GetRoleTypeList(request);
        }
        public async Task<ResponseModel> ChkDuplicateRoleDesc(RequestModel req)
        {
            return await roleMasterRepository.ChkDuplicateRoleDesc(req);
        }
        public async Task<ResponseModel> ChkDuplicateRoleName(RequestModel req)
        {
            return await roleMasterRepository.ChkDuplicateRoleName(req);
        }
        public async Task<ResponseModel> RoleTypesDelete(RequestModel req)
        {
            return await roleMasterRepository.RoleTypesDelete(req);
        }
    }
}