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

    public class DebitNoteEntryRepository: IDebitNoteEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DebitNoteEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> DebitNoteEntrySave(DebitNoteEntryModel debitNoteEntryModel)
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

                                new SqlParameter("@DnId", debitNoteEntryModel.DnId),
                                new SqlParameter("@DnBranch", debitNoteEntryModel.DnBranch),
                                new SqlParameter("@DnSlNo", debitNoteEntryModel.DnSlNo),
                                new SqlParameter("@DnDate", debitNoteEntryModel.DnDate),
                                new SqlParameter("@DnRefNo", debitNoteEntryModel.DnRefNo),
                                new SqlParameter("@DnRefDate", debitNoteEntryModel.DnRefDate),
                                new SqlParameter("@DnRemarks", debitNoteEntryModel.DnRemarks),
                                new SqlParameter("@DebitAmt", debitNoteEntryModel.DebitAmt),
                                new SqlParameter("@GstType", debitNoteEntryModel.GstType),
                                new SqlParameter("@GstPct", debitNoteEntryModel.GstPct),
                                new SqlParameter("@SgstAmt", debitNoteEntryModel.SgstAmt),
                                new SqlParameter("@CgstAmt", debitNoteEntryModel.CgstAmt),
                                new SqlParameter("@IgstAmt", debitNoteEntryModel.IgstAmt),
                                new SqlParameter("@TotalDebitAmt", debitNoteEntryModel.TotalDebitAmt),
                                new SqlParameter("@DebitAc", debitNoteEntryModel.DebitAc),
                                new SqlParameter("@CreditAc", debitNoteEntryModel.CreditAc),
                                new SqlParameter("@Yearid", debitNoteEntryModel.Yearid),
                              
                                new SqlParameter("@LoggedInUser", debitNoteEntryModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DebitNoteSave", param);

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
        public async Task<DebitNoteEntryList> GetDebitNoteList(ReportRequestModel request)
        {
            DebitNoteEntryList debitNoteList = new();
            List<DebitNoteEntryModel> debitList = new();
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
                            new SqlParameter("@Search", request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDebitNoteList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            debitList.Add(new DebitNoteEntryModel
                            {
                                DnId = Convert.ToString(dataSet.Tables[0].Rows[i]["DnId"]),
                                DnBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["DnBranch"]),
                                DnSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DnSlNo"]),
                                DnDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DnDate"]),
                                DnRefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DnRefNo"]),
                                DnRefDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DnRefDate"]),
                                DnRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["DnRemarks"]),
                                DebitAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAmt"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                GstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["GstPct"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotalDebitAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDebitAmt"]),
                                DebitAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                Yearid = Convert.ToString(dataSet.Tables[0].Rows[i]["Yearid"]),
                                brname = Convert.ToString(dataSet.Tables[0].Rows[i]["brname"]),
                               
                            });
                        }

                        debitNoteList.DebitList = debitList;

                        debitNoteList.PageMetaData = new PaginationMetaData
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
            return debitNoteList;
        }
        public async Task<ResponseModel> GetDebitSlNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@Year", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDebitNoteSlNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> DebitNoteDelete(RequestModel requestModel)
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
                            new SqlParameter("@DnId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DebitNoteDelete", param);

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
