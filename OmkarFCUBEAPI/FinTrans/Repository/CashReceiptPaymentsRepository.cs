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
                             new SqlParameter("@FtmID", cashReceiptPaymentsModel.@FtmID),
                             new SqlParameter("@FtmDate", cashReceiptPaymentsModel.@FtmDate),
                             new SqlParameter("@DocType", cashReceiptPaymentsModel.@DocType),
                             new SqlParameter("@@DocSeries", cashReceiptPaymentsModel.@DocSeries),
                             new SqlParameter("@DocNo", cashReceiptPaymentsModel.FtdID),
                             new SqlParameter("@SeriesDoc", cashReceiptPaymentsModel.SeriesDoc),
                             new SqlParameter("@Remarks", cashReceiptPaymentsModel.Remarks),
                             new SqlParameter("@RefType", cashReceiptPaymentsModel.RefType),
                             new SqlParameter("@RefNo", cashReceiptPaymentsModel.RefNo),
                             new SqlParameter("@DocAmount", cashReceiptPaymentsModel.DocAmount),
                             new SqlParameter("@NeftPmt", cashReceiptPaymentsModel.NeftPmt),
                             new SqlParameter("@UTRNo", cashReceiptPaymentsModel.UTRNo),
                             new SqlParameter("@ISDebitAdvice", cashReceiptPaymentsModel.ISDebitAdvice),
                             new SqlParameter("@DARefNo", cashReceiptPaymentsModel.DARefNo),
                             new SqlParameter("@AutoCreditFtmId", cashReceiptPaymentsModel.AutoCreditFtmId),
                             new SqlParameter("@IsTdsEntry", cashReceiptPaymentsModel.IsTdsEntry),
                             new SqlParameter("@LinkedYN", cashReceiptPaymentsModel.LinkedYN),
                             new SqlParameter("@LinkedDoc", cashReceiptPaymentsModel.LinkedDoc),
                             new SqlParameter("@YearID", cashReceiptPaymentsModel.YearID),
                             new SqlParameter("@BranchCode", cashReceiptPaymentsModel.BranchCode),
                            new SqlParameter("@AuditYN", cashReceiptPaymentsModel.AuditYN),
                            new SqlParameter("@AuditDt", cashReceiptPaymentsModel.AuditDt),
                            new SqlParameter("@AuditBy", cashReceiptPaymentsModel.AuditBy),
                            new SqlParameter("@AuditRemarks", cashReceiptPaymentsModel.AuditRemarks),
                            new SqlParameter("@ModifyRemarks", cashReceiptPaymentsModel.ModifyRemarks),
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "FinTrans_Insert", param);

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


        public async Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(CashReceiptPaymentsListRequest request)
        {
            CashReceiptPaymentsList cashReceiptPaymentsList = new();
            List<CashReceiptPaymentsModel> cashReceiptPayList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CashReceiptPaymentsList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            cashReceiptPayList.Add(new CashReceiptPaymentsModel
                            {
                                FtmID = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmID"]),
                                FtmDate = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmDate"]),
                                DocType = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),

                                DocSeries = Convert.ToString(dataSet.Tables[0].Rows[i]["DocSeries"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                SeriesDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesDoc"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                RefType = Convert.ToString(dataSet.Tables[0].Rows[i]["RefType"]),

                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                DocAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["DocAmount"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                UTRNo = Convert.ToString(dataSet.Tables[0].Rows[i]["UTRNo"]),
                                ISDebitAdvice = Convert.ToString(dataSet.Tables[0].Rows[i]["ISDebitAdvice"]),

                                DARefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DARefNo"]),
                                AutoCreditFtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["AutoCreditFtmId"]),
                                IsTdsEntry = Convert.ToString(dataSet.Tables[0].Rows[i]["IsTdsEntry"]),
                                LinkedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkedYN"]),
                                LinkedDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkedDoc"]),

                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                AuditYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditYN"]),
                                AuditDt = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditDt"]),
                                AuditBy = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditBy"]),
                                AuditRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditRemarks"]),

                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                               

                            });
                        }

                        cashReceiptPaymentsList.CashRecPaymentsList = cashReceiptPayList;

                        cashReceiptPaymentsList.PageMetaData = new PaginationMetaData
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
            return cashReceiptPaymentsList;
        }


    }


}