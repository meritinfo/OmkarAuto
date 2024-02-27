using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public class BranchMasterRepository : IBranchMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BranchMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel BranchMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Centreid", BranchMasterModel.Centreid),
                            new SqlParameter("@Code", BranchMasterModel.Code),
                            new SqlParameter("@CentreName", BranchMasterModel.CentreName),
                            new SqlParameter("@ZoneCode",BranchMasterModel.ZoneCode),
                            new SqlParameter("@Address1", BranchMasterModel.Address1),
                            new SqlParameter("@Address2", BranchMasterModel.Address2),
                            new SqlParameter("@Address3", BranchMasterModel.Address3),
                            new SqlParameter("@City", BranchMasterModel.City),
                            new SqlParameter("@StateCode", BranchMasterModel.StateCode),
                            new SqlParameter("@PinCode", BranchMasterModel.PinCode),
                            new SqlParameter("@OffPhone1", BranchMasterModel.OffPhone1),
                            new SqlParameter("@OffPhone2", BranchMasterModel.OffPhone2),
                            new SqlParameter("@MobileNo", BranchMasterModel.MobileNo),
                            new SqlParameter("@BranchEmail", BranchMasterModel.BranchEmail),
                            new SqlParameter("@ManagerName", BranchMasterModel.ManagerName),
                            new SqlParameter("@ManagerMobileNo", BranchMasterModel.ManagerMobileNo),
                            new SqlParameter("@ManagerPhone", BranchMasterModel.ManagerPhone),
                            new SqlParameter("@ManagerEmail", BranchMasterModel.ManagerEmail),
                            new SqlParameter("@GstNo", BranchMasterModel.GstNo),
                            new SqlParameter("@EntryLockDays", BranchMasterModel.EntryLockDays),
                            new SqlParameter("@LoggedInUser", BranchMasterModel.LoggedInUserID)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BranchMasterDetailsSave", param);

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
            return responseModel;
        }

        /// <summary>
        /// Service method for get branch list
        /// </summary>
        /// <returns>List<BranchListModel></returns>
        public async Task<List<DropDownListModel>> GetBranchList()
        {
            List<DropDownListModel> branchList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BranchList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for(int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            branchList.Add(new DropDownListModel
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
            return branchList;
        }
        public async Task<BranchMasterList> GetBranchMasterList(PageRequest request)
        {
            BranchMasterList branchMasterList = new();
            List<BranchMasterModel> branchList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBranchMasterDetailsList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            branchList.Add(new BranchMasterModel
                            {
                                Centreid        = Convert.ToString(dataSet.Tables[0].Rows[i]["Centreid"]),
                                Code            = Convert.ToString(dataSet.Tables[0].Rows[i]["Code"]),
                                CentreName      = Convert.ToString(dataSet.Tables[0].Rows[i]["CentreName"]),
                                ZoneCode        = Convert.ToString(dataSet.Tables[0].Rows[i]["ZoneCode"]),
                                StateName       = Convert.ToString(dataSet.Tables[0].Rows[i]["StateName"]),
                                Address1        = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2        = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3        = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                City            = Convert.ToString(dataSet.Tables[0].Rows[i]["City"]),
                                StateCode       = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                OffPhone1       = Convert.ToString(dataSet.Tables[0].Rows[i]["OffPhone1"]),
                                OffPhone2       = Convert.ToString(dataSet.Tables[0].Rows[i]["OffPhone2"]),
                                MobileNo        = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                BranchEmail     = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchEmail"]),
                                ManagerName     = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerName"]),
                                ManagerMobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerMobileNo"]),
                                ManagerPhone    = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerPhone"]),
                                ManagerEmail    = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerEmail"]),
                                GstNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["GstNo"]),
                                EntryLockDays   = Convert.ToString(dataSet.Tables[0].Rows[i]["EntryLockDays"]),
                            });
                        }

                        branchMasterList.branchMasterList = branchList;

                        branchMasterList.PageMetaData = new PaginationMetaData
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
            return branchMasterList;
        }
        public async Task<List<DropDownListModel>> GetStateList()
        {
            List<DropDownListModel> stateList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "StateList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            stateList.Add(new DropDownListModel
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
            return stateList;
        }

        public async Task<ResponseModel> BranchMasterDetailsDelete(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Centreid", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BranchMasterDetailsDelete", param);

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

        public async Task<ResponseModel> ChkCodeExits(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Code", req.strRequest),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BranchChkCodeExists", param);

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
        public async Task<ResponseModel> ChkBranchNameExits(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchName", req.strRequest),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BranchNameChkExists", param);

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
