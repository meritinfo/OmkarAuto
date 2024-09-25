using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using Newtonsoft.Json;
using Shared.Repository;
using System.Net.Http.Headers;
using System.Transactions;

namespace Consignment.Repository
{
    public class DprVehiPlacedRepository : IDprVehiPlacedRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private ISharedRepository sharedRepository;
       
        public DprVehiPlacedRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
       
        public async Task<DprVehiPlacedListModel> GetDprVehiPlacedList(ReportRequestModel request)
        {
            DprVehiPlacedListModel dprVehiplacedList = new();
            List<DprVehiPlacedModel> dprVehiList = new();
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
                            new SqlParameter("@PayParty",   request.FilterStr),
                            new SqlParameter("@Origin",     request.FilterStr1),
                            new SqlParameter("@Destination",request.FilterStr2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDprVehiclePlacedList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dprVehiList.Add(new DprVehiPlacedModel
                            {
                                VehiclePlacedId     = Convert.ToString(dataSet.Tables[0].Rows[i]["VehiclePlacedId"]),
                                DprId               = Convert.ToString(dataSet.Tables[0].Rows[i]["DprId"]),
                                DprDate             = Convert.ToString(dataSet.Tables[0].Rows[i]["DprDate"]),
                                PayParty            = Convert.ToString(dataSet.Tables[0].Rows[i]["PayParty"]),
                                PartyName           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                Origin              = Convert.ToString(dataSet.Tables[0].Rows[i]["Origin"]),
                                FromPlace           = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                Destination         = Convert.ToString(dataSet.Tables[0].Rows[i]["Destination"]),
                                ToPlace             = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                VehicleNo           = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DriverName          = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverMob1          = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMob1"]),
                                VehOwnerName        = Convert.ToString(dataSet.Tables[0].Rows[i]["VehOwnerName"]),
                                VehOwnerMobile      = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMob1"]),
                                BrokerId            = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerId"]),
                                BrokerName          = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerName"]),
                                VehAdd1             = Convert.ToString(dataSet.Tables[0].Rows[i]["VehAdd1"]),
                                VehAdd2             = Convert.ToString(dataSet.Tables[0].Rows[i]["VehAdd2"]),
                                OwnerPan            = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerPan"]),
                                VehInsValidDate     = Convert.ToString(dataSet.Tables[0].Rows[i]["VehInsValidDate"]),
                                VehFitValidDate     = Convert.ToString(dataSet.Tables[0].Rows[i]["VehFitValidDate"]),
                                VehPermitValidDate  = Convert.ToString(dataSet.Tables[0].Rows[i]["VehPermitValidDate"]),
                                ChallanChrgWt       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanChrgWt"]),
                                RatePerTon          = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerTon"]),
                                LorryHire           = Convert.ToString(dataSet.Tables[0].Rows[i]["LorryHire"]),
                                Advance1            = Convert.ToString(dataSet.Tables[0].Rows[i]["Advance1"]),
                                Advance2            = Convert.ToString(dataSet.Tables[0].Rows[i]["Advance2"]),
                                Advance3            = Convert.ToString(dataSet.Tables[0].Rows[i]["Advance3"]),
                                AdvanceAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvanceAmt"]),
                                BalanceAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["BalanceAmt"]),
                                AssignToStaff       = Convert.ToString(dataSet.Tables[0].Rows[i]["AssignToStaff"]),
                                VehicleEngagedBy    = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleEngagedBy"]),
                                NoofLr              = Convert.ToString(dataSet.Tables[0].Rows[i]["NoofLr"]),
                                CreatedBy           = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy          = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                            });
                        }

                        dprVehiplacedList.DprVehiList = dprVehiList;

                        dprVehiplacedList.PageMetaData = new PaginationMetaData
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
            return dprVehiplacedList;
        }
        public async Task<DprVehiPlacedModel> GetDprVehiPlacedDetails(RequestModel request)
        {
            DprVehiPlacedModel dprVehi = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DprId", request.strRequest)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDprVehiclePlacedDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        dprVehi.VehiclePlacedId     = Convert.ToString(dataSet.Tables[0].Rows[0]["VehiclePlacedId"]);
                        dprVehi.DprId               = Convert.ToString(dataSet.Tables[0].Rows[0]["DprId"]);
                        dprVehi.DprDate             = Convert.ToString(dataSet.Tables[0].Rows[0]["DprDate"]);
                        dprVehi.PayParty            = Convert.ToString(dataSet.Tables[0].Rows[0]["PayParty"]);
                        dprVehi.PartyName           = Convert.ToString(dataSet.Tables[0].Rows[0]["PartyName"]);
                        dprVehi.Origin              = Convert.ToString(dataSet.Tables[0].Rows[0]["Origin"]);
                        dprVehi.FromPlace           = Convert.ToString(dataSet.Tables[0].Rows[0]["FromPlace"]);
                        dprVehi.Destination         = Convert.ToString(dataSet.Tables[0].Rows[0]["Destination"]);
                        dprVehi.ToPlace             = Convert.ToString(dataSet.Tables[0].Rows[0]["ToPlace"]);
                        dprVehi.VehicleNo           = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleNo"]);
                        dprVehi.DriverName          = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverName"]);
                        dprVehi.DriverMob1          = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverMob1"]);
                        dprVehi.VehOwnerName        = Convert.ToString(dataSet.Tables[0].Rows[0]["VehOwnerName"]);
                        dprVehi.VehOwnerMobile      = Convert.ToString(dataSet.Tables[0].Rows[0]["VehOwnerMobile"]);
                        dprVehi.BrokerId            = Convert.ToString(dataSet.Tables[0].Rows[0]["BrokerId"]);
                        dprVehi.VehAdd1             = Convert.ToString(dataSet.Tables[0].Rows[0]["VehAdd1"]);
                        dprVehi.VehAdd2             = Convert.ToString(dataSet.Tables[0].Rows[0]["VehAdd2"]);
                        dprVehi.OwnerPan            = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnerPan"]);
                        dprVehi.VehInsValidDate     = Convert.ToString(dataSet.Tables[0].Rows[0]["VehInsValidDate"]);
                        dprVehi.VehFitValidDate     = Convert.ToString(dataSet.Tables[0].Rows[0]["VehFitValidDate"]);
                        dprVehi.VehPermitValidDate  = Convert.ToString(dataSet.Tables[0].Rows[0]["VehPermitValidDate"]);
                        dprVehi.ChallanChrgWt       = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanChrgWt"]);
                        dprVehi.RatePerTon          = Convert.ToString(dataSet.Tables[0].Rows[0]["RatePerTon"]);
                        dprVehi.LorryHire           = Convert.ToString(dataSet.Tables[0].Rows[0]["LorryHire"]);
                        dprVehi.Advance1            = Convert.ToString(dataSet.Tables[0].Rows[0]["Advance1"]);
                        dprVehi.Advance2            = Convert.ToString(dataSet.Tables[0].Rows[0]["Advance2"]);
                        dprVehi.Advance3            = Convert.ToString(dataSet.Tables[0].Rows[0]["Advance3"]);
                        dprVehi.AdvanceAmt          = Convert.ToString(dataSet.Tables[0].Rows[0]["AdvanceAmt"]);
                        dprVehi.BalanceAmt          = Convert.ToString(dataSet.Tables[0].Rows[0]["BalanceAmt"]);
                        dprVehi.AssignToStaff       = Convert.ToString(dataSet.Tables[0].Rows[0]["AssignToStaff"]);
                        dprVehi.VehicleEngagedBy    = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleEngagedBy"]);
                        dprVehi.CreatedBy           = Convert.ToString(dataSet.Tables[0].Rows[0]["CreatedBy"]);
                        dprVehi.CreatedDate         = Convert.ToString(dataSet.Tables[0].Rows[0]["CreatedDate"]);
                        dprVehi.ModifiedBy          = Convert.ToString(dataSet.Tables[0].Rows[0]["ModifiedBy"]);
                        dprVehi.ModifiedDate        = Convert.ToString(dataSet.Tables[0].Rows[0]["ModifiedDate"]);

                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return dprVehi;
        }
        public async Task<DprVehiPlacedModel> GetVehicleDetails(RequestModel request)
        {
            DprVehiPlacedModel dprVehi = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TruckNo", request.strRequest)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {                      
                        dprVehi.VehOwnerName        = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnerName"]);
                        dprVehi.OwnerPan            = Convert.ToString(dataSet.Tables[0].Rows[0]["PanNo"]);
                        dprVehi.VehAdd1             = Convert.ToString(dataSet.Tables[0].Rows[0]["Address1"]);
                        dprVehi.VehAdd2             = Convert.ToString(dataSet.Tables[0].Rows[0]["Address2"]);
                        dprVehi.VehOwnerMobile      = Convert.ToString(dataSet.Tables[0].Rows[0]["MobileNo"]);
                        dprVehi.VehInsValidDate     = Convert.ToString(dataSet.Tables[0].Rows[0]["InsuranceDt"]);
                        dprVehi.VehPermitValidDate  = Convert.ToString(dataSet.Tables[0].Rows[0]["NationalPermitDt"]);
                        dprVehi.VehFitValidDate     = Convert.ToString(dataSet.Tables[0].Rows[0]["FitnessDt"]);
                    }
                    else
                    {
                        dprVehi = await GetTruckDetails(request);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dprVehi;
        }
        public async Task<DprVehiPlacedModel> GetTruckDetails(RequestModel request)
        {
            DprVehiPlacedModel dprVehi = new();
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
                            dprVehi.VehAdd1 = stradrr[0].ToString();
                            dprVehi.VehAdd2 = "";
                        }
                        else if (stradrr.Length == 2)
                        {
                            dprVehi.VehAdd1 = stradrr[0].ToString();
                            dprVehi.VehAdd2 = stradrr[1].ToString();
                        }
                        else if (stradrr.Length == 3)
                        {
                            dprVehi.VehAdd1 = stradrr[0].ToString() + ", " + stradrr[1].ToString();
                            dprVehi.VehAdd2 = stradrr[2].ToString();
                        }
                        else if (stradrr.Length > 3)
                        {
                            dprVehi.VehAdd1 = stradrr[0].ToString() + ", " +stradrr[1].ToString();
                            dprVehi.VehAdd2 = stradrr[2].ToString() + ", " + stradrr[3].ToString();
                        }

                        dprVehi.VehOwnerName = Truckmasterrt.result.owner.ToString();
                        dprVehi.VehOwnerMobile = Truckmasterrt.result.mobileNumber.ToString();

                        if (Truckmasterrt.result.rcExpiryDate.ToString() != "NA" || Truckmasterrt.result.rcExpiryDate.ToString() != "")
                            dprVehi.VehFitValidDate = Truckmasterrt.result.rcExpiryDate.ToString();
                        if (Truckmasterrt.result.nationalPermitUpto.ToString() != "NA"|| Truckmasterrt.result.nationalPermitUpto.ToString() != "")
                            dprVehi.VehPermitValidDate = Truckmasterrt.result.nationalPermitUpto.ToString();
                        if (Truckmasterrt.result.vehicleInsuranceUpto.ToString() != "NA"|| Truckmasterrt.result.vehicleInsuranceUpto.ToString() != "")
                            dprVehi.VehInsValidDate = Truckmasterrt.result.vehicleInsuranceUpto.ToString();


                        var Chassino = Truckmasterrt.result.chassis.ToString();
                        var Engineno = Truckmasterrt.result.engine.ToString();
                        var Model = Truckmasterrt.result.model.ToString();
                        var RegDate = Truckmasterrt.result.regDate.ToString();

                        var State = "";
                       
                        if (Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString() == "TG")
                            State = "TS";
                        else if (Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString() == "UT")
                            State = "UK";
                        else if (Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString() == "CT")
                            State = "CG";
                        else
                            State = Truckmasterrt.result.splitPermanentAddress.state[0][1].ToString();

                        var Pincode = Truckmasterrt.result.splitPermanentAddress.pincode.ToString();
                        
                        var connection = new SqlConnection(dbconnection.Value.DBConnection);
                        connection.Open();
                        SqlTransaction transaction;
                        transaction = connection.BeginTransaction();

                        var VehInsValidDate = dprVehi.VehInsValidDate=="" ? "":Convert.ToDateTime(dprVehi.VehInsValidDate).ToString("yyyy-MM-dd") ;
                        var VehFitValidDate = dprVehi.VehFitValidDate==""? "" : Convert.ToDateTime(dprVehi.VehFitValidDate).ToString("yyyy-MM-dd") ;
                        var VehPermitValidDate = dprVehi.VehPermitValidDate==""? "" : Convert.ToDateTime(dprVehi.VehPermitValidDate).ToString("yyyy-MM-dd") ;
                        RegDate = RegDate=="" ? "" : Convert.ToDateTime(RegDate).ToString("yyyy-MM-dd");

                        SqlParameter[] param =
                        {
                            new SqlParameter("@TruckNo",            request.strRequest),
                            new SqlParameter("@RegnDate",           RegDate),
                            new SqlParameter("@OwnerName",          dprVehi.VehOwnerName),
                            new SqlParameter("@Address1",           dprVehi.VehAdd1),
                            new SqlParameter("@Address2",           dprVehi.VehAdd2),
                            new SqlParameter("@StateCode",          State),
                            new SqlParameter("@PinCode",            Pincode),
                            new SqlParameter("@PhoneNo",            dprVehi.VehOwnerMobile),
                            new SqlParameter("@MobileNo",           dprVehi.VehOwnerMobile),
                            new SqlParameter("@ChasisNo",           Chassino),
                            new SqlParameter("@EngineNo",           Engineno),
                            new SqlParameter("@Model",              Model),
                            new SqlParameter("@InsValidDate",       VehInsValidDate),
                            new SqlParameter("@FitValidDate",       VehFitValidDate),
                            new SqlParameter("@PermitValidDate",    VehPermitValidDate),
                            new SqlParameter("@LoggedInUser",       request.strRequest1),
                        };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TruckDetailsSave", param);
                        var DprId = "0";

                        if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                        {
                            responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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
        public async Task<List<DropDownListModel>> GetBrokerList()
        {
            List<DropDownListModel> contentList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBrokerList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            contentList.Add(new DropDownListModel
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
            return contentList;
        }

        public async Task<ResponseModel> DprVehiPlacedSave(DprVehiPlacedModel dprVehi)
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
                            new SqlParameter("@VehiclePlacedId"         , dprVehi.VehiclePlacedId),
                            new SqlParameter("@DprId"                   , dprVehi.DprId),
                            new SqlParameter("@VehicleEngagedBy"        , dprVehi.VehicleEngagedBy),
                            new SqlParameter("@BrokerId"                , dprVehi.BrokerId),
                            new SqlParameter("@VehicleNo"               , dprVehi.VehicleNo),
                            new SqlParameter("@VehOwnerName"            , dprVehi.VehOwnerName),
                            new SqlParameter("@VehAdd1"                 , dprVehi.VehAdd1),
                            new SqlParameter("@VehAdd2"                 , dprVehi.VehAdd2),
                            new SqlParameter("@OwnerPan"                , dprVehi.OwnerPan),
                            new SqlParameter("@VehOwnerMobile"          , dprVehi.VehOwnerMobile),
                            new SqlParameter("@VehInsValidDate"         , dprVehi.VehInsValidDate),
                            new SqlParameter("@VehFitValidDate"         , dprVehi.VehFitValidDate),
                            new SqlParameter("@VehPermitValidDate"      , dprVehi.VehPermitValidDate),
                            new SqlParameter("@DriverName"              , dprVehi.DriverName),
                            new SqlParameter("@DriverMob1"              , dprVehi.DriverMob1),
                            new SqlParameter("@DriverMob2"              , ""),
                            new SqlParameter("@ChallanChrgWt"           , dprVehi.ChallanChrgWt),
                            new SqlParameter("@RatePerTon"              , dprVehi.RatePerTon),
                            new SqlParameter("@LorryHire"               , dprVehi.LorryHire),
                            new SqlParameter("@Advance1"                , dprVehi.Advance1),
                            new SqlParameter("@Advance2"                , dprVehi.Advance2),
                            new SqlParameter("@Advance3"                , dprVehi.Advance3),
                            new SqlParameter("@AdvanceAmt"              , dprVehi.AdvanceAmt),
                            new SqlParameter("@BalanceAmt"              , dprVehi.BalanceAmt),
                            new SqlParameter("@AssignToStaff"           , dprVehi.AssignToStaff),
                            new SqlParameter("@VehicleRptDateTime"      , dprVehi.VehicleRptDateTime),
                            new SqlParameter("@PlacementStatus"         , dprVehi.PlacementStatus),
                            new SqlParameter("@PlacementStatusRemarks"  , dprVehi.PlacementStatusRemarks),
                            new SqlParameter("@LoggedInUser"            , dprVehi.LoggedInUser),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DprVehiclePlacedSave", param);
                   
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status==false && responseModel.Message.Contains("UNIQUE"))
                        {
                            responseModel.Message = "Record Saved. Click Save Button only once";
                        }
                      
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < dprVehi.DprDtls.Count; i++)
                            {
                                responseModel = await DprVehiDtlSave(transaction, dprVehi.DprDtls[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = dprVehi.DprDtls.Count;
                                }
                            }
                        }
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
        public async Task<ResponseModel> DprVehiDtlSave(SqlTransaction transaction, DprDtlModel dprDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DprDtlId",       dprDtl.DprDtlId),
                            new SqlParameter("@GcNoteNo",       dprDtl.GcNoteNo),
                            new SqlParameter("@MainGcYN",       dprDtl.MainGcYN),
                            new SqlParameter("@SpecialRemarks", dprDtl.SpecialRemarks),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DprVehiDtlsSave", param);

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
            return responseModel;
        }

        public async Task<ResponseModel> DprVehiPlacedDelete(RequestModel requestModel)
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
                            new SqlParameter("@VehiclePlacedId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DprVehiPlacedDelete", param);

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
