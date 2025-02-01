using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data;
using System.Data.SqlClient;
using Shared.Models;
using System.Transactions;
using DocumentFormat.OpenXml.Office2016.Excel;
using Shared.Repository;

namespace FinanceMasters.Repository
{
    public class OpeningBalanceMasterRepository : IOpeningBalanceMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public OpeningBalanceMasterRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<ResponseModel> OpeningBalanceSave(OpeningBalanceMasterModel openingBalanceMaster)
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
                        new SqlParameter("@BranchCode"   , openingBalanceMaster.BranchCode  ),
                        new SqlParameter("@YearID"       , openingBalanceMaster.YearID      ),
                    };
                    //Delete Previous Details
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_OpeningBalDetailDelete", param);
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
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
                        for (int i = 0; i < openingBalanceMaster.openingBalDetailList.Count; i++)
                        {
                            SqlParameter[] par =
                            {
                                new SqlParameter("@YearID", openingBalanceMaster.YearID),
                                new SqlParameter("@BranchCode", openingBalanceMaster.BranchCode),
                                new SqlParameter("@AccountID", openingBalanceMaster.openingBalDetailList[i].AccountID),
                                new SqlParameter("@OpeningBalanceAmt", openingBalanceMaster.openingBalDetailList[i].OpeningBalanceAmt),
                                new SqlParameter("@OpeningBalanceCrD", openingBalanceMaster.openingBalDetailList[i].OpeningBalanceCrDr),
                            };

                            var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_OpeningBalMasterSave", par);
                            if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                            {
                                responseModel.Status = Convert.ToBoolean(dataSet.Tables[0].Rows[0]["Status"]);
                                responseModel.Message = Convert.ToString(dataSet.Tables[0].Rows[0]["Message"]);
                                if (!Convert.ToBoolean(dataSet.Tables[0].Rows[0]["Status"]))
                                {
                                    transaction.Rollback();
                                    i = openingBalanceMaster.openingBalDetailList.Count;
                                }
                            }
                            else
                            {
                                responseModel.Status = false;
                                i = openingBalanceMaster.openingBalDetailList.Count;
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


        public async Task<OpeningBalanceMasterList> GetOpeningBalMasterList(PageRequest request)
        {
            OpeningBalanceMasterList openingBalanceMasterList = new();
            List<OpeningBalanceMasterModel> openBalList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber"  , request.PageNumber),
                            new SqlParameter("@PageSize"    , request.PageSize),
                            new SqlParameter("@SortColumn"  , request.SortColumn),
                            new SqlParameter("@SortOrder"   , request.SortOrder),
                            new SqlParameter("@Search"      , request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOpeningBalMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            openBalList.Add(new OpeningBalanceMasterModel
                            {
                                YearID      = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                                BranchCode  = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                BranchName  = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                            });
                        }

                        openingBalanceMasterList.OpenbalList = openBalList;

                        openingBalanceMasterList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount  = totalRecords,
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
            return openingBalanceMasterList;
        }

        public async Task<OpeningBalanceMasterModel> GetOpeningBalDetailList(OpeningBalanceRequest req)
        {
            OpeningBalanceMasterModel openingBalanceMaster = new()
            {
                openingBalDetailList  = new List<OpeningBalanceDetailModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode", req.BranchCode),
                            new SqlParameter("@YearId",     req.YearId)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOpeningBalDetailList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            openingBalanceMaster.openingBalDetailList.Add(new OpeningBalanceDetailModel
                            {
                                AccountID = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountID"]),
                                OpeningBalanceAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OpeningBalanceAmt"]),
                                OpeningBalanceCrDr = Convert.ToString(dataSet.Tables[0].Rows[i]["OpeningBalanceCrDr"]),
                            });
                        }
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
            return openingBalanceMaster;
        }

        public async Task<List<DropDownListModel>> GetAccountList()
        {
            List<DropDownListModel> AccountList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getOpenBalAccountList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            AccountList.Add(new DropDownListModel
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
            }
            return AccountList;
        }

        public async Task<ResponseModel> OpeningBalanceDelete(OpeningBalanceRequest req)
        {        
            ResponseModel responseModel = new();
            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                SqlParameter[] param =
                {
                    new SqlParameter("@YearID"      , req.YearId    ),
                    new SqlParameter("@BranchCode"  , req.BranchCode),
                };
                var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_OpeningBalDetailDelete", param);
                if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                {
                    responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                    responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    if (responseModel.Status)
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
                    responseModel.Message = "No Data found";
                    transaction.Rollback();
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<ResponseModel> ConsolidateOpeningBalUpdate(RequestModel req)
        {
            ResponseModel responseModel = new();
            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                SqlParameter[] param =
                {
                    new SqlParameter("@YearID" , req.strRequest),
                };
                var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsolidateOpeningBalUpdate", param);
            
                if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                {
                    responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                    responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    if (responseModel.Status)
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
                    responseModel.Message = "No Data Found";
                    transaction.Rollback();
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }


        public async Task<ConsolidatedOpenBalListModel> GetConsolidateOpeningBalList(RequestModel req)
        {
            ConsolidatedOpenBalListModel consolidatedOpenBal = new()
            {
                consolidateopenballist  = new List<ConsolidatedOpenBalModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@YearID" , req.strRequest),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsolidateOpeningBalList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            consolidatedOpenBal.consolidateopenballist.Add(new ConsolidatedOpenBalModel
                            {
                                AccountName = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                BalAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["BalAmt"]),
                                Crdr        = Convert.ToString(dataSet.Tables[0].Rows[i]["Crdr"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return consolidatedOpenBal;
        }

        public async Task<ResponseModel> GetConsolidateOpeningBalExcel(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                SqlParameter[] param =
                {
                    new SqlParameter("@YearID" , req.strRequest),
                };
                var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsolidateOpeningBalExcel", param);

                if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                {
                    var filter = " FOR YEAR " + req.strRequest1;

                    responseModel = await sharedRepository.GetExcelReport(statusData.Tables[0], "Opening Balance", filter);
                }
                else
                {
                    responseModel.Status = false;
                    responseModel.Message = "No Data Found";
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

    }
}
