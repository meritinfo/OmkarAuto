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
    public class PanWiseTdsRateRepository: IPanWiseTdsRateRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public PanWiseTdsRateRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> PanWiseTdsRateSave(PanWiseTdsRateModel panWiseTdsRateModel)
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
                            new SqlParameter("@Rateid", panWiseTdsRateModel.Rateid),
                            new SqlParameter("@PanNo", panWiseTdsRateModel.PanNo),                        
                            new SqlParameter("@OwnerName", panWiseTdsRateModel.OwnerName),
                            new SqlParameter("@ValidFrom", panWiseTdsRateModel.ValidFrom),
                            new SqlParameter("@ValidUpto", panWiseTdsRateModel.ValidUpto),
                            new SqlParameter("@TdsRate", panWiseTdsRateModel.TdsRate),
                            new SqlParameter("@IsActive", panWiseTdsRateModel.IsActive),
                            new SqlParameter("@TdsCertUpload", panWiseTdsRateModel.TdsCertUpload),
                            new SqlParameter("@YearId", panWiseTdsRateModel.YearId),
                            new SqlParameter("@LoggedInUser", panWiseTdsRateModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PanWiseTdsRateSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> ChkPanDuplicate(RequestModel req)
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
                            new SqlParameter("@PanNo", req.strRequest),
                             new SqlParameter("@YearId", req.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicatePanNo", param);

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
        public async Task<PanWiseTdsRateList> GetPanWiseTdsRateList(ReportRequestModel request)
        {
            PanWiseTdsRateList PanList = new();
            List<PanWiseTdsRateModel> tdsRateList = new();
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
                            new SqlParameter("@PanNo",      request.FilterStr),
                            new SqlParameter("@YearId",     request.FilterStr1),
                         
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPanWiseTdsRateList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tdsRateList.Add(new PanWiseTdsRateModel
                            {

                                Rateid = Convert.ToString(dataSet.Tables[0].Rows[i]["Rateid"]),
                                PanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PanNo"]),
                                OwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerName"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                TdsRate = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsRate"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                TdsCertUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsCertUpload"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                            
                            });
                        }

                        PanList.PanList = tdsRateList;

                        PanList.PageMetaData = new PaginationMetaData
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
            return PanList;
        }
        public async Task<ResponseModel> PanWiseTdsRateDelete(RequestModel req)
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
                            new SqlParameter("@Rateid", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PanWiseTdsRateDelete", param);

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
