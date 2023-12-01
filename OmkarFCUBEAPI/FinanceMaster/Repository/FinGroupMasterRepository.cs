using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.Common;
using System.Data;
using System.Data.SqlClient;
using System.Security.Principal;

namespace FinanceMasters.Repository
{
    public class FinGroupMasterRepository : IFinGroupMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FinGroupMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save fin Group master details
        /// </summary>
        /// <param name="finGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> FinGroupMasterSave(FinGroupMasterModel finGroupMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@AccountID"           , finGroupMasterModel.AccountID     ),
                        new SqlParameter("@AccountName"         , finGroupMasterModel.GroupName     ),
                        new SqlParameter("@AccountType"         , finGroupMasterModel.AccountType   ),
                        new SqlParameter("@subAccountType"      , finGroupMasterModel.SubAccountType),
                        new SqlParameter("@AccountGroupFlag"    , "G"                               ),
                        new SqlParameter("@AccountLedgerType"   , "O"                               ),
                        new SqlParameter("@CreatedBy"           , finGroupMasterModel.CreatedBy     ),
                        new SqlParameter("@DeleteFlag"          , "N"                               ),
                        new SqlParameter("@SchID"               , finGroupMasterModel.SchID         ),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_FinGroupSave", param);

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

        public async Task<FinGroupMasterList> GetFinGroupMasterList(PageRequest request)
        {
            FinGroupMasterList finGroupMasterList = new();
            List<FinGroupMasterModel> finGroupList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinGroupDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            finGroupList.Add(new FinGroupMasterModel
                            {
                                AccountID = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountId"]),
                                GroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupName"]),
                                AccountType = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountType"]),
                                SubAccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["SubAccountName"]),

                            });
                        }

                        finGroupMasterList.FinGroupList = finGroupList;

                        finGroupMasterList.PageMetaData = new PaginationMetaData
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
            return finGroupMasterList;
        }


        /// <summary>
        /// Service method for get Account Type List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetAccountTypeList()
        {
            List<DropDownListModel> AccountTypeList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinGroupAccountTypes", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            AccountTypeList.Add(new DropDownListModel
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
            return AccountTypeList;
        }

        /// <summary>
        /// Service method for get Sub Account Type List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetSubAccountTypeList(RequestModel req)
        {
            List<DropDownListModel> SubAccountTypeList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = {
                        new SqlParameter("@AccountType",req.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinGroupSubAccountTypes", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            SubAccountTypeList.Add(new DropDownListModel
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
            return SubAccountTypeList;
        }

        /// <summary>
        /// Service method for get ScheduleList List
        /// </summary>
        /// <returns>List<DropDownListModel></returns>
        public async Task<List<DropDownListModel>> GetScheduleList()
        {
            List<DropDownListModel> ScheduleList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinGroupScheduleList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            ScheduleList.Add(new DropDownListModel
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
            return ScheduleList;
        }

  
        public async Task<ResponseModel> chkActName(string AccountName)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@accountName", AccountName),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_FinGroupChkActName", param);

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

    }
}
