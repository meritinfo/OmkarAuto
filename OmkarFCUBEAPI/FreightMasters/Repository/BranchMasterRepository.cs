using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
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
        public async Task<List<BranchListModel>> GetStateList()
        {
            List<BranchListModel> branchList = new();
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
    }
}
