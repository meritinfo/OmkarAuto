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
        Task<List<MenuModel>> MenuDetails(string userID);
        Task<List<YearListModel>> GetYearList();
        Task<List<YearListModel>> GetServerDate();
        Task<EWayAPIConfigurationModel> EWayAPIConfigurationDetails();
        Task<ResponseModel> GetExcelReport(DataTable dt, string rptheader, string filter);
    }
}
