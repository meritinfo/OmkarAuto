using AdminMasters.Models;
using AdminMasters.Repository;
using Shared.Models;

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
        public async Task<ResponseModel> ChangePassword(PasswordModel passwordModel)
        {
            return await userRepository.ChangePassword(passwordModel);
        }
        public async Task<ResponseModel> CheckPassword(PasswordModel request)
        {
            return await userRepository.CheckPassword(request);
        }

        /// <summary>
        /// Business method for Module list details
        /// </summary>
        public async Task<List<DropDownListModel>> GetModuleList()
        {
            return await userRepository.GetModuleList();
        }
        public async Task<List<DropDownListModel>> GetHrTypeList()
        {
            return await userRepository.GetHrTypeList();
        }

        /// <summary>
        /// Business method for Module list details
        /// </summary>
        public async Task<UserMasterList> GetUserMasterList(PageRequest request)
        {
            return await userRepository.GetUserMasterList(request);
        }

        /// <summary>
        /// Business method for EBill details
        /// </summary>
        public async Task<EWayBillModel> GetEWayBillDetails(EWayBillRequest request)
        {
            return await userRepository.GetEWayBillDetails(request);
        }

        /// <summary>
        /// Business method for delete user details
        /// </summary>
        public async Task<ResponseModel> DeleteUserDetails(string request)
        {
            return await userRepository.DeleteUserDetails(request);
        }

        /// <summary>
        /// Business method for validate username
        /// </summary>
        public async Task<ResponseModel> UsernameValidation(RequestModel request)
        {
            return await userRepository.UsernameValidation(request);
        }

        /// <summary>
        /// Business method for Module list details
        /// </summary>
        public async Task<List<DropDownListModel>> GetRoleTypeList()
        {
            return await userRepository.GetRoleTypeList();
        }
    }
}
