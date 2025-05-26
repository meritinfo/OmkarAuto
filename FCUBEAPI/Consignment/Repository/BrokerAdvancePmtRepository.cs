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
    public class BrokerAdvancePmtRepository: IBrokerAdvancePmtRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BrokerAdvancePmtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BrokerAdvancePmtSave(BrokerAdvancePmtModel brokerAdvancePmtModel)
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
                             
                          new SqlParameter("@AdvPmtid", brokerAdvancePmtModel.AdvPmtid),
                            new SqlParameter("@BranchCode", brokerAdvancePmtModel.BranchCode),
                            new SqlParameter("@PmtNo", brokerAdvancePmtModel.PmtNo),
                            new SqlParameter("@PmtDate", brokerAdvancePmtModel.PmtDate),
                            new SqlParameter("@BrokerId", brokerAdvancePmtModel.BrokerId),
                            new SqlParameter("AdvanceAmt", brokerAdvancePmtModel.AdvanceAmt),
                            new SqlParameter("@Remarks", brokerAdvancePmtModel.Remarks),
                            new SqlParameter("@Attachment1", brokerAdvancePmtModel.Attachment1),
                            new SqlParameter("@PmtType", brokerAdvancePmtModel.PmtType),
                            new SqlParameter("@NeftYN", brokerAdvancePmtModel.NeftYN),
                            new SqlParameter("@CreditAc", brokerAdvancePmtModel.CreditAc),
                            new SqlParameter("@ChequeNo", brokerAdvancePmtModel.ChequeNo),
                            new SqlParameter("@ChequeDt", brokerAdvancePmtModel.ChequeDt),
                         
                            new SqlParameter("@YearId", brokerAdvancePmtModel.YearId),
                            new SqlParameter("@ModifyRemarks", brokerAdvancePmtModel.ModifyRemarks),
                            new SqlParameter("@AdvanceAdjAmt", "0"),
                            new SqlParameter("@LoggedInUser", brokerAdvancePmtModel.LoggedInUser)
{

                            }
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_BrokerAdvancePmtSave", param);

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
        public async Task<ResponseModel> GetPmtNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@YearId", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPanNo", param);

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

        public async Task<ResponseModel> BrokerAdvancePmtDelete(RequestModel req)
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
                            new SqlParameter("@AdvPmtid", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BrokerAdvancePmtDelete", param);

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

        public async Task<BrokerAdvancePmtList> GetBrokerAdvancePmtList(ReportRequestModel request)
        {
            BrokerAdvancePmtList advancePmtList = new();
            List<BrokerAdvancePmtModel> advanceList = new();
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
                            new SqlParameter("@@LoginBranch", request.Search),
                            

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBrokerAdvancePmtList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            advanceList.Add(new BrokerAdvancePmtModel
                            {
                              
                                 AdvPmtid = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvPmtid"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                PmtNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtNo"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                BrokerId = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerId"]),
                                AdvanceAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvanceAmt"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                Attachment1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachment1"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftYN = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                FinDocid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocid"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                AdvanceAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvanceAdjAmt"]),
                                branch = Convert.ToString(dataSet.Tables[0].Rows[i]["branch"]),
                                broker = Convert.ToString(dataSet.Tables[0].Rows[i]["broker"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"])

                            });
                        }

                        advancePmtList.AdvanceList = advanceList;

                        advancePmtList.PageMetaData = new PaginationMetaData
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
            return advancePmtList;
        }


    }


}
