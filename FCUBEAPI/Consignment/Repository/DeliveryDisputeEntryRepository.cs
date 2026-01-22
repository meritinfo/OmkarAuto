using Consignment.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace Consignment.Repository
{
    public class DeliveryDisputeEntryRepository: IDeliveryDisputeEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DeliveryDisputeEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> DeliveryDisputeEntrySave(DeliveryDisputeEntryModel deliveryDisputeEntryModel)
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
                             new SqlParameter("@DisputeId" , deliveryDisputeEntryModel.DisputeId ),
                             new SqlParameter("@DispBranch" , deliveryDisputeEntryModel.DispBranch  ),
                             new SqlParameter("@DispDate" , deliveryDisputeEntryModel.DispDate ),
                              new SqlParameter("@DispSlNo" , deliveryDisputeEntryModel.DispSlNo ),
                                new SqlParameter("@GcYear" , deliveryDisputeEntryModel.GcYear  ),
                                new SqlParameter("@GcBook" , deliveryDisputeEntryModel.GcBook  ),
                                  new SqlParameter("@GcNoteNo" , deliveryDisputeEntryModel.GcNoteNo   ),
                                      new SqlParameter("@ConsignmentId" , deliveryDisputeEntryModel.ConsignmentId    ),
                                         new SqlParameter("@YearId" , deliveryDisputeEntryModel.YearId     ),
                                          new SqlParameter("@DisputeStatus" , deliveryDisputeEntryModel.DisputeStatus),
                                          new SqlParameter("@DisputeRemarks" , deliveryDisputeEntryModel.DisputeRemarks),
                                           new SqlParameter("@DispAttach" , deliveryDisputeEntryModel.DispAttach ),

                             new SqlParameter("@LoggedInUser" , deliveryDisputeEntryModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DeliveryDisputeEntrySave", param);

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
        public async Task<DeliveryDisputeEntryList> GetDeliveryDisputeEntryList(ReportRequestModel request)
        {
            DeliveryDisputeEntryList disputeEntryList = new();
            List<DeliveryDisputeEntryModel> disputeList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DeliveryDisputeEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            disputeList.Add(new DeliveryDisputeEntryModel
                            {
                                DisputeId = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeId"]),
                                DispBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["DispBranch"]),
                                DispDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DispDate"]),
                                DispSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DispSlNo"]),
                                GcYear = Convert.ToString(dataSet.Tables[0].Rows[i]["GcYear"]),
                                GcBook = Convert.ToString(dataSet.Tables[0].Rows[i]["GcBook"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentId"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                DisputeStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeStatus"]),
                                DisputeRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeRemarks"]),
                                DispAttach = Convert.ToString(dataSet.Tables[0].Rows[i]["DispAttach"]),
                                brname = Convert.ToString(dataSet.Tables[0].Rows[i]["brname"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),


                                ////new added
                                //GcFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["GcFrom"]),
                                //GcTo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcTo"]),
                                //Consignor = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignor"]),
                                //Consignee = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignee"]),
                                //Party = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                //CnPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["CnPkgs"]),
                                //CnActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["CnActWt"]),
                                //DelPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["DelPkgs"]),
                                //DelActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["DelActWt"]),
                                //ShExPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["ShExPkgs"]),
                                //ShExpActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ShExpActWt"]),
                                //ExpectedRptdate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedRptdate"]),
                                //ExpectedRptTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpectedRptTime"]),
                                //ReportingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ReportingDate"]),
                                //ReportingTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ReportingTime"]),
                                //DelayDays = Convert.ToString(dataSet.Tables[0].Rows[i]["DelayDays"]),
                                //DeliveryDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryDate"]),
                                //DeliveryTime = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryTime"]),
                                //DetnDays = Convert.ToString(dataSet.Tables[0].Rows[i]["DetnDays"]),
                                //PodRecdYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PodRecdYN"]),
                                //PodRecdDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PodRecdDate"]),
                                //PodAttach1 = Convert.ToString(dataSet.Tables[0].Rows[i]["PodAttach1"]),
                                //PodAttach2 = Convert.ToString(dataSet.Tables[0].Rows[i]["PodAttach2"]),
                                //BalancePayable = Convert.ToString(dataSet.Tables[0].Rows[i]["BalancePayable"]),
                                //HandlingPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingPayable"]),
                                //DetiontionPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["DetiontionPayable"]),
                                //Others1Payable = Convert.ToString(dataSet.Tables[0].Rows[i]["Others1Payable"]),
                                //Others2Payable = Convert.ToString(dataSet.Tables[0].Rows[i]["Others2Payable"]),
                                //TotExtPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["TotExtPayable"]),
                                //DeliveryStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryStatus"]),
                                //ShortageDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["ShortageDesc"]),
                                //DamageDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["DamageDesc"]),
                                //ShortageClaim = Convert.ToString(dataSet.Tables[0].Rows[i]["ShortageClaim"]),
                                //DamageClaim = Convert.ToString(dataSet.Tables[0].Rows[i]["DamageClaim"]),
                                //LateRptDed = Convert.ToString(dataSet.Tables[0].Rows[i]["LateRptDed"]),
                                //LatePodDed = Convert.ToString(dataSet.Tables[0].Rows[i]["LatePodDed"]),
                                //NetPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPayable"]),
                                //Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),


                                // ToLocationType = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLocationType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // ProductType = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductType"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        disputeEntryList.DisputeList = disputeList;

                        disputeEntryList.PageMetaData = new PaginationMetaData
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
            return disputeEntryList;
        }
        public async Task<DeliveryDisputeEntryModel> GetDeliveryCnDetailsForDispute(RequestModel request)
        {
            DeliveryDisputeEntryModel deleveryAck = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@GCNoteNo", request.strRequest),
                            new SqlParameter("@Branch", request.strRequest1),
                           // new SqlParameter("@Year", request.strRequest2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeliveryCnDetailsForDispute", param);

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
                        //deleveryAck.ExpectedRptdate = Convert.ToString(dataSet.Tables[0].Rows[0]["ExpectedRptdate"]);
                        //deleveryAck.ExpectedRptTime = Convert.ToString(dataSet.Tables[0].Rows[0]["ExpectedRptTime"]);
                        //deleveryAck.ReportingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["ReportingDate"]);
                        //deleveryAck.ReportingTime = Convert.ToString(dataSet.Tables[0].Rows[0]["ReportingTime"]);
                        //deleveryAck.DeliveryDate = Convert.ToString(dataSet.Tables[0].Rows[0]["DeliveryDate"]);
                        //deleveryAck.DeliveryTime = Convert.ToString(dataSet.Tables[0].Rows[0]["DeliveryTime"]);
                        //deleveryAck.DetnDays = Convert.ToString(dataSet.Tables[0].Rows[0]["DetnDays"]);
                        //deleveryAck.BookingFrt = Convert.ToString(dataSet.Tables[0].Rows[0]["FreightRs"]);
                        deleveryAck.ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanNo"]);
                        //deleveryAck.BalancePayable = Convert.ToString(dataSet.Tables[0].Rows[0]["BalancePayable"]);
                        //deleveryAck.HandlingPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["HandlingPayable"]);
                        //deleveryAck.DetiontionPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["DetiontionPayable"]);
                        //deleveryAck.Others1Payable = Convert.ToString(dataSet.Tables[0].Rows[0]["Others1Payable"]);
                        //deleveryAck.Others2Payable = Convert.ToString(dataSet.Tables[0].Rows[0]["Others2Payable"]);
                        //deleveryAck.TotExtPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["TotExtPayable"]);
                        //deleveryAck.NetPayable = Convert.ToString(dataSet.Tables[0].Rows[0]["NetPayable"]);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return deleveryAck;
        }
        public async Task<ResponseModel> GetDispSlNo(RequestModel requestModel)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDeliveryDisputeEntryDispSlNo", param);

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
        public async Task<ResponseModel> CheckDuplicateLRForDispute(RequestModel requestModel)
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
                              new SqlParameter("@GcNoteNo ", requestModel.strRequest),
                            new SqlParameter("@Branch", requestModel.strRequest1),
                          
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CheckDeliveryDisputeDoneForLrNo", param);

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

        public async Task<ResponseModel> DeliveryDisputeEntryDelete(RequestModel requestModel)
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
                            new SqlParameter("@DisputeId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DeliveryDisputeEntryDelete", param);

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
