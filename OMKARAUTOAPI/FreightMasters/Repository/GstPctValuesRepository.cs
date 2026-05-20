using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public class GstPctValuesRepository: IGstPctValuesRepository
    {

        private readonly IOptions<DBModel> dbconnection;
        public GstPctValuesRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> GstPctValuesSave(GstPctValuesModel gstPctValuesModel)
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
                          new SqlParameter("@Id", gstPctValuesModel.Id),
                            new SqlParameter("@ValidFrom", gstPctValuesModel.ValidFrom),
                            new SqlParameter("@RoadFrtGst", gstPctValuesModel.RoadFrtGst),
                            new SqlParameter("@RailFrtGst", gstPctValuesModel.RailFrtGst),
                            new SqlParameter("@CoastalFrtGst", gstPctValuesModel.CoastalFrtGst),
                            new SqlParameter("@HamaliGst", gstPctValuesModel.HamaliGst),
                            new SqlParameter("@DetentionGst", gstPctValuesModel.DetentionGst),
                            new SqlParameter("@OtherChargesGst", gstPctValuesModel.OtherChargesGst),
                            new SqlParameter("@LoggedInUser", gstPctValuesModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GstPctValuesSave", param);

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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<GstPctValuesList> GetGstPctValuesList(ReportRequestModel request)
        {
            GstPctValuesList gstPctValuesList = new();
            List<GstPctValuesModel> pctList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GstPctValuesList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            pctList.Add(new GstPctValuesModel
                            {
                                Id = Convert.ToString(dataSet.Tables[0].Rows[i]["Id"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                RoadFrtGst = Convert.ToString(dataSet.Tables[0].Rows[i]["RoadFrtGst"]),
                                RailFrtGst = Convert.ToString(dataSet.Tables[0].Rows[i]["RailFrtGst"]),
                                CoastalFrtGst = Convert.ToString(dataSet.Tables[0].Rows[i]["CoastalFrtGst"]),
                                HamaliGst = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliGst"]),
                                DetentionGst= Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionGst"]),
                                OtherChargesGst = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherChargesGst"]),
                        
                            });
                        }

                        gstPctValuesList.PctList = pctList;

                        gstPctValuesList.PageMetaData = new PaginationMetaData
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
            return gstPctValuesList;
        }
        public async Task<ResponseModel> GetGstPctValuesDelete(RequestModel request)
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
                            new SqlParameter("@Id", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GstPctValuesDelete", param);

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
