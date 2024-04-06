
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Repository
{
    public class RolePrivilegesRepository : IRolePrivilegesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public RolePrivilegesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<RolePrivilegesListModel> GetRolePrivileges(RequestModel request)
        {
            RolePrivilegesListModel rolePrivilegesList = new();
            List<RolePrivilegesModel> masterList = new();
            List<RolePrivilegesModel> reportList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@RoleId", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRolePrivilegesList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            masterList.Add(new RolePrivilegesModel
                            {
                                RoleId      = Convert.ToString(dataSet.Tables[0].Rows[i]["RoleId"]),
                                ModuleId    = Convert.ToString(dataSet.Tables[0].Rows[i]["ModuleId"]),
                                MenuId      = Convert.ToString(dataSet.Tables[0].Rows[i]["MenuId"]),
                                CreateYN    = Convert.ToString(dataSet.Tables[0].Rows[i]["CreateYN"]),
                                EditYN      = Convert.ToString(dataSet.Tables[0].Rows[i]["EditYN"]),
                                ViewYN      = Convert.ToString(dataSet.Tables[0].Rows[i]["ViewYN"]),
                                DeleteYN    = Convert.ToString(dataSet.Tables[0].Rows[i]["DeleteYN"]),
                                PrintYN     = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintYN"]),
                                ModuleName  = Convert.ToString(dataSet.Tables[0].Rows[i]["ModuleName"]),
                                MenuName    = Convert.ToString(dataSet.Tables[0].Rows[i]["MenuName"]),
                                MenuType    = Convert.ToString(dataSet.Tables[0].Rows[i]["MenuType"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[1].Rows.Count; i++)
                        {
                            reportList.Add(new RolePrivilegesModel
                            {
                                RoleId      = Convert.ToString(dataSet.Tables[1].Rows[i]["RoleId"]),
                                ModuleId    = Convert.ToString(dataSet.Tables[1].Rows[i]["ModuleId"]),
                                MenuId      = Convert.ToString(dataSet.Tables[1].Rows[i]["MenuId"]),
                                CreateYN    = Convert.ToString(dataSet.Tables[1].Rows[i]["CreateYN"]),
                                EditYN      = Convert.ToString(dataSet.Tables[1].Rows[i]["EditYN"]),
                                ViewYN      = Convert.ToString(dataSet.Tables[1].Rows[i]["ViewYN"]),
                                DeleteYN    = Convert.ToString(dataSet.Tables[1].Rows[i]["DeleteYN"]),
                                PrintYN     = Convert.ToString(dataSet.Tables[1].Rows[i]["PrintYN"]),
                                ModuleName  = Convert.ToString(dataSet.Tables[1].Rows[i]["ModuleName"]),
                                MenuName    = Convert.ToString(dataSet.Tables[1].Rows[i]["MenuName"]),
                                MenuType    = Convert.ToString(dataSet.Tables[1].Rows[i]["MenuType"]),
                            });
                        }
                        rolePrivilegesList.RoleId = request.strRequest;
                        rolePrivilegesList.RolePrivilegesMasterList = masterList;
                        rolePrivilegesList.RolePrivilegesReportList = reportList;
                    }   
                }
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return rolePrivilegesList;
        }


        public async Task<ResponseModel> RolePrivilegesListSave(RolePrivilegesListModel rolePrivilegesList)
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
                            new SqlParameter("@RoleId", rolePrivilegesList.RoleId),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RolePrivilegesDelete", param);
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 && Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < rolePrivilegesList.RolePrivilegesMasterList.Count; i++)
                        {
                            responseModel = await RolePrivilegesDtlSave(transaction, rolePrivilegesList.RolePrivilegesMasterList[i]);
                            if (!responseModel.Status)
                            {
                                i = rolePrivilegesList.RolePrivilegesMasterList.Count;
                                transaction.Rollback();
                            }
                        }
                        for (int i = 0; i < rolePrivilegesList.RolePrivilegesReportList.Count; i++)
                        {
                            responseModel = await RolePrivilegesDtlSave(transaction, rolePrivilegesList.RolePrivilegesReportList[i]);
                            if (!responseModel.Status)
                            {
                                i = rolePrivilegesList.RolePrivilegesReportList.Count;
                                transaction.Rollback();
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else
                    {
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

        public async Task<ResponseModel> RolePrivilegesDtlSave(SqlTransaction transaction, RolePrivilegesModel rolePrivileges)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@RoleId",     rolePrivileges.RoleId),
                            new SqlParameter("@ModuleId",   rolePrivileges.ModuleId),
                            new SqlParameter("@MenuId",     rolePrivileges.MenuId),
                            new SqlParameter("@CreateYN",   rolePrivileges.CreateYN),
                            new SqlParameter("@EditYN",     rolePrivileges.EditYN),
                            new SqlParameter("@ViewYN",     rolePrivileges.ViewYN),
                            new SqlParameter("@DeleteYN",   rolePrivileges.DeleteYN),
                            new SqlParameter("@PrintYN",    rolePrivileges.PrintYN),

                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RolePrivilegesSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
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


    }
}
