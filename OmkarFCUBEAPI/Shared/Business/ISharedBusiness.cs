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
        Task<List<MenuListModel>> MenuDetails(string userID);
    }
}
