using AdminMasters.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IUserBusiness
    {
        Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel);
        Task<List<ModuleListModel>> GetModuleList();
        Task<UserMasterList> GetUserMasterList(UserMasterListRequest request);
    }
}
