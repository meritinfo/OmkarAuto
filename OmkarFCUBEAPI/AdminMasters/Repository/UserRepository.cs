using AdminMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace AdminMasters.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public UserRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
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
                            new SqlParameter("@LoggedInUser", userMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserDetails_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                        {
                            string UserID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                            for (int i = 0; i < userMasterModel.Branches.Count(); i++)
                            {
                                SqlParameter[] paramBranches =
                                {
                                new SqlParameter("@UserId", UserID),
                                new SqlParameter("@CentreId", userMasterModel.Branches[i].Centreid)
                                };
                                var statusBranchData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserBranchDetails_Insert", paramBranches);
                            }

                            for (int i = 0; i < userMasterModel.Modules.Count(); i++)
                            {
                                SqlParameter[] paramModules =
                                {
                                new SqlParameter("@UserId", UserID),
                                new SqlParameter("@ModuleId", userMasterModel.Modules[i].ModuleId)
                                };
                                var statusBranchData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "UserModuleDetails_Insert", paramModules);
                            }

                            responseModel.Status = true;
                            responseModel.Message = "User data saved successfully";
                        }
                        else
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        }
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
    }
}
