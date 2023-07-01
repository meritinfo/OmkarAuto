using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;

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
                            new SqlParameter("@CentreName", BranchMasterModel.CentreName),
                            new SqlParameter("@BranchBusinessType", BranchMasterModel.BranchBusinessType),
                            new SqlParameter("@AcctYN", BranchMasterModel.AcctYN),
                            new SqlParameter("@AcctBranch", BranchMasterModel.AcctBranch),
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
                            new SqlParameter("@ActiveYN", BranchMasterModel.ActiveYN),
                            new SqlParameter("@BankAcLedger", BranchMasterModel.BankAcLedger),
                            new SqlParameter("@BranchAcLedger", BranchMasterModel.BranchAcLedger),
                            new SqlParameter("@EntryLockDays", BranchMasterModel.EntryLockDays),
                            new SqlParameter("@BankName", BranchMasterModel.BankName),
                            new SqlParameter("@BankAdd", BranchMasterModel.BankAdd),
                            new SqlParameter("@BankAcNo", BranchMasterModel.BankAcNo),
                            new SqlParameter("@BankIfsc", BranchMasterModel.BankIfsc),
                            new SqlParameter("@EwayBillApiYN", BranchMasterModel.EwayBillApiYN),
                            new SqlParameter("@EwayBillApiGstId", BranchMasterModel.EwayBillApiGstId),
                            new SqlParameter("@EwayBillApiUid", BranchMasterModel.EwayBillApiUid),
                            new SqlParameter("@EwayBillApiPwd", BranchMasterModel.EwayBillApiPwd),
                            new SqlParameter("@PanApiCheckYN", BranchMasterModel.PanApiCheckYN),
                            new SqlParameter("@BankApiCheckYN", BranchMasterModel.BankApiCheckYN),
                            new SqlParameter("@TruckApiCheckYN", BranchMasterModel.TruckApiCheckYN),
                            new SqlParameter("@IsHO", BranchMasterModel.IsHO),
                            new SqlParameter("@LoggedInUser", BranchMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BranchMasterDetails_Insert", param);

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
        public async Task<List<BranchListModel>> GetBranchList()
        {
            List<BranchListModel> branchList = new();
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
                            branchList.Add(new BranchListModel
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
        public async Task<BranchMasterList> GetBranchMasterList(BranchMasterListRequest request)
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BranchMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            branchList.Add(new BranchMasterModel
                            {
                                Centreid = Convert.ToString(dataSet.Tables[0].Rows[i]["Centreid"]),
                                Code = Convert.ToString(dataSet.Tables[0].Rows[i]["Code"]),
                                CentreName = Convert.ToString(dataSet.Tables[0].Rows[i]["CentreName"]),
                                ZoneCode = Convert.ToString(dataSet.Tables[0].Rows[i]["ZoneCode"]),
                                RegionId = Convert.ToString(dataSet.Tables[0].Rows[i]["RegionId"]),
                                BranchBusinessType = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchBusinessType"]),
                                AcctBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["AcctBranch"]),
                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                AcctYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AcctYN"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                City = Convert.ToString(dataSet.Tables[0].Rows[i]["City"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                OffPhone1 = Convert.ToString(dataSet.Tables[0].Rows[i]["OffPhone1"]),
                                OffPhone2 = Convert.ToString(dataSet.Tables[0].Rows[i]["OffPhone2"]),
                                MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                BranchEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchEmail"]),
                                ManagerName = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerName"]),
                                ManagerMobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerMobileNo"]),
                                ManagerPhone = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerPhone"]),
                                ManagerEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["ManagerEmail"]),
                                GstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GstNo"]),
                                ActiveYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ActiveYN"]),
                                BankAcLedger = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcLedger"]),
                                BranchAcLedger = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchAcLedger"]),
                                EntryLockDays = Convert.ToString(dataSet.Tables[0].Rows[i]["EntryLockDays"]),
                                BankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                BankAdd = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAdd"]),
                                BankAcNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAcNo"]),
                                BankIfsc = Convert.ToString(dataSet.Tables[0].Rows[i]["BankIfsc"]),
                                EwayBillApiYN = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillApiYN"]),
                                EwayBillApiGstId = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillApiGstId"]),
                                EwayBillApiUid = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillApiUid"]),
                                EwayBillApiPwd = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillApiPwd"]),
                                PanApiCheckYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PanApiCheckYN"]),
                                BankApiCheckYN = Convert.ToString(dataSet.Tables[0].Rows[i]["BankApiCheckYN"]),
                                TruckApiCheckYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckApiCheckYN"]),
                                IsHO = Convert.ToString(dataSet.Tables[0].Rows[i]["IsHO"]),


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
        public async Task<List<StateListModel>> GetStateList()
        {
            List<StateListModel> stateList = new();
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
                            stateList.Add(new StateListModel
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
    }

}
