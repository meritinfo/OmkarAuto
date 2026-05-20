
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using FreightMasters.Models;
using Shared.Models;
using System.Threading.Tasks;
using System;

namespace FreightMasters.Repository
{
    public class DocumentAllotmentRepository : IDocumentAllotmentRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DocumentAllotmentRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save product master details
        /// </summary>
        /// <param name=""></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DocumentallotmentSave(DocumentAllotmentModel documentAllotmentModel)
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
                            new SqlParameter("@DocAllotId", documentAllotmentModel.DocAllotId),
                            new SqlParameter("@BranchCode", documentAllotmentModel.BranchCode),
                            new SqlParameter("@DocType", documentAllotmentModel.DocType),
                            new SqlParameter("@DocNumCode", documentAllotmentModel.DocNumCode),
                            new SqlParameter("@AllotDate", documentAllotmentModel.AllotDate),
                            new SqlParameter("@RangeFrom", documentAllotmentModel.RangeFrom),
                            new SqlParameter("@RangeTo", documentAllotmentModel.RangeTo),
                            new SqlParameter("@DocCount", documentAllotmentModel.DocCount),
                            new SqlParameter("@DocStatus", documentAllotmentModel.DocStatus),
                            new SqlParameter("@DocCloseDate", documentAllotmentModel.DocCloseDate),
                            new SqlParameter("@DocUsedCount", documentAllotmentModel.DocUsedCount),
                            new SqlParameter("@DocMaxNo", documentAllotmentModel.DocMaxNo),
                            new SqlParameter("@AutoGenYN", documentAllotmentModel.AutoGenYN),
                            new SqlParameter("@Remarks", documentAllotmentModel.Remarks),
                            new SqlParameter("@SeriesCode", documentAllotmentModel.SeriesCode),
                            new SqlParameter("@YearId", documentAllotmentModel.YearId),
                            new SqlParameter("@LoggedInUser", documentAllotmentModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DocumentAllotmentSave", param);

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
            }
            return responseModel;
        }
       
        public async Task<DocumentAllotmentListModel> GetDocumentAllotmentList(PageRequest request)
        {
            DocumentAllotmentListModel documentAllotmentList = new();
            List<DocumentAllotmentModel> docallotList = new();
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
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocumentAllotment", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            docallotList.Add(new DocumentAllotmentModel
                            {
                                DocAllotId = Convert.ToString(dataSet.Tables[0].Rows[i]["DocAllotId"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                Branch     = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                DocType = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),
                                DocNumCode = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNumCode"]),
                                AllotDate = Convert.ToString(dataSet.Tables[0].Rows[i]["AllotDate"]),
                                RangeFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["RangeFrom"]),
                                RangeTo = Convert.ToString(dataSet.Tables[0].Rows[i]["RangeTo"]),
                                DocCount = Convert.ToString(dataSet.Tables[0].Rows[i]["DocCount"]),
                                DocStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["DocStatus"]),
                                DocCloseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DocCloseDate"]),
                                DocUsedCount = Convert.ToString(dataSet.Tables[0].Rows[i]["DocUsedCount"]),
                                DocMaxNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocMaxNo"]),
                                AutoGenYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AutoGenYN"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                SeriesCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesCode"]),
                            });
                        }

                        documentAllotmentList.DocumentAllotmentLists = docallotList;

                        documentAllotmentList.PageMetaData = new PaginationMetaData
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
            return documentAllotmentList;
        }
       
        public async Task<ResponseModel> DocumentAllotmentDelete(RequestModel requestModel)
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
                            new SqlParameter("@DocAllotId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DocumentAllotmentDelete", param);

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
       
        public async Task<ResponseModel> GetDocNumCode(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

           
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocNumCode", param);

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
       
        public async Task<ResponseModel> CheckDocumentRange(ReportRequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch",    req.FilterStr),
                            new SqlParameter("@DocType",    req.FilterStr1),
                            new SqlParameter("@FromRange",  req.FilterStr2),
                            new SqlParameter("@ToRange",    req.FilterStr3)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDocumentRange", param);

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

        public async Task<ResponseModel> CheckDocumentllpRange(ReportRequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch",    req.FilterStr),
                            new SqlParameter("@DocType",    req.FilterStr1),
                            new SqlParameter("@SeriesCode", req.Search),
                            new SqlParameter("@FromRange",  req.FilterStr2),
                            new SqlParameter("@ToRange",    req.FilterStr3),
                            new SqlParameter("@YearId",    req.SortOrder)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDocumentLlpRange", param);

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

        public async Task<List<DropDownListModel>> GetRangeList(RequestModel req)
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocType",    req.strRequest),
                            new SqlParameter("@RangeType",  req.strRequest1),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocRangeList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }
        public async Task<List<DropDownListModel>> GetSeriesllpList(RequestModel req)
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode", req.strRequest1),
                            new SqlParameter("@DocType",    req.strRequest),
                            new SqlParameter("@YearId",     req.strRequest2),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSeriesList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }
        public async Task<ResponseModel> CheckIncSeries(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DocType",    req.strRequest),
                             new SqlParameter("@YearId",    req.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckIncSeries", param);

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

    }


}
