using AdminMasters.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SqlHelper.Models;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net.Http.Headers;

namespace AdminMasters.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly IOptions<GSTConfigurationModel> gstConfiguration;

        public UserRepository(IOptions<DBModel> _dbconnection, IOptions<GSTConfigurationModel> _gstConfiguration)
        {
            dbconnection = _dbconnection;
            gstConfiguration = _gstConfiguration;
        }
        /// <summary>
        /// Service method for save user master details
        /// </summary>
        /// <param name="userMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", userMasterModel.UserId),
                            new SqlParameter("@UserName", userMasterModel.UserName),
                            new SqlParameter("@UserPassword", userMasterModel.UserPassword),
                            new SqlParameter("@UserDescription", userMasterModel.UserDescription),
                            new SqlParameter("@UserMobile", userMasterModel.UserMobile),
                            new SqlParameter("@UserEmail", userMasterModel.UserEmail),
                            new SqlParameter("@UserScope", userMasterModel.UserScope),
                            new SqlParameter("@UserImage", userMasterModel.UserImage),
                            new SqlParameter("@RoleId", userMasterModel.RoleId),
                            new SqlParameter("@Remarks", userMasterModel.Remarks),
                            new SqlParameter("@Employeeid", userMasterModel.Employeeid),
                            new SqlParameter("@Empbranch", userMasterModel.Empbranch),
                            new SqlParameter("@ActiveYN", userMasterModel.ActiveYN),
                            new SqlParameter("@LastLoginDateTime_Success", userMasterModel.LastLoginDateTime_Success),
                            new SqlParameter("@LastLoginIP_Success", userMasterModel.LastLoginIP_Success),
                            new SqlParameter("@LastLoginDateTime_Fail", userMasterModel.LastLoginDateTime_Fail),
                            new SqlParameter("@LastLoginIP_Fail", userMasterModel.LastLoginIP_Fail),
                            new SqlParameter("@BranchList", userMasterModel.BranchList),
                            new SqlParameter("@ModuleList", userMasterModel.ModuleList),
                            new SqlParameter("@ImageName", userMasterModel.ImageName),
                            new SqlParameter("@ImageData", userMasterModel.ImageData){ SqlDbType = SqlDbType.VarBinary},
                            new SqlParameter("@LoggedInUser", userMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserDetails_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
            return responseModel;
        }

        /// <summary>
        /// Service method for get module list
        /// </summary>
        /// <returns>List<ModuleListModel></returns>
        public async Task<List<ModuleListModel>> GetModuleList()
        {
            List<ModuleListModel> moduleList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ModuleList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            moduleList.Add(new ModuleListModel
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
            return moduleList;
        }

        /// <summary>
        /// Service method for get user master list
        /// </summary>
        /// <returns>List<ModuleListModel></returns>
        public async Task<UserMasterList> GetUserMasterList(UserMasterListRequest request)
        {
            UserMasterList userMasterList = new();
            List<UserMasterModel> userList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserDetailsList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            userList.Add(new UserMasterModel
                            {
                                UserId = Convert.ToString(dataSet.Tables[0].Rows[i]["UserId"]),
                                UserName = Convert.ToString(dataSet.Tables[0].Rows[i]["UserName"]),
                                UserPassword = Convert.ToString(dataSet.Tables[0].Rows[i]["UserPassword"]),
                                UserDescription = Convert.ToString(dataSet.Tables[0].Rows[i]["UserDescription"]),
                                UserMobile = Convert.ToString(dataSet.Tables[0].Rows[i]["UserMobile"]),
                                UserEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["UserEmail"]),
                                UserScope = Convert.ToString(dataSet.Tables[0].Rows[i]["UserScope"]),
                                UserImage = Convert.IsDBNull(dataSet.Tables[0].Rows[i]["UserImage"]) ? null : (byte[])dataSet.Tables[0].Rows[i]["UserImage"],
                                RoleId = Convert.ToString(dataSet.Tables[0].Rows[i]["RoleId"]),
                                UserRoleType = Convert.ToString(dataSet.Tables[0].Rows[i]["UserRoleType"]),
                                CentreName = Convert.ToString(dataSet.Tables[0].Rows[i]["CentreName"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ActiveYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ActiveYN"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                BranchList = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchList"]),
                                ModuleList = Convert.ToString(dataSet.Tables[0].Rows[i]["ModuleList"]),
                            });
                        }

                        userMasterList.UserList = userList;

                        userMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
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
            return userMasterList;
        }

        /// <summary>
        /// Service method for get eway bill details
        /// </summary>
        /// <returns>EWayBillModel</returns>
        public async Task<string> GetAccessToken()
        {
            string token = "";
            try
            {
                string URL = "https://clientbasic.mastersindia.co/";

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                var data = new { username = gstConfiguration.Value.Username, password = gstConfiguration.Value.Password, client_id = gstConfiguration.Value.ClientId, client_secret = gstConfiguration.Value.ClientSecret, grant_type = gstConfiguration.Value.GrantType };
                HttpResponseMessage response = client.PostAsJsonAsync("oauth/access_token", data).Result;
                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    GSTAccessTokenModel tokenModel = JsonConvert.DeserializeObject<GSTAccessTokenModel>(responseData);
                    token = tokenModel.access_token;

                    client.Dispose();
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
            return token;
        }

        /// <summary>
        /// Service method for get eway bill details
        /// </summary>
        /// <returns>EWayBillModel</returns>
        public async Task<EWayBillModel> GetEWayBillDetails(EWayBillRequest request)
        {
            EWayBillModel eWayBill = new();
            Root root = new();
            try
            {
                string URL = "https://clientbasic.mastersindia.co/getEwayBillData";

                string token = await GetAccessToken();

                string urlParameters = "?access_token=" + token + "&action=GetEwayBill&gstin=05AAABB0639G1Z8&eway_bill_number=" + request.EWayBillNumber;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call! Program will wait here until a response is received or a timeout occurs.
                if (response.IsSuccessStatusCode)
                {
                    root = await response.Content.ReadAsAsync<Root>();
                    eWayBill.result = root.results;

                    client.Dispose();
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
            return eWayBill;
        }

        /// <summary>
        /// Service method for delete user master details
        /// </summary>
        /// <param name="string"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DeleteUserDetails(string request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", request)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserDetails_Delete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
            return responseModel;
        }

        /// <summary>
        /// Service method for validate username
        /// </summary>
        /// <param name="string"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> UsernameValidation(string request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserName", request)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserValidation_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
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
            return responseModel;
        }

        /// <summary>
        /// Service method for get module list
        /// </summary>
        /// <returns>List<ModuleListModel></returns>
        public async Task<List<DropDownListModel>> GetRoleTypeList()
        {
            List<DropDownListModel> roleTypeList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "RoleTypeList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            roleTypeList.Add(new DropDownListModel
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
            return roleTypeList;
        }
    }
}
