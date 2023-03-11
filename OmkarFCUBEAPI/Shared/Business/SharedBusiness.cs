using Shared.Models;
using Shared.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Business
{
    public class SharedBusiness : ISharedBusiness
    {
        readonly ISharedRepository sharedRepository;
        public SharedBusiness(ISharedRepository _sharedRepository)
        {
            sharedRepository = _sharedRepository;
        }

        /// <summary>
        /// Business method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        public async Task<UserModel> LoginDetails(LoginModel loginModel)
        {
            return await sharedRepository.LoginDetails(loginModel);
        }
    }
}
