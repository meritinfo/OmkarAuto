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
                             new SqlParameter("@DocSeries", cashReceiptPaymentsModel.@DocSeries),
                              new SqlParameter("@DocNo", cashReceiptPaymentsModel.@DocNo),

                             new SqlParameter("@SeriesDoc", cashReceiptPaymentsModel.SeriesDoc),
                             new SqlParameter("@Remarks", cashReceiptPaymentsModel.Remarks),
                             new SqlParameter("@RefType", cashReceiptPaymentsModel.RefType),
                             new SqlParameter("@RefNo", cashReceiptPaymentsModel.RefNo),
                             new SqlParameter("@DocAmount", cashReceiptPaymentsModel.DocAmount),
                             new SqlParameter("@LinkedYN", cashReceiptPaymentsModel.LinkedYN),
                             new SqlParameter("@YearID", cashReceiptPaymentsModel.YearID),
                            new SqlParameter("@BranchCode", cashReceiptPaymentsModel.BranchCode),
                             new SqlParameter("@ModifyRemarks", cashReceiptPaymentsModel.ModifyRemarks),
                             new SqlParameter("@LoggedInUser", cashReceiptPaymentsModel.LoggedInUser),






                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CashReceiptPayments_Insert", param);
                    string FtmID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        FtmID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                       // responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // Miss Details insert or update
                        if (cashReceiptPaymentsModel.DetailList.Count > 0)
                        {
                            for (int i = 0; i < cashReceiptPaymentsModel.DetailList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@FtmID", FtmID),
                                    new SqlParameter("@FtmDate",cashReceiptPaymentsModel.DetailList[i].FtmDate),
                                    new SqlParameter("@SlNo", cashReceiptPaymentsModel.DetailList[i].SlNo),
                                    new SqlParameter("@TypeSign", cashReceiptPaymentsModel.DetailList[i].TypeSign),
                                    new SqlParameter("@Amount", cashReceiptPaymentsModel.DetailList[i].Amount),
                                    new SqlParameter("@AccountID", cashReceiptPaymentsModel.DetailList[i].AccountID),
                                    new SqlParameter("@Narration", cashReceiptPaymentsModel.DetailList[i].Narration),
                                    new SqlParameter("@CostRefNo", cashReceiptPaymentsModel.DetailList[i].CostRefNo),
                                    new SqlParameter("@Reference", cashReceiptPaymentsModel.DetailList[i].Reference),
                                    new SqlParameter("@BranchCode", cashReceiptPaymentsModel.DetailList[i].BranchCode),

                                   // new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0")
                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CashReceiptPaymentDetails_Insert", paramMisc);
                            }
                        }


                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                           // responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message2"]);
                          //  var Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message2"]);
                        }
                        else
                        {
                           // responseModel.Status = false;
                            responseModel.Message = "Unable to process";
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
            return responseModel;
        }
        public async Task<BankReceiptpaymentsList> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request)
        {
            BankReceiptpaymentsList bankReceiptpaymentsList = new();
            List<BankReceiptPaymentsModel> bankRecptpaymentsList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BankReceiptpaymentsList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            bankRecptpaymentsList.Add(new BankReceiptPaymentsModel
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
                                //NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                //UTRNo = Convert.ToString(dataSet.Tables[0].Rows[i]["UTRNo"]),
                                //ISDebitAdvice = Convert.ToString(dataSet.Tables[0].Rows[i]["ISDebitAdvice"]),

                                //DARefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DARefNo"]),
                                //AutoCreditFtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["AutoCreditFtmId"]),
                                //IsTdsEntry = Convert.ToString(dataSet.Tables[0].Rows[i]["IsTdsEntry"]),
                                //LinkedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkedYN"]),
                                //LinkedDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkedDoc"]),

                                //BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                //AuditYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditYN"]),
                                //AuditDt = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditDt"]),
                                //AuditBy = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditBy"]),
                                //AuditRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditRemarks"]),

                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),


                            });
                        }

                        bankReceiptpaymentsList.BankRecptpaymentsList = bankRecptpaymentsList;

                        bankReceiptpaymentsList.PageMetaData = new PaginationMetaData
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
            return bankReceiptpaymentsList;
        }

        public async Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(CashReceiptPaymentsListRequest request)
        {
            CashReceiptPaymentsList CashRecPaymentsList = new();
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
                        
                         
                           
                                LinkedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkedYN"]),
                            

                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                               
                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),


                            });
                        }

                        CashRecPaymentsList.CashRecPaymentsList = cashReceiptPayList;

                        CashRecPaymentsList.PageMetaData = new PaginationMetaData
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
            return CashRecPaymentsList;
        }


    }


}