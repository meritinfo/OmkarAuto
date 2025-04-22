using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public class BranchCustomerTargetRepository: IBranchCustomerTargetRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BranchCustomerTargetRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BranchCustomerTargetSave(BranchCustomerTargetMstModel branchCustomerTargetMstModel)
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
                                 new SqlParameter( "@Id", branchCustomerTargetMstModel.Id),
                                 new SqlParameter( "@YearId", branchCustomerTargetMstModel.YearId),
                                 new SqlParameter( "@BranchCode", branchCustomerTargetMstModel.BranchCode),
                                // new SqlParameter( "@ToLocationType", ratesMasterNewModel.ToLocationType ),
                                //  new SqlParameter( "@ProductType", ratesMasterNewModel.ProductType ),
                                new SqlParameter( "@LoggedInUser", branchCustomerTargetMstModel.LoggedInUser ),
                     };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BranchCustomerTargetMstSave", param);
                    string RateId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        RateId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < branchCustomerTargetMstModel.BranchCustomerTargetDtlList.Count; i++)
                            {
                                branchCustomerTargetMstModel.BranchCustomerTargetDtlList[i].Id = RateId;
                                // ratesMasterNewModel.RatesMasterNewDetailList[i].TransDate = ratesMasterNewModel.TransDate;

                                responseModel = await BranchCustomerTargetDetailSave(transaction, branchCustomerTargetMstModel.BranchCustomerTargetDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = branchCustomerTargetMstModel.BranchCustomerTargetDtlList.Count;
                                }
                            }
                        }
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
        public async Task<ResponseModel> BranchCustomerTargetDetailSave(SqlTransaction transaction, BranchCustomerTargetDtl branchCustomerTargetDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DtlId",               branchCustomerTargetDtl.DtlId),
                            new SqlParameter("@Id",           branchCustomerTargetDtl.Id),
                            new SqlParameter("@YearId",             branchCustomerTargetDtl.YearId),
                            new SqlParameter("@BranchCode",                    branchCustomerTargetDtl.BranchCode),
                            new SqlParameter("@AccountId",        branchCustomerTargetDtl.AccountId),
                              new SqlParameter("@TargetAmt",        branchCustomerTargetDtl.TargetAmt),
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BranchCustomerTargetDetailSave", param);

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
        public async Task<ResponseModel> BranchCustomerTargetDelete(RequestModel requestModel)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BranchCustomerTargetDelete", param);

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

        public async Task<BranchCustomerTargetMstList> GetBranchCustomerTargetMstList(ReportRequestModel request)
        {
            BranchCustomerTargetMstList branchCustomerTargetMstList = new();
            List<BranchCustomerTargetMstModel> targetList = new();
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
                          //  new SqlParameter("@FromDate", request.FromDate),
                          //  new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBranchCustomerTargetList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            targetList.Add(new BranchCustomerTargetMstModel
                            {
                                Id = Convert.ToString(dataSet.Tables[0].Rows[i]["Id"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                yeardesc = Convert.ToString(dataSet.Tables[0].Rows[i]["yeardesc"]),
                                branch = Convert.ToString(dataSet.Tables[0].Rows[i]["branch"]),

                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        branchCustomerTargetMstList.TargetList = targetList;

                        branchCustomerTargetMstList.PageMetaData = new PaginationMetaData
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
            return branchCustomerTargetMstList;
        }
        public async Task<BranchCustomerTargetMstModel> BranchCustomerTargetDtlInnerGridList(RequestModel request)
        {
            BranchCustomerTargetMstModel ratesMasterNewInnerGridList = new()
            {
                BranchCustomerTargetDtlList = new List<BranchCustomerTargetDtl>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@Id", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBranchCustomerTargetInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            ratesMasterNewInnerGridList.BranchCustomerTargetDtlList.Add(new BranchCustomerTargetDtl
                            {
                                // Id = Convert.ToString(resultData.Tables[0].Rows[i]["Id"]),

                                // SpareLubId = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                DtlId = Convert.ToString(resultData.Tables[0].Rows[i]["DtlId"]),
                                Id = Convert.ToString(resultData.Tables[0].Rows[i]["Id"]),
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["BranchCode"]),
                                AccountId = Convert.ToString(resultData.Tables[0].Rows[i]["AccountId"]),
                                TargetAmt = Convert.ToString(resultData.Tables[0].Rows[i]["TargetAmt"]),

                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return ratesMasterNewInnerGridList;
        }

    }
}
