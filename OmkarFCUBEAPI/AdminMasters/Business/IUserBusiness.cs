using AdminMasters.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IUserBusiness
    {
        Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel);
    }
}
