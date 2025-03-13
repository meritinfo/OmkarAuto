using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IUserBusiness
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
        Task<UserMasterModel> GetUserRights(RequestModel request);
        Task<DashBoardModel> GetDashboardNCC(RequestModel request);
    }
}
