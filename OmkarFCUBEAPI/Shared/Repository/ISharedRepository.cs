using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shared.Repository
{
    /// <summary>
    /// Service interface methods
    /// </summary>
    public interface ISharedRepository
    {
        Task<UserModel> LoginDetails(LoginModel loginModel);
        Task<ResponseModel> IntermediateScreenDetail(IntermediateScreenModel request);
        Task<List<MenuModel>> MenuDetails(string userID);
        Task<List<YearListModel>> GetYearList();
    }
}
