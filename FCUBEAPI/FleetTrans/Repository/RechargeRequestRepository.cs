using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace FleetTrans.Repository
{
    public class RechargeRequestRepository:IRechargeRequestRepository

    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public RechargeRequestRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<List<DropDownListModel>> GetFleetCardList()
        {
            List<DropDownListModel> FleetCardList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFleetCardList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            FleetCardList.Add(new DropDownListModel
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
            return FleetCardList;
        }

        public async Task<ResponseModel> RechargeRequestSave(RechargeRequestModel request)
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
                            new SqlParameter("@ReqId", request.ReqId),
                            new SqlParameter("@ReqBranch", request.ReqBranch),
                            new SqlParameter("@ReqDate", request.ReqDate),
                            new SqlParameter("@ReqCard", request.ReqCard),
                            new SqlParameter("@ReqAmt", request.ReqAmt),
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),
                            new SqlParameter("@Remarks", request.Remarks),
                            new SqlParameter("@AttachPath", request.AttachPath),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RechargeRequestSave", param);

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

        public async Task<RechargeRequestList> GetRechargeRequestList(ReportRequestModel request)
        {
            RechargeRequestList rechargeRequestLst = new();
            List<RechargeRequestModel> invoiceList = new();
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

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRechargeRequestList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            invoiceList.Add(new RechargeRequestModel
                            {
                                ReqId = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqId"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                ReqBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBranch"]),
                                ReqDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqDate"]),
                                ReqCard = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqCard"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ReqAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqAmt"]),
                                AttachPath = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachPath"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                CardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CardNo"]),
                                ApprovedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedYN"]),
                            });
                        }

                        rechargeRequestLst.RechargeRequestLst = invoiceList;

                        rechargeRequestLst.PageMetaData = new PaginationMetaData
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
            return rechargeRequestLst;
        }

        public async Task<RechargeRequestList> GetRechargeRequestApproveList(ReportRequestModel request)
        {
            RechargeRequestList rechargeRequestLst = new();
            List<RechargeRequestModel> invoiceList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BranchCode",   request.FilterStr),
                            new SqlParameter("@FromDate",     request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@CardNo",     request.FilterStr1),
                            new SqlParameter("@VehicleId",     request.FilterStr2),

                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRechargeRequestApproveList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            invoiceList.Add(new RechargeRequestModel
                            {
                                ReqId = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqId"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                ReqBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqBranch"]),
                                ReqDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqDate"]),
                                ReqCard = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqCard"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ReqAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["ReqAmt"]),
                                AttachPath = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachPath"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                CardNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CardNo"]),
                            });
                        }

                        rechargeRequestLst.RechargeRequestLst = invoiceList;

                        rechargeRequestLst.PageMetaData = new PaginationMetaData
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
            return rechargeRequestLst;
        }
        
        public async Task<ResponseModel> RechargeRequestApproveSave(RechargeRequestList recharge)
        {
            ResponseModel responseModel = new();
            BrplTransferModel transfer = new();
            RequestModel request = new RequestModel();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {                
                 for (int i = 0; i < recharge.RechargeRequestLst.Count; i++)
                 {
                     if (recharge.RechargeRequestLst[i].Selected)
                     {
                        if (recharge.RechargeRequestLst[i].ApprovedYN == "Y")
                        {
                            request.strRequest = recharge.RechargeRequestLst[i].ReqCard;
                            request.strRequest1 = recharge.RechargeRequestLst[i].ApprovedAmt;
                            transfer = await BpclAmountTransfer(request);

                            if (transfer != null)
                            {
                                recharge.RechargeRequestLst[i].CardNo = transfer.transactionId;
                                responseModel = await RechargeDetailSave(transaction, recharge.RechargeRequestLst[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = recharge.RechargeRequestLst.Count;
                                }
                            }
                        }
                        else {
                            recharge.RechargeRequestLst[i].CardNo = "";
                            responseModel = await RechargeDetailSave(transaction, recharge.RechargeRequestLst[i]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = recharge.RechargeRequestLst.Count;
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
            catch (Exception ex)
            {
                transaction.Rollback();
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }

            return responseModel;
        }
        public async Task<BrplTransferModel> BpclAmountTransfer(RequestModel request)
        {
            BrplTransferModel transfer = new();
            
            try
            {
                string URL = "https://qa.api.cep.bpcl.in/retail/v2/bpcl/smartfleet/";
                string parentToken = await sharedRepository.GetBpclAccessParentToken();

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + parentToken);
                client.DefaultRequestHeaders.Add("Cookie", "ROUTE=.api-7f4488bdbd-qgbdp");

                var data = new
                {
                    cards = new[]
                    {
                        new {
                            cardId = request.strRequest,
                            transfer = "CMS_TO_CARD_WALLET",
                            amount = request.strRequest1,
                            cardWalletBalance = 5020
                        }
                    },
                    remarks = "",
                    channel = "Web",
                    accountId = "FA3000173330"
                };

                string jsonBody = JsonConvert.SerializeObject(data);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("wallet/transfer", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    if (result.Contains("successfully transferred"))
                    {
                        transfer = JsonConvert.DeserializeObject<BrplTransferModel>(result);
                    }
                    client.Dispose();
                }
            }
            catch (Exception ex)
            {
            }
            return transfer;
        }
        public async Task<ResponseModel> GetBpclBalanceAmount(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {

                EWayAPIConfigurationModel ewayapiConfigurtion = new();

                ewayapiConfigurtion = await APIConfigurationDetails();

                string token = await GetAccessSubToken(ewayapiConfigurtion);

                string parentToken = await GetAccessParentToken(token);

                string baseUrl = "https://qa.api.cep.bpcl.in/retail/v2/bpcl/smartfleet/report/download";

                string UrlParam = "startDate=" + request.FromDate +
                                "&endDate=" + request.ToDate +
                                "&fileFormat=csv" +
                                "&isDownload=true" +
                                "&selected_Period=false" +
                                "&dateFilterType=transactionDate-desc" +
                                "&fields=cmsWalletClosingBalance" +
                                "&reportType=CONSOLIDATED" +
                                "&channel=Web" +
                                "&accountId=FA3000173330";                             


                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + parentToken);

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    if (result.Contains("Closing CMS Balance"))
                    {
                        var lines = result.Split('\n', StringSplitOptions.RemoveEmptyEntries);
                        int headerIndex = Array.FindIndex(lines, l => l.StartsWith("S.No."));
                        // First data row = next line after header
                        string firstDataRow = lines[headerIndex + 1];
                        // Split row columns
                        var columns = firstDataRow.Split(',');
                        responseModel.Status = true;
                        responseModel.Message = columns[1];
                    }
                    client.Dispose();
                }
            }
            catch (Exception ex)
            {
            }
            return responseModel;
        }

        public async Task<ResponseModel> RechargeDetailSave(SqlTransaction transaction, RechargeRequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {       
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ReqId", req.ReqId),
                            new SqlParameter("@ApprovedYN", req.ApprovedYN),
                            new SqlParameter("@AppRejRemarks", req.AppRejRemarks),
                            new SqlParameter("@ApprovedAmt", req.ApprovedAmt),
                            new SqlParameter("@TransactionId", req.CardNo),
                            new SqlParameter("@LoggedInUser", req.ApprovedBy)
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RechargeRequestApproveSave", param);

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


        public async Task<ResponseModel> RechargeRequestDelete(RequestModel requestModel)
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
                            new SqlParameter("@ReqId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_RechargeRequestDelete", param);

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
