using AdminMasters.Models;

namespace AdminMasters.Repository
{
    /// <summary>
    /// User Master service interface methods
    /// </summary>
    public interface IUserRepository
    {
        Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel);
        Task<List<ModuleListModel>> GetModuleList();
        Task<UserMasterList> GetUserMasterList(UserMasterListRequest request);
    }
}
