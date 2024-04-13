using Microsoft.Extensions.Options;
using FinTrans.Models;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Repository;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Data;

namespace FinTrans.Repository
{
 
    public class LedgerRptRepository : ILedgerRptRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public LedgerRptRepository(IOptions<DBModel> _dbconnection,
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<List<DropDownListModel>> GetLedgerList()
        {
            List<DropDownListModel> ledgerList = new();
            try
            {
                if (dbconnection != null)               
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            ledgerList.Add(new DropDownListModel
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
            return ledgerList;
        }       
        public async Task<LedgerRptListModel> GetLedgerRptList(ReportRequestModel request)
        {
            LedgerRptListModel ledgerRptListModel = new();
            List<LedgerRptModel> ledgerRpts = new();
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
                            new SqlParameter("@AccountID",          request.FilterStr),
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@SubName",            request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerRptList", param);
                    int totalRecords = 0;
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ledgerRpts.Add(new LedgerRptModel
                            {
                                FtmDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmDate"]),
                                DocType         = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),
                                DocNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                MainAccount     = Convert.ToString(dataSet.Tables[0].Rows[i]["MainAccount"]),
                                Narration       = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                ReferenceDesc   = Convert.ToString(dataSet.Tables[0].Rows[i]["ReferenceDesc"]),
                                SlNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["SlNo"]),
                                DrAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["DrAmt"]),                                
                                CrAmt           = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAmt"]),
                                TypeSign        = Convert.ToString(dataSet.Tables[0].Rows[i]["TypeSign"]),
                                FtdId           = Convert.ToString(dataSet.Tables[0].Rows[i]["FtdId"]),
                                DocSeries       = Convert.ToString(dataSet.Tables[0].Rows[i]["DocSeries"]),
                                CheqNo          = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqNo"]),
                                CheqDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqDate"]),
                                TransBrCode     = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBrCode"]),
                            });
                        }

                        ledgerRptListModel.ledgersList = ledgerRpts;

                        ledgerRptListModel.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return ledgerRptListModel;
        }
        public async Task<ResponseModel> GetLedgerRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@AccountID",          request.FilterStr),
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@SubName",            request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "Ledger From " + request.FromDate + " To " + request.ToDate;
                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Accounts Ledger Report", filter);
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<DataSet> ledgerReport(ReportRequestModel request)
        {
            DataSet reportData = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",           request.FromDate),
                            new SqlParameter("@ToDate",             request.ToDate),
                            new SqlParameter("@AccountID",          request.FilterStr),
                            new SqlParameter("@YearId",             request.FilterStr1),
                            new SqlParameter("@SubName",            request.FilterStr2),
                        };

                    reportData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLedgerRptExcel", param);
                }
            }
            catch (Exception ex)
            {

            }
            return reportData;
        }

       
    }
}
