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
    public class FreightGstMasterRepository: IFreightGstMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FreightGstMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> FreightGstMasterSave(FreightGstMasterModel freightGstMasterModel)
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
                             new SqlParameter("@FreightId" ,        freightGstMasterModel.FreightId  ),
                             new SqlParameter("@FreightDesc" ,      freightGstMasterModel.FreightDesc  ),
                             new SqlParameter("@SacCode" ,          freightGstMasterModel.SacCode ),
                             new SqlParameter("@SgstPct" ,          freightGstMasterModel.SgstPct  ),
                             new SqlParameter("@CgstPct" ,          freightGstMasterModel.CgstPct   ),
                             new SqlParameter("@IgstPct" ,          freightGstMasterModel.IgstPct ),                                 
                             new SqlParameter("@LinkColumn" ,       freightGstMasterModel.@LinkColumn),
                             new SqlParameter("@FreightLedgerAc" ,  freightGstMasterModel.@FreightLedgerAc),
                             new SqlParameter("@LoggedInUser" ,     freightGstMasterModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FreightGstMasterSave", param);

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
        public async Task<ResponseModel> CheckDuplicateFreightDesc(RequestModel requestModel)
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
                            new SqlParameter("@FreightDesc", requestModel.strRequest),
                          //  new SqlParameter("@ClassDesc", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CheckDuplicateFreightDesc", param);

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
        public async Task<List<DropDownListModel>> GetLedgerList()
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_LedgerList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new DropDownListModel
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
            return locationList;
        }
        public async Task<FreightGstMasterList> GetFreightGstMasterList(ReportRequestModel request)
        {
            FreightGstMasterList freightGstMasterList = new();
            List<FreightGstMasterModel> gstList = new();
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
                           // new SqlParameter("@FromDate", request.FromDate),
                           // new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_FreightGstMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gstList.Add(new FreightGstMasterModel
                            {
                                FreightId = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightId"]),
                                FreightDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightDesc"]),
                                SacCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SacCode"]),
                                SgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                CgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                IgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                LinkColumn = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkColumn"]),
                                FreightLedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightLedgerAc"]),

                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        freightGstMasterList.GstList = gstList;

                        freightGstMasterList.PageMetaData = new PaginationMetaData
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
            return freightGstMasterList;
        }
        public async Task<ResponseModel> FreightGstMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@FreightId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FreightGstMasterDelete", param);

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
