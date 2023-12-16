using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Repository
{
    /// <summary>
    /// User Master service interface methods
    /// </summary>
    public interface IUserRepository
    {
        Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel);
        Task<List<DropDownListModel>> GetModuleList();
        Task<UserMasterList> GetUserMasterList(PageRequest request);
        Task<EWayBillModel> GetEWayBillDetails(EWayBillRequest request);
        Task<ResponseModel> DeleteUserDetails(string request);
        Task<ResponseModel> UsernameValidation(string request);
        Task<List<DropDownListModel>> GetRoleTypeList();
    }
}
