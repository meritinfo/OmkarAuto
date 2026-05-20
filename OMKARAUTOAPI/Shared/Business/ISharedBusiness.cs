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
        Task<ResponseModel> GetCompanyShortCode();
        Task<ScheduleModel> GetScheduleDetails();
        Task<ResponseModel> GetDashboardDetail(RequestModel request);
        Task<List<DropDownListModel>> GetScopeBranchList(RequestModel req);
        Task<List<MenuListModel>> MenuDetails(string userID);
        Task<List<DropDownListModel>> GetYearList();
        Task<ResponseModel> GetServerDate(RequestModel request);
        Task<List<DocRenewalModel>> GetDocRenewalDetails();
        Task<List<RequestModel>> GetDashboardCustomer(ReportRequestModel report);
        Task<ResponseModel> GetCustomerProfitLossRptExcel(ReportRequestModel report);
        Task<ResponseModel> GenerateLoginOTP(LoginModel login);
    }
}
