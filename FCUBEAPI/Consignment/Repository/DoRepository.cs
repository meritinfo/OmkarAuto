using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Net.NetworkInformation;

namespace Consignment.Repository
{
    public class DoRepository : IDoRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DoRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<DoListModel> GetDoList(ReportRequestModel request)
        {
            DoListModel dprMasterList = new();
            List<DoModel> dos = new();
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
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",request.FilterStr2),
                            new SqlParameter("@LoginBranch",request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDoEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dos.Add(new DoModel
                            {
                                DoId            = Convert.ToString(dataSet.Tables[0].Rows[i]["DoId"]),
                                DoBranch        = Convert.ToString(dataSet.Tables[0].Rows[i]["DoBranch"]),
                                DoNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["DoNo"]),
                                DoDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["DoDate"]),
                                DoParty         = Convert.ToString(dataSet.Tables[0].Rows[i]["DoParty"]),
                                PartyDoNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyDoNo"]),
                                LoadingFrom     = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFrom"]),
                                ConsignorId     = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignorId"]),
                                Destination     = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                ConsigneeId     = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsigneeId"]),
                                ProductId       = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductId"]),
                                MaterialDesc    = Convert.ToString(dataSet.Tables[0].Rows[i]["MaterialDesc"]),
                                DoQty           = Convert.ToString(dataSet.Tables[0].Rows[i]["DoQty"]),
                                DoRemarks       = Convert.ToString(dataSet.Tables[0].Rows[i]["DoRemarks"]),
                                DoQtyLift       = Convert.ToString(dataSet.Tables[0].Rows[i]["DoQtyLift"]),
                                DoQtySettle     = Convert.ToString(dataSet.Tables[0].Rows[i]["DoQtySettle"]),
                                DoStatus        = Convert.ToString(dataSet.Tables[0].Rows[i]["DoStatus"]),
                                DoBr            = Convert.ToString(dataSet.Tables[0].Rows[i]["DoBr"]),
                                LoadingFr       = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFr"]),
                                Dest            = Convert.ToString(dataSet.Tables[0].Rows[i]["Dest"]),
                                PartyName       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                CnorName        = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorName"]),
                                CneeName        = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeName"]),
                                CreatedBy       = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate     = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy      = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate    = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });

                            dprMasterList.DoList = dos;

                            dprMasterList.PageMetaData = new PaginationMetaData
                            {
                                TotalCount = totalRecords,
                                CurrentPage = request.PageNumber
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return dprMasterList;
        }
        public async Task<ResponseModel> DoSave(DoModel dprModel)
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
                            new SqlParameter("@DoId",               dprModel.DoId),
                            new SqlParameter("@DoBranch",           dprModel.DoBranch),
                            new SqlParameter("@DoDate",             dprModel.DoDate),
                            new SqlParameter("@DoParty",            dprModel.DoParty),
                            new SqlParameter("@PartyDoNo",          dprModel.PartyDoNo),
                            new SqlParameter("@LoadingFrom",        dprModel.LoadingFrom),
                            new SqlParameter("@ConsignorId",        dprModel.ConsignorId),
                            new SqlParameter("@Destination",        dprModel.Destination),
                            new SqlParameter("@ConsigneeId",        dprModel.ConsigneeId),
                            new SqlParameter("@ProductId",          dprModel.ProductId),
                            new SqlParameter("@MaterialDesc",       dprModel.MaterialDesc),
                            new SqlParameter("@DoQty",              dprModel.DoQty),
                            new SqlParameter("@DoRemarks",          dprModel.DoRemarks),
                            new SqlParameter("@LoggedInUser",       dprModel.LoggedInUserID)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoEntrySave", param);
                    
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        
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
        public async Task<ResponseModel> DoDelete(RequestModel requestModel)
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
                            new SqlParameter("@DoId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoEntryDelete", param);

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

        public async Task<DoModel> GetDoVehiDetails(RequestModel request)
        {
            DoModel dos = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DoId", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDoVehiDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {

                            dos.DoId            = Convert.ToString(dataSet.Tables[0].Rows[i]["DoId"]);
                            dos.DoBranch        = Convert.ToString(dataSet.Tables[0].Rows[i]["DoBranch"]);
                            dos.DoDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["DoDate"]);
                            dos.PartyDoNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyDoNo"]);
                            dos.DoQty           = Convert.ToString(dataSet.Tables[0].Rows[i]["DoQty"]);
                            dos.DoRemarks       = Convert.ToString(dataSet.Tables[0].Rows[i]["DoRemarks"]);
                            dos.DoQtyLift       = Convert.ToString(dataSet.Tables[0].Rows[i]["DoQtyLift"]);
                            dos.LoadingFr       = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFr"]);
                            dos.Dest            = Convert.ToString(dataSet.Tables[0].Rows[i]["Dest"]);
                            dos.PartyName       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]);
                            dos.CnorName        = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorName"]);
                            dos.CneeName        = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeName"]);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dos;
        }

    }

}
