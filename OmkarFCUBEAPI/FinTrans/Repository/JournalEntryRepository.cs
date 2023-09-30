using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FinTrans.Models;

namespace FinTrans.Repository
{
    public class JournalEntryRepository : IJournalEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public JournalEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save BankReceiptPayments
        /// </summary>
        /// <param name="CashReceiptPaymentsModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> JournalEntrySave(JournalEntryModel journalEntryModel)
        {

            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@FtmID", journalEntryModel.@FtmID),
                             new SqlParameter("@FtmDate", journalEntryModel.@FtmDate),
                             new SqlParameter("@DocType", journalEntryModel.@DocType),
                             new SqlParameter("@DocSeries", journalEntryModel.@DocSeries),
                              new SqlParameter("@DocNo", journalEntryModel.@DocNo),

                             new SqlParameter("@SeriesDoc", journalEntryModel.SeriesDoc),
                             new SqlParameter("@Remarks", journalEntryModel.Remarks),
                             new SqlParameter("@RefType", journalEntryModel.RefType),
                             new SqlParameter("@RefNo", journalEntryModel.RefNo),
                             new SqlParameter("@DocAmount", journalEntryModel.DocAmount),
                             new SqlParameter("@LinkedYN", journalEntryModel.LinkedYN),
                             new SqlParameter("@YearID", journalEntryModel.YearID),
                            new SqlParameter("@BranchCode", journalEntryModel.BranchCode),
                             new SqlParameter("@ModifyRemarks", journalEntryModel.ModifyRemarks),
                             new SqlParameter("@LoggedInUser", journalEntryModel.LoggedInUser),






                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "JournalEntry_Insert", param);
                    string FtmID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        FtmID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        // responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // Miss Details insert or update
                        if (journalEntryModel.DetailList.Count > 0)
                        {
                            for (int i = 0; i < journalEntryModel.DetailList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@FtmID", FtmID),
                                    new SqlParameter("@FtmDate",journalEntryModel.DetailList[i].FtmDate),
                                    new SqlParameter("@SlNo", journalEntryModel.DetailList[i].SlNo),
                                    new SqlParameter("@TypeSign", journalEntryModel.DetailList[i].TypeSign),
                                    new SqlParameter("@Amount", journalEntryModel.DetailList[i].Amount),
                                    new SqlParameter("@AccountID", journalEntryModel.DetailList[i].AccountID),
                                    new SqlParameter("@Narration", journalEntryModel.DetailList[i].Narration),
                                    new SqlParameter("@CostRefNo", journalEntryModel.DetailList[i].CostRefNo),
                                    new SqlParameter("@Reference", journalEntryModel.DetailList[i].Reference),
                                    new SqlParameter("@BranchCode", journalEntryModel.DetailList[i].BranchCode),

                                   // new SqlParameter("@DeleteFlag", i == 0 ? "1" : "0")
                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "JournalEntryDetails_Insert", paramMisc);
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

        public async Task<JournalEntryList> GetJournalEntryList(JournalEntryListRequest request)
        {
            JournalEntryList JournalEntList = new();
            List<JournalEntryModel> journalList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "JournalEntryList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            journalList.Add(new JournalEntryModel
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

                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),


                            });
                        }

                        JournalEntList.JournalEntList = journalList;

                        JournalEntList.PageMetaData = new PaginationMetaData
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
            return JournalEntList;
        }
    }


}