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
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                userModel.Token = new JwtSecurityTokenHandler().WriteToken(token);
            }
            return userModel;
        }
        public async Task<ResponseModel> IntermediateScreenDetail(string request)
        {
            return await sharedRepository.IntermediateScreenDetail(request);
        }
        public async Task<List<YearListModel>> GetYearList()
        {
            return await sharedRepository.GetYearList();
        }

        /// <summary>
        /// Business method for menu list to the application
        /// </summary>
        /// <param name="userID"></param>
        public async Task<List<MenuListModel>> MenuDetails(string userID)
        {
            List<MenuListModel> menuList = new List<MenuListModel>();
            var menuData = await sharedRepository.MenuDetails(userID);
            var distinctModule = menuData.Select(x => x.ModuleName).Distinct();
            foreach(var item in distinctModule)
            {
                menuList.Add(new MenuListModel
                {
                    ModuleName = item,
                    MenuList = menuData.Where(x => x.ModuleName == item)
                    .Select(m => new MenuModel
                    {
                        MenuName = m.MenuName,
                        MenuCode = m.MenuCode,
                        MenuType = m.MenuType
                    }).Distinct().ToList()
                });
            }
            return menuList;
        }
    }
}
