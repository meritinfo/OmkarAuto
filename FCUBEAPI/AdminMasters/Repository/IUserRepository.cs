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
        Task<ResponseModel> ChangePassword(PasswordModel passwordModel);
        Task<ResponseModel> CheckPassword(PasswordModel request);
        Task<List<DropDownListModel>> GetModuleList();
        Task<List<DropDownListModel>> GetHrTypeList();
        Task<UserMasterList> GetUserMasterList(PageRequest request);
        Task<EWayBillModel> GetEWayBillDetails(RequestModel request);
        Task<ResponseModel> DeleteUserDetails(string request);
        Task<ResponseModel> UsernameValidation(RequestModel request);
        Task<List<DropDownListModel>> GetRoleTypeList();
        Task<DashBoardModel> GetDashboardNCC(RequestModel request);
    }
}
