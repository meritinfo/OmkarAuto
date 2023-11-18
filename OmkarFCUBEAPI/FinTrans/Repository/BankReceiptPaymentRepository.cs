using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FinTrans.Models;

namespace FinTrans.Repository
{
    public class BankReceiptPaymentsRepository : IBankReceiptPaymentsRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BankReceiptPaymentsRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save BankReceiptPayments
        /// </summary>
        /// <param name="CashReceiptPaymentsModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> BankReceiptPaymentsSave(BankReceiptPaymentsModel bankReceiptPaymentsModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@FtmID", bankReceiptPaymentsModel.@FtmID),
                             new SqlParameter("@FtmDate", bankReceiptPaymentsModel.@FtmDate),
                             new SqlParameter("@DocType", bankReceiptPaymentsModel.@DocType),
                             new SqlParameter("@DocSeries", bankReceiptPaymentsModel.@DocSeries),
                              new SqlParameter("@DocNo", bankReceiptPaymentsModel.@DocNo),

                             new SqlParameter("@SeriesDoc", bankReceiptPaymentsModel.SeriesDoc),
                             new SqlParameter("@Remarks", bankReceiptPaymentsModel.Remarks),
                             new SqlParameter("@RefType", bankReceiptPaymentsModel.RefType),
                             new SqlParameter("@RefNo", bankReceiptPaymentsModel.RefNo),
                             new SqlParameter("@DocAmount", bankReceiptPaymentsModel.DocAmount),
                             new SqlParameter("@LinkedYN", bankReceiptPaymentsModel.LinkedYN),
                                 new SqlParameter("@NeftPmt", bankReceiptPaymentsModel.NeftPmt),
                             new SqlParameter("@UTRNo", bankReceiptPaymentsModel.UTRNo),
                             new SqlParameter("@YearID", bankReceiptPaymentsModel.YearID),
                            new SqlParameter("@BranchCode", bankReceiptPaymentsModel.BranchCode),
                             new SqlParameter("@ModifyRemarks", bankReceiptPaymentsModel.ModifyRemarks),
                             new SqlParameter("@LoggedInUser", bankReceiptPaymentsModel.LoggedInUser),






                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BankReceiptPayments_Insert", param);
                    string FtmID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        FtmID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        // responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // Miss Details insert or update

                        if (bankReceiptPaymentsModel.DetailList.Count > 0)
                        {
                            for (int i = 0; i < bankReceiptPaymentsModel.DetailList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@FtmID", FtmID),
                                    new SqlParameter("@FtmDate",bankReceiptPaymentsModel.DetailList[i].FtmDate),
                                    new SqlParameter("@SlNo", bankReceiptPaymentsModel.DetailList[i].SlNo),
                                    new SqlParameter("@TypeSign", bankReceiptPaymentsModel.DetailList[i].TypeSign),
                                    new SqlParameter("@Amount", bankReceiptPaymentsModel.DetailList[i].Amount),
                                    new SqlParameter("@AccountID", bankReceiptPaymentsModel.DetailList[i].AccountID),
                                    new SqlParameter("@Narration", bankReceiptPaymentsModel.DetailList[i].Narration),
                                    new SqlParameter("@CostRefNo", bankReceiptPaymentsModel.DetailList[i].CostRefNo),
                                    new SqlParameter("@Reference", bankReceiptPaymentsModel.DetailList[i].Reference),
                                    new SqlParameter("@ChequeNo", bankReceiptPaymentsModel.DetailList[i].ChequeNo),
                                    new SqlParameter("@ChequeDate", bankReceiptPaymentsModel.DetailList[i].ChequeDate),
                                    new SqlParameter("@BranchCode", bankReceiptPaymentsModel.DetailList[i].BranchCode),

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
        public async Task<BankReceiptPaymentsModel> GetBankReceiptPmtInnerGridList(BankReceiptPmtGridListRequest request)
        {
            BankReceiptPaymentsModel bankReceiptPmtInnerGridList = new()
            {
                DetailList = new List<BankReceiptPaymentDetailModel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          //  new SqlParameter("@TripId", request.TripId),
                          new SqlParameter("@FtmID", request.FtmID)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetBankReceiptPmtInnerGridList_Select", param);

                    // LR Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            bankReceiptPmtInnerGridList.DetailList.Add(new BankReceiptPaymentDetailModel
                            {
                                //  
                                FtdID = Convert.ToString(resultData.Tables[0].Rows[i]["DistanceDtlID"]),
                                FtmID = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
                                FtmDate = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocation"]),
                                SlNo = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocation"]),

                                TypeSign = Convert.ToString(resultData.Tables[0].Rows[i]["KMS"]),
                                Amount = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTruck"]),
                                AccountID = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTrailer"]),
                                Narration = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
                                CostRefNo = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpEmpty"]),
                                ChequeNo = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpRemarks"]),
                                ChequeDate = Convert.ToString(resultData.Tables[0].Rows[i]["DefinedTollExp"]),
                                Reference = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocationName"]),
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocationName"]),

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
            return bankReceiptPmtInnerGridList;
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
    }


}