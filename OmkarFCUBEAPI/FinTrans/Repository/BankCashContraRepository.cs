using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FinTrans.Models;

namespace FinTrans.Repository
{
    public class BankCashContraRepository : IBankCashContraRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BankCashContraRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save CashReceiptPayments
        /// </summary>
        /// <param name="CashReceiptPaymentsModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> BankCashContraSave(BankCashContraModel bankCashContraModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@FtmID", bankCashContraModel.@FtmID),
                             new SqlParameter("@FtmDate", bankCashContraModel.@FtmDate),
                             new SqlParameter("@DocType", bankCashContraModel.@DocType),
                             new SqlParameter("@DocSeries", bankCashContraModel.@DocSeries),
                              new SqlParameter("@DocNo", bankCashContraModel.@DocNo),

                             new SqlParameter("@SeriesDoc", bankCashContraModel.SeriesDoc),
                             new SqlParameter("@Remarks", bankCashContraModel.Remarks),
                             new SqlParameter("@RefType", bankCashContraModel.RefType),
                             new SqlParameter("@RefNo", bankCashContraModel.RefNo),
                             new SqlParameter("@DocAmount", bankCashContraModel.DocAmount),
                             new SqlParameter("@LinkedYN", bankCashContraModel.LinkedYN),
                                 new SqlParameter("@NeftPmt", bankCashContraModel.NeftPmt),
                             new SqlParameter("@UTRNo", bankCashContraModel.UTRNo),
                             new SqlParameter("@YearID", bankCashContraModel.YearID),
                            new SqlParameter("@BranchCode", bankCashContraModel.BranchCode),
                             new SqlParameter("@ModifyRemarks", bankCashContraModel.ModifyRemarks),
                             new SqlParameter("@LoggedInUser", bankCashContraModel.LoggedInUser),






                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BankReceiptPayments_Insert", param);
                    string FtmID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        FtmID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        // responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // Miss Details insert or update

                        if (bankCashContraModel.DetailList.Count > 0)
                        {
                            for (int i = 0; i < bankCashContraModel.DetailList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@FtmID", FtmID),
                                    new SqlParameter("@FtmDate",bankCashContraModel.DetailList[i].FtmDate),
                                    new SqlParameter("@SlNo", bankCashContraModel.DetailList[i].SlNo),
                                    new SqlParameter("@TypeSign", bankCashContraModel.DetailList[i].TypeSign),
                                    new SqlParameter("@Amount", bankCashContraModel.DetailList[i].Amount),
                                    new SqlParameter("@AccountID", bankCashContraModel.DetailList[i].AccountID),
                                    new SqlParameter("@Narration", bankCashContraModel.DetailList[i].Narration),
                                    new SqlParameter("@CostRefNo", bankCashContraModel.DetailList[i].CostRefNo),
                                    new SqlParameter("@Reference", bankCashContraModel.DetailList[i].Reference),
                                    new SqlParameter("@ChequeNo", bankCashContraModel.DetailList[i].ChequeNo),
                                    new SqlParameter("@ChequeDate", bankCashContraModel.DetailList[i].ChequeDate),
                                    new SqlParameter("@BranchCode", bankCashContraModel.DetailList[i].BranchCode),

                                   // new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0")
                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BankReceiptPaymentDetails_Insert", paramMisc);
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


        public async Task<BankCashContraList> GetBankCashContraList(BankCashContraListRequest request)
        {
            BankCashContraList bankCashContraList = new();
            List<FinTransMasterModel> bankCashList = new();
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
                            bankCashList.Add(new FinTransMasterModel
                            {
                                FtmID = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmID"]),
                                FtmDate = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmDate"]),
                                DocType = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),

                                DocSeries = Convert.ToString(dataSet.Tables[0].Rows[i]["DocSeries"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                SeriesDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesDoc"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                RefType = Convert.ToString(dataSet.Tables[0].Rows[i]["RefType"]),

                                //RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                //DocAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["DocAmount"]),
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

                                //ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                //YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),


                            });
                        }

                        bankCashContraList.BankCashContList = bankCashList;

                        bankCashContraList.PageMetaData = new PaginationMetaData
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
            return bankCashContraList;
        }
    }


}