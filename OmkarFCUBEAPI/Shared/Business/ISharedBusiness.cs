using Shared.Models;
using System.Threading.Tasks;

namespace Shared.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface ISharedBusiness
    {
        Task<UserModel> LoginDetails(LoginModel loginModel);
    }
}
