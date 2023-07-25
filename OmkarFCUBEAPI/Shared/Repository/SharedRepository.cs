using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Shared.Repository
{
    public class SharedRepository : ISharedRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public SharedRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for login to the application
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns>UserModel</returns>
        public async Task<UserModel> LoginDetails(LoginModel loginModel)
        {
            UserModel userModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserName", loginModel.UserName),
                            new SqlParameter("@UserPassword", loginModel.UserPassword)
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "LoginDetails_Select", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        userModel.UserId = Convert.ToString(userData.Tables[0].Rows[0]["UserId"]);
                        userModel.UserName = Convert.ToString(userData.Tables[0].Rows[0]["UserName"]);
                        userModel.Status = Convert.ToBoolean(userData.Tables[0].Rows[0]["Status"]);
                        userModel.Message = Convert.ToString(userData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        userModel.UserId = "0";
                        userModel.UserName = "";
                        userModel.Status = false;
                        userModel.Message = "Account not found";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return userModel;
        }

        /// <summary>
        /// Service method for login to the application
        /// </summary>
        /// <param name="userID"></param>
        /// <returns>List<MenuModel></returns>
        public async Task<List<MenuModel>> MenuDetails(string userID)
        {
            List<MenuModel> menuList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserID", userID)
                        };
                    var menuData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "MenuList_Select", param);

                    if (menuData != null && menuData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < menuData.Tables[0].Rows.Count; i++)
                        {
                            menuList.Add(new MenuModel
                            {
                                ModuleId = Convert.ToInt32(menuData.Tables[0].Rows[i]["ModuleId"]),
                                ModuleName = Convert.ToString(menuData.Tables[0].Rows[i]["ModuleName"]),
                                MenuName = Convert.ToString(menuData.Tables[0].Rows[i]["MenuName"]),
                                MenuType = Convert.ToString(menuData.Tables[0].Rows[i]["MenuType"]),
                                MenuCode = Convert.ToString(menuData.Tables[0].Rows[i]["MenuCode"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return menuList;
        }
        public async Task<List<YearListModel>> GetYearList()
        {
            List<YearListModel> yearList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "YearList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            yearList.Add(new YearListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return yearList;
        }

    }
}
