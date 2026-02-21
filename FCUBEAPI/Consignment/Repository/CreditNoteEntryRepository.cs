using Consignment.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public class CreditNoteEntryRepository: ICreditNoteEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CreditNoteEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> CreditNoteEntrySave(CreditNoteEntryModel creditNoteEntryModel)
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

                                new SqlParameter("@CnId", creditNoteEntryModel.CnId),
                                new SqlParameter("@CnBranch", creditNoteEntryModel.CnBranch),
                                new SqlParameter("@CnDate", creditNoteEntryModel.CnDate),
                                new SqlParameter("@CnSlNo", creditNoteEntryModel.CnSlNo),
                                new SqlParameter("@CnAgainst", creditNoteEntryModel.CnAgainst),
                                new SqlParameter("@PartyId", creditNoteEntryModel.PartyId),
                                new SqlParameter("@BillYear", creditNoteEntryModel.BillYear),
                                new SqlParameter("@BillingStation", creditNoteEntryModel.BillingStation),
                                new SqlParameter("@BillSeries", creditNoteEntryModel.BillSeries),
                                new SqlParameter("@BillSlNo", creditNoteEntryModel.BillSlNo),
                                new SqlParameter("@BillDate", creditNoteEntryModel.BillDate),
                                new SqlParameter("@BillType", creditNoteEntryModel.BillType),
                                new SqlParameter("@BillsMasterId", creditNoteEntryModel.BillsMasterId),
                                new SqlParameter("@BillGstBy", creditNoteEntryModel.BillGstBy),
                                new SqlParameter("@BillGstType", creditNoteEntryModel.BillGstType),
                                new SqlParameter("@BillGstPct", creditNoteEntryModel.BillGstPct),
                                new SqlParameter("@BillTaxableAmt", creditNoteEntryModel.BillTaxableAmt),
                                new SqlParameter("@BillSgstAmt", creditNoteEntryModel.BillSgstAmt),
                                new SqlParameter("@BillCgstAmt", creditNoteEntryModel.BillCgstAmt),
                                new SqlParameter("@BillIgstAmt", creditNoteEntryModel.BillIgstAmt),
                                new SqlParameter("@TotalBillAmount", creditNoteEntryModel.TotalBillAmount),
                                new SqlParameter("@SacCode", creditNoteEntryModel.SacCode),
                                new SqlParameter("@FullPartReBill", creditNoteEntryModel.FullPartReBill),
                                new SqlParameter("@CnCreditAmt", creditNoteEntryModel.CnCreditAmt),
                                new SqlParameter("@CnSgstAmt", creditNoteEntryModel.CnSgstAmt),
                                new SqlParameter("@CnCgstAmt", creditNoteEntryModel.CnCgstAmt),
                                new SqlParameter("@CnIgstAmt", creditNoteEntryModel.CnIgstAmt),
                                new SqlParameter("@TotalCreditAmt", creditNoteEntryModel.TotalCreditAmt),
                                new SqlParameter("@CreditNoteRemarks", creditNoteEntryModel.CreditNoteRemarks),
                                new SqlParameter("@DebitAc", creditNoteEntryModel.DebitAc),
                                new SqlParameter("@YearId", creditNoteEntryModel.YearId),
                                new SqlParameter("@LoggedInUser", creditNoteEntryModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CreditNoteSave", param);

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
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<CreditNoteEntryModel> GetCreditBillDetails(ReportRequestModel request)
        {
            CreditNoteEntryModel creditNote = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillSlNo", request.FilterStr),
                            new SqlParameter("@BillingStation", request.FilterStr1),
                            new SqlParameter("@BillYear", request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCreditBillDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                       
                        creditNote.BillDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BillDate"]);
                        creditNote.BillType = Convert.ToString(dataSet.Tables[0].Rows[0]["BillType"]);
                        creditNote.BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[0]["BillsMasterId"]);
                        creditNote.BillGstBy = Convert.ToString(dataSet.Tables[0].Rows[0]["BillGstBy"]);
                        creditNote.BillGstType = Convert.ToString(dataSet.Tables[0].Rows[0]["BillGstType"]);
                        creditNote.BillGstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["BillGstPct"]);
                        creditNote.BillTaxableAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["BillTaxableAmt"]);
                        creditNote.BillSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["BillSgstAmt"]);
                        creditNote.BillCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["BillCgstAmt"]);
                        creditNote.BillIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["BillIgstAmt"]);
                        creditNote.TotalBillAmount = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalBillAmount"]);
                        creditNote.SacCode = Convert.ToString(dataSet.Tables[0].Rows[0]["SacCode"]);


                    }
                }
            }
            catch (Exception ex)
            {
            }
            return creditNote;
        }
        public async Task<CreditNoteList> GetCreditNoteList(ReportRequestModel request)
        {
            CreditNoteList creditNoteList = new();
            List<CreditNoteEntryModel> creditList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CreditNoteList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            creditList.Add(new CreditNoteEntryModel
                            {
                                CnId = Convert.ToString(dataSet.Tables[0].Rows[i]["CnId"]),
                                CnBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["CnBranch"]),
                                CnDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CnDate"]),
                                CnSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CnSlNo"]),
                                CnAgainst = Convert.ToString(dataSet.Tables[0].Rows[i]["CnAgainst"]),
                                PartyId = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyId"]),
                                BillYear = Convert.ToString(dataSet.Tables[0].Rows[i]["BillYear"]),
                                BillingStation = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingStation"]),
                                BillSeries = Convert.ToString(dataSet.Tables[0].Rows[i]["BillSeries"]),
                                BillSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillSlNo"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                BillType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillType"]),
                                BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsMasterId"]),
                                BillGstBy = Convert.ToString(dataSet.Tables[0].Rows[i]["BillGstBy"]),
                                BillGstType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillGstType"]),
                                BillGstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["BillGstPct"]),
                                BillTaxableAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BillTaxableAmt"]),
                                BillSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BillSgstAmt"]),
                                BillCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BillCgstAmt"]),
                                BillIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BillIgstAmt"]),
                                TotalBillAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBillAmount"]),
                                SacCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SacCode"]),
                                FullPartReBill = Convert.ToString(dataSet.Tables[0].Rows[i]["FullPartReBill"]),
                                CnCreditAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CnCreditAmt"]),
                                CnSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CnSgstAmt"]),
                                CnCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CnCgstAmt"]),
                                CnIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CnIgstAmt"]),
                                TotalCreditAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCreditAmt"]),
                                CreditNoteRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditNoteRemarks"]),
                                FinDocid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocid"]),
                                DebitAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                            });
                        }

                        creditNoteList.CreditList = creditList;

                        creditNoteList.PageMetaData = new PaginationMetaData
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
            return creditNoteList;
        }
        public async Task<ResponseModel> CreditNoteDelete(RequestModel requestModel)
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
                            new SqlParameter("@CnId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CreditNoteDelete", param);

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
                transaction.Rollback();
            }
            return responseModel;
        }

    }
}


