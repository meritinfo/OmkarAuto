using DocumentFormat.OpenXml.Wordprocessing;
using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public class BenBankListRepository: IBenBankListRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BenBankListRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BenBankListSave(BenBankListModel benBankListModel)
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
                             new SqlParameter("@BankId" , benBankListModel.BankId),
                             new SqlParameter("@BankShortCode" , benBankListModel.BankShortCode),
                             new SqlParameter("@BankName" , benBankListModel.BankName),
                             new SqlParameter("@ActiveYN" , benBankListModel.ActiveYN),
                             new SqlParameter("@VerifyAvailYN" , benBankListModel.VerifyAvailYN),
                             new SqlParameter("@LoggedInUser" , benBankListModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BenBankListSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
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
        public async Task<BenBankList> GetBenBankList(ReportRequestModel request)
        {
            BenBankList benBankList = new();
            List<BenBankListModel> benList = new();
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
                            //new SqlParameter("@FromDate", request.FromDate),
                            //new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BenBankList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            benList.Add(new BenBankListModel
                            {
                                BankId = Convert.ToString(dataSet.Tables[0].Rows[i]["BankId"]),
                                BankShortCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BankShortCode"]),
                                BankName = Convert.ToString(dataSet.Tables[0].Rows[i]["BankName"]),
                                ActiveYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ActiveYN"]),
                                VerifyAvailYN = Convert.ToString(dataSet.Tables[0].Rows[i]["VerifyAvailYN"]),
                                LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        benBankList.BenList = benList;

                        benBankList.PageMetaData = new PaginationMetaData
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
            return benBankList;
        }
        public async Task<ResponseModel> CheckDuplicateBank(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BankName",     request.strRequest),
                          
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateBank", param);

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
                responseModel.Status = false;
            }
            return responseModel;
        }

        public async Task<ResponseModel> BenBankListDelete(RequestModel requestModel)
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
                            new SqlParameter("@BankId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BenBankListDelete", param);

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
