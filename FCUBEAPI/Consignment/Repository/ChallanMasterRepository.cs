using Consignment.Models;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.ExtendedProperties;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.NetworkInformation;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace Consignment.Repository
{
    public class ChallanMasterRepository: IChallanMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChallanMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> ChallanMasterSave(ChallanMasterModel challan)
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
                            new SqlParameter("@LoggedInUser",           challan.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanMstSave", param);
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
                                responseModel = await ChallanMasterDtlSave(transaction, challan.ChallanDtls[i]);
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
       
    public async Task<ResponseModel> ChallanMasterDtlSave(SqlTransaction transaction, ChallanDetailModel challanDtl)
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
                            new SqlParameter("@ChallanPkgs", challanDtl.ChallanPkgs),
                            new SqlParameter("@ChallanWT", challanDtl.ChallanWT),
                            new SqlParameter("@YearId", challanDtl.YearId),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanDtlsSave", param);

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

        public async Task<ChallanListModel> GetChallanMasterList(ReportRequestModel request)
        {
            ChallanListModel challanMasterList = new();
            List<ChallanMasterModel> challanList = new();
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
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanList.Add(new ChallanMasterModel
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
                                PanValid = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharLinked"]),
                                ItFiled = Convert.ToString(dataSet.Tables[0].Rows[i]["ItFiled"]),
                                VehicleOwnerMblNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleOwnerMblNo"]),
                                VehicleInsDetails = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleInsDetails"]),
                                PermitValid = Convert.ToString(dataSet.Tables[0].Rows[i]["PermitValid"]),
                                DriverName= Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
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
                                LorryHire= Convert.ToString(dataSet.Tables[0].Rows[i]["LorryHire"]),
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
                                Photo1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Photo1"]),
                                Photo2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Photo2"]),
                                Photo3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Photo3"]),
                                TruckDriverImage = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckDriverImage"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                Cbranch = Convert.ToString(dataSet.Tables[0].Rows[i]["Cbranch"]),
                                FPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FPlace"]),
                                TPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TPlace"]),
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
        public async Task<ChallanMasterModel> GetChallanInnerGridList(RequestModel request)
        {
            ChallanMasterModel challanModel = new()
            {
                ChallanDtls = new List<ChallanDetailModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanInnerGrid", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challanModel.ChallanDtls.Add(new ChallanDetailModel
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

        public async Task<ResponseModel> ChallanMasterDelete(RequestModel requestModel)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChallanMstDelete", param);

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
        public async Task<ResponseModel> GetChallanNo(RequestModel requestModel)
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
                            new SqlParameter("@Branch", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_getChallanNo", param);

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
        public async Task<ResponseModel> CheckDuplicateChallan(RequestModel requestModel)
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
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@ChallanNo", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicateChallan", param);

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
        public async Task<ChallanMasterModel> GetConsignmentId(RequestModel requestModel)
        {
            ChallanMasterModel challanModel = new()
            {
                ChallanDtls = new List<ChallanDetailModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@Branch", requestModel.strRequest),
                        new SqlParameter("@GCNoteNo",requestModel.strRequest1),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsignmentId", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        challanModel.ChallanDtls.Add(new ChallanDetailModel
                        {
                            ChallanId = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanId"]),
                            GcYear = Convert.ToString(dataSet.Tables[0].Rows[0]["GcYear"]),
                            GcBook = Convert.ToString(dataSet.Tables[0].Rows[0]["GcBook"]),
                            GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]),
                            ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]),
                            Fplace = Convert.ToString(dataSet.Tables[0].Rows[0]["Fplace"]),
                            Tplace = Convert.ToString(dataSet.Tables[0].Rows[0]["Tplace"]),
                            BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]),
                            ChallanPkgs = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanPkgs"]),
                            ChallanWT = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanWT"]),
                        });
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challanModel;            
        }
        public async Task<ChallanMasterModel> GetChallanDetailsFromLR(RequestModel request)
        {
            ChallanMasterModel challanModel = new()
            {
                ChallanDtls = new List<ChallanDetailModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@GCNoteNo", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanDetailsFromLR", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        challanModel.ChallanFromStn     = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanFromStn"]);
                        challanModel.ChallanToStn       = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanToStn"]);
                        challanModel.DistanceKms        = Convert.ToString(dataSet.Tables[0].Rows[0]["DistanceKms"]);
                        challanModel.BrokerId           = Convert.ToString(dataSet.Tables[0].Rows[0]["BrokerId"]);
                        challanModel.OwnTruckYN         = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnTruckYN"]);
                        challanModel.TruckNo            = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckNo"]);
                        challanModel.VehicleType        = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleType"]);
                        challanModel.VehicleOwnerName   = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerName"]);
                        challanModel.VehicleOwnerAdd1   = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerAdd1"]);
                        challanModel.VehicleOwnerAdd2   = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerAdd2"]);
                        challanModel.VehicleOwnerPanNo  = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerPanNo"]);
                        challanModel.VehicleOwnerMblNo  = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerMblNo"]);
                        challanModel.DriverLicNo        = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicNo"]);
                        challanModel.DriverLicValid     = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicValid"]);
                        challanModel.DriverMblNo        = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverMblNo"]);
                        challanModel.OdcCFT             = Convert.ToString(dataSet.Tables[0].Rows[0]["OdcCFT"]);
                        challanModel.TotPkgs            = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanPkgs"]);
                        challanModel.TotActWt           = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanWT"]);
                        challanModel.RatePerTon         = Convert.ToString(dataSet.Tables[0].Rows[0]["RatePerTon"]);
                        challanModel.LorryHire          = Convert.ToString(dataSet.Tables[0].Rows[0]["LorryHire"]);
                        challanModel.SubTotal           = Convert.ToString(dataSet.Tables[0].Rows[0]["SubTotal"]);
                        challanModel.VehicleModel       = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleModel"]);
                        challanModel.EngineNo           = Convert.ToString(dataSet.Tables[0].Rows[0]["EngineNo"]);
                        challanModel.ChassisNo          = Convert.ToString(dataSet.Tables[0].Rows[0]["ChassisNo"]);
                        challanModel.EngagedBy          = Convert.ToString(dataSet.Tables[0].Rows[0]["EngagedBy"]);
                        challanModel.LoadedBy           = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadedBy"]);

                        challanModel.ChallanDtls.Add(new ChallanDetailModel
                        {
                            GcYear = Convert.ToString(dataSet.Tables[0].Rows[0]["GcYear"]),
                            GcBook = Convert.ToString(dataSet.Tables[0].Rows[0]["GcBook"]),
                            GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]),
                            ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]),
                            Fplace = Convert.ToString(dataSet.Tables[0].Rows[0]["Fplace"]),
                            Tplace = Convert.ToString(dataSet.Tables[0].Rows[0]["Tplace"]),
                            BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]),
                            ChallanPkgs = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanPkgs"]),
                            ChallanWT = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanWT"]),
                        });
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challanModel;
        }


        public async Task<PanApiResultModel> GetPanValidDetails(RequestModel request)
        {
            PanApiResultModel panresult = new();
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PanNo", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPanUsedDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        Reslt res = new();
                        res.number = Convert.ToString(statusData.Tables[0].Rows[0]["PanNo"]);
                        res.name = Convert.ToString(statusData.Tables[0].Rows[0]["OwnerName"]);
                        res.isValid = Convert.ToString(statusData.Tables[0].Rows[0]["ValidYN"])=="Y"? true:false;
                        res.aadhaarSeedingStatusCode = Convert.ToString(statusData.Tables[0].Rows[0]["AadharYN"]);

                        panresult.result = res;
                    }
                    else
                    {
                        var panNo = request.strRequest;
                        string URL = "https://fcube.net/panapi/api.php";

                        string urlParameters = "?pan=" + panNo;

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

                            var root = JsonConvert.DeserializeObject<ApiRoot>(result);

                            panresult.result = root.result;

                            if (panresult.result.isValid==true)
                            {
                                if (panNo.Substring(3, 1)== "P" || panNo.Substring(3, 1) == "H") 
                                {
                                    if (panresult.result.aadhaarSeedingStatusCode=="Y")
                                    {
                                        responseModel = await PanDtlSave(request, panresult.result);
                                    }
                                }
                                else
                                {
                                    responseModel = await PanDtlSave(request, panresult.result);
                                }
                            }                         
                           

                            client.Dispose();
                        }
                    }
                }
               
            }
            catch (Exception ex)
            {

            }
            return panresult;
        }

        public async Task<ResponseModel> PanDtlSave(RequestModel request,Reslt res)
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
                            new SqlParameter("@PanNo",          res.number),
                            new SqlParameter("@ValidYN",        res.isValid==true? "Y" : "N"),
                            new SqlParameter("@AadharYN",       res.aadhaarSeedingStatusCode),
                            new SqlParameter("@ItFiledYN",      "N"),
                            new SqlParameter("@OwnerName",      res.name),
                            new SqlParameter("@EntryThrough",   "A"),
                            new SqlParameter("@LoggedInUser",   request.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_PanUsedSave", param);

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

        public async Task<ResponseModel> CheckChallanPrepForLr(RequestModel request)
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
                           new SqlParameter("@GCNoteNo",   request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkChallanPrepForLr", param);

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
