using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public class TyreRegroupIssueMasterRepository: ITyreRegroupIssueMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyreRegroupIssueMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<TyreRegroupIssueMasterList> GetTyreRegroupIssueMasterList(PageFromDtToDtRequest request)
        {
            TyreRegroupIssueMasterList tyreRegroupIssueMasterList = new();
            List<TyreRegroupIssueMasterModel> tyreRegroupMasterList = new();
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
                            new SqlParameter("@ToDate",     request.ToDate),
                           // new SqlParameter("@Type",       request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreRegroupIssueMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyreRegroupMasterList.Add(new TyreRegroupIssueMasterModel
                            {
                                RegroupIssMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupIssMasterID"]),
                                RegroupIssDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupIssDate"]),
                                IssueIncharge = Convert.ToString(dataSet.Tables[0].Rows[i]["IssueIncharge"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ApprovedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedYN"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                            });
                        }

                        tyreRegroupIssueMasterList.TyreRegroupIssueList = tyreRegroupMasterList;

                        tyreRegroupIssueMasterList.PageMetaData = new PaginationMetaData
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
            return tyreRegroupIssueMasterList;
        }
        public async Task<TyreRegroupIssueMasterModel> GetTyreRegroupIssueMasterInnerGridList(RequestModel request)
        {
            TyreRegroupIssueMasterModel tyreRegroupIssueMasterInnerGridModel = new()
            {
                TyreRegroupIssueDtlList = new List<TyreRegroupIssueDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ActivateMasterID", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreRegroupIssueMasterInnerGridList", param);
                    
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreRegroupIssueMasterInnerGridModel.TyreRegroupIssueDtlList.Add(new TyreRegroupIssueDtlListmodel
                            {
                                RegroupIssMasterID = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupIssMasterID"]),
                                RegroupIssDate = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupIssDate"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(resultData.Tables[0].Rows[i]["YearID"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return tyreRegroupIssueMasterInnerGridModel;
        }
        public async Task<ResponseModel> TyreRegroupIssueMasterSave(TyreRegroupIssueMasterModel tyreRegroupIssueMasterModel)
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
                            new SqlParameter("@RegroupIssMasterID", tyreRegroupIssueMasterModel.RegroupIssMasterID ),
                            new SqlParameter("@RegroupIssDate",     tyreRegroupIssueMasterModel.RegroupIssDate ),
                            new SqlParameter("@IssueIncharge",      tyreRegroupIssueMasterModel.IssueIncharge ),
                            new SqlParameter("@VendorId",           tyreRegroupIssueMasterModel.VendorId),
                            new SqlParameter("@Remarks",            tyreRegroupIssueMasterModel.Remarks),
                            new SqlParameter("@ApprovedYN",         tyreRegroupIssueMasterModel.ApprovedYN),
                            new SqlParameter("@BranchCode",         tyreRegroupIssueMasterModel.BranchCode),                        
                            new SqlParameter("@YearID",             tyreRegroupIssueMasterModel.YearID ),
                            new SqlParameter("@LoggedInUser",       tyreRegroupIssueMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreRegroupIssueMasterSave", param);
                    string RegroupIssMasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        RegroupIssMasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList.Count; i++)
                            {
                                tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList[i].RegroupIssMasterID = RegroupIssMasterID;
                                tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList[i].RegroupIssDate = tyreRegroupIssueMasterModel.RegroupIssDate;
                                tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList[i].BranchCode = tyreRegroupIssueMasterModel.BranchCode;
                                tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList[i].YearID = tyreRegroupIssueMasterModel.YearID;

                                responseModel = await TyreRegroupIssueMasterDetailSave(transaction, tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tyreRegroupIssueMasterModel.TyreRegroupIssueDtlList.Count;
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
        public async Task<ResponseModel> TyreRegroupIssueMasterDetailSave(SqlTransaction transaction, TyreRegroupIssueDtlListmodel tyreRegroupIssueDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RegroupIssMasterID", tyreRegroupIssueDtlListmodel.RegroupIssMasterID),
                            new SqlParameter("@RegroupIssDate",     tyreRegroupIssueDtlListmodel.RegroupIssDate),
                            new SqlParameter("@BrandId",            tyreRegroupIssueDtlListmodel.BrandId),
                            new SqlParameter("@TyreId",             tyreRegroupIssueDtlListmodel.TyreId),
                            new SqlParameter("@Remarks",            tyreRegroupIssueDtlListmodel.Remarks),
                            new SqlParameter("@BranchCode",         tyreRegroupIssueDtlListmodel.BranchCode),
                            new SqlParameter("@YearID",             tyreRegroupIssueDtlListmodel.YearID),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreRegroupIssueDetailSave", param);

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
        public async Task<ResponseModel> TyreRegroupIssueMasterDelete(RequestModel req)
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
                            new SqlParameter("@RegroupIssMasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreRegroupIssueMasterDelete", param);

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
