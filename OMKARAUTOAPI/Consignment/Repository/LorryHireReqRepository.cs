using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

namespace Consignment.Repository
{
    public class LorryHireReqRepository : ILorryHireReqRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public LorryHireReqRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<LorryHireReqListModel> GetLorryHireReqList(ReportRequestModel request)
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireReqList", param);

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
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),      
                                AttachPath      = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachPath"]),
                                ReqBr           = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBr"]),
                                ChallanBr       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBr"]),
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

        public async Task<ResponseModel> LorryHireReqSave(LorryHireReqModel lorryHire)
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

                        new SqlParameter("@Id             ",          lorryHire.Id              ),
                        new SqlParameter("@ReqBranch      ",          lorryHire.ReqBranch       ),
                        new SqlParameter("@ReqDate        ",          lorryHire.ReqDate         ),
                        new SqlParameter("@ReqBy          ",          lorryHire.ReqBy           ),
                        new SqlParameter("@ChYear         ",          lorryHire.ChYear          ),
                        new SqlParameter("@ChallanBranch  ",          lorryHire.ChallanBranch   ),
                        new SqlParameter("@ChallanNo      ",          lorryHire.ChallanNo       ),
                        new SqlParameter("@ChallanId      ",          lorryHire.ChallanId       ),
                        new SqlParameter("@ExtraHamali    ",          lorryHire.ExtraHamali     ),
                        new SqlParameter("@ExtraDeten     ",          lorryHire.ExtraDeten      ),
                        new SqlParameter("@ExtraOthers    ",          lorryHire.ExtraOthers     ),
                        new SqlParameter("@ExtraOthers2   ",          lorryHire.ExtraOthers2    ),
                        new SqlParameter("@ExtraOthers3   ",          lorryHire.ExtraOthers3    ),
                        new SqlParameter("@Remarks        ",          lorryHire.Remarks         ),
                        new SqlParameter("@ReqModifiedBy  ",          lorryHire.ReqModifiedBy   ),
                        new SqlParameter("@AttachPath     ",          lorryHire.AttachPath      ),

                       
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireReqSave", param);
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

        public async Task<ResponseModel> LorryHireReqDelete(RequestModel requestModel)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireReqDelete", param);

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

        public async Task<LorryHireReqModel> GetChallanDetails(RequestModel request)
        {
            LorryHireReqModel lorryHire = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChallanYear", request.strRequest),
                            new SqlParameter("@ChallanNo",   request.strRequest1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        lorryHire.ChYear          = Convert.ToString(dataSet.Tables[0].Rows[0]["ChYear"]);
                        lorryHire.ChallanBranch   = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanBranch"]);
                        lorryHire.ChallanNo       = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanNo"]);
                        lorryHire.ChallanId       = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanId"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lorryHire;
        }

    }

}
