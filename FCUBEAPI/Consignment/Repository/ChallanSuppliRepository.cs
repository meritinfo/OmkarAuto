using Consignment.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public class ChallanSuppliRepository : IChallanSuppliRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChallanSuppliRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ChallanListModel> GetChallanSuppliList(ReportRequestModel request)
        {
            ChallanListModel challanMasterList = new();
            List<ChallanMasterModel> challanList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@VehicleNo",      request.FilterStr),
                            new SqlParameter("@ChallanNo",      request.FilterStr1),
                            new SqlParameter("@LoginBranch",    request.FilterStr2),
                            new SqlParameter("@YearId",         request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanSuppliList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanList.Add(new ChallanMasterModel
                            {
                                ChallanId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                                ChallanFromStn = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanFromStn"]),
                                ChallanToStn = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanToStn"]),
                                DistanceKms = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceKms"]),
                                BrokerId = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerId"]),
                                BrokerMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerMblNo"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAdvance"]),
                                Balance = Convert.ToString(dataSet.Tables[0].Rows[i]["Balance"]),
                                BalancePayAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalancePayAt"]),
                                GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["GeneralRemarks"]),
                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                Cbranch = Convert.ToString(dataSet.Tables[0].Rows[i]["Cbranch"]),
                                FPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FPlace"]),
                                TPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TPlace"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                            });
                        }

                        challanMasterList.ChallanList = challanList;

                        challanMasterList.PageMetaData = new PaginationMetaData
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
            return challanMasterList;
        }
        public async Task<ResponseModel> ChallanSuppliSave(ChallanMasterModel challan)
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
                            new SqlParameter("@ChallanId",              challan.ChallanId),
                            new SqlParameter("@ChallanBranch",          challan.ChallanBranch),
                            new SqlParameter("@ChallanNo",              challan.ChallanNo),
                            new SqlParameter("@ChallanDateTime",        challan.ChallanDateTime),
                            new SqlParameter("@ChStatus",               challan.ChStatus),
                            new SqlParameter("@ChallanFromStn",         challan.ChallanFromStn),
                            new SqlParameter("@ChallanToStn",           challan.ChallanToStn),
                            new SqlParameter("@DistanceKms",            challan.DistanceKms),
                            new SqlParameter("@BrokerId",               challan.BrokerId),
                            new SqlParameter("@BrokerMblNo",            challan.BrokerMblNo),
                            new SqlParameter("@TruckNo",                challan.TruckNo),
                            new SqlParameter("@TotalHire",              challan.TotalHire),
                            new SqlParameter("@TotalAdvance",           challan.TotalAdvance),
                            new SqlParameter("@Balance",                challan.Balance),
                            new SqlParameter("@BalancePayAt",           challan.BalancePayAt),
                            new SqlParameter("@GeneralRemarks",         challan.GeneralRemarks),
                            new SqlParameter("@YearId",                 challan.YearId),
                            new SqlParameter("@ModifyRemarks",          challan.ModifyRemarks),
                            new SqlParameter("@LoggedInUser",           challan.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanSuppliSave", param);
                   
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
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
        public async Task<ResponseModel> ChallanSuppliDelete(RequestModel requestModel)
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
                            new SqlParameter("@ChallanId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanSuppliDelete", param);

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
        public async Task<ResponseModel> CheckDuplicateChallanSuppli(RequestModel requestModel)
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
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@ChallanNo", requestModel.strRequest1),
                            new SqlParameter("@YearId", requestModel.strRequest2),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicateChallanSuppli", param);

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
