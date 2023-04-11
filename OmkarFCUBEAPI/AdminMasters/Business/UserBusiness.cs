using AdminMasters.Models;
using AdminMasters.Repository;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class UserBusiness : IUserBusiness
    {
        readonly IUserRepository userRepository;
        public UserBusiness(IUserRepository _userRepository)
        {
            userRepository = _userRepository;
        }

        /// <summary>
        /// Business method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        public async Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel)
        {
            return await userRepository.UserMasterDetailsSave(userMasterModel);
        }
    }
}
