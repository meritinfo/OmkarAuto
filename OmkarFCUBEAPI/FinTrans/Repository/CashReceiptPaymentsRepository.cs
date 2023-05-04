using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FinTrans.Models;

namespace FinTrans.Repository
{
    public class CashReceiptPaymentsRepository : ICashReceiptPaymentsRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CashReceiptPaymentsRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save CashReceiptPayments
        /// </summary>
        /// <param name="CashReceiptPaymentsModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FtdID", cashReceiptPaymentsModel.FtdID),
                            new SqlParameter("@FtmID", cashReceiptPaymentsModel.FtmID),
                            new SqlParameter("@FtmDate", cashReceiptPaymentsModel.FtmDate),
                            new SqlParameter("@SlNo", cashReceiptPaymentsModel.SlNo),
                             new SqlParameter("@TypeSign", cashReceiptPaymentsModel.TypeSign),
                               new SqlParameter("@Amount", cashReceiptPaymentsModel.Amount),
                                   new SqlParameter("@AccountID", cashReceiptPaymentsModel.AccountID),
                               new SqlParameter("@Narration", cashReceiptPaymentsModel.Narration),
                                new SqlParameter("@ChequeNo", cashReceiptPaymentsModel.ChequeNo),
                                   new SqlParameter("@ChequeDate", cashReceiptPaymentsModel.ChequeDate),
                               new SqlParameter("@BankRefNo", cashReceiptPaymentsModel.BankRefNo),
                                     new SqlParameter("@CostRefType", cashReceiptPaymentsModel.CostRefType),
                                   new SqlParameter("@CostRefNo", cashReceiptPaymentsModel.CostRefNo),
                               new SqlParameter("@Reference", cashReceiptPaymentsModel.Reference),
                                     new SqlParameter("@CostCode", cashReceiptPaymentsModel.CostCode),
                                   new SqlParameter("@ClearDate", cashReceiptPaymentsModel.ClearDate),
                               new SqlParameter("@BranchReconYN", cashReceiptPaymentsModel.BranchReconYN),
                                   new SqlParameter("@AcctLedgerType", cashReceiptPaymentsModel.AcctLedgerType),
                                   new SqlParameter("@BranchCode", cashReceiptPaymentsModel.BranchCode),
                               new SqlParameter("@YearID", cashReceiptPaymentsModel.YearID)


                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CashReceiptPayments_Insert", param);

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