using AdminMasters.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IRoleMasterBusiness
    {
        Task<ResponseModel> RoleMasterSave(RoleMasterModel roleMasterModel);
    }
}
