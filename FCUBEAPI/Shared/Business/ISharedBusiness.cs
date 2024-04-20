using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shared.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface ISharedBusiness
    {
        Task<UserModel> LoginDetails(LoginModel loginModel);
        Task<UserModel> RefreshToken(LoginModel request);
        Task<ResponseModel> IntermediateScreenDetail(IntermediateScreenModel request);
        Task<ResponseModel> CheckBookingDate(DateModel request);
        Task<ResponseModel> GetCompanyDetail();
        Task<ScheduleModel> GetScheduleDetails();
        Task<List<DropDownListModel>> GetScopeBranchList(RequestModel req);
        Task<List<MenuListModel>> MenuDetails(string userID);
        Task<List<DropDownListModel>> GetYearList();
        Task<List<DropDownListModel>> GetServerDate();
    }
}
