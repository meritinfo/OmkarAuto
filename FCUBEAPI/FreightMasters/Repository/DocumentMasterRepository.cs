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
    public class DocumentMasterRepository: IDocumentMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DocumentMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> DocumentMasterSave(DocumentMasterModel documentMasterModel)
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
                          new SqlParameter("@DocType", documentMasterModel.DocType),
                            new SqlParameter("@DocDesc", documentMasterModel.DocDesc),
                            new SqlParameter("@AutoGenYN", documentMasterModel.AutoGenYN),
                            new SqlParameter("@GenType", documentMasterModel.GenType),
                            new SqlParameter("@AllotYN", documentMasterModel.AllotYN),
                            new SqlParameter("@SeriesYN", documentMasterModel.SeriesYN),
                            new SqlParameter("@IncSeriesYN", documentMasterModel.IncSeriesYN),
                            new SqlParameter("@PrefixLength", documentMasterModel.PrefixLength),
                            new SqlParameter("@DprYN", documentMasterModel.DprYN),
                            new SqlParameter("@AutoIncrYN", documentMasterModel.AutoIncrYN),
                            new SqlParameter("@LoggedInUser", documentMasterModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_UpdateDocumentMaster", param);

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
        public async Task<DocumentMasterList> GetDocumentMasterList(PageRequest request)
        {
            DocumentMasterList documentMasterList = new();
            List<DocumentMasterModel> docList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDocumentMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            docList.Add(new DocumentMasterModel
                            {
                               
                                DocType = Convert.ToString(dataSet.Tables[0].Rows[i]["DocType"]),
                                DocDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["DocDesc"]),
                                AutoGenYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AutoGenYN"]),
                                GenType = Convert.ToString(dataSet.Tables[0].Rows[i]["GenType"]),
                                AllotYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AllotYN"]),
                                SeriesYN = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesYN"]),
                                IncSeriesYN = Convert.ToString(dataSet.Tables[0].Rows[i]["IncSeriesYN"]),
                                PrefixLength = Convert.ToString(dataSet.Tables[0].Rows[i]["PrefixLength"]),
                                DprYN = Convert.ToString(dataSet.Tables[0].Rows[i]["DprYN"]),
                                AutoIncrYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AutoIncrYN"]),
                               
                            });
                        }

                        documentMasterList.DocList = docList;

                        documentMasterList.PageMetaData = new PaginationMetaData
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
            return documentMasterList;
        }

        public async Task<ResponseModel> DocumentMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@DocType", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DocumentMasterDelete", param);

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
