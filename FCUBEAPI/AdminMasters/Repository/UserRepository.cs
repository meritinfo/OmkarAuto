using AdminMasters.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using Shared.Repository;
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
        private ISharedRepository sharedRepository;

        public UserRepository(IOptions<DBModel> _dbconnection, IOptions<GSTConfigurationModel> _gstConfiguration, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            gstConfiguration = _gstConfiguration;
            sharedRepository = _sharedRepository;
        }
        /// <summary>
        /// Service method for save user master details
        /// </summary>
        /// <param name="userMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> UserMasterDetailsSave(UserMasterModel userMasterModel)
        {
            ResponseModel responseModel = new();
            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
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
                            new SqlParameter("@RoleId", userMasterModel.RoleId),
                            new SqlParameter("@Empbranch", userMasterModel.Empbranch),
                            new SqlParameter("@ActiveYN", userMasterModel.ActiveYN),
                            new SqlParameter("@OutOfOffReqOTP", userMasterModel.OutOfOffReqOTP),
                            new SqlParameter("@BranchList", userMasterModel.BranchList),
                            new SqlParameter("@ImageName", userMasterModel.ImageName),
                            new SqlParameter("@LoggedInUser", userMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_UserDetailsSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> ChangePassword(PasswordModel passwordModel)
        {
            ResponseModel responseModel = new();
            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", passwordModel.UserId),
                            new SqlParameter("@UserPassword", passwordModel.UserPassword),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "UserPassword_Update", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 && Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        transaction.Commit();
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> CheckPassword(PasswordModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserPassword", request.OldPassword),
                           //  new SqlParameter("@ConfirmPassword", request.ConfirmPassword),


                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_CheckPassword", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
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
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetModuleList()
        {
            List<DropDownListModel> moduleList = new();
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
                            moduleList.Add(new DropDownListModel
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
        public async Task<List<DropDownListModel>> GetHrTypeList()
        {
            List<DropDownListModel> moduleList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "HrTypeList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            moduleList.Add(new DropDownListModel
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
        public async Task<UserMasterList> GetUserMasterList(PageRequest request)
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUserDetailsList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            userList.Add(new UserMasterModel
                            {
                                UserId          = Convert.ToString(dataSet.Tables[0].Rows[i]["UserId"]),
                                UserName        = Convert.ToString(dataSet.Tables[0].Rows[i]["UserName"]),
                                UserPassword    = Convert.ToString(dataSet.Tables[0].Rows[i]["UserPassword"]),
                                UserDescription = Convert.ToString(dataSet.Tables[0].Rows[i]["UserDescription"]),
                                UserMobile      = Convert.ToString(dataSet.Tables[0].Rows[i]["UserMobile"]),
                                UserEmail       = Convert.ToString(dataSet.Tables[0].Rows[i]["UserEmail"]),
                                UserScope       = Convert.ToString(dataSet.Tables[0].Rows[i]["UserScope"]),
                                Empbranch       = Convert.ToString(dataSet.Tables[0].Rows[i]["Empbranch"]),
                                RoleId          = Convert.ToString(dataSet.Tables[0].Rows[i]["RoleId"]),
                                UserRoleType    = Convert.ToString(dataSet.Tables[0].Rows[i]["UserRoleType"]),
                                CentreName      = Convert.ToString(dataSet.Tables[0].Rows[i]["CentreName"]),
                                OutOfOffReqOTP  = Convert.ToString(dataSet.Tables[0].Rows[i]["OutOfOffReqOTP"]),
                                ActiveYN        = Convert.ToString(dataSet.Tables[0].Rows[i]["ActiveYN"]),
                                ImageName       = Convert.ToString(dataSet.Tables[0].Rows[i]["ImageName"]),
                                BranchList      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchList"]),
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
               
            }
            return userMasterList;
        }

        public async Task<string> GetAccessToken(EWayAPIConfigurationModel ewayapiConfigurtion)
        {
            string token = "";
            try
            {
                string URL = "https://pro.mastersindia.co/";

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                var data = new { 
                    username = ewayapiConfigurtion.ApiUserName, 
                    password = ewayapiConfigurtion.ApiPassword, 
                    client_id = ewayapiConfigurtion.ApiClient_id, 
                    client_secret = ewayapiConfigurtion.ApiClient_secret, 
                    grant_type = ewayapiConfigurtion.ApiGrantType };
                
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
               
            }
            return token;
        }

        public async Task<EWayBillModel> GetEWayBillDetails(RequestModel request)
        {
            EWayBillModel eWayBill = new();
            Root root = new();
            try
            {
                EWayAPIConfigurationModel ewayapiConfigurtion = new();

                ewayapiConfigurtion = await sharedRepository.EWayAPIConfigurationDetails();

                string URL = ewayapiConfigurtion.ApiCheckGstinUrl; // "https://pro.mastersindia.co/getEwayBillData";

                string token = await GetAccessToken(ewayapiConfigurtion);

                string urlParameters = "?access_token=" + token + 
                                        "&action=GetEwayBill&gstin="+ ewayapiConfigurtion.EwayBillApiGstId + 
                                        "&eway_bill_number=" + request.strRequest;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call! Program will wait here until a response is received or a timeout occurs.
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    int statusCode = data.results.code;
                    if(statusCode == 200)
                    {
                        root = JsonConvert.DeserializeObject<Root>(result);
                        eWayBill.result = root.results;
                    }
                    else
                    {
                        eWayBill.result = new();
                        eWayBill.result.code = statusCode;
                    }
                    

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

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserId", request)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "UserDetails_Delete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        /// <summary>
        /// Service method for validate username
        /// </summary>
        /// <param name="string"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> UsernameValidation(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@UserName", request.strRequest)
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

        public async Task<UserMasterModel> GetUserRights(RequestModel request)
        {
            UserMasterModel user = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = 
                        {
                            new SqlParameter("@UserId", request.strRequest)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUserRightDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        user.BenApproveBlock = Convert.ToString(statusData.Tables[0].Rows[0]["BenApproveBlock"]);
                        user.UpdateAdvancePaid = Convert.ToString(statusData.Tables[0].Rows[0]["UpdateAdvancePaid"]);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return user;
        }

        public async Task<DashBoardModel> GetDashboardNCC(RequestModel request)
        {
            DashBoardModel dashBoard = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoginDate", Convert.ToDateTime(request.strRequest))
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDashboardNCC", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        dashBoard.TotalBusi = Convert.ToString(statusData.Tables[0].Rows[0]["TotalBusi"]);
                        dashBoard.PreMonth= Convert.ToString(statusData.Tables[0].Rows[0]["PreMonth"]);
                        dashBoard.PrvMonth = Convert.ToString(statusData.Tables[0].Rows[0]["PrvMonth"]);
                        dashBoard.OldMonth = Convert.ToString(statusData.Tables[0].Rows[0]["OldMonth"]);
                        dashBoard.PreMonName= Convert.ToString(statusData.Tables[0].Rows[0]["PreMonName"]);
                        dashBoard.PrvMonName = Convert.ToString(statusData.Tables[0].Rows[0]["PrvMonName"]);
                        dashBoard.OldMonName = Convert.ToString(statusData.Tables[0].Rows[0]["OldMonName"]);
                        dashBoard.TotBilledCnt = Convert.ToString(statusData.Tables[0].Rows[0]["TotBilledCnt"]);                        
                        dashBoard.TotBilledAmt= Convert.ToString(statusData.Tables[0].Rows[0]["TotBilledAmt"]);
                        dashBoard.TotUnBilledCnt = Convert.ToString(statusData.Tables[0].Rows[0]["TotUnBilledCnt"]);
                        dashBoard.TotUnBilledAmt = Convert.ToString(statusData.Tables[0].Rows[0]["TotUnBilledAmt"]);
                        dashBoard.BilledCnt = Convert.ToString(statusData.Tables[0].Rows[0]["BilledCnt"]);
                        dashBoard.BilledAmt = Convert.ToString(statusData.Tables[0].Rows[0]["BilledAmt"]);
                        dashBoard.UnBilledCnt = Convert.ToString(statusData.Tables[0].Rows[0]["UnBilledCnt"]);
                        dashBoard.UnBilledAmt= Convert.ToString(statusData.Tables[0].Rows[0]["UnBilledAmt"]);
                        dashBoard.PendingAckCnt = Convert.ToString(statusData.Tables[0].Rows[0]["PendingAckCnt"]);
                        dashBoard.PendingAckAmt = Convert.ToString(statusData.Tables[0].Rows[0]["PendingAckAmt"]);
                        dashBoard.VehiCnt = Convert.ToString(statusData.Tables[0].Rows[0]["VehiCnt"]);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return dashBoard;
        }
    }
}
