using AdminMasters.Models;
using AdminMasters.Repository;

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
    }
}