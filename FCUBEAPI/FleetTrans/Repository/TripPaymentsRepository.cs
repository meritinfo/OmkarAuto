using Consignment.Models;
using DocumentFormat.OpenXml.Drawing;
using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System.Data;
using System.Data.SqlClient;

using System.Net.Http.Headers;
using System.Text;

namespace FleetTrans.Repository
{
    public class TripPaymentsRepository : ITripPaymentsRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;
        public TripPaymentsRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<ResponseModel> TripPaymentsSave(TripPaymentsModel tripPaymentsModel)
        {
            ResponseModel responseModel = new();
            RequestModel request = new();

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
                            new SqlParameter("@PmtId", tripPaymentsModel.PmtId),
                            new SqlParameter("@PmtBranch", tripPaymentsModel.PmtBranch),
                            new SqlParameter("@PmtDate", tripPaymentsModel.PmtDate),
                            new SqlParameter("@PaidToDesc", tripPaymentsModel.PaidToDesc),                            
                            new SqlParameter("@VehicleMasterID", tripPaymentsModel.VehicleMasterID),
                            new SqlParameter("@TransType", tripPaymentsModel.TransType),
                            new SqlParameter("@AmountPaid", tripPaymentsModel.AmountPaid),
                            new SqlParameter("@Remarks", tripPaymentsModel.Remarks),
                            new SqlParameter("@VendorRefNo", tripPaymentsModel.VendorRefNo),
                            new SqlParameter("@PmtType", tripPaymentsModel.PmtType),
                            new SqlParameter("@NeftPmt", tripPaymentsModel.NeftPmt),
                            new SqlParameter("@CreditAc", tripPaymentsModel.CreditAc),
                            new SqlParameter("@ChequeNo", tripPaymentsModel.ChequeNo),
                            new SqlParameter("@ChequeDate", tripPaymentsModel.ChequeDate),
                            new SqlParameter("@QtyLtrs", tripPaymentsModel.QtyLtrs),
                            new SqlParameter("@RatePerLtr", tripPaymentsModel.RatePerLtr),
                            new SqlParameter("@WithLRYN", tripPaymentsModel.WithLRYN),
                            new SqlParameter("@ConsignmentId", tripPaymentsModel.ConsignmentId),
                            new SqlParameter("@Kmr", tripPaymentsModel.Kmr),
                            new SqlParameter("@Attachment1", tripPaymentsModel.Attachment1),
                            new SqlParameter("@Attachment2", tripPaymentsModel.Attachment2),
                            new SqlParameter("@YearId", tripPaymentsModel.YearId),
                            new SqlParameter("@DriverMasterID", tripPaymentsModel.DriverMasterID),
                            new SqlParameter("@LoggedInUser", tripPaymentsModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripPaymentsSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status) {                            
                            transaction.Commit();
                            responseModel.Message = "Saved Successfully";

                            if (tripPaymentsModel.PmtType == "T")
                            {
                                tripPaymentsModel.PmtId = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                                request.strRequest = "TPMT" + tripPaymentsModel.PmtId;
                                request.strRequest1 = tripPaymentsModel.AmountPaid;
                                request.strRequest2 = tripPaymentsModel.BankAc;
                                request.strRequest3 = tripPaymentsModel.Ifsc;
                                request.strRequest4 = tripPaymentsModel.Bname;
                                request.strRequest5 = tripPaymentsModel.DriverMasterID;
                                request.strRequest6 = tripPaymentsModel.VehicleMasterID;

                                responseModel = await MpayPaymentCreate(request);
                                if (responseModel.Status)
                                {
                                    request.strRequest7 = "S";
                                    responseModel = await MpayApiDetailsSave(request);
                                }
                                else {
                                    request.strRequest7 = "F";
                                    responseModel = await MpayApiDetailsSave(request);
                                    responseModel = await TripPaymentsDelete(request);
                                    if (responseModel.Status)
                                    {
                                        responseModel.Status = false;
                                        responseModel.Message = "Payment Not Created";
                                    }
                                }
                            }
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
        public async Task<ResponseModel> MpayPaymentCreate(RequestModel request)
        {
            ResponseModel res = new();
            EWayAPIConfigurationModel eway = new EWayAPIConfigurationModel();

            try
            {
                eway = await sharedRepository.MpayConfigurationDetails();

                string URL = eway.ApiCheckGstinUrl;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Add("Authorization", eway.ApiPassword);

                var data = new
                {
                    clientPaymentId = request.strRequest,
                    amount = request.strRequest1,
                    paymentInstrument = new 
                    {
                        bankAccountNumber = request.strRequest2,
                        bankIfscCode = request.strRequest3,
                    },
                    vendor = new
                    {
                        name = request.strRequest4,
                    },
                };

                string jsonBody = JsonConvert.SerializeObject(data);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("payment/create", content).Result;



                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    if (result.Contains("success"))
                    {
                        res.Status = true;
                        res.Message = "Payement Created";
                    }
                    else if (result.Contains("error") && result.Contains("clientPaymentId already exists"))
                    {
                        res.Status = false;
                        res.Message = "ClientPaymentId already exists";
                    }
                    else if (result.Contains("error") && result.Contains("failed"))
                    {
                        res.Status = false;
                        res.Message = "failed, Please Try again";
                    }
                    else
                    {
                        res = await CheckMpayPaymentCreated(request);
                    }
                    client.Dispose();
                }
                else
                {
                    res = await CheckMpayPaymentCreated(request);
                }
            }
            catch (Exception ex)
            {
            }
            return res;
        }
        public async Task<ResponseModel> CheckMpayPaymentCreated(RequestModel request)
        {
            ResponseModel res = new();
            EWayAPIConfigurationModel eway = new EWayAPIConfigurationModel();

            try
            {
                eway = await sharedRepository.MpayConfigurationDetails();

                string URL = eway.ApiCheckGstinUrl;

                HttpClient client = new()
                {
                    BaseAddress = new Uri(URL)
                };

                client.DefaultRequestHeaders.Add("Authorization", eway.ApiPassword);

                var data = new
                {
                    clientPaymentId = request.strRequest,
                };

                string jsonBody = JsonConvert.SerializeObject(data);

                var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                HttpResponseMessage response = client.PostAsync("payment/get", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    if (result.Contains("success"))
                    {
                        res.Status = true;
                        res.Message = "Payement Created";
                    }
                    else
                    {
                        res.Status = false;
                        res.Message = "failed, Please Try again";
                    }
                    client.Dispose();
                }
                else
                {

                }
            }
            catch (Exception ex)
            {
            }
            return res;
        }
        public async Task<ResponseModel> MpayApiDetailsSave(RequestModel request)
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

                            new SqlParameter("@ClientPaymentId", request.strRequest),
                            new SqlParameter("@Amount", request.strRequest1),
                            new SqlParameter("@BankAccountNumber", request.strRequest2),
                            new SqlParameter("@BankIfscCode", request.strRequest3),
                            new SqlParameter("@AccountName", request.strRequest4),
                            new SqlParameter("@DriverMasterID", request.strRequest5),
                            new SqlParameter("@VehicleMasterID", request.strRequest6),
                            new SqlParameter("@Status",  request.strRequest7),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MpayApiUsageSave", param);

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
        public async Task<ReportRequestModel> GetDriverAccountDetails(RequestModel request)
        {
            ReportRequestModel dprVehi = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DriverMasterId", request.strRequest)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverAccountDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        dprVehi.FilterStr = Convert.ToString(dataSet.Tables[0].Rows[0]["BankAcNo"]);
                        dprVehi.FilterStr1 = Convert.ToString(dataSet.Tables[0].Rows[0]["BankIfsCode"]); 
                        dprVehi.FilterStr2 = Convert.ToString(dataSet.Tables[0].Rows[0]["DrBankAccountName"]); 
                    }
                  
                }
            }
            catch (Exception ex)
            {

            }
            return dprVehi;
        }
        public async Task<TripPaymentsList> GetTripPaymentsList(ReportRequestModel request)
        {
            TripPaymentsList tripPaymentsList = new();
            List<TripPaymentsModel> tripPayList = new();
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
                            new SqlParameter("@Vehicle",    request.FilterStr1),
                            new SqlParameter("@Branch",     request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPaymentsList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tripPayList.Add(new TripPaymentsModel
                            {
                                PmtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtId"]),
                                PmtBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtBranch"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                PaidToDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["PaidToDesc"]),
                                VehicleMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterID"]),
                                TransType = Convert.ToString(dataSet.Tables[0].Rows[i]["TransType"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                VendorRefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorRefNo"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                SeriesDoc = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesDoc"]),
                                AdjInTrip = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjInTrip"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                RatePerLtr = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerLtr"]),
                                WithLRYN = Convert.ToString(dataSet.Tables[0].Rows[i]["WithLRYN"]),
                                ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentId"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["Kmr"]),
                                Attachment1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachment1"]),
                                Attachment2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachment2"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                DriverMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterID"]),
                                Bname = Convert.ToString(dataSet.Tables[0].Rows[i]["BName"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                Fromloc = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLoc"]),
                                Toloc = Convert.ToString(dataSet.Tables[0].Rows[i]["ToLoc"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                                //BankAc = Convert.ToString(dataSet.Tables[0].Rows[i]["BankAc"]),
                                //Ifsc = Convert.ToString(dataSet.Tables[0].Rows[i]["Ifsc"]),
                            });
                        }

                        tripPaymentsList.tripPaymentsList = tripPayList;

                        tripPaymentsList.PageMetaData = new PaginationMetaData
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
            return tripPaymentsList;
        }
        public async Task<TripModel> GetTripDetail(TripVehicleModel request)
        {
            TripModel tripModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),

                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetTripDetail", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        tripModel.TripNo = Convert.ToString(userData.Tables[0].Rows[0]["TripNo"]);
                        tripModel.LoadEmptyType = Convert.ToString(userData.Tables[0].Rows[0]["LoadEmptyType"]);
                        tripModel.FP = Convert.ToString(userData.Tables[0].Rows[0]["FP"]);
                        tripModel.TP = Convert.ToString(userData.Tables[0].Rows[0]["TP"]);
                        tripModel.LtsDslToBe_1 = Convert.ToString(userData.Tables[0].Rows[0]["LtsDslToBe_1"]);
                        tripModel.TravelAllowance = Convert.ToString(userData.Tables[0].Rows[0]["TravelAllowance"]);
                        tripModel.TripId = Convert.ToString(userData.Tables[0].Rows[0]["TripId"]);                        
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return tripModel;
        }
        public async Task<TripModel> GetTripFromAndToDetail(RequestModel request)
        {
            TripModel tripModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TripId", request.strRequest),
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "sp_GetTripFromAndToDetail", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        tripModel.TripNo = Convert.ToString(userData.Tables[0].Rows[0]["TripNo"]);
                        tripModel.LoadEmptyType = Convert.ToString(userData.Tables[0].Rows[0]["LoadEmptyType"]);
                        tripModel.FP = Convert.ToString(userData.Tables[0].Rows[0]["FP"]);
                        tripModel.TP = Convert.ToString(userData.Tables[0].Rows[0]["TP"]);
                        tripModel.LtsDslToBe_1 = Convert.ToString(userData.Tables[0].Rows[0]["LtsDslToBe_1"]);
                        tripModel.TravelAllowance = Convert.ToString(userData.Tables[0].Rows[0]["TravelAllowance"]);
                        tripModel.TripId = Convert.ToString(userData.Tables[0].Rows[0]["TripId"]);
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tripModel;
        }
        public async Task<TripDslDetail> GetTripDslDetail(TripVehicleModel request)
        {
            TripDslDetail tripDslDetail = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterId", request.VehicleMasterId),
                            new SqlParameter("@TripNo", request.TripNo),
                            new SqlParameter("@YearId", request.YearId),
                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetTripDslDetail", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        tripDslDetail.DslIssued     = Convert.ToString(userData.Tables[0].Rows[0]["DslIssued"]);
                        tripDslDetail.AdvIssued     = Convert.ToString(userData.Tables[0].Rows[0]["AdvIssued"]);
                        tripDslDetail.TripStatus    = Convert.ToString(userData.Tables[0].Rows[0]["TripStatus"]);
                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return tripDslDetail;
        }
        public async Task<ResponseModel> TripPaymentsDelete(RequestModel req)
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
                            new SqlParameter("@PmtId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripPaymentsDelete", param);

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
        public async Task<List<DropDownListModel>> GetCreditAcList()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CreditAcListForload_Select2", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }
        public async Task<List<DropDownListModel>> GetCrAcListForCustWizard()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CrAcListForCustWizard_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }
        public async Task<List<DropDownListModel>> GetCreditAcList2(RequestModel request)
        {
            List<DropDownListModel> creditacList = new();
          
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@PType", request.strRequest),                    
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "CreditAcList_Select2", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["AccountId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["AccountName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return creditacList;
        }
        public async Task<ConsignmentModel> GetLrDtlsForTripPmts(RequestModel req)
        {
            ConsignmentModel lrmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TruckNo", req.strRequest),
                            new SqlParameter("@PmtDate", req.strRequest1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLrDetailsForTripPmt", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        lrmodel.ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]);
                        lrmodel.BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]);
                        lrmodel.BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingPlace"]);
                        lrmodel.GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]);
                        lrmodel.FPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["FPlace"]);
                        lrmodel.TPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["TPlace"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lrmodel;
        }
        public async Task<ResponseModel> GetVoucherPrint(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/Voucher/";

                string UrlParam = "?VoucherFrom="+ request.strRequest +"&PmtId=" + request.strRequest1;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data != "500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ReportRequestModel> TripPaymentsLoadDetails(RequestModel req)
        {
            ReportRequestModel loadDtls = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterId", req.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPmtLoadDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        loadDtls.FilterStr = Convert.ToString(dataSet.Tables[0].Rows[0]["FromPlace"]);
                        loadDtls.FilterStr1 = Convert.ToString(dataSet.Tables[0].Rows[0]["ToPlace"]);
                        loadDtls.FilterStr2 = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadDate"]);
                        loadDtls.FilterStr3 = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadFor"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return loadDtls;

        }
        public async Task<ResponseModel> GetTransTypeValidations(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TpCode", req.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTransTypeValidations", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(dataSet.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(dataSet.Tables[0].Rows[0]["Message"]);
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
        public async Task<ResponseModel> GetTripPmtLoadShow()
        {
            ResponseModel responseModel = new();
            try
            {
                var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripPmtLoadShow", null);

                if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                {
                    responseModel.Status = Convert.ToBoolean(dataSet.Tables[0].Rows[0]["Status"]);
                    responseModel.Message = Convert.ToString(dataSet.Tables[0].Rows[0]["Message"]); 
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> TripPaymentsBrplSave(TripPaymentsModel tripPaymentsModel)
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
                            new SqlParameter("@PmtId", tripPaymentsModel.PmtId),
                            new SqlParameter("@PmtBranch", tripPaymentsModel.PmtBranch),
                            new SqlParameter("@PmtDate", tripPaymentsModel.PmtDate),
                            new SqlParameter("@PaidToDesc", tripPaymentsModel.PaidToDesc),
                            new SqlParameter("@VehicleMasterID", tripPaymentsModel.VehicleMasterID),
                            new SqlParameter("@TransType", tripPaymentsModel.TransType),
                            new SqlParameter("@AmountPaid", tripPaymentsModel.AmountPaid),
                            new SqlParameter("@Remarks", tripPaymentsModel.Remarks),
                            new SqlParameter("@VendorRefNo", tripPaymentsModel.VendorRefNo),
                            new SqlParameter("@PmtType", tripPaymentsModel.PmtType),
                            new SqlParameter("@NeftPmt", tripPaymentsModel.NeftPmt),
                            new SqlParameter("@CreditAc", tripPaymentsModel.CreditAc),
                            new SqlParameter("@ChequeNo", tripPaymentsModel.ChequeNo),
                            new SqlParameter("@ChequeDate", tripPaymentsModel.ChequeDate),
                            new SqlParameter("@QtyLtrs", tripPaymentsModel.QtyLtrs),
                            new SqlParameter("@RatePerLtr", tripPaymentsModel.RatePerLtr),
                            new SqlParameter("@WithLRYN", tripPaymentsModel.WithLRYN),
                            new SqlParameter("@ConsignmentId", tripPaymentsModel.ConsignmentId),
                            new SqlParameter("@Kmr", tripPaymentsModel.Kmr),
                            new SqlParameter("@Attachment1", tripPaymentsModel.Attachment1),
                            new SqlParameter("@Attachment2", tripPaymentsModel.Attachment2),
                            new SqlParameter("@YearId", tripPaymentsModel.YearId),
                            new SqlParameter("@DriverMasterID", tripPaymentsModel.DriverMasterID),
                            new SqlParameter("@Fromloc", tripPaymentsModel.Fromloc),
                            new SqlParameter("@Toloc", tripPaymentsModel.Toloc),
                            new SqlParameter("@LoggedInUser", tripPaymentsModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TripPaymentsBrplSave", param);

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
