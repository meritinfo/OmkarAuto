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

namespace Consignment.Repository
{
    public class EwayBillRepository : IEwayBillRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private ISharedRepository sharedRepository;

        public EwayBillRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<EwayBillExtListModel> GetEWayBillExtList(PageRequest request)
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
                        new SqlParameter("@PageSize", request.PageSize),
                        new SqlParameter("@SortColumn", request.SortColumn),
                        new SqlParameter("@SortOrder", request.SortOrder),
                        new SqlParameter("@Search", request.Search),
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
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                Destination = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                PartyName = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                Consignor = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignor"]),
                                Consignee = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignee"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                FromPin = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPin"]),
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

                var data = new { username = ewayapiConfigurtion.ApiUserName, password = ewayapiConfigurtion.ApiPassword, client_id = ewayapiConfigurtion.ApiClient_id, client_secret = ewayapiConfigurtion.ApiClient_secret, grant_type = ewayapiConfigurtion.ApiGrantType };
                //var data = new { username = gstConfiguration.Value.Username, password = gstConfiguration.Value.Password, client_id = gstConfiguration.Value.ClientId, client_secret = gstConfiguration.Value.ClientSecret, grant_type = gstConfiguration.Value.GrantType };
                HttpResponseMessage response = client.PostAsJsonAsync("oauth/access_token", data).Result;
                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    GSTAccessTokenModel tokenModel = JsonConvert.DeserializeObject<GSTAccessTokenModel>(responseData);
                    token = tokenModel.access_token;

                    client.Dispose();
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
            return token;
        }

        /// <summary>
        /// Service method for get eway bill details
        /// </summary>
        /// <returns>EWayBillModel</returns>
        public async Task<ResponseModel> EWayBillExtend(EwayBillExtModel eWayBill)
        {
            ResponseModel res = new();
            try
            {
                EWayAPIConfigurationModel ewayapiConfigurtion = new();

                ewayapiConfigurtion = await sharedRepository.EWayAPIConfigurationDetails();

                string URL = ewayapiConfigurtion.ApiCheckGstinUrl; // "https://pro.mastersindia.co/getEwayBillData";

                string token = await GetAccessToken(ewayapiConfigurtion);

                string urlParameters = "?access_token=" + token + "&action=GetEwayBill&gstin="+ ewayapiConfigurtion.EwayBillApiGstId + "&eway_bill_number=" + eWayBill.EwayBillNo;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(urlParameters).Result;  // Blocking call! Program will wait here until a response is received or a timeout occurs.
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    int statusCode = data.results.code;
                    //if (statusCode == 200)
                    //{
                    //    root = JsonConvert.DeserializeObject<Root>(result);
                    //    eWayBill.result = root.results;
                    //}
                    //else
                    //{
                    //    eWayBill.result = new();
                    //    eWayBill.result.code = statusCode;
                    //}


                    client.Dispose();
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
            return res;
        }
    }
}
