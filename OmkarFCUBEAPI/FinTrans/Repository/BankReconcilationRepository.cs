using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Repository
{
    public class BankReconcilationRepository : IBankReconcilationRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BankReconcilationRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BankReconcilationSave(BankReconcilationListModel bankRecListModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    if (bankRecListModel.BankreconcilationList.Count > 0)
                    {
                        for (int i = 0; i < bankRecListModel.BankreconcilationList.Count; i++)
                        {
                            SqlParameter[] param =
                            {
                                new SqlParameter("@FtdID"       , bankRecListModel.BankreconcilationList[i].FtdID),
                                new SqlParameter("@ClearDate"   , bankRecListModel.BankreconcilationList[i].ClearDate),

                            };
                            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BankReconcilationSave", param);
                            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                            {
                                responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                                responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);                               
                            }
                            else
                            {
                                responseModel.Status    = false;
                                responseModel.Message   = "Unable to process";
                            }
                        }
                    }
                    else
                    {
                        responseModel.Status    = false;
                        responseModel.Message   = "Unable to process";
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

        public async Task<BankReconcilationListModel> GetBankReconcileGridList(BankRecFilterModel req)
        {
            BankReconcilationListModel bankReconcilationListModel = new()
            {
                BankreconcilationList  = new List<BankReconcilationModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@FromDate", req.FromDate),
                        new SqlParameter("@ToDate", req.ToDate),
                        new SqlParameter("@Accountid", req.Accountid),
                        new SqlParameter("@Reconcile", req.Reconcile),
                        new SqlParameter("@Inclopening", req.Inclopening),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankReconcileGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            bankReconcilationListModel.BankreconcilationList.Add(new BankReconcilationModel
                            {
                                FtdID           = Convert.ToString(dataSet.Tables[0].Rows[i]["FtdID"]),
                                TransDate       = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                DocNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                Debit           = Convert.ToString(dataSet.Tables[0].Rows[i]["Debit"]),
                                Credit          = Convert.ToString(dataSet.Tables[0].Rows[i]["Credit"]),
                                ChequeNo        = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate      = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                Narration       = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                SubAccountName  = Convert.ToString(dataSet.Tables[0].Rows[i]["SubAccountName"]),
                                ClearDate       = Convert.ToString(dataSet.Tables[0].Rows[i]["ClearDate"]),
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
            return bankReconcilationListModel;
        }

        public async Task<List<DropDownListModel>> GetBankacList()
        {
            List<DropDownListModel> bankAcList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBankAccountList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            bankAcList.Add(new DropDownListModel
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
            return bankAcList;
        }


    }


}