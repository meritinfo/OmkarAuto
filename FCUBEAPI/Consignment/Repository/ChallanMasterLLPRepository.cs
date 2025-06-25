using Consignment.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public class ChallanMasterLLPRepository : IChallanMasterLLPRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChallanMasterLLPRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> ChallanMasterSaveLLP(ChallanMasterModelLLP challan)
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
                            new SqlParameter("@ChallanId",              challan.ChallanId),
                            new SqlParameter("@ChallanBranch",          challan.ChallanBranch),
                            new SqlParameter("@ChallanNo",              challan.ChallanNo),
                            new SqlParameter("@ChallanDateTime",        challan.ChallanDateTime),
                            new SqlParameter("@ChStatus",               challan.ChStatus),
                            new SqlParameter("@ChSuppYN",               challan.ChSuppYN),
                            new SqlParameter("@ChallanFromStn",         challan.ChallanFromStn),
                            new SqlParameter("@ChallanToStn",           challan.ChallanToStn),
                            new SqlParameter("@DistanceKms",            challan.DistanceKms),
                            new SqlParameter("@ExpArrivalDate",         challan.ExpArrivalDate),
                            new SqlParameter("@MainChallanBranch",      challan.MainChallanBranch),
                            new SqlParameter("@MainChallanNo",          challan.MainChallanNo),
                            new SqlParameter("@BrokerId",               challan.BrokerId),
                            new SqlParameter("@BrokerMblNo",            challan.BrokerMblNo),
                            new SqlParameter("@OwnTruckYN",             challan.OwnTruckYN),
                            new SqlParameter("@TruckNo",                challan.TruckNo),
                            new SqlParameter("@VehicleType",            challan.VehicleType),
                            new SqlParameter("@VehicleMake",            challan.VehicleMake),
                            new SqlParameter("@VehicleModel",           challan.VehicleModel),
                            new SqlParameter("@EngineNo",               challan.EngineNo),
                            new SqlParameter("@ChassisNo",              challan.ChassisNo),
                            new SqlParameter("@VehicleOwnerName",       challan.VehicleOwnerName),
                            new SqlParameter("@VehicleOwnerAdd1",       challan.VehicleOwnerAdd1),
                            new SqlParameter("@VehicleOwnerAdd2",       challan.VehicleOwnerAdd2),
                            new SqlParameter("@VehicleOwnerPanNo",      challan.VehicleOwnerPanNo),
                            new SqlParameter("@PanValid",               challan.PanValid),
                            new SqlParameter("@AadharLinked",           challan.AadharLinked),
                            new SqlParameter("@ItFiled",                challan.ItFiled),
                            new SqlParameter("@VehicleOwnerMblNo",      challan.VehicleOwnerMblNo),
                            new SqlParameter("@VehicleInsDetails",      challan.VehicleInsDetails),
                            new SqlParameter("@PermitValid",            challan.PermitValid),
                            new SqlParameter("@DriverName",             challan.DriverName),
                            new SqlParameter("@DriverAddress",          challan.DriverAddress),
                            new SqlParameter("@DriverLicNo",            challan.DriverLicNo),
                            new SqlParameter("@DriverLicIssuedAt",      challan.DriverLicIssuedAt),
                            new SqlParameter("@DriverLicValid",         challan.DriverLicValid),
                            new SqlParameter("@DriverMblNo",            challan.DriverMblNo),
                            new SqlParameter("@EngagedBy",              challan.EngagedBy),
                            new SqlParameter("@LoadedBy",               challan.LoadedBy),
                            new SqlParameter("@UnLoadingBy",            challan.UnLoadingBy),
                            new SqlParameter("@DeclarationYN",          challan.DeclarationYN),
                            new SqlParameter("@DeclarationRecdBy",      challan.DeclarationRecdBy),
                            new SqlParameter("@OdcLength",              challan.OdcLength),
                            new SqlParameter("@OdcWidth",               challan.OdcWidth),
                            new SqlParameter("@OdcHeight",              challan.OdcHeight),
                            new SqlParameter("@OdcCFT",                 challan.OdcCFT),
                            new SqlParameter("@TotPkgs",                challan.TotPkgs),
                            new SqlParameter("@TotActWt",               challan.TotActWt),
                            new SqlParameter("@TotChrgWt",              challan.TotChrgWt),
                            new SqlParameter("@RatePerTon",             challan.RatePerTon),
                            new SqlParameter("@LorryHire",              challan.LorryHire),
                            new SqlParameter("@ExtraHire1",             challan.ExtraHire1),
                            new SqlParameter("@ExtraHire2",             challan.ExtraHire2),
                            new SqlParameter("@ExtraHire3",             challan.ExtraHire3),
                            new SqlParameter("@Deduction1",             challan.Deduction1),
                            new SqlParameter("@Deduction2",             challan.Deduction2),
                            new SqlParameter("@SubTotal",               challan.SubTotal),
                            new SqlParameter("@TdsPct",                 challan.TdsPct),
                            new SqlParameter("@TdsAmt",                 challan.TdsAmt),
                            new SqlParameter("@TotalHire",              challan.TotalHire),
                            new SqlParameter("@CashAdvance",            challan.CashAdvance),
                            new SqlParameter("@CardAdvance",            challan.CardAdvance),
                            new SqlParameter("@TotalAdvance",           challan.TotalAdvance),
                            new SqlParameter("@Balance",                challan.Balance),
                            new SqlParameter("@BalancePayAt",           challan.BalancePayAt),
                            new SqlParameter("@GeneralRemarks",         challan.GeneralRemarks),
                            new SqlParameter("@Photo1",                 challan.Photo1),
                            new SqlParameter("@Photo2",                 challan.Photo2),
                            new SqlParameter("@Photo3",                 challan.Photo3),
                            new SqlParameter("@TruckDriverImage",       challan.TruckDriverImage),
                            new SqlParameter("@YearId",                 challan.YearId),
                            new SqlParameter("@ModifyRemarks",          challan.ModifyRemarks),
                            new SqlParameter("@CciInvNo",               challan.CciInvNo),
                            new SqlParameter("@ContainerNo",            challan.ContainerNo),
                            new SqlParameter("@CgstAmt",                challan.CgstAmt),
                            new SqlParameter("@SgstAmt",                challan.SgstAmt),
                            new SqlParameter("@IgstAmt",                challan.IgstAmt),
                            new SqlParameter("@LoggedInUser",           challan.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanMstSaveLLP", param);
                    var ChallanId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        ChallanId = responseModel.Message;

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < challan.ChallanDtls.Count; i++)
                            {
                                challan.ChallanDtls[i].ChallanId = ChallanId.ToString();
                                responseModel = await ChallanMasterDtlSaveLLP(transaction, challan.ChallanDtls[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = challan.ChallanDtls.Count;
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
        public async Task<ResponseModel> ChallanMasterDtlSaveLLP(SqlTransaction transaction, ChallanDetailModelLLP challanDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChallanId",  challanDtl.ChallanId),
                            new SqlParameter("@GcYear", challanDtl.GcYear),
                            new SqlParameter("@GcBook", challanDtl.GcBook),
                            new SqlParameter("@GcNoteNo", challanDtl.GcNoteNo),
                            new SqlParameter("@ConsignmentId", challanDtl.ConsignmentId),
                            new SqlParameter("@ChallanFromStn", challanDtl.Fplace),
                            new SqlParameter("@ChallanToStn", challanDtl.Tplace),
                            new SqlParameter("@ChallanPkgs", challanDtl.ChallanPkgs),
                            new SqlParameter("@ChallanWT", challanDtl.ChallanWT),
                            new SqlParameter("@YearId", challanDtl.YearId),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanDtlsSaveLLP", param);

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
        public async Task<ChallanListModelLLP> GetChallanMasterListLLP(ReportRequestModel request)
        {
            ChallanListModelLLP challanMasterList = new();
            List<ChallanMasterModelLLP> challanList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@VehicleNo",      request.FilterStr),
                            new SqlParameter("@ChallanNo",      request.FilterStr1),
                            new SqlParameter("@LoginBranch",    request.FilterStr2),
                            new SqlParameter("@YearId",         request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanMasterListLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanList.Add(new ChallanMasterModelLLP
                            {
                                ChallanId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanDateTime"]),
                                ChStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["ChStatus"]),
                                ChSuppYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ChSuppYN"]),
                                ChallanFromStn = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanFromStn"]),
                                ChallanToStn = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanToStn"]),
                                DistanceKms = Convert.ToString(dataSet.Tables[0].Rows[i]["DistanceKms"]),
                                ExpArrivalDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ExpArrivalDate"]),
                                MainChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["MainChallanBranch"]),
                                MainChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MainChallanNo"]),
                                BrokerId = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerId"]),
                                BrokerMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerMblNo"]),
                                OwnTruckYN = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnTruckYN"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                VehicleType = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleType"]),
                                VehicleMake = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMake"]),
                                VehicleModel = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleModel"]),
                                EngineNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EngineNo"]),
                                ChassisNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChassisNo"]),
                                VehicleOwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerName"]),
                                VehicleOwnerAdd1 = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerAdd1"]),
                                VehicleOwnerAdd2 = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerAdd2"]),
                                VehicleOwnerPanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerPanNo"]),
                                PanValid = Convert.ToString(dataSet.Tables[0].Rows[i]["PanValid"]),
                                AadharLinked = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharLinked"]),
                                ItFiled = Convert.ToString(dataSet.Tables[0].Rows[i]["ItFiled"]),
                                VehicleOwnerMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerMblNo"]),
                                VehicleInsDetails = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleInsDetails"]),
                                PermitValid = Convert.ToString(dataSet.Tables[0].Rows[i]["PermitValid"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                DriverAddress = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverAddress"]),
                                DriverLicNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicNo"]),
                                DriverLicIssuedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicIssuedAt"]),
                                DriverLicValid = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverLicValid"]),
                                DriverMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMblNo"]),
                                EngagedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["EngagedBy"]),
                                LoadedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadedBy"]),
                                UnLoadingBy = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingBy"]),
                                DeclarationYN = Convert.ToString(dataSet.Tables[0].Rows[i]["DeclarationYN"]),
                                DeclarationRecdBy = Convert.ToString(dataSet.Tables[0].Rows[i]["DeclarationRecdBy"]),
                                OdcLength = Convert.ToString(dataSet.Tables[0].Rows[i]["OdcLength"]),
                                OdcWidth = Convert.ToString(dataSet.Tables[0].Rows[i]["OdcLength"]),
                                OdcHeight = Convert.ToString(dataSet.Tables[0].Rows[i]["OdcHeight"]),
                                OdcCFT = Convert.ToString(dataSet.Tables[0].Rows[i]["OdcCFT"]),
                                TotActWt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotActWt"]),
                                TotChrgWt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotChrgWt"]),
                                RatePerTon = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerTon"]),
                                LorryHire = Convert.ToString(dataSet.Tables[0].Rows[i]["LorryHire"]),
                                ExtraHire1 = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraHire1"]),
                                ExtraHire2 = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraHire2"]),
                                ExtraHire3 = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraHire3"]),
                                Deduction1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Deduction1"]),
                                Deduction2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Deduction2"]),
                                SubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotal"]),
                                TdsPct = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsPct"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                TotalHire = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHire"]),
                                CashAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["CashAdvance"]),
                                CardAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["CardAdvance"]),
                                TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAdvance"]),
                                Balance = Convert.ToString(dataSet.Tables[0].Rows[i]["Balance"]),
                                BalancePayAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalancePayAt"]),
                                GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["GeneralRemarks"]),
                                Ftmid = Convert.ToString(dataSet.Tables[0].Rows[i]["Ftmid"]),
                                Photo1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Photo1"]),
                                Photo2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Photo2"]),
                                Photo3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Photo3"]),
                                TruckDriverImage = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckDriverImage"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                Cbranch = Convert.ToString(dataSet.Tables[0].Rows[i]["Cbranch"]),
                                FPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FPlace"]),
                                TPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TPlace"]),
                                CciInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvNo"]),
                                ContainerNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ContainerNo"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                            });
                        }

                        challanMasterList.ChallanList = challanList;

                        challanMasterList.PageMetaData = new PaginationMetaData
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
            return challanMasterList;
        }
        public async Task<ChallanMasterModelLLP> GetChallanInnerGridListLLP(RequestModel request)
        {
            ChallanMasterModelLLP challanModel = new()
            {
                ChallanDtls = new List<ChallanDetailModelLLP>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanInnerGridLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanModel.ChallanDtls.Add(new ChallanDetailModelLLP
                            {
                                ChallanId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                GcYear = Convert.ToString(dataSet.Tables[0].Rows[i]["GcYear"]),
                                GcBook = Convert.ToString(dataSet.Tables[0].Rows[i]["GcBook"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentId"]),
                                Fplace = Convert.ToString(dataSet.Tables[0].Rows[i]["Fplace"]),
                                Tplace = Convert.ToString(dataSet.Tables[0].Rows[i]["Tplace"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                ChallanPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanPkgs"]),
                                ChallanWT = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanWT"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challanModel;
        }
        public async Task<ResponseModel> ChallanMasterDeleteLLP(RequestModel requestModel)
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
                            new SqlParameter("@ChallanId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanMstDeleteLLP", param);

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
        public async Task<CciInvDetailModel> GetCCIInviceDetailLLP(RequestModel requestModel)
        {
            CciInvDetailModel cciInvDetailModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                       {
                             new SqlParameter("@ContainerNo", requestModel.strRequest),
                           new SqlParameter("@CciInvNo", requestModel.strRequest1),

                        };
                    var userData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCCIInvoiceDetailLLP", param);

                    if (userData != null && userData.Tables[0].Rows.Count > 0)
                    {
                        cciInvDetailModel.SgstAmt = Convert.ToString(userData.Tables[0].Rows[0]["SgstAmt"]);
                        cciInvDetailModel.CgstAmt = Convert.ToString(userData.Tables[0].Rows[0]["CgstAmt"]);
                        cciInvDetailModel.IgstAmt = Convert.ToString(userData.Tables[0].Rows[0]["IgstAmt"]);
                        cciInvDetailModel.TaxableAmt = Convert.ToString(userData.Tables[0].Rows[0]["TaxableAmt"]);


                    }
                    else
                    {

                        //tripKmsModel.Status = false;
                        // tripKmsModel.Message = "data not found";
                        // tripKmsModel.RunKmsPerDay = Convert.ToString(userData.Tables[0].Rows[0]["RunKmsPerDay"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return cciInvDetailModel;
        }
        public async Task<ResponseModel> GetChallanPrintPdfLLP(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/ChallanLLP/";

                string UrlParam = "?ChallanId=" + request.strRequest;
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
                responseModel.Status = false;
                responseModel.Message = "Error Fetching Report";
            }
            return responseModel;
        }
        public async Task<ResponseModel> ChkPanDeclaration(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PanNo", requestModel.strRequest),
                            new SqlParameter("@YearId",  requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkPanDeclaration", param);

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
            }
            return responseModel;
        }

        public async Task<ChallanMasterModelLLP> GetBrokerPanDetails(RequestModel request)
        {
            ChallanMasterModelLLP challanDetail = new ChallanMasterModelLLP();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Broker", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBrokerPanDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        challanDetail.BrokerMblNo = Convert.ToString(statusData.Tables[0].Rows[0]["BrokerMblNo"]);
                        challanDetail.VehicleOwnerName = Convert.ToString(statusData.Tables[0].Rows[0]["VehicleOwnerName"]);
                        challanDetail.VehicleOwnerPanNo = Convert.ToString(statusData.Tables[0].Rows[0]["VehicleOwnerPanNo"]);
                        challanDetail.DeclarationYN = Convert.ToString(statusData.Tables[0].Rows[0]["DeclarationYN"]);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return challanDetail;
        }
    }

}
