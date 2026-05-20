using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace Consignment.Repository
{
    public class LorryHireAprvRepository : ILorryHireAprvRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public LorryHireAprvRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<LorryHireReqListModel> GetLorryHireAprvList(ReportRequestModel request)
        {
            LorryHireReqListModel lorryHire = new();
            List<LorryHireReqModel> lorryHireReq = new();
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
                            new SqlParameter("@ToDate",     request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireAprvList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHireReq.Add(new LorryHireReqModel
                            {
                                Id              = Convert.ToString(dataSet.Tables[0].Rows[i]["Id"]),
                                ReqBranch       = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBranch"]),
                                ReqDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqDate"]),
                                ChYear          = Convert.ToString(dataSet.Tables[0].Rows[i]["ChYear"]),
                                ChallanBranch   = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanId       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                ExtraHamali     = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraHamali"]),
                                ExtraDeten      = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraDeten"]),
                                ExtraOthers     = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraOthers"]),
                                ExtraOthers2    = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraOthers2"]),
                                ExtraOthers3    = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraOthers3"]),
                                ExtraHamaliApp  = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraHamaliApp"]),
                                ExtraDetenApp   = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraDetenApp"]),
                                ExtraOthersApp  = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraOthersApp"]),
                                ExtraOthers2App = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraOthers2App"]),
                                ExtraOthers3App = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraOthers3App"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                FinalApprYn     = Convert.ToString(dataSet.Tables[0].Rows[i]["FinalApprYn"]),
                                AppRejRemarks   = Convert.ToString(dataSet.Tables[0].Rows[i]["AppRejRemarks"]),
                                FinalApprDt     = Convert.ToString(dataSet.Tables[0].Rows[i]["AppRejDate"]),
                                ReqBr           = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBr"]),
                                ChallanBr       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBr"]),
                                AppRejBr        = Convert.ToString(dataSet.Tables[0].Rows[i]["AppRejBr"]),
                            });
                        }

                        lorryHire.LorryHireReqList = lorryHireReq;

                        lorryHire.PageMetaData = new PaginationMetaData
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
            return lorryHire;
        }

        public async Task<ResponseModel> LorryHireAprvSave(LorryHireReqModel lorryHire)
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

                        new SqlParameter("@Id               ",          lorryHire.Id              ),
                        new SqlParameter("@ExtraHamaliApp   ",          lorryHire.ExtraHamaliApp  ),
                        new SqlParameter("@ExtraDetenApp    ",          lorryHire.ExtraDetenApp   ),
                        new SqlParameter("@ExtraOthersApp   ",          lorryHire.ExtraOthersApp  ),
                        new SqlParameter("@ExtraOthers2App  ",          lorryHire.ExtraOthers2App ),
                        new SqlParameter("@ExtraOthers3App  ",          lorryHire.ExtraOthers3App ),
                        new SqlParameter("@AppRejBranch     ",          lorryHire.FinalApprYn     ),
                        new SqlParameter("@AppRejBy         ",          lorryHire.FinalApprBy     ),
                        new SqlParameter("@AppRejRemarks    ",          lorryHire.AppRejRemarks   ),

                       
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireAprvSave", param);
                    var MasterId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterId = responseModel.Message;

                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
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

        public async Task<ResponseModel> LorryHireAprvDelete(RequestModel requestModel)
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
                            new SqlParameter("@Id", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireAprvDelete", param);

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
