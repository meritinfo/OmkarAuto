using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FinTrans.Models;
using Shared.Models;
using System.Data;

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
                        new SqlParameter("@FtmID"           , cashReceiptPaymentsModel.FtmID),
                        new SqlParameter("@FtmDate"         , cashReceiptPaymentsModel.FtmDate),
                        new SqlParameter("@DocType"         , cashReceiptPaymentsModel.DocType),
                        new SqlParameter("@DocSeries"       , cashReceiptPaymentsModel.DocSeries),
                        new SqlParameter("@DocNo"           , cashReceiptPaymentsModel.DocNo),
                        new SqlParameter("@SeriesDoc"       , cashReceiptPaymentsModel.SeriesDoc),
                        new SqlParameter("@Remarks"         , cashReceiptPaymentsModel.Remarks),
                        new SqlParameter("@RefType"         , cashReceiptPaymentsModel.RefType),
                        new SqlParameter("@RefNo"           , cashReceiptPaymentsModel.RefNo),
                        new SqlParameter("@DocAmount"       , cashReceiptPaymentsModel.DocAmount),
                        new SqlParameter("@LinkedYN"        , cashReceiptPaymentsModel.LinkedYN),
                        new SqlParameter("@NeftPmt"         , cashReceiptPaymentsModel.NeftPmt),
                        new SqlParameter("@UTRNo"           , cashReceiptPaymentsModel.UTRNo),
                        new SqlParameter("@YearID"          , cashReceiptPaymentsModel.YearID),
                        new SqlParameter("@BranchCode"      , cashReceiptPaymentsModel.BranchCode),
                        new SqlParameter("@OnAcBranchYN"    , cashReceiptPaymentsModel.OnAcBranchYN),
                        new SqlParameter("@OnAcBranchCode"  , cashReceiptPaymentsModel.OnAcBranchCode),
                        new SqlParameter("@CreditAc"        , cashReceiptPaymentsModel.AccountOf),
                        new SqlParameter("@ModifyRemarks"   , cashReceiptPaymentsModel.ModifyRemarks),
                        new SqlParameter("@LoggedInUser"    , cashReceiptPaymentsModel.LoggedInUser),
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CashReceiptPaymentsSave", param);
                    string FtmID = "";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        FtmID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // Miss Details insert or update
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < cashReceiptPaymentsModel.DetailList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@FtmID"           , FtmID),
                                    new SqlParameter("@FtmDate"         , cashReceiptPaymentsModel.FtmDate),
                                    new SqlParameter("@SlNo"            , cashReceiptPaymentsModel.DetailList[i].SlNo),
                                    new SqlParameter("@TypeSign"        , cashReceiptPaymentsModel.DetailList[i].TypeSign),
                                    new SqlParameter("@Amount"          , cashReceiptPaymentsModel.DetailList[i].Amount),
                                    new SqlParameter("@AccountID"       , cashReceiptPaymentsModel.DetailList[i].AccountID),
                                    new SqlParameter("@Narration"       , cashReceiptPaymentsModel.DetailList[i].Narration),
                                    new SqlParameter("@ChequeNo"        , cashReceiptPaymentsModel.DetailList[i].ChequeNo),
                                    new SqlParameter("@ChequeDate"      , cashReceiptPaymentsModel.DetailList[i].ChequeDate),
                                    new SqlParameter("@CostRefNo"       , ""),
                                    new SqlParameter("@Reference"       , cashReceiptPaymentsModel.DetailList[i].Reference),
                                    new SqlParameter("@BranchCode"      , cashReceiptPaymentsModel.OnAcBranchYN=="Y"? cashReceiptPaymentsModel.OnAcBranchCode: cashReceiptPaymentsModel.BranchCode),
                                    new SqlParameter("@YearID"          , cashReceiptPaymentsModel.YearID),

                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CashReceiptPaymentsDetailsSave", paramMisc);
                                responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i =cashReceiptPaymentsModel.DetailList.Count;
                                }
                            }
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
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
        public async Task<ResponseModel> CashReceiptPaymentsDelete(RequestModel request)
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
                        new SqlParameter("@FtmID", request.strRequest),
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CashReceiptPaymentsDelete", param);
                    
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
        public async Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(BankCashListFilterModel request)
        {
            CashReceiptPaymentsList CashRecPaymentsList = new();
            List<CashReceiptPaymentsModel> cashReceiptPayList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@PageNumber",         request.PageNumber),
                        new SqlParameter("@PageSize",           request.PageSize),
                        new SqlParameter("@SortColumn",         request.SortColumn),
                        new SqlParameter("@SortOrder",          request.SortOrder),
                        new SqlParameter("@Search",             request.Search),
                        new SqlParameter("@FromDate",           request.FromDate),
                        new SqlParameter("@ToDate",             request.ToDate),
                        new SqlParameter("@Branch",             request.Branch),
                        new SqlParameter("@YearId",             request.YearId),
                        new SqlParameter("@ReceiptOrPayment",   request.ReceiptOrPayment),
                        new SqlParameter("@RefType",            request.RefType),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCashReceiptPaymentsList", param);

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
                                SeriesDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["seriesDoc"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                RefType = Convert.ToString(dataSet.Tables[0].Rows[i]["RefType"]),
                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                UTRNo = Convert.ToString(dataSet.Tables[0].Rows[i]["UTRNo"]),
                                DocAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["DocAmount"]),
                                LinkedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkedYN"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                OnAcBranchYN= Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcBranchYN"]),
                                OnAcBranchCode= Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcBranchCode"]),
                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                                AcHeader = Convert.ToString(dataSet.Tables[0].Rows[i]["AcHeader"]),
                                AccountOf = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountOf"]),
                                Narration = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            }) ;
                        }

                        CashRecPaymentsList.RecPaymentsList = cashReceiptPayList;

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
        public async Task<CashReceiptPaymentsModel> GetCashReceiptPaymentInnerGridList(RequestModel req)
        {
            CashReceiptPaymentsModel cashReceiptPaymentsModel = new()
            {
                DetailList  = new List<CashReceiptPaymentDetailModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FtmID", req.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCashReceiptPaymentInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            cashReceiptPaymentsModel.DetailList.Add(new CashReceiptPaymentDetailModel
                            {
                                SlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["SlNo"]),
                                TypeSign = Convert.ToString(dataSet.Tables[0].Rows[i]["TypeSign"]),
                                Amount = Convert.ToString(dataSet.Tables[0].Rows[i]["Amount"]),
                                AccountID = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountID"]),
                                Narration = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                Reference = Convert.ToString(dataSet.Tables[0].Rows[i]["Reference"]),
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
            return cashReceiptPaymentsModel;
        }
        public async Task<ResponseModel> GetNextDocNo(DocNoFilterModel docNoFilter)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocType", docNoFilter.DocType),
                            new SqlParameter("@DocSeries", docNoFilter.DocSeries),
                            new SqlParameter("@BranchCode", docNoFilter.BranchCode),
                            new SqlParameter("@YearID", docNoFilter.YearID),  
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetDocNo", param);

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
        public async Task<List<DropDownListModel>> GetFinRefTypes()
        {
            List<DropDownListModel> accountList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = {  };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFinRefTypes", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            accountList.Add(new DropDownListModel
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
            return accountList;
        }

        public async Task<List<DropDownListModel>> GetCashBankAccountList(RequestModel request)
        {
            List<DropDownListModel> accountList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = 
                    {
                        new SqlParameter("@Page", request.strRequest),
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCashBankAccountList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            accountList.Add(new DropDownListModel
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
            return accountList;
        }

        public async Task<DataSet> CashBookReport(ReportRequestModel request)
        {
            DataSet reportData = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@YearId",     request.FilterStr2),
                            new SqlParameter("@AccountID",  "34"),
                        };

                    reportData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCashBookRptPdf", param);
                }
            }
            catch (Exception ex)
            {
                
            }
            return reportData;
        }

        public async Task<ResponseModel> GetFinDocDetails(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FtmID", request.strRequest),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetFinDocDetails", param);

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
            }
            return responseModel;
        }
        public async Task<ResponseModel> CheckSubLedgerExists(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@AccountID", request.strRequest),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckSubLedgerExists", param);

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
            }
            return responseModel;
        }
        

    }


}