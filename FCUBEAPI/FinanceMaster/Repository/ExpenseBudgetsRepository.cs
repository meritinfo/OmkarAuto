using FinanceMaster.Models;
using FinanceMasters.Models;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace FinanceMaster.Repository
{
    public class ExpenseBudgetsRepository: IExpenseBudgetsRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ExpenseBudgetsRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> ExpenseBudgetsSave(ExpenseBudgetsList expenseBudgetsModel)
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
                    RequestModel requestModel = new RequestModel();
                    requestModel.strRequest = expenseBudgetsModel.ExpenseList[0].BranchCode;

                    responseModel = await ExpenseDelete(transaction, requestModel);

                    for (int i = 0; i < expenseBudgetsModel.ExpenseList.Count; i++)
                    {
                        SqlParameter[] param =
                         {
                             new SqlParameter("@YearId" ,expenseBudgetsModel.ExpenseList[i].YearId ),
                             new SqlParameter("@BranchCode" , expenseBudgetsModel.ExpenseList[i].BranchCode ),
                             new SqlParameter("@AccountId " , expenseBudgetsModel.ExpenseList[i].AccountId ),
                             new SqlParameter("@BudgetRs" , expenseBudgetsModel.ExpenseList[i].BudgetRs),


                        };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ExpenseBudgetsSave", param);

                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = expenseBudgetsModel.ExpenseList.Count;
                            }
                        }
                        else
                        {
                            transaction.Rollback();
                            responseModel.Status = false;
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
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
        public async Task<ExpenseBudgetsList> GeExpenseBudgetsList(PageRequest request)
        {
            ExpenseBudgetsList expenseBudgets = new();
            List<ExpenseBudgetsModel> expenseList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetExpenseBudgetsList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            expenseList.Add(new ExpenseBudgetsModel
                            {
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                AccountId = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountId"]),
                                BudgetRs = Convert.ToString(dataSet.Tables[0].Rows[i]["BudgetRs"]),
                               
                            });
                        }

                        expenseBudgets.ExpenseList = expenseList;

                        expenseBudgets.PageMetaData = new PaginationMetaData
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
            return expenseBudgets;
        }
        public async Task<ResponseModel> ExpenseBudgetsDelete(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            responseModel = await ExpenseDelete(transaction, requestModel);

            return responseModel;
        }

        public async Task<ResponseModel> ExpenseDelete(SqlTransaction transaction, RequestModel requestModel)
        {
            ResponseModel responseModel = new();
           
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ExpenseBudgetsDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }
    }
}
