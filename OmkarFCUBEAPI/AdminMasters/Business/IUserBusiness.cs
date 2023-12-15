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
        Task<List<ModuleListModel>> GetModuleList();
        Task<UserMasterList> GetUserMasterList(UserMasterListRequest request);
        Task<EWayBillModel> GetEWayBillDetails(EWayBillRequest request);
        Task<ResponseModel> DeleteUserDetails(string request);
        Task<ResponseModel> UsernameValidation(string request);
        Task<List<DropDownListModel>> GetRoleTypeList();
    }
}
