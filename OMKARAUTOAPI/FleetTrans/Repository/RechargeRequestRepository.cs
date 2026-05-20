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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BpclRechargeRequestSave", param);

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

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBpclRechargeRequestList", param);

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

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBpclRechargeRequestApproveList", param);

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
                            request.strRequest = recharge.RechargeRequestLst[i].CardNo;
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
            RequestModel requestModel = new RequestModel();

            try
            {
                string URL = "https://api.cep.bpcl.in/retail/v2/bpcl/smartfleet/";
                requestModel = await sharedRepository.GetBpclAccessParentToken();

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + requestModel.strRequest);
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
                    accountId = requestModel.strRequest1
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
            RequestModel requestModel = new RequestModel();
            try
            {

                EWayAPIConfigurationModel ewayapiConfigurtion = new();

                requestModel = await sharedRepository.GetBpclAccessParentToken();

                string baseUrl = "https://api.cep.bpcl.in/retail/v2/bpcl/smartfleet/report/download";

                string UrlParam = "?startDate=" + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy") +
                                "&endDate=" + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy") +
                                "&fileFormat=csv" +
                                "&isDownload=true" +
                                "&selected_Period=false" +
                                "&dateFilterType=transactionDate-desc" +
                                "&fields=cmsWalletClosingBalance" +
                                "&reportType=CONSOLIDATED" +
                                "&channel=Web" +
                                "&accountId="+ requestModel.strRequest1;     

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + requestModel.strRequest);

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

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BpclRechargeRequestApproveSave", param);

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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BpclRechargeRequestDelete", param);

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
        public async Task<ResponseModel> GetVehiBpclCardDetails(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleNo", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBpclCardDetails", param);

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
        public async Task<ResponseModel> GetBpclCardBalAmount(RequestModel request)
        {
            ResponseModel responseModel = new();
            BpclCardBalResponse balance = new();
            RequestModel requestModel = new RequestModel();
            try
            {

                EWayAPIConfigurationModel ewayapiConfigurtion = new();

                requestModel = await sharedRepository.GetBpclAccessParentToken();

                string baseUrl = "https://api.cep.bpcl.in/retail/v2/bpcl/smartfleet/register/searchFleetCards";

                string UrlParam = "?q=" + request.strRequest +
                                "&program=smartfleet" +
                                "&channel=Web" +
                                "&accountId="+ requestModel.strRequest1;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + requestModel.strRequest);

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    if (result.Contains(request.strRequest1))
                    {
                        balance = JsonConvert.DeserializeObject<BpclCardBalResponse>(result);
                        for (int i = 0; i < balance.fleetCards.Count; i++) {
                            if (balance.fleetCards[i].fleetCardId == request.strRequest1)
                            {
                                responseModel.Message=Convert.ToString(balance.fleetCards[i].cardWalletBalance);
                                responseModel.Status=true;
                                break;
                            }
                        }
                        
                    }
                    client.Dispose();
                }
            }
            catch (Exception ex)
            {
            }
            return responseModel;
        }
        public async Task<ResponseModel> FleetCardReturnTransferSave(FleetCardReturnTransferModel fleetCardReturn)
        {
            ResponseModel responseModel = new();
            RequestModel request = new RequestModel();
            BrplTransferModel transfer = new();
            try
            {
                request.strRequest = fleetCardReturn.CardNo;
                request.strRequest1 = fleetCardReturn.ReturnAmt;
                transfer = await BpclAmountTransferToWallet(request);

                if (transfer != null)
                {
                    fleetCardReturn.TransactionId = transfer.transactionId;
                    responseModel = await CardAmtReturnTransferSave(fleetCardReturn);                   
                }
                else
                {
                    responseModel.Status = false;
                    responseModel.Message = "Transfer Failed";
                }
            }
            catch (Exception ex)
            {

                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }

        public async Task<ResponseModel> CardAmtReturnTransferSave(FleetCardReturnTransferModel request)
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
                            new SqlParameter("@ReturnId", request.ReturnId),
                            new SqlParameter("@ReturnBranch", request.ReturnBranch),
                            new SqlParameter("@ReturnDate", request.ReturnDate),
                            new SqlParameter("@FleetCard", request.FleetCard),
                            new SqlParameter("@ReturnAmt", request.ReturnAmt),
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),
                            new SqlParameter("@Remarks", request.Remarks),
                            new SqlParameter("@TransactionId", request.TransactionId),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BpclReturnTransferSave", param);

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
        public async Task<BrplTransferModel> BpclAmountTransferToWallet(RequestModel request)
        {
            BrplTransferModel transfer = new();
            RequestModel requestModel = new RequestModel();
            try
            {
                string URL = "https://api.cep.bpcl.in/retail/v2/bpcl/smartfleet/";
                requestModel = await sharedRepository.GetBpclAccessParentToken();

                using HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", requestModel.strRequest);

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                var data = new
                {
                    cards = new[]
                    {
                        new {
                            cardId = request.strRequest,
                            transfer = "CARD_WALLET_TO_CMS",
                            amount = request.strRequest1,
                            cardWalletBalance = 5020
                        }
                    },
                    remarks = "",
                    channel = "Web",
                    accountId = requestModel.strRequest1
                };

                string jsonBody = JsonConvert.SerializeObject(data);
                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync("wallet/transfer", content);

                var result = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    if (result.Contains("successfully transferred"))
                    {
                        transfer = JsonConvert.DeserializeObject<BrplTransferModel>(result);
                    }
                }
                else
                {
                    // Log full error for debugging
                    Console.WriteLine(result);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            //try
            //{
            //    string URL = "https://api.cep.bpcl.in/retail/v2/bpcl/smartfleet/";
            //    requestModel = await sharedRepository.GetBpclAccessParentToken();

            //    HttpClient client = new()
            //    {
            //        BaseAddress = new Uri(URL)
            //    };

            //    client.DefaultRequestHeaders.Add("Authorization", "Bearer " + requestModel.strRequest);
            //    client.DefaultRequestHeaders.Add("Cookie", "ROUTE=.api-7f4488bdbd-qgbdp");

            //    var data = new
            //    {
            //        cards = new[]
            //        {
            //            new {
            //                cardId = request.strRequest,
            //                transfer = "CARD_WALLET_TO_CMS",
            //                amount = request.strRequest1,
            //                cardWalletBalance = 5020
            //            }
            //        },
            //        remarks = "",
            //        channel = "Web",
            //        accountId = requestModel.strRequest1
            //    };

            //    string jsonBody = JsonConvert.SerializeObject(data);

            //    var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            //    HttpResponseMessage response = client.PostAsync("wallet/transfer", content).Result;

            //    if (response.IsSuccessStatusCode)
            //    {
            //        var result = await response.Content.ReadAsStringAsync();
            //        if (result.Contains("successfully transferred"))
            //        {
            //            transfer = JsonConvert.DeserializeObject<BrplTransferModel>(result);
            //        }
            //        client.Dispose();
            //    }
            //}
            //catch (Exception ex)
            //{
            //}
            return transfer;
        }

        public async Task<FleetCardReturnTransferList> GetFleetCardReturnTransferList(ReportRequestModel request)
        {
            FleetCardReturnTransferList fleetCardReturnTransferList = new();
            List<FleetCardReturnTransferModel> fleetCardReturnTransferModel = new();
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

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBpclReturnTransferList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            fleetCardReturnTransferModel.Add(new FleetCardReturnTransferModel
                            {
                                ReturnId        = Convert.ToString(dataSet.Tables[0].Rows[i]["ReturnId"]),
                                ReturnBranch    = Convert.ToString(dataSet.Tables[0].Rows[i]["ReturnBranch"]),
                                ReturnDate      = Convert.ToString(dataSet.Tables[0].Rows[i]["ReturnDate"]),
                                FleetCard       = Convert.ToString(dataSet.Tables[0].Rows[i]["FleetCard"]),
                                CardNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["CardNo"]),
                                ReturnAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["ReturnAmt"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        fleetCardReturnTransferList.FleetCardReturnTransferLst = fleetCardReturnTransferModel;

                        fleetCardReturnTransferList.PageMetaData = new PaginationMetaData
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
            return fleetCardReturnTransferList;
        }
    }
}
