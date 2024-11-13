
using Consignment.Models;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing;
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

namespace Consignment.Repository
{
    public class DeliveryAckPodRepository : IDeliveryAckPodRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public DeliveryAckPodRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> DeliveryAckPodSave(DeliveryAckPodModel deleveryAckPodModel)
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
                            new SqlParameter("@AckId", deleveryAckPodModel.AckId),
                            new SqlParameter("@AckBranch", deleveryAckPodModel.AckBranch),
                            new SqlParameter("@AckDate", deleveryAckPodModel.AckDate),
                            new SqlParameter("@AckSlNo", deleveryAckPodModel.AckSlNo),
                            new SqlParameter("@GcYear", deleveryAckPodModel.GcYear),
                            new SqlParameter("@GcBook", deleveryAckPodModel.GcBook),
                            new SqlParameter("@GcNoteNo", deleveryAckPodModel.GcNoteNo),
                            new SqlParameter("@ConsignmentId", deleveryAckPodModel.ConsignmentId),
                            new SqlParameter("@CnPkgs", deleveryAckPodModel.CnPkgs),
                            new SqlParameter("@CnActWt", deleveryAckPodModel.CnActWt),
                            new SqlParameter("@DelPkgs", deleveryAckPodModel.DelPkgs),
                            new SqlParameter("@DelActWt", deleveryAckPodModel.DelActWt),
                            new SqlParameter("@ShExPkgs", deleveryAckPodModel.ShExPkgs),
                            new SqlParameter("@ShExpActWt", deleveryAckPodModel.ShExpActWt),
                            new SqlParameter("@ExpectedRptdate", deleveryAckPodModel.ExpectedRptdate + " " + deleveryAckPodModel.ExpectedRptTime ),
                            new SqlParameter("@ReportingDate", deleveryAckPodModel.ReportingDate+ " " + deleveryAckPodModel.ReportingTime ),
                            new SqlParameter("@DelayDays", deleveryAckPodModel.LoggedInUser),
                            new SqlParameter("@DeliveryDate", deleveryAckPodModel.DeliveryDate + " " + deleveryAckPodModel.DeliveryTime),
                            new SqlParameter("@DetnDays", deleveryAckPodModel.DetnDays),
                            new SqlParameter("@PodRecdYN", deleveryAckPodModel.PodRecdYN),
                            new SqlParameter("@PodRecdDate", deleveryAckPodModel.PodRecdDate),
                            new SqlParameter("@PodAttach1", deleveryAckPodModel.PodAttach1),
                            new SqlParameter("@PodAttach2", deleveryAckPodModel.PodAttach2),
                            new SqlParameter("@BalancePayable", deleveryAckPodModel.BalancePayable),
                            new SqlParameter("@HandlingPayable", deleveryAckPodModel.HandlingPayable),
                            new SqlParameter("@DetiontionPayable", deleveryAckPodModel.DetiontionPayable),
                            new SqlParameter("@Others1Payable", deleveryAckPodModel.Others1Payable),
                            new SqlParameter("@Others2Payable", deleveryAckPodModel.Others2Payable),
                            new SqlParameter("@TotExtPayable", deleveryAckPodModel.TotExtPayable),
                            new SqlParameter("@ShortageDesc", deleveryAckPodModel.ShortageDesc),
                            new SqlParameter("@DamageDesc", deleveryAckPodModel.DamageDesc),
                            new SqlParameter("@ShortageClaim", deleveryAckPodModel.ShortageClaim),
                            new SqlParameter("@DamageClaim", deleveryAckPodModel.DamageClaim),
                            new SqlParameter("@LateRptDed", deleveryAckPodModel.LateRptDed),
                            new SqlParameter("@LatePodDed", deleveryAckPodModel.LatePodDed),
                            new SqlParameter("@OthDed", deleveryAckPodModel.OthDed),
                            new SqlParameter("@NetPayable", deleveryAckPodModel.NetPayable),
                            new SqlParameter("@YearId", deleveryAckPodModel.YearId),
                            new SqlParameter("@LoggedInUser", deleveryAckPodModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DeliveryAckPodSave", param);

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
        public async Task<DeliveryAckListModel> GetDeliveryAckPodList(ReportRequestModel request)
        {
            DeliveryAckListModel deleveryAckListModel = new();
            List<DeliveryAckPodModel> ackList = new();
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
                            new SqlParameter("@ToDate", request.ToDate),
                             new SqlParameter("@Loginbranch", request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeliveryAckPodList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ackList.Add(new DeliveryAckPodModel
                            {
                                AckId = Convert.ToString(dataSet.Tables[0].Rows[i]["AckId"]),
                                AckBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["AckBranch"]),
                                AckBr = Convert.ToString(dataSet.Tables[0].Rows[i]["AckBr"]),
                                AckDate = Convert.ToString(dataSet.Tables[0].Rows[i]["AckDate"]),
                                AckSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AckSlNo"]),
                                GcYear = Convert.ToString(dataSet.Tables[0].Rows[i]["GcYear"]),
                                GcDate = Convert.ToString(dataSet.Tables[0].Rows[i]["GcDate"]),
                                GcBook = Convert.ToString(dataSet.Tables[0].Rows[i]["GcBook"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentId"]),
                                GcFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentId"]),
                                GcTo = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentId"]),
                                Consignor = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignor"]),
                                Consignee = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignee"]),
                                Party = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                CnPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["CnPkgs"]),
                                CnActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["CnActWt"]),
                                DelPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["DelPkgs"]),
                                DelActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["DelActWt"]),
                                ShExPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["ShExPkgs"]),
                                ShExpActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ShExpActWt"]),
                                ExpectedRptdate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedRptdate"]),
                                ExpectedRptTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedRptTime"]),
                                ReportingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ReportingDate"]),
                                ReportingTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ReportingTime"]),
                                DelayDays = Convert.ToString(dataSet.Tables[0].Rows[i]["DelayDays"]),
                                DeliveryDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryDate"]),
                                DeliveryTime = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryTime"]),
                                DetnDays = Convert.ToString(dataSet.Tables[0].Rows[i]["DetnDays"]),
                                PodRecdYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PodRecdYN"]),
                                PodRecdDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PodRecdDate"]),
                                PodAttach1 = Convert.ToString(dataSet.Tables[0].Rows[i]["PodAttach1"]),
                                PodAttach2 = Convert.ToString(dataSet.Tables[0].Rows[i]["PodAttach2"]),
                                BalancePayable = Convert.ToString(dataSet.Tables[0].Rows[i]["BalancePayable"]),
                                HandlingPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingPayable"]),
                                DetiontionPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["DetiontionPayable"]),
                                Others1Payable = Convert.ToString(dataSet.Tables[0].Rows[i]["Others1Payable"]),
                                Others2Payable = Convert.ToString(dataSet.Tables[0].Rows[i]["Others2Payable"]),
                                TotExtPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["TotExtPayable"]),
                                ShortageDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["ShortageDesc"]),
                                DamageDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["DamageDesc"]),
                                ShortageClaim = Convert.ToString(dataSet.Tables[0].Rows[i]["ShortageClaim"]),
                                DamageClaim = Convert.ToString(dataSet.Tables[0].Rows[i]["DamageClaim"]),
                                LateRptDed = Convert.ToString(dataSet.Tables[0].Rows[i]["LateRptDed"]),
                                LatePodDed = Convert.ToString(dataSet.Tables[0].Rows[i]["LatePodDed"]),
                                NetPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPayable"]),
                            });
                        }

                        deleveryAckListModel.AckList = ackList;

                        deleveryAckListModel.PageMetaData = new PaginationMetaData
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
            return deleveryAckListModel;
        }

        public async Task<DeliveryAckPodModel> GetDeliveryCnDetails(RequestModel request)
        {
            DeliveryAckPodModel deleveryAck = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@GCNoteNo", request.strRequest)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeliveryCnDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        deleveryAck.GcYear = Convert.ToString(dataSet.Tables[0].Rows[0]["GcYear"]);
                        deleveryAck.GcDate = Convert.ToString(dataSet.Tables[0].Rows[0]["GcDate"]);
                        deleveryAck.GcBook = Convert.ToString(dataSet.Tables[0].Rows[0]["GcBook"]);
                        deleveryAck.GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]);
                        deleveryAck.ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]);
                        deleveryAck.GcFrom = Convert.ToString(dataSet.Tables[0].Rows[0]["GcFrom"]);
                        deleveryAck.GcTo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcTo"]);
                        deleveryAck.Consignor = Convert.ToString(dataSet.Tables[0].Rows[0]["Consignor"]);
                        deleveryAck.Consignee = Convert.ToString(dataSet.Tables[0].Rows[0]["Consignee"]);
                        deleveryAck.Party = Convert.ToString(dataSet.Tables[0].Rows[0]["Party"]);
                        deleveryAck.CnPkgs = Convert.ToString(dataSet.Tables[0].Rows[0]["CnPkgs"]);
                        deleveryAck.CnActWt = Convert.ToString(dataSet.Tables[0].Rows[0]["CnActWt"]);
                        deleveryAck.ExpectedRptdate = Convert.ToString(dataSet.Tables[0].Rows[0]["ExpectedRptdate"]);
                        deleveryAck.ExpectedRptTime = Convert.ToString(dataSet.Tables[0].Rows[0]["ExpectedRptTime"]);
                        deleveryAck.BalancePayable = Convert.ToString(dataSet.Tables[0].Rows[0]["BalancePayable"]);
                        deleveryAck.HandlingPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["HandlingPayable"]);
                        deleveryAck.DetiontionPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["DetiontionPayable"]);
                        deleveryAck.Others1Payable = Convert.ToString(dataSet.Tables[0].Rows[0]["Others1Payable"]);
                        deleveryAck.Others2Payable = Convert.ToString(dataSet.Tables[0].Rows[0]["Others2Payable"]);
                        deleveryAck.TotExtPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["TotExtPayable"]);
                        deleveryAck.NetPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["NetPayable"]);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return deleveryAck;
        }

        public async Task<ResponseModel> DeliveryAckPodDelete(RequestModel requestModel)
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
                            new SqlParameter("@AckId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DeliveryAckPodDelete", param);

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

        public async Task<ResponseModel> GetAckSlNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@YearID", requestModel.strRequest1),
                            
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeliveryAckPodSlNo", param);

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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> CheckDeliveryAckDoneForLrNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@GcNoteNo", requestModel.strRequest),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDeliveryAckDoneForLrNo", param);

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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

    }

}

