using Shared.Models;
using Shared.Repository;
using System.Security.Claims;
using System.Text;
using System;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using DocumentFormat.OpenXml.Drawing;

namespace Shared.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class SharedBusiness : ISharedBusiness
    {
        IConfiguration _configuration;
        readonly ISharedRepository sharedRepository;

        public SharedBusiness(IConfiguration configuration, ISharedRepository _sharedRepository)
        {
            _configuration = configuration;
            sharedRepository = _sharedRepository;
        }

        /// <summary>
        /// Business method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        public async Task<UserModel> LoginDetails(LoginModel loginModel)
        {
            var userModel = await sharedRepository.LoginDetails(loginModel);
            if (userModel.Status)
            {
                // authentication successful so generate jwt token
                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserName", Convert.ToString(loginModel.UserName))
                    };


                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(30),
                    signingCredentials: signIn);

                userModel.Token = new JwtSecurityTokenHandler().WriteToken(token);
            }
            return userModel;
        }
        /// <summary>
        /// Business method for refresh token to the application
        /// </summary>
        /// <param name="userName"></param>
        public async Task<UserModel> RefreshToken(LoginModel request)
        {
            var userData = new UserModel();
            // authentication successful so generate jwt token
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserName", Convert.ToString(request.UserName))
                    };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: signIn);

            string RefreshToken = new JwtSecurityTokenHandler().WriteToken(token);
            userData.Token = RefreshToken;
            return userData;
        }
        public async Task<ResponseModel> IntermediateScreenDetail(IntermediateScreenModel request)
        {
            return await sharedRepository.IntermediateScreenDetail(request);
        }
        public async Task<ResponseModel> CheckBookingDate(DateModel request)
        {
            return await sharedRepository.CheckBookingDate(request);
        }
        public async Task<List<DropDownListModel>> GetYearList()
        {
            return await sharedRepository.GetYearList();
        }
        public async Task<ResponseModel> GetCompanyDetail()
        {
            return await sharedRepository.GetCompanyDetail();
        }
        public async Task<ScheduleModel> GetScheduleDetails()
        {
            return await sharedRepository.GetScheduleDetails();
        }
        public async Task<List<DropDownListModel>> GetServerDate()
        {
            return await sharedRepository.GetYearList();
        }
        public async Task<List<DropDownListModel>> GetScopeBranchList(RequestModel req)
        {
            return await sharedRepository.GetScopeBranchList(req);
        }

        public async Task<List<MenuListModel>> MenuDetails(string userID)
        {
            List<MenuListModel> menuList = new List<MenuListModel>();
            var menuData = await sharedRepository.MenuDetails(userID);
            var distinctModule = menuData.Select(x => x.ModuleName).Distinct();
            foreach (var item in distinctModule)
            {
                var distinctMenuType = menuData.Where(M => M.ModuleName == item).Select(x => x.MenuType).Distinct();
                List<MenuTypeModel> menuTypeList = new();

                foreach (var menuType in distinctMenuType)
                {
                    menuTypeList.Add(new MenuTypeModel
                    {
                        MenuTypeName = menuType,
                        MenuList = menuData.Where(x => x.ModuleName == item && x.MenuType == menuType)
                        .Select(m => new MenuModel
                        {
                            MenuName = m.MenuName,
                            MenuCode = m.MenuCode,
                            MenuType = m.MenuType,
                            CreateYN = m.CreateYN,
                            EditYN = m.EditYN,
                            ViewYN = m.ViewYN,
                            DeleteYN = m.DeleteYN
                        }).Distinct().ToList()
                    });
                }
                menuList.Add(new MenuListModel
                {
                    ModuleName = item,
                    MenuTypeList = menuTypeList
                });
            }
            return menuList;
        }
        public async Task<List<DocRenewalModel>> GetDocRenewalDetails()
        {
            return await sharedRepository.GetDocRenewalDetails();
        }
    }
}
