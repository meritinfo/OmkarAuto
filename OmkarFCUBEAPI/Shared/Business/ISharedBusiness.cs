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
     
        Task<ResponseModel> IntermediateScreenDetail(IntermediateScreenModel request);
        Task<List<MenuListModel>> MenuDetails(string userID);
        Task<List<YearListModel>> GetYearList();
    }
}
