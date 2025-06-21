using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System;
using System.Data;
using DocumentFormat.OpenXml.Office2016.Excel;
using System.Transactions;
using System.Net.Http;
using DocumentFormat.OpenXml.Office.CustomUI;
using Newtonsoft.Json.Linq;

namespace Consignment.Repository
{
    public class EwayBillRepository : IEwayBillRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private ISharedRepository sharedRepository;

        public EwayBillRepository(IOptions<DBModel> _dbconnection,
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<EwayBillExtListModel> GetEWayBillExtList(ReportRequestModel request)
        {
            EwayBillExtListModel ewayBillExt = new();
            List<EwayBillExtModel> ewayBillExtList = new();
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
                        new SqlParameter("@Search",     request.FilterStr1),
                        new SqlParameter("@LoginBranch",     request.FilterStr)
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEwayBillExtList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            ewayBillExtList.Add(new EwayBillExtModel
                            {
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                GcSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcSlNo"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                Consignor = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignor"]),
                                Consignee = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignee"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                ToPin = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPin"]),
                                AccountCity = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountCity"]),
                                CnorState = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorState"]),
                                AccountAddress1 = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress1"]),
                                AccountAddress2 = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress2"]),
                                AccountAddress3 = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountAddress3"]),
                            });
                        }

                        ewayBillExt.EwaybillextList = ewayBillExtList;

                        ewayBillExt.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                // Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return ewayBillExt;
        }
        public async Task<string> GetAccessToken(EWayAPIConfigurationModel ewayapiConfigurtion)
        {
            string token = "";
            try
            {
                string URL = "https://pro.mastersindia.co/";

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                var data = new { username = ewayapiConfigurtion.ApiUserName,
                    password = ewayapiConfigurtion.ApiPassword,
                    client_id = ewayapiConfigurtion.ApiClient_id,
                    client_secret = ewayapiConfigurtion.ApiClient_secret,
                    grant_type = ewayapiConfigurtion.ApiGrantType };
                HttpResponseMessage response = client.PostAsJsonAsync("oauth/access_token", data).Result;

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    GSTAccessTokenModel tokenModel = JsonConvert.DeserializeObject<GSTAccessTokenModel>(responseData);
                    token = tokenModel.access_token;
                    if (token==null)
                    {
                        token = "7dcc6a13e152f5e34330603d2028bb5963638ae1";
                    }
                    client.Dispose();
                }
            }
            catch (Exception ex)
            { }
            return token;
        }
        public async Task<ResponseModel> GetKmsFromApi(DropDownListModel dropDown)
        {
            ResponseModel res = new();
            try
            {
                EWayAPIConfigurationModel ewayapiConfigurtion = new();
                RequestModel request = new RequestModel();
                request.strRequest1 = "R";

                ewayapiConfigurtion = await sharedRepository.EWayAPIConfigurationDetails(request);

                string URL = "https://pro.mastersindia.co/distance";

                string token = await GetAccessToken(ewayapiConfigurtion);

                string urlParameters = "?access_token=" + token +
                    "&fromPincode="+ dropDown.DataId +
                    "&toPincode=" + dropDown.DataName;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();


                    dynamic data = JsonConvert.DeserializeObject(result);
                    int statusCode = data.results.code;
                    if (statusCode == 200)
                    {
                        res.Status = true;
                        res.Message = data.results.distance;

                    }
                    else
                    {
                        res.Status = false;
                        res.Message = data.results.status;
                    }

                    client.Dispose();
                }
                else
                {
                    res.Status = false;
                    res.Message = "Failed to fetch Kms";
                }

            }
            catch (Exception ex)
            {
                res.Status = false;
                res.Message = ex.Message;
            }
            return res;
        }
        public async Task<ResponseModel> EWayBillBulkExtend(EwayBillExtListModel extList)
        {
            ResponseModel responseModel = new();
            ResponseModel res = new();
            DropDownListModel kmsreq = new();

            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();
            try
            {
                if (dbconnection != null)
                {

                    for (int i = 0; i < extList.EwaybillextList.Count; i++)
                    {
                        kmsreq.DataId = extList.EwaybillextList[i].FromPin;
                        kmsreq.DataName = extList.EwaybillextList[i].ToPin;
                        res = await GetKmsFromApi(kmsreq);
                        if (res.Status)
                        {
                            extList.EwaybillextList[i].KMS = res.Message;
                        }
                        else
                        {
                            transaction.Rollback();
                            responseModel.Message = res.Message;
                            i = extList.EwaybillextList.Count;
                            return responseModel;
                        }
                        RequestModel req = new();
                        req.strRequest =  extList.EwaybillextList[i].FromPin;
                        res = await GetStateNameWithPin(req);
                        if (res.Status)
                        {
                            extList.EwaybillextList[i].CnorState = res.Message;
                        }
                        else
                        {
                            transaction.Rollback();
                            responseModel.Message = res.Message;
                            i = extList.EwaybillextList.Count;
                            return responseModel;
                        }

                        responseModel = await EWayExtend(transaction, extList.EwaybillextList[i]);
                        if (!responseModel.Status)
                        {
                            transaction.Rollback();
                            i = extList.EwaybillextList.Count;
                            return responseModel;
                        }
                    }
                }
                if (responseModel.Status)
                {
                    transaction.Commit();
                    responseModel.Message ="EwayBills Extended Successfully";
                }
                else { transaction.Rollback(); }

            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> EWayBillExtend(EwayBillExtModel eWayBill)
        {
            ResponseModel res = new();
            var connection = new SqlConnection(dbconnection.Value.DBConnection);
            connection.Open();
            SqlTransaction transaction;
            transaction = connection.BeginTransaction();

            try
            {
                res = await EWayExtend(transaction, eWayBill);
            }
            catch (Exception ex)
            {
                res.Status = false;
                res.Message = ex.Message;   
            }
            return res;
        }
        public async Task<ResponseModel> EWayExtend(SqlTransaction transaction,EwayBillExtModel eWayBill)
        {
            ResponseModel res = new();

            try
            {
                EWayAPIConfigurationModel ewayapiConfigurtion = new();

                RequestModel request = new RequestModel();
                request.strRequest1 = eWayBill.Rcm_Fcm;

                ewayapiConfigurtion = await sharedRepository.EWayAPIConfigurationDetails(request);

                string URL = "https://pro.mastersindia.co/";

                string token = await GetAccessToken(ewayapiConfigurtion);

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };
                EWayBillResultModel ewayresult = new();

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                var datas = new
                {
                    access_token = token,
                    userGstin = ewayapiConfigurtion.EwayBillApiGstId,
                    eway_bill_number = eWayBill.EwayBillNo,
                    vehicle_number = eWayBill.VehicleNo,
                    place_of_consignor = eWayBill.FromLocation,
                    state_of_consignor = eWayBill.CnorState,
                    remaining_distance = eWayBill.KMS,
                    // transporter_document_number= eWayBill.GcSlNo,
                    transporter_document_number = eWayBill.EwayBillNo,
                    transporter_document_date = eWayBill.BookingDate,
                    mode_of_transport = eWayBill.Mode,
                    extend_validity_reason = eWayBill.Reason,
                    extend_remarks = eWayBill.Remarks,
                    consignment_status = eWayBill.ConsignmentStatus,
                    from_pincode = eWayBill.FromPin,
                    transit_type = eWayBill.TransitType,
                    address_line1 = eWayBill.AccountAddress1,
                    address_line2 = eWayBill.AccountAddress2,
                    address_line3 = eWayBill.AccountAddress3,
                };

                HttpResponseMessage response = client.PostAsJsonAsync("ewayBillValidityExtend", datas).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    int statusCode = data.results.code;
                    if (statusCode == 200)
                    {
                        var root = JsonConvert.DeserializeObject<Root>(result);
                        ewayresult.result = root.results;
                        var msg = ewayresult.result.message;
                        SqlParameter[] param =
                        {
                            new SqlParameter("@EwaybillNo" ,        msg.ewayBillNo),
                            new SqlParameter("@NewEwaybillExpDt",   msg.validUpto),
                            new SqlParameter("@ExtReason",          eWayBill.Reason),
                            new SqlParameter("@ExtLocation",        eWayBill.FromLocation),
                            new SqlParameter("@ExtKM",              eWayBill.KMS),
                            new SqlParameter("@ExtDoneBy",          eWayBill.LoggedInUser),
                            new SqlParameter("@ExtDoneDatetime",    msg.updatedDate.ToString("yyyy-MM-dd")),
                        };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "Usp_EwayBillExtendedDetailsSave", param);

                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            res.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            res.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                            if (res.Status)
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
                            res.Status = false;
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        res.Status = false;
                        res.Message = "EwayBill Extension failed ";
                    }

                    client.Dispose();
                }
                else
                {
                    res.Status = false;
                    res.Message = "EwayBill Extension failed ";
                }
            }
            catch (Exception ex)
            {

            }
            return res;
        }
        public async Task<ResponseModel> GetCurrentLocFromApi(RequestModel request)
        {
            ResponseModel res = new();
            try
            {
                string URL = "https://api.pragatiutrack.com/api/export/vehicle_export_omkar";

                string urlParameters = "?&X-Api-Key=33F5C6118BB28EAEA6553124ECA51" +
                                        "&vehicle_number="+ request.strRequest ;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();


                    dynamic data = JsonConvert.DeserializeObject(result);
                    
                    if (data.message=="Success")
                    {
                        res.Status = true;
                        res.Message = data.data.loc;

                    }
                    else
                    {
                        res.Status = false;
                        res.Message = data.message;
                    }

                    client.Dispose();
                }
                else
                {
                    res.Status = false;
                    res.Message = "Failed to fetch Current Location";
                }

            }
            catch (Exception ex)
            {
                res.Status = false;
                res.Message = ex.Message;
            }
            return res;
        }
        public async Task<ResponseModel> GetStateNameWithPin(RequestModel req)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Pincode", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getStateNameWithPincode", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        response.Status  = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        response.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        response.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false; 
                response.Message = ex.Message;
            }
            return response;
        }


    }
}
