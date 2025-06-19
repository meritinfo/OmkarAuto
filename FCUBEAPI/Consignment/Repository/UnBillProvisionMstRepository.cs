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
    public class UnBillProvisionMstRepository: IUnBillProvisionMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public UnBillProvisionMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> UnBillProvisionMstSave(UnBillProvisionMstModel unBillProvisionMstModel)
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
                            new SqlParameter("@Id",             unBillProvisionMstModel.Id  ),
                            new SqlParameter("@YearId",         unBillProvisionMstModel.YearId ),
                            new SqlParameter("@ProvisionDate",  unBillProvisionMstModel.ProvisionDate ),
                            new SqlParameter("@LoggedInUser",   unBillProvisionMstModel.LoggedInUser ),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_UnBillProvisionMstSave", param);
                    string Id = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        Id = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < unBillProvisionMstModel.UnBillProvisionDtlList.Count; i++)
                            {
                                unBillProvisionMstModel.UnBillProvisionDtlList[i].Id = Id;
                               
                                responseModel = await UnBillProvisionDtlSave(transaction, unBillProvisionMstModel.UnBillProvisionDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = unBillProvisionMstModel.UnBillProvisionDtlList.Count;
                                }
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        responseModel = await UnBillProvisionFinLink(transaction, unBillProvisionMstModel);
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else { transaction.Rollback(); }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }


        public async Task<ResponseModel> UnBillProvisionDtlSave(SqlTransaction transaction, UnBillProvisionDtlModel unBillProvisionDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Id",         unBillProvisionDtlModel.Id),
                            new SqlParameter("@BranchCode", unBillProvisionDtlModel.BranchCode),
                            new SqlParameter("@PartyCode",  unBillProvisionDtlModel.PartyCode),
                            new SqlParameter("@Amount",     unBillProvisionDtlModel.Amount),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_UnBillProvisionDtlSave", param);

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
        public async Task<ResponseModel> UnBillProvisionFinLink(SqlTransaction transaction, UnBillProvisionMstModel unBillProvision)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Id", unBillProvision.Id),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_UnBillProvisionFinLink", param);

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

        public async Task<UnBillProvisionMstModel> GetUnBillProvisionMstGridList(RequestModel request)
        {
            UnBillProvisionMstModel unBillProvisionMstInnerGridList = new()
            {
                UnBillProvisionDtlList = new List<UnBillProvisionDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@Id", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUnbilledProvisionMstInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            unBillProvisionMstInnerGridList.UnBillProvisionDtlList.Add(new UnBillProvisionDtlModel
                            {
                                Id = Convert.ToString(resultData.Tables[0].Rows[i]["Id"]),
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["BranchCode"]),
                                PartyCode = Convert.ToString(resultData.Tables[0].Rows[i]["PartyCode"]),
                                BranchName = Convert.ToString(resultData.Tables[0].Rows[i]["BranchName"]),
                                PartyName = Convert.ToString(resultData.Tables[0].Rows[i]["PartyName"]),
                                Amount = Convert.ToString(resultData.Tables[0].Rows[i]["Amount"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return unBillProvisionMstInnerGridList;
        }
        public async Task<UnBillProvisionMstModel> GetUnBillProvisonSearchList(ReportRequestModel request)
        {
            UnBillProvisionMstModel unBillProvisionMstInnerGridList = new()
            {
                UnBillProvisionDtlList = new List<UnBillProvisionDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@YearId", request.FilterStr),                        
                        new SqlParameter("@ProvisionDate", request.FromDate)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUnbilledProvisionSearchList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            unBillProvisionMstInnerGridList.UnBillProvisionDtlList.Add(new UnBillProvisionDtlModel
                            {
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["BranchCode"]),
                                PartyCode = Convert.ToString(resultData.Tables[0].Rows[i]["PartyCode"]),
                                Amount = Convert.ToString(resultData.Tables[0].Rows[i]["UnBilledAmt"]),
                                BranchName = Convert.ToString(resultData.Tables[0].Rows[i]["BranchName"]),
                                PartyName = Convert.ToString(resultData.Tables[0].Rows[i]["PartyName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return unBillProvisionMstInnerGridList;
        }
        public async Task<ResponseModel> UnBillProvisionMstDelete(RequestModel requestModel)
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
                            new SqlParameter("@Id", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_UnBillProvisionMstDelete", param);

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
        public async Task<UnBillProvisionMstList> GetUnBillProvisionMstList(ReportRequestModel request)
        {
            UnBillProvisionMstList unBillProvisionMstList = new();
            List<UnBillProvisionMstModel> provisonList = new();
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
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                               new SqlParameter("@LoginBranch", request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getUnBillProvisionMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            provisonList.Add(new UnBillProvisionMstModel
                            {


                                Id = Convert.ToString(dataSet.Tables[0].Rows[i]["Id"]),
                                ProvisionDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ProvisionDate"]),
                         
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                  yeardesc = Convert.ToString(dataSet.Tables[0].Rows[i]["yeardesc"])



                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }
                        unBillProvisionMstList.ProvisionList = provisonList;

                        unBillProvisionMstList.PageMetaData = new PaginationMetaData
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
            return unBillProvisionMstList;
        }

    }
}
