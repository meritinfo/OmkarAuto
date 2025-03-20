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
    public class LRBillSeriesRepository: ILRBillSeriesRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public LRBillSeriesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> LRBillSeriesSave(LRBillSeriesModel lRBillSeriesModel)
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
                             new SqlParameter("@SeriesId" , lRBillSeriesModel.SeriesId  ),
                             new SqlParameter("@SeriesCode" , lRBillSeriesModel.SeriesCode  ),
                             new SqlParameter("@LR_Bill_type" , lRBillSeriesModel.LR_Bill_type ),
                             new SqlParameter("@BranchCode" , lRBillSeriesModel.BranchCode  ),
                              new SqlParameter("@IsActive" , lRBillSeriesModel.IsActive   ),

                             new SqlParameter("@LoggedInUser" , lRBillSeriesModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LRBillSeriesSave", param);

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
        public async Task<ResponseModel> CheckDuplicateSeriesCode(RequestModel requestModel)
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
                            new SqlParameter("@SeriesCode", requestModel.strRequest),
                          //  new SqlParameter("@ClassDesc", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CheckDuplicateSeriesCode", param);

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
        public async Task<LRBillSeriesMstList> GetLRBillSeriesMasterList(ReportRequestModel request)
        {
            LRBillSeriesMstList lRBillSeriesMstList = new();
            List<LRBillSeriesModel> seriesList = new();
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
                             new SqlParameter("@LRBillType", request.FilterStr),
                            new SqlParameter("@BranchCode", request.FilterStr1),
                           
                           // new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_LRBillSeriesList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            seriesList.Add(new LRBillSeriesModel
                            {
                                SeriesId = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesId"]),
                                SeriesCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesCode"]),
                                LR_Bill_type = Convert.ToString(dataSet.Tables[0].Rows[i]["LR_Bill_type"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                branch = Convert.ToString(dataSet.Tables[0].Rows[i]["branch"]),
                                type = Convert.ToString(dataSet.Tables[0].Rows[i]["type"]),


                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        lRBillSeriesMstList.SeriesList = seriesList;

                        lRBillSeriesMstList.PageMetaData = new PaginationMetaData
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
            return lRBillSeriesMstList;
        }
        public async Task<ResponseModel> LRBillSeriesMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@SeriesId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LRBillSeriesDelete", param);

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
