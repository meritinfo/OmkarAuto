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
    public class RatesMasterNewRepository: IRatesMasterNewRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public RatesMasterNewRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> RatesMasterNewSave(RatesMasterNewModel ratesMasterNewModel)
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
                                 new SqlParameter( "@RateId", ratesMasterNewModel.RateId ),
                                 new SqlParameter( "@PartyId", ratesMasterNewModel.PartyId ),
                                 new SqlParameter( "@ValidFrom", ratesMasterNewModel.ValidFrom ),
                                 new SqlParameter( "@ValidUpto", ratesMasterNewModel.ValidUpto ),
                                 new SqlParameter( "@VehTypeId", ratesMasterNewModel.VehTypeId ),
                                 new SqlParameter( "@RateTypeId", ratesMasterNewModel.RateTypeId ),
                                 new SqlParameter( "@FromLocationType", ratesMasterNewModel.FromLocationType ),
                                 new SqlParameter( "@FromLocation", ratesMasterNewModel.FromLocation ),
                                // new SqlParameter( "@ToLocationType", ratesMasterNewModel.ToLocationType ),
                                //  new SqlParameter( "@ProductType", ratesMasterNewModel.ProductType ),
                                new SqlParameter( "@LoggedInUser", ratesMasterNewModel.LoggedInUser ),
                     };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RatesMasterNewSave", param);
                    string RateId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        RateId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < ratesMasterNewModel.RatesMasterNewDetailList.Count; i++)
                            {
                                ratesMasterNewModel.RatesMasterNewDetailList[i].RateId = RateId;
                               // ratesMasterNewModel.RatesMasterNewDetailList[i].TransDate = ratesMasterNewModel.TransDate;

                                responseModel = await RatesMasterNewDetailSave(transaction, ratesMasterNewModel.RatesMasterNewDetailList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = ratesMasterNewModel.RatesMasterNewDetailList.Count;
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
        public async Task<ResponseModel> RatesMasterNewDetailSave(SqlTransaction transaction, RatesDetailNewModel ratesDetailNewModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RateDtlId",               ratesDetailNewModel.RateDtlId),

                            new SqlParameter("@RateId",           ratesDetailNewModel.RateId),

                            new SqlParameter("@Destination",             ratesDetailNewModel.Destination),
                            new SqlParameter("@ProductId",                    ratesDetailNewModel.ProductId),
                            new SqlParameter("@RateRs",        ratesDetailNewModel.RateRs) ,
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RatesDetailNewSave", param);

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
        public async Task<RatesMasterNewModel> GetRatesMasterNewInnerGridList(RequestModel request)
        {
            RatesMasterNewModel ratesMasterNewInnerGridList = new()
            {
                RatesMasterNewDetailList = new List<RatesDetailNewModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@RateId", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRatesMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            ratesMasterNewInnerGridList.RatesMasterNewDetailList.Add(new RatesDetailNewModel
                            {
                                // Id = Convert.ToString(resultData.Tables[0].Rows[i]["Id"]),

                                // SpareLubId = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                RateDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["RateDtlId"]),
                                RateId = Convert.ToString(resultData.Tables[0].Rows[i]["RateId"]),
                                Destination = Convert.ToString(resultData.Tables[0].Rows[i]["Destination"]),
                                ProductId = Convert.ToString(resultData.Tables[0].Rows[i]["ProductId"]),
                                RateRs = Convert.ToString(resultData.Tables[0].Rows[i]["RateRs"]),

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
        public async Task<ResponseModel> RatesMasterNewDelete(RequestModel requestModel)
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
                            new SqlParameter("@RateId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RatesMasterNewDelete", param);

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

        public async Task<RatesMasterNewList> GetRatesMasterNewList(ReportRequestModel request)
        {
            RatesMasterNewList ratesMasterNewList = new();
            List<RatesMasterNewModel> newList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRatesMasterNewList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            newList.Add(new RatesMasterNewModel
                            {
                                RateId = Convert.ToString(dataSet.Tables[0].Rows[i]["RateId"]),
                                PartyId = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyId"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                VehTypeId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehTypeId"]),
                                RateTypeId = Convert.ToString(dataSet.Tables[0].Rows[i]["RateTypeId"]),
                                FromLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocationType"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                location = Convert.ToString(dataSet.Tables[0].Rows[i]["location"]),
                                party = Convert.ToString(dataSet.Tables[0].Rows[i]["party"]),

                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        ratesMasterNewList.NewList = newList;

                        ratesMasterNewList.PageMetaData = new PaginationMetaData
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
            return ratesMasterNewList;
        }
    }
}
