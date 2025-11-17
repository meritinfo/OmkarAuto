using FleetMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public class RechargeRequestRepository:IRechargeRequestRepository

    {
        private readonly IOptions<DBModel> dbconnection;
        public RechargeRequestRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<List<DropDownListModel>> GetFleetCardList()
        {
            List<DropDownListModel> FleetCardList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFleetCardList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            FleetCardList.Add(new DropDownListModel
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
                
            }
            return FleetCardList;
        }

        public async Task<ResponseModel> RechargeRequestSave(RechargeRequestModel request)
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
                            new SqlParameter("@ReqId", request.ReqId),
                            new SqlParameter("@ReqBranch", request.ReqBranch),
                            new SqlParameter("@ReqDate", request.ReqDate),
                            new SqlParameter("@ReqCard", request.ReqCard),
                            new SqlParameter("@ReqAmt", request.ReqAmt),
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),
                            new SqlParameter("@Remarks", request.Remarks),
                            new SqlParameter("@AttachPath", request.AttachPath),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RechargeRequestSave", param);

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

        public async Task<RechargeRequestList> GetRechargeRequestList(ReportRequestModel request)
        {
            RechargeRequestList rechargeRequestLst = new();
            List<RechargeRequestModel> invoiceList = new();
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
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate)

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRechargeRequestList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            invoiceList.Add(new RechargeRequestModel
                            {
                                ReqId = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqId"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                ReqBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBranch"]),
                                ReqDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqDate"]),
                                ReqCard = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqCard"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ReqAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqAmt"]),
                                AttachPath = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachPath"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                CardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CardNo"]),
                                ApprovedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedYN"]),
                            });
                        }

                        rechargeRequestLst.RechargeRequestLst = invoiceList;

                        rechargeRequestLst.PageMetaData = new PaginationMetaData
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
            return rechargeRequestLst;
        }

        public async Task<RechargeRequestList> GetRechargeRequestApproveList(ReportRequestModel request)
        {
            RechargeRequestList rechargeRequestLst = new();
            List<RechargeRequestModel> invoiceList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode",   request.FilterStr),
                            new SqlParameter("@FromDate",     request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@CardNo",     request.FilterStr1),
                            new SqlParameter("@VehicleId",     request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRechargeRequestApproveList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            invoiceList.Add(new RechargeRequestModel
                            {
                                ReqId = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqId"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                ReqBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBranch"]),
                                ReqDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqDate"]),
                                ReqCard = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqCard"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ReqAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqAmt"]),
                                AttachPath = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachPath"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                CardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CardNo"]),
                            });
                        }

                        rechargeRequestLst.RechargeRequestLst = invoiceList;

                        rechargeRequestLst.PageMetaData = new PaginationMetaData
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
            return rechargeRequestLst;
        }



        public async Task<ResponseModel> RechargeRequestApproveSave(RechargeRequestList obj)
        {
            ResponseModel responseModel = new();
            using var connection = new SqlConnection(dbconnection.Value.DBConnection);
            await connection.OpenAsync();

            using var transaction = connection.BeginTransaction();

            try
            {
                if (dbconnection != null && obj.RechargeRequestLst != null && obj.RechargeRequestLst.Count > 0)
                {
                    foreach (var item in obj.RechargeRequestLst.Where(x => x.Selected))
                    {
                        SqlParameter[] param =
                        {
                    new SqlParameter("@ReqId", item.ReqId),
                    new SqlParameter("@ApprovedYN", item.ApprovedYN),
                    new SqlParameter("@AppRejRemarks", item.AppRejRemarks),
                    new SqlParameter("@ApprovedAmt", item.ApprovedAmt),
                    new SqlParameter("@LoggedInUser", item.ApprovedBy)
                };

                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RechargeRequestApproveSave", param);

                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                return responseModel;
                            }
                        }
                    }

                    transaction.Commit();
                }
                else
                {
                    responseModel.Status = false;
                    responseModel.Message = "Invalid data.";
                    transaction.Rollback();
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }

            return responseModel;
        }

        public async Task<ResponseModel> RechargeRequestDelete(RequestModel requestModel)
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
                            new SqlParameter("@ReqId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RechargeRequestDelete", param);

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
