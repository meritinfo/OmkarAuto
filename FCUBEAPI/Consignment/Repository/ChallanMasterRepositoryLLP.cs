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
    public class ChallanMasterRepositoryLLP : IChallanMasterRepositoryLLP
    {
        private readonly IOptions<DBModel> dbconnection;

        public ChallanMasterRepositoryLLP(IOptions<DBModel> _dbconnection)
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
        public async Task<ChallanMasterModelLLP> GetChallanEnqDetailsLLP(RequestModel req)
        {
            ChallanMasterModelLLP chlnmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChallanNo",  req.strRequest),
                            new SqlParameter("@Branch",     req.strRequest1),
                            new SqlParameter("@YearId",     req.strRequest2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanEnqDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        chlnmodel.ChallanId = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanId"]);
                        chlnmodel.ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanBranch"]);
                        chlnmodel.ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanNo"]);
                        chlnmodel.ChallanDateTime = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanDateTime"]);
                        chlnmodel.ChStatus = Convert.ToString(dataSet.Tables[0].Rows[0]["ChStatus"]);
                        chlnmodel.ChSuppYN = Convert.ToString(dataSet.Tables[0].Rows[0]["ChSuppYN"]);
                        chlnmodel.ChallanFromStn = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanFromStn"]);
                        chlnmodel.ChallanToStn = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanToStn"]);
                        chlnmodel.DistanceKms = Convert.ToString(dataSet.Tables[0].Rows[0]["DistanceKms"]);
                        chlnmodel.ExpArrivalDate = Convert.ToString(dataSet.Tables[0].Rows[0]["ExpArrivalDate"]);
                        chlnmodel.MainChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["MainChallanBranch"]);
                        chlnmodel.MainChallanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["MainChallanNo"]);
                        chlnmodel.BrokerId = Convert.ToString(dataSet.Tables[0].Rows[0]["BrokerId"]);
                        chlnmodel.BrokerMblNo = Convert.ToString(dataSet.Tables[0].Rows[0]["BrokerMblNo"]);
                        chlnmodel.OwnTruckYN = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnTruckYN"]);
                        chlnmodel.TruckNo = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckNo"]);
                        chlnmodel.VehicleType = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleType"]);
                        chlnmodel.VehicleMake = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleMake"]);
                        chlnmodel.VehicleModel = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleModel"]);
                        chlnmodel.EngineNo = Convert.ToString(dataSet.Tables[0].Rows[0]["EngineNo"]);
                        chlnmodel.ChassisNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ChassisNo"]);
                        chlnmodel.VehicleOwnerName = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerName"]);
                        chlnmodel.VehicleOwnerAdd1 = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerAdd1"]);
                        chlnmodel.VehicleOwnerAdd2 = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerAdd2"]);
                        chlnmodel.VehicleOwnerPanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerPanNo"]);
                        chlnmodel.PanValid = Convert.ToString(dataSet.Tables[0].Rows[0]["PanValid"]);
                        chlnmodel.AadharLinked = Convert.ToString(dataSet.Tables[0].Rows[0]["AadharLinked"]);
                        chlnmodel.ItFiled = Convert.ToString(dataSet.Tables[0].Rows[0]["ItFiled"]);
                        chlnmodel.VehicleOwnerMblNo = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerMblNo"]);
                        chlnmodel.VehicleInsDetails = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleInsDetails"]);
                        chlnmodel.PermitValid = Convert.ToString(dataSet.Tables[0].Rows[0]["PermitValid"]);
                        chlnmodel.DriverName = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverName"]);
                        chlnmodel.DriverAddress = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverAddress"]);
                        chlnmodel.DriverLicNo = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicNo"]);
                        chlnmodel.DriverLicIssuedAt = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicIssuedAt"]);
                        chlnmodel.DriverLicValid = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicValid"]);
                        chlnmodel.DriverMblNo = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverMblNo"]);
                        chlnmodel.EngagedBy = Convert.ToString(dataSet.Tables[0].Rows[0]["EngagedBy"]);
                        chlnmodel.LoadedBy = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadedBy"]);
                        chlnmodel.UnLoadingBy = Convert.ToString(dataSet.Tables[0].Rows[0]["UnLoadingBy"]);
                        chlnmodel.DeclarationYN = Convert.ToString(dataSet.Tables[0].Rows[0]["DeclarationYN"]);
                        chlnmodel.DeclarationRecdBy = Convert.ToString(dataSet.Tables[0].Rows[0]["DeclarationRecdBy"]);
                        chlnmodel.OdcLength = Convert.ToString(dataSet.Tables[0].Rows[0]["OdcLength"]);
                        chlnmodel.OdcWidth = Convert.ToString(dataSet.Tables[0].Rows[0]["OdcLength"]);
                        chlnmodel.OdcHeight = Convert.ToString(dataSet.Tables[0].Rows[0]["OdcHeight"]);
                        chlnmodel.OdcCFT = Convert.ToString(dataSet.Tables[0].Rows[0]["OdcCFT"]);
                        chlnmodel.TotActWt = Convert.ToString(dataSet.Tables[0].Rows[0]["TotActWt"]);
                        chlnmodel.TotChrgWt = Convert.ToString(dataSet.Tables[0].Rows[0]["TotChrgWt"]);
                        chlnmodel.RatePerTon = Convert.ToString(dataSet.Tables[0].Rows[0]["RatePerTon"]);
                        chlnmodel.LorryHire = Convert.ToString(dataSet.Tables[0].Rows[0]["LorryHire"]);
                        chlnmodel.ExtraHire1 = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtraHire1"]);
                        chlnmodel.ExtraHire2 = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtraHire2"]);
                        chlnmodel.ExtraHire3 = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtraHire3"]);
                        chlnmodel.Deduction1 = Convert.ToString(dataSet.Tables[0].Rows[0]["Deduction1"]);
                        chlnmodel.Deduction2 = Convert.ToString(dataSet.Tables[0].Rows[0]["Deduction2"]);
                        chlnmodel.SubTotal = Convert.ToString(dataSet.Tables[0].Rows[0]["SubTotal"]);
                        chlnmodel.TdsPct = Convert.ToString(dataSet.Tables[0].Rows[0]["TdsPct"]);
                        chlnmodel.TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["TdsAmt"]);
                        chlnmodel.TotalHire = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalHire"]);
                        chlnmodel.CashAdvance = Convert.ToString(dataSet.Tables[0].Rows[0]["CashAdvance"]);
                        chlnmodel.CardAdvance = Convert.ToString(dataSet.Tables[0].Rows[0]["CardAdvance"]);
                        chlnmodel.TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalAdvance"]);
                        chlnmodel.Balance = Convert.ToString(dataSet.Tables[0].Rows[0]["Balance"]);
                        chlnmodel.BalancePayAt = Convert.ToString(dataSet.Tables[0].Rows[0]["BalancePayAt"]);
                        chlnmodel.GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[0]["GeneralRemarks"]);
                        chlnmodel.TotPkgs = Convert.ToString(dataSet.Tables[0].Rows[0]["TotPkgs"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return chlnmodel;
        }
        public async Task<ChallanMasterModelLLP> GetChallanEnqInnerGridListLLP(RequestModel request)
        {
            ChallanMasterModelLLP challan = new()
            {

                CnList = new List<ConsignmentModel>(),
                LhpmList = new List<ConsignmentLhpmModel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChallanId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanEnqInnerGridList", param);

                    if (dataSet != null)
                    {

                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            challan.CnList.Add(new ConsignmentModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                CnorName = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorName"]),
                                CnorPin = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorPin"]),
                                CnorGst = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorGst"]),
                                CneeId = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeId"]),
                                CneeName = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeName"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[1].Rows.Count; i++)
                        {
                            challan.LhpmList.Add(new ConsignmentLhpmModel
                            {
                                PmtStation = Convert.ToString(dataSet.Tables[1].Rows[i]["PmtStation"]),
                                PmtNo = Convert.ToString(dataSet.Tables[1].Rows[i]["PmtNo"]),
                                PmtDate = Convert.ToString(dataSet.Tables[1].Rows[i]["PmtDate"]),
                                ChallanStn = Convert.ToString(dataSet.Tables[1].Rows[i]["ChallanStn"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[1].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[1].Rows[i]["ChallanDate"]),
                                AbType = Convert.ToString(dataSet.Tables[1].Rows[i]["ABType"]),
                                HireAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["HireAmt"]),
                                HamaliAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["HamaliAmt"]),
                                DetenAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["DetenAmt"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["OtherAmt"]),
                                RecoveryAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["RecoveryAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["TdsAmt"]),
                                LhpmAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["LhpmAmt"]),
                                OthDedAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["OthDedAmt"]),
                                Oth2DedAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["Oth2DedAmt"]),
                                DeductRemarks = Convert.ToString(dataSet.Tables[1].Rows[i]["DeductRemarks"]),
                                BenId = Convert.ToString(dataSet.Tables[1].Rows[i]["BenId"]),
                            });
                        }

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challan;
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
        public async Task<ResponseModel> GetChallanNoLLP(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@YearId", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanNoLLP", param);

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
        public async Task<ResponseModel> CheckDuplicateChallanLLP(RequestModel requestModel)
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
                            new SqlParameter("@YearId", requestModel.strRequest2),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicateChallanLLP", param);

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
        public async Task<ChallanMasterModelLLP> GetConsignmentIdLLP(RequestModel requestModel)
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
                        new SqlParameter("@GcYear", requestModel.strRequest),
                        new SqlParameter("@GcBook",requestModel.strRequest1),
                        new SqlParameter("@GCNoteNo",requestModel.strRequest2),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsignmentIdLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        challanModel.ChallanDtls.Add(new ChallanDetailModelLLP
                        {
                            ChallanId = "",
                            GcYear = Convert.ToString(dataSet.Tables[0].Rows[0]["GcYear"]),
                            GcBook = Convert.ToString(dataSet.Tables[0].Rows[0]["GcBook"]),
                            GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]),
                            ConsignmentId = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]),
                            Fplace = Convert.ToString(dataSet.Tables[0].Rows[0]["Fplace"]),
                            Tplace = Convert.ToString(dataSet.Tables[0].Rows[0]["Tplace"]),
                            BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]),
                            ChallanPkgs = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanPkgs"]),
                            ChallanWT = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanWT"]),
                            ContainerNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ContainerNo"]),
                        });
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return challanModel;
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
        public async Task<ChallanMasterModelLLP> GetChallanDetailsFromLRLLP(RequestModel request)
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
                            new SqlParameter("@GCNoteNo", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChallanDetailsFromLRLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        challanModel.ChallanFromStn = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanFromStn"]);
                        challanModel.ChallanToStn = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanToStn"]);
                        challanModel.DistanceKms = Convert.ToString(dataSet.Tables[0].Rows[0]["DistanceKms"]);
                        challanModel.BrokerId = Convert.ToString(dataSet.Tables[0].Rows[0]["BrokerId"]);
                        challanModel.OwnTruckYN = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnTruckYN"]);
                        challanModel.TruckNo = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckNo"]);
                        challanModel.VehicleType = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleType"]);
                        challanModel.VehicleOwnerName = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerName"]);
                        challanModel.VehicleOwnerAdd1 = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerAdd1"]);
                        challanModel.VehicleOwnerAdd2 = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerAdd2"]);
                        challanModel.VehicleOwnerPanNo = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerPanNo"]);
                        challanModel.VehicleOwnerMblNo = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleOwnerMblNo"]);
                        challanModel.DriverLicNo = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicNo"]);
                        challanModel.DriverLicValid = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverLicValid"]);
                        challanModel.DriverMblNo = Convert.ToString(dataSet.Tables[0].Rows[0]["DriverMblNo"]);
                        challanModel.OdcCFT = Convert.ToString(dataSet.Tables[0].Rows[0]["OdcCFT"]);
                        challanModel.TotPkgs = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanPkgs"]);
                        challanModel.TotActWt = Convert.ToString(dataSet.Tables[0].Rows[0]["ChallanWT"]);
                        challanModel.RatePerTon = Convert.ToString(dataSet.Tables[0].Rows[0]["RatePerTon"]);
                        challanModel.LorryHire = Convert.ToString(dataSet.Tables[0].Rows[0]["LorryHire"]);
                        challanModel.SubTotal = Convert.ToString(dataSet.Tables[0].Rows[0]["SubTotal"]);
                        challanModel.CashAdvance = Convert.ToString(dataSet.Tables[0].Rows[0]["cashAdvance"]);
                        challanModel.Balance = Convert.ToString(dataSet.Tables[0].Rows[0]["Balance"]);
                        challanModel.VehicleModel = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleModel"]);
                        challanModel.EngineNo = Convert.ToString(dataSet.Tables[0].Rows[0]["EngineNo"]);
                        challanModel.ChassisNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ChassisNo"]);
                        challanModel.EngagedBy = Convert.ToString(dataSet.Tables[0].Rows[0]["EngagedBy"]);
                        challanModel.LoadedBy = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadedBy"]);

                        challanModel.ChallanDtls.Add(new ChallanDetailModelLLP
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

        public async Task<PanApiResultModel> GetPanValidDetailsLLP(RequestModel request)
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
                        res.isValid = Convert.ToString(statusData.Tables[0].Rows[0]["ValidYN"]) == "Y" ? true : false;
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

                            if (result.Contains("number"))
                            {
                                var root = JsonConvert.DeserializeObject<ApiRoot>(result);

                                panresult.result = root.result;

                                if (panresult.result.isValid == true)
                                {
                                    if (panNo.Substring(3, 1) == "P" || panNo.Substring(3, 1) == "H")
                                    {
                                        if (panresult.result.aadhaarSeedingStatusCode == "Y")
                                        {
                                            responseModel = await PanDtlSaveLLP(request, panresult.result);
                                        }
                                    }
                                    else
                                    {
                                        responseModel = await PanDtlSaveLLP(request, panresult.result);
                                    }
                                }

                            }
                            else
                            {
                                responseModel.Status = false;
                                responseModel.Message = result;
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
        public async Task<ResponseModel> PanDtlSaveLLP(RequestModel request, Reslt res)
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
        public async Task<ResponseModel> CheckChallanPrepForLrLLP(RequestModel request)
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
                            new SqlParameter("@GcYear", request.strRequest),
                            new SqlParameter("@GcBook",request.strRequest1),
                            new SqlParameter("@GCNoteNo",request.strRequest2),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkChallanPrepForLrLLP", param);

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
    }

}
