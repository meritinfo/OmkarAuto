using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Shared.Models;
using System.Numerics;
using System.Data;
using System.Data.SqlClient;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Transactions;

namespace FleetTrans.Repository
{
    public class FastTagRepository : IFastTagRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FastTagRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<ResponseModel> FastTagDelete(RequestModel request)
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
                            new SqlParameter("@MasterID", request.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FastTagDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else
                    {
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
        public async Task<ResponseModel> FastTagSave(FastTagModel fasttag)
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
                            new SqlParameter("@FtMasterID"      , fasttag.FtMasterID),
                            new SqlParameter("@FtAccount"       , fasttag.FtAccount),
                            new SqlParameter("@FromDate"        , fasttag.FromDate),
                            new SqlParameter("@ToDate"          , fasttag.ToDate),
                            new SqlParameter("@StmtDate"        , fasttag.StmtDate),
                            new SqlParameter("@Remarks"         , fasttag.Remarks),
                            new SqlParameter("@TotalFtAmt"      , fasttag.TotalFtAmt),
                            new SqlParameter("@BranchCode"      , fasttag.BranchCode),
                            new SqlParameter("@YearID"          , fasttag.YearID),
                             new SqlParameter("@DriverId"          , fasttag.DriverId),
                            new SqlParameter("@LoggedInUser"    , fasttag.LoggedInUser)
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FastTagMasterSave", param);

                    string FtMasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        FtMasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < fasttag.FastTagDtlList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@FtMasterID"      , FtMasterID),
                                    new SqlParameter("@TransRefNo"      , fasttag.FastTagDtlList[i].TransRefNo),
                                    new SqlParameter("@VehicleNo"       , fasttag.FastTagDtlList[i].VehicleNo),
                                    new SqlParameter("@TransDateTime"   , fasttag.FastTagDtlList[i].TransDateTime),
                                    new SqlParameter("@FtAmount"        , fasttag.FastTagDtlList[i].FtAmount),
                                    new SqlParameter("@DtlRemarks"      , fasttag.FastTagDtlList[i].DtlRemarks),
                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FastTagDtlsSave", paramMisc);
                                if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0 )
                                {
                                    responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = fasttag.FastTagDtlList.Count;
                                        transaction.Rollback();
                                    }
                                }
                                else
                                {
                                    i = fasttag.FastTagDtlList.Count;
                                    transaction.Rollback();
                                }                                
                            }
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                    }
                    else
                    {
                        transaction.Rollback();
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<FastTagListModel> GetFastTagList(ReportRequestModel request)
        {
            FastTagListModel fastTagListModel = new();
            List<FastTagModel> fastTags = new();
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
                            new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFastTagMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            fastTags.Add(new FastTagModel
                            {
                                FtMasterID      = Convert.ToString(dataSet.Tables[0].Rows[i]["FtMasterID"]),
                                FtAccount       = Convert.ToString(dataSet.Tables[0].Rows[i]["FtAccount"]),
                                AccountName     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                StmtDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["StmtDate"]),
                                FromDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                ToDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                FtmId           = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmId"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalFtAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalFtAmt"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID          = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                DriverId = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverId"]),
                            });
                        }

                        fastTagListModel.FastTagList = fastTags;

                        fastTagListModel.PageMetaData = new PaginationMetaData
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
            return fastTagListModel;
        }
        public async Task<FastTagModel> GetFastTagInnerGridList(RequestModel request)
        {
            FastTagModel fastTagModel = new();
            List<FastTagDtlsModel> fastTagDtls = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FtMasterID", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFastTagInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            fastTagDtls.Add(new FastTagDtlsModel
                            {
                                FtMasterID      = Convert.ToString(dataSet.Tables[0].Rows[i]["FtMasterID"]),
                                TransRefNo      = Convert.ToString(dataSet.Tables[0].Rows[i]["TransRefNo"]),
                                VehicleNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TransDateTime   = Convert.ToDateTime(dataSet.Tables[0].Rows[i]["TransDateTime"]).ToString("dd-MM-yyyy hh:mm:ss"),
                                FtAmount        = Convert.ToString(dataSet.Tables[0].Rows[i]["FtAmount"]),
                                DtlRemarks      = Convert.ToString(dataSet.Tables[0].Rows[i]["DtlRemarks"]),
                            });
                        }

                        fastTagModel.FastTagDtlList = fastTagDtls;

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return fastTagModel;
        }

    }
}
