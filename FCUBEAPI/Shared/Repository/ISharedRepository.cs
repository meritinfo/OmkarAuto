using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;

namespace Shared.Repository
{
    /// <summary>
    /// Service interface methods
    /// </summary>
    public interface ISharedRepository
    {
        Task<UserModel> LoginDetails(LoginModel loginModel);
        Task<ResponseModel> IntermediateScreenDetail(IntermediateScreenModel request);
        Task<ResponseModel> CheckBookingDate(DateModel request);
        Task<ResponseModel> GetCompanyDetail();
        Task<ResponseModel> GetCompanyShortCode();
        Task<ResponseModel> GetDashboardDetail(RequestModel request);
        Task<ScheduleModel> GetScheduleDetails();
        Task<List<MenuModel>> MenuDetails(string userID);
        Task<List<DropDownListModel>> GetScopeBranchList(RequestModel req);
        Task<List<DropDownListModel>> GetYearList();
        Task<ResponseModel> GetServerDate(RequestModel request);
        Task<EWayAPIConfigurationModel> EWayAPIConfigurationDetails(RequestModel request);
        Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter);
        Task<ResponseModel> GetGroupExcelReport(DataTable dt, string rptheader, string filter);
        Task<ResponseModel> GetDualGroupExcelReport(DataTable dt, string rptheader, string filter);
        Task<List<DocRenewalModel>> GetDocRenewalDetails();
        Task<List<RequestModel>> GetDashboardCustomer(ReportRequestModel report);
        Task<ResponseModel> GetCustomerProfitLossRptExcel(ReportRequestModel report);
        Task<ResponseModel> GenerateLoginOTP(LoginModel login);
        Task<RequestModel> GetBpclAccessParentToken();
    }
}
