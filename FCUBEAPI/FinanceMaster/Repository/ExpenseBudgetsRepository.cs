using FinanceMaster.Models;
using FinanceMasters.Models;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data;
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

                    if (responseModel.Status)
                    {
                        for (int i = 0; i < expenseBudgetsModel.ExpenseList.Count; i++)
                        {
                            SqlParameter[] param =
                             {
                                 new SqlParameter("@YearId" ,expenseBudgetsModel.ExpenseList[i].YearId ),
                                 new SqlParameter("@BranchCode" , expenseBudgetsModel.ExpenseList[i].BranchCode ),
                                 new SqlParameter("@AccountId" , expenseBudgetsModel.ExpenseList[i].AccountId ),
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
                    }
                    else
                    {
                        transaction.Rollback();
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
        public async Task<ExpenseBudgetsList> GetExpenseBudgetsInnerGridList(RequestModel request)
        {
            ExpenseBudgetsList expenseBudgets = new();
            List<ExpenseBudgetsModel> expenseList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getExpenseBudgetsInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            expenseList.Add(new ExpenseBudgetsModel
                            {
                                YearId = Convert.ToString(resultData.Tables[0].Rows[i]["YearId"]),
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["BranchCode"]),
                                AccountId = Convert.ToString(resultData.Tables[0].Rows[i]["AccountId"]),
                                BudgetRs = Convert.ToString(resultData.Tables[0].Rows[i]["BudgetRs"]),
                               
                            });
                        }
                    }
                    expenseBudgets.ExpenseList = expenseList;

                }
            }
            catch (Exception ex)
            {

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

            if (responseModel.Status)
            {
                transaction.Commit();
            }
            else { transaction.Rollback(); }

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
                    }
                    else
                    {
                        responseModel.Status = false;
                    }
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
