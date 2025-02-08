using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Net.NetworkInformation;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace Consignment.Repository
{
    public class DoVehiInRepository : IDoVehiInRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DoVehiInRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<DoVehicleInListModel> GetDoVehicleInList(ReportRequestModel request)
        {
            DoVehicleInListModel dprMasterList = new();
            List<DoVehicleInModel> dos = new();
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
                            new SqlParameter("@TruckId",    request.FilterStr1),
                            new SqlParameter("@LoginBranch",request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDoVehicleInList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dos.Add(new DoVehicleInModel
                            {
                                DoViId          = Convert.ToString(dataSet.Tables[0].Rows[i]["DoViId"]),
                                DoVpId          = Convert.ToString(dataSet.Tables[0].Rows[i]["DoVpId"]),
                                DoId            = Convert.ToString(dataSet.Tables[0].Rows[i]["DoId"]),
                                EntryDate       = Convert.ToString(dataSet.Tables[0].Rows[i]["EntryDate"]),
                                EntryBranch     = Convert.ToString(dataSet.Tables[0].Rows[i]["EntryBranch"]),
                                VehicleInDatetime = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleInDatetime"]),
                                TruckID         = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckID"]),
                                TruckNo         = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                OwnMarket       = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnMarket"]),
                                RegnDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["RegnDate"]),
                                OwnerName       = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerName"]),
                                OwnerType       = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerType"]),
                                ContactName = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactName"]),
                                MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                ChasisNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChasisNo"]),
                                EngineNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EngineNo"]),
                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                PhoneNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PhoneNo"]),
                                InsuranceDt = Convert.ToString(dataSet.Tables[0].Rows[i]["InsuranceDt"]),
                                PermitDt = Convert.ToString(dataSet.Tables[0].Rows[i]["PermitDt"]),
                                FitnessDt = Convert.ToString(dataSet.Tables[0].Rows[i]["FitnessDt"]),
                                PanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PanNo"]),
                                AadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharNo"]),
                                AadharLinkedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharLinkedYN"]),
                                PanValidYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PanValidYN"]),
                                ItFiledYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ItFiledYN"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverAddress = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAddress"]),
                                DriverMobile1 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile1"]),
                                DriverMobile2 = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMobile2"]),
                                DriverLicense = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicense"]),
                                DriverLicValid = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicValid"]),
                                RcUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["RcUpload"]),
                                PermitUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["PermitUpload"]),
                                InsUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["InsUpload"]),
                                PanUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["PanUpload"]),
                                DecUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["DecUpload"]),
                                OtherUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherUpload"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                InActiveDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InActiveDate"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                EntryThrough = Convert.ToString(dataSet.Tables[0].Rows[i]["EntryThrough"]),

                            });

                            dprMasterList.DoVehicleInList = dos;

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
        public async Task<ResponseModel> DoVehicleInSave(DoVehicleInModel dprModel)
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
                          new SqlParameter("@DoViId                          ",               dprModel.DoViId           ),
                          new SqlParameter("@DoVpId                          ",               dprModel.DoVpId           ),
                          new SqlParameter("@DoId                            ",               dprModel.DoId             ),
                          new SqlParameter("@EntryDate                       ",               dprModel.EntryDate             ),
                          new SqlParameter("@EntryBranch                     ",               dprModel.EntryBranch),
                          new SqlParameter("@VehicleInDatetime               ",               dprModel.VehicleInDatetime             ),
                          new SqlParameter("@TruckID                         ",               dprModel.TruckID          ),
                          new SqlParameter("@TruckNo                         ",               dprModel.TruckNo          ),
                          new SqlParameter("@OwnMarket                       ",               dprModel.OwnMarket        ),
                          new SqlParameter("@RegnDate                        ",               dprModel.RegnDate         ),
                          new SqlParameter("@OwnerName                       ",               dprModel.OwnerName        ),
                          new SqlParameter("@OwnerType                       ",               dprModel.OwnMarket        ),
                          new SqlParameter("@ContactName                     ",               dprModel.ContactName      ),
                          new SqlParameter("@MobileNo                        ",               dprModel.MobileNo         ),
                          new SqlParameter("@ChasisNo                        ",               dprModel.ChasisNo         ),
                          new SqlParameter("@EngineNo                        ",               dprModel.EngineNo         ),
                          new SqlParameter("@Address1                        ",               dprModel.Address1         ),
                          new SqlParameter("@Address2                        ",               dprModel.Address2         ),
                          new SqlParameter("@Address3                        ",               dprModel.Address3         ),
                          new SqlParameter("@StateCode                       ",               dprModel.StateCode        ),
                          new SqlParameter("@PinCode                         ",               dprModel.PinCode          ),
                          new SqlParameter("@PhoneNo                         ",               dprModel.PhoneNo          ),
                          new SqlParameter("@InsuranceDt                     ",               dprModel.InsuranceDt      ),
                          new SqlParameter("@PermitDt                        ",               dprModel.PermitDt         ),
                          new SqlParameter("@FitnessDt                       ",               dprModel.FitnessDt        ),
                          new SqlParameter("@PanNo                           ",               dprModel.PanNo            ),
                          new SqlParameter("@AadharNo                        ",               dprModel.AadharNo         ),
                          new SqlParameter("@AadharLinkedYN                  ",               dprModel.AadharLinkedYN   ), 
                          new SqlParameter("@PanValidYN                      ",               dprModel.PanValidYN       ),
                          new SqlParameter("@ItFiledYN                       ",               dprModel.ItFiledYN        ),
                          new SqlParameter("@DriverName                      ",               dprModel.DriverName       ),
                          new SqlParameter("@DriverAddress                   ",               dprModel.DriverAddress    ),  
                          new SqlParameter("@DriverMobile1                   ",               dprModel.DriverMobile1    ),
                          new SqlParameter("@DriverMobile2                   ",               dprModel.DriverMobile2    ),
                          new SqlParameter("@DriverLicense                   ",               dprModel.DriverLicense    ),
                          new SqlParameter("@DriverLicValid                  ",               dprModel.DriverLicValid   ), 
                          new SqlParameter("@RcUpload                        ",               dprModel.RcUpload         ),
                          new SqlParameter("@PermitUpload                    ",               dprModel.PermitUpload     ),
                          new SqlParameter("@InsUpload                       ",               dprModel.InsUpload        ),
                          new SqlParameter("@PanUpload                       ",               dprModel.PanUpload        ),
                          new SqlParameter("@DecUpload                       ",               dprModel.DecUpload        ),
                          new SqlParameter("@OtherUpload                     ",               dprModel.OtherUpload      ),
                          new SqlParameter("@Remarks                         ",               dprModel.Remarks          ),
                          new SqlParameter("@EntryThrough                    ",               dprModel.EntryThrough     ),
                          new SqlParameter("@LoggedInUser                    ",               dprModel.LoggedInUser  )
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoVehicleInSave", param);

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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<ResponseModel> DoVehicleInDelete(RequestModel requestModel)
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
                            new SqlParameter("@DoViId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DoVehicleInDelete", param);

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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        
        public async Task<DoVehicleInModel> GetDoVehiPlacedDetails(RequestModel request)
        {
            DoVehicleInModel dos = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DoVpId", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDoVehiPlacedDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        dos.DoViId          = "";
                        dos.DoVpId          = Convert.ToString(dataSet.Tables[0].Rows[0]["DoVpId"]);
                        dos.DoId            = Convert.ToString(dataSet.Tables[0].Rows[0]["DoId"]);
                        dos.EntryBranch     = Convert.ToString(dataSet.Tables[0].Rows[0]["EntryBranch"]);
                        dos.TruckNo         = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckNo"]);
                        dos.OwnMarket       = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnMarket"]);
                        dos.TruckID         = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckID"]);
                        dos.RegnDate        = Convert.ToString(dataSet.Tables[0].Rows[0]["RegnDate"]);
                        dos.OwnerName       = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnerName"]);
                        dos.MobileNo = Convert.ToString(dataSet.Tables[0].Rows[0]["MobileNo"]);
                        dos.ChasisNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ChasisNo"]);
                        dos.EngineNo = Convert.ToString(dataSet.Tables[0].Rows[0]["EngineNo"]);
                        dos.Address1 = Convert.ToString(dataSet.Tables[0].Rows[0]["Address1"]);
                        dos.Address2 = Convert.ToString(dataSet.Tables[0].Rows[0]["Address2"]);
                        dos.Address3 = "";
                        dos.StateCode = Convert.ToString(dataSet.Tables[0].Rows[0]["StateCode"]);
                        dos.PinCode = Convert.ToString(dataSet.Tables[0].Rows[0]["PinCode"]);
                        dos.PhoneNo = Convert.ToString(dataSet.Tables[0].Rows[0]["PhoneNo"]);
                        dos.InsuranceDt = Convert.ToString(dataSet.Tables[0].Rows[0]["InsuranceDt"]);
                        dos.PermitDt = Convert.ToString(dataSet.Tables[0].Rows[0]["PermitDt"]);
                        dos.FitnessDt = Convert.ToString(dataSet.Tables[0].Rows[0]["FitnessDt"]);
                        dos.PanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["PanNo"]);
                        dos.AadharNo = Convert.ToString(dataSet.Tables[0].Rows[0]["AadharNo"]);
                        dos.AadharLinkedYN = Convert.ToString(dataSet.Tables[0].Rows[0]["AadharLinkedYN"]);
                        dos.PanValidYN = Convert.ToString(dataSet.Tables[0].Rows[0]["PanValidYN"]);
                        dos.ItFiledYN = Convert.ToString(dataSet.Tables[0].Rows[0]["ItFiledYN"]);                      
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dos;
        }
       
        public async Task<DoVehicleInModel> GetTruckDetails(RequestModel request)
        {
            DoVehicleInModel dprVehi = new();
            ResponseModel responseModel = new();
            Root root = new();
            try
            {

                string URL = "https://fcube.net/truckno/signzy/api.php";

                string urlParameters = "?vehicleNumber=" + request.strRequest + "";

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

                    var Truckmasterrt = JsonConvert.DeserializeObject<TruckmasterRt>(result);
                    if (Truckmasterrt != null && Truckmasterrt.result!= null && Truckmasterrt.result.regNo.ToString() != "")
                    {
                        string stradr = Truckmasterrt.result.permanentAddress.ToString();
                        string[] stradrr = stradr.Split(',');

                        if (stradrr.Length == 1)
                        {
                            dprVehi.Address1 = stradrr[0].ToString();
                            dprVehi.Address2 = "";
                        }
                        else if (stradrr.Length == 2)
                        {
                            dprVehi.Address1 = stradrr[0].ToString();
                            dprVehi.Address2 = stradrr[1].ToString();
                        }
                        else if (stradrr.Length == 3)
                        {
                            dprVehi.Address1 = stradrr[0].ToString() + ", " + stradrr[1].ToString();
                            dprVehi.Address2 = stradrr[2].ToString();
                        }
                        else if (stradrr.Length > 3)
                        {
                            dprVehi.Address1 = stradrr[0].ToString() + ", " +stradrr[1].ToString();
                            dprVehi.Address2 = stradrr[2].ToString() + ", " + stradrr[3].ToString();
                        }

                        dprVehi.OwnerName = Truckmasterrt.result.owner.ToString();
                        dprVehi.MobileNo = Truckmasterrt.result.mobileNumber.ToString();

                        if (Truckmasterrt.result.rcExpiryDate.ToString() != "NA" || Truckmasterrt.result.rcExpiryDate.ToString() != "")
                            dprVehi.FitnessDt = Truckmasterrt.result.rcExpiryDate.ToString();
                        if (Truckmasterrt.result.nationalPermitUpto.ToString() != "NA"|| Truckmasterrt.result.nationalPermitUpto.ToString() != "")
                            dprVehi.PermitDt = Truckmasterrt.result.nationalPermitUpto.ToString();
                        if (Truckmasterrt.result.vehicleInsuranceUpto.ToString() != "NA"|| Truckmasterrt.result.vehicleInsuranceUpto.ToString() != "")
                            dprVehi.InsuranceDt = Truckmasterrt.result.vehicleInsuranceUpto.ToString();
                        if (Truckmasterrt.result.regDate.ToString() != "NA"|| Truckmasterrt.result.regDate.ToString() != "")
                            dprVehi.RegnDate = Truckmasterrt.result.regDate.ToString();

                        dprVehi.ChasisNo = Truckmasterrt.result.chassis.ToString();
                        dprVehi.EngineNo= Truckmasterrt.result.engine.ToString();
                        var Model = Truckmasterrt.result.model.ToString();


                        if (Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString() == "TG")
                            dprVehi.StateCode = "TS";
                        else if (Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString() == "UT")
                            dprVehi.StateCode = "UK";
                        else if (Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString() == "CT")
                            dprVehi.StateCode = "CG";
                        else
                            dprVehi.StateCode = Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString();

                       dprVehi.PinCode = Truckmasterrt.result.splitPermanentAddress.pincode.ToString();

                        var connection = new SqlConnection(dbconnection.Value.DBConnection);
                        connection.Open();
                        SqlTransaction transaction;
                        transaction = connection.BeginTransaction();

                        var VehInsValidDate = dprVehi.InsuranceDt=="" ? "" : Convert.ToDateTime(dprVehi.InsuranceDt).ToString("yyyy-MM-dd");
                        var VehFitValidDate = dprVehi.FitnessDt=="" ? "" : Convert.ToDateTime(dprVehi.FitnessDt).ToString("yyyy-MM-dd");
                        var VehPermitValidDate = dprVehi.PermitDt=="" ? "" : Convert.ToDateTime(dprVehi.PermitDt).ToString("yyyy-MM-dd");
                        var RegnDate = dprVehi.RegnDate=="" ? "" : Convert.ToDateTime(dprVehi.RegnDate).ToString("yyyy-MM-dd");
                       

                        SqlParameter[] param =
                        {
                            new SqlParameter("@TruckNo",            request.strRequest),
                            new SqlParameter("@RegnDate",           RegnDate),
                            new SqlParameter("@OwnerName",          dprVehi.OwnerName),
                            new SqlParameter("@Address1",           dprVehi.Address1),
                            new SqlParameter("@Address2",           dprVehi.Address2),
                            new SqlParameter("@StateCode",          dprVehi.StateCode),
                            new SqlParameter("@PinCode",            dprVehi.PinCode),
                            new SqlParameter("@PhoneNo",            dprVehi.MobileNo),
                            new SqlParameter("@MobileNo",           dprVehi.MobileNo),
                            new SqlParameter("@ChasisNo",           dprVehi.ChasisNo),
                            new SqlParameter("@EngineNo",           dprVehi.EngineNo),
                            new SqlParameter("@Model",              Model),
                            new SqlParameter("@InsValidDate",       VehInsValidDate),
                            new SqlParameter("@FitValidDate",       VehFitValidDate),
                            new SqlParameter("@PermitValidDate",    VehPermitValidDate),
                            new SqlParameter("@LoggedInUser",       request.strRequest1),
                        };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TruckDetailsSave", param);
                        
                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                            dprVehi.TruckID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else { transaction.Rollback(); }
                    }
                }
                client.Dispose();
            }
            catch (Exception ex)
            {

            }
            return dprVehi;
        }

    }

}
