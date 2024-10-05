using FinanceMaster.Models;
using FinanceMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public class SubLedgerMasterRepository: ISubLedgerMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public SubLedgerMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<SubLedgerMasterList> GetSubLedgerMasterList(PageFromDtToDtRequest request)
        {
            SubLedgerMasterList subLedgerMasterList = new();
            List<SubLedgerMasterModel> subList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSubLedgerMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            subList.Add(new SubLedgerMasterModel
                            {
                                SubLedgerId = Convert.ToString(dataSet.Tables[0].Rows[i]["SubLedgerId"]),
                                LedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["LedgerAc"]),
                                CreateOrPredefined = Convert.ToString(dataSet.Tables[0].Rows[i]["CreateOrPredefined"]),
                                PreDefinedQuery = Convert.ToString(dataSet.Tables[0].Rows[i]["PreDefinedQuery"]),
                                ValidateWithDocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidateWithDocNo"]),
                                ValidateTable = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidateTable"]),
                                ValidateTableField = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidateTableField"]),
                              
                            });
                        }

                        subLedgerMasterList.SubList = subList;

                        subLedgerMasterList.PageMetaData = new PaginationMetaData
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
            return subLedgerMasterList;
        }
        public async Task<ResponseModel> SubLedgerMasterDetailSave(SqlTransaction transaction, SubLedgerMasterDtlListmodel subLedgerMasterDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SubLedgerDtlId",             subLedgerMasterDtlListmodel.SubLedgerDtlId),
                            new SqlParameter("@SubLedgerId",   subLedgerMasterDtlListmodel.SubLedgerId),
                            new SqlParameter("@LedgerAc",       subLedgerMasterDtlListmodel.LedgerAc),
                            new SqlParameter("@SubLedgerDesc",            subLedgerMasterDtlListmodel.SubLedgerDesc),
                          
                 
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SubLedgerDetailSave", param);

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
        public async Task<ResponseModel> SubLedgerMasterSave(SubLedgerMasterModel subLedgerMasterModel)
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
                            new SqlParameter("@SubLedgerId",  subLedgerMasterModel.SubLedgerId ),
                            new SqlParameter("@LedgerAc",         subLedgerMasterModel.LedgerAc ),
                      
                            new SqlParameter("@CreateOrPredefined",       subLedgerMasterModel.CreateOrPredefined),
                            new SqlParameter("@PreDefinedQuery",           subLedgerMasterModel.PreDefinedQuery),
                            new SqlParameter("@ValidateWithDocNo",           subLedgerMasterModel.ValidateWithDocNo),
                            new SqlParameter("@ValidateTable",         subLedgerMasterModel.ValidateTable),
                            new SqlParameter("@ValidateTableField",      subLedgerMasterModel.ValidateTableField),
                       
                         
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SubLedgerMasterSave", param);
                    string SubLedgerId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        SubLedgerId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < subLedgerMasterModel.SubLedgerMasterDtlList.Count; i++)
                            {
                                subLedgerMasterModel.SubLedgerMasterDtlList[i].SubLedgerId = SubLedgerId;
                             
                                responseModel = await SubLedgerMasterDetailSave(transaction, subLedgerMasterModel.SubLedgerMasterDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = subLedgerMasterModel.SubLedgerMasterDtlList.Count;
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

        public async Task<SubLedgerMasterModel> GetSubLedgerMasterInnerGridList(RequestModel request)
        {
            SubLedgerMasterModel subLedgerMasterInnerGridList = new()
            {
                SubLedgerMasterDtlList = new List<SubLedgerMasterDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SubLedgerId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSubLedgerMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            subLedgerMasterInnerGridList.SubLedgerMasterDtlList.Add(new SubLedgerMasterDtlListmodel
                            {
                                SubLedgerDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["SubLedgerDtlId"]),
                                SubLedgerId = Convert.ToString(resultData.Tables[0].Rows[i]["SubLedgerId"]),
                                LedgerAc = Convert.ToString(resultData.Tables[0].Rows[i]["LedgerAc"]),
                                SubLedgerDesc = Convert.ToString(resultData.Tables[0].Rows[i]["SubLedgerDesc"]),
                               
                            });
                        }
                    }


                }
            }
            catch (Exception ex)
            {

            }
            return subLedgerMasterInnerGridList;
        }
        public async Task<ResponseModel> SubLedgerMasterDelete(RequestModel req)
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
                            new SqlParameter("@SubLedgerId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SubLedgerMasterDelete", param);

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
