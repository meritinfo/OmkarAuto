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
    public class ChallanReleaseRepository: IChallanReleaseRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChallanReleaseRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ChallanReleaseListModel> GetChallanReleaseList(ReportRequestModel request)
        {
            ChallanReleaseListModel challanRelModel = new();
            List<ChallanReleaseModel> releaseList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            //new SqlParameter("@FromDate",   request.FromDate),
                            //new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@ChallanNo",     request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChallanReleaseList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            releaseList.Add(new ChallanReleaseModel
                            {

                                ChReleaseId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChReleaseId"]),
                                ChYear = Convert.ToString(dataSet.Tables[0].Rows[i]["ChYear"]),
                                ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),

                                ReleaseForPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ReleaseForPmt"]),
                                Year = Convert.ToString(dataSet.Tables[0].Rows[i]["Year"]),
                                //LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),


                            });
                        }

                        challanRelModel.ReleaseList = releaseList;

                        challanRelModel.PageMetaData = new PaginationMetaData
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
            return challanRelModel;
        }
        public async Task<ResponseModel> CheckDuplicateChallanRelease(ReportRequestModel requestModel)
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
                          
                            new SqlParameter("@ChallanNo", requestModel.FilterStr),
                              new SqlParameter("@Branch", requestModel.FilterStr1),
                                new SqlParameter("@Year", requestModel.FilterStr2),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicateChallanRelease", param);

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
        public async Task<ResponseModel> ChallanReleaseSave(ChallanReleaseModel challanReleaseModel)
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
                            new SqlParameter("@ChReleaseId", challanReleaseModel.ChReleaseId),
                            new SqlParameter("@ChYear", challanReleaseModel.ChYear),
                            new SqlParameter("@ChallanBranch", challanReleaseModel.ChallanBranch),
                            new SqlParameter("@ChallanNo", challanReleaseModel.ChallanNo),
                            new SqlParameter("@ChallanId", challanReleaseModel.ChallanId),
                            new SqlParameter("@ReleaseForPmt", challanReleaseModel.ReleaseForPmt),
                            new SqlParameter("@LoggedInUser", challanReleaseModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanReleaseSave", param);

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
        public async Task<ChallanMasterModel> SearchChallanDetails(ReportRequestModel req)
        {
            ChallanMasterModel chlnmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChallanNo", req.FilterStr),
                             new SqlParameter("@challanBranch", req.FilterStr1),
                            new SqlParameter("@chYear", req.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_SearchChallanDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        chlnmodel.ChallanId = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanId"]);
                        chlnmodel.ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanBranch"]);
                        chlnmodel.ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanNo"]);
                        chlnmodel.ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanDateTime"]);
                     
                        chlnmodel.ChallanFromStn = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanFromStn"]);
                        chlnmodel.ChallanToStn = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanToStn"]);
                     
                        chlnmodel.BrokerId = Convert.ToString(dataSet.Tables[0].Rows[0]["BrokerId"]);
                      

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return chlnmodel;
        }
        public async Task<ResponseModel>ChallanReleaseDelete(RequestModel requestModel)
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
                            new SqlParameter("@ChReleaseId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanReleaseDelete", param);

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
