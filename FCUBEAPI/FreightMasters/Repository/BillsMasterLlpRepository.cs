using DocumentFormat.OpenXml.Office2016.Excel;
using FreightMasters.Models;
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

namespace FreightMasters.Repository
{
    public class BillsMasterLlpRepository: IBillsMasterLlpRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillsMasterLlpRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BillsMasterSaveLLP(BillsMasterModelLLP billsModel)
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
                            new SqlParameter("@BillsMasterId",      billsModel.BillsMasterId),
                            new SqlParameter("@BillingStation",     billsModel.BillingStation),
                            new SqlParameter("@BillNo",             billsModel.BillNo),
                            new SqlParameter("@BillStatus",         billsModel.BillStatus),
                            new SqlParameter("@BillType",           billsModel.BillType),
                            new SqlParameter("@SacHsn",             billsModel.SacHsn),
                            new SqlParameter("@BillDate",           billsModel.BillDate),
                            new SqlParameter("@DueDate",            billsModel.DueDate),
                            new SqlParameter("@SuppYN",             billsModel.SuppYN),
                            new SqlParameter("@PartyCode",          billsModel.PartyCode),
                            new SqlParameter("@PartyGstLocation",   billsModel.PartyGstLocation),
                            new SqlParameter("@CollBranch",         billsModel.CollBranch),
                            new SqlParameter("@GstType",            billsModel.GstType),
                            new SqlParameter("@GstBy",              billsModel.GstBy),
                            new SqlParameter("@TotalFreight",       billsModel.TotalFreight),
                            new SqlParameter("@TotalStatistical",   billsModel.TotalStatistical),
                            new SqlParameter("@TotalFov",           billsModel.TotalFov),
                            new SqlParameter("@TotalDoorColl",      billsModel.TotalDoorColl),
                            new SqlParameter("@TotalHandling",      billsModel.TotalHandling),
                            new SqlParameter("@TotalLoadingDetn",   billsModel.TotalLoadingDetn),
                            new SqlParameter("@TotalEnroute",       billsModel.TotalEnroute),
                            new SqlParameter("@TotalMisc",          billsModel.TotalMisc),
                            new SqlParameter("@TotalDoorDel",       billsModel.TotalDoorDel),
                            new SqlParameter("@TotalUnLoading",     billsModel.TotalUnLoading),
                            new SqlParameter("@TotalDetention",     billsModel.TotalDetention),
                            new SqlParameter("@TotalExtras",        billsModel.TotalExtras),
                            new SqlParameter("@TotalOthers",        billsModel.TotalOthers),
                            new SqlParameter("@TotalSubTotal",      billsModel.TotalSubTotal),
                            new SqlParameter("@TotalSgstAmt",       billsModel.TotalSgstAmt),
                            new SqlParameter("@TotalCgstAmt",       billsModel.TotalCgstAmt),
                            new SqlParameter("@TotalIgstAmt",       billsModel.TotalIgstAmt),
                            new SqlParameter("@TotalNonGstAmt1",    billsModel.TotalNonGstAmt1),
                            new SqlParameter("@TotalNonGstAmt2",    billsModel.TotalNonGstAmt2),
                            new SqlParameter("@TotalGtotal",        billsModel.TotalGtotal),
                            new SqlParameter("@BillRemarks",        billsModel.BillRemarks),
                            new SqlParameter("@SuppParticulars",    billsModel.SuppParticulars),
                            new SqlParameter("@EnlcosedDocs",       billsModel.EnlcosedDocs),
                            new SqlParameter("@BillSeries",       billsModel.BillSeries ),
                            new SqlParameter("@BillSlNo",       billsModel.BillSlNo),
                            new SqlParameter("@CgstPct",       billsModel.CgstPct),
                            new SqlParameter("@SgstPct",       billsModel.SgstPct),
                            new SqlParameter("@IgstPct",       billsModel.IgstPct),
                            new SqlParameter("@YearId",             billsModel.YearId),
                            new SqlParameter("@LoggedInUser",       billsModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsMstSaveLLP", param);
                    var BillsMasterId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        BillsMasterId = responseModel.Message;

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < billsModel.BillsMasterListData.Count; i++)
                            {
                                billsModel.BillsMasterListData[i].BillsMasterId = BillsMasterId.ToString();
                                responseModel = await BillsMasterDtlSaveLLP(transaction, billsModel.BillsMasterListData[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = billsModel.BillsMasterListData.Count;
                                }
                            }
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
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
        public async Task<ResponseModel> BillsMasterDtlSaveLLP(SqlTransaction transaction, BillsDetailModelLLP billsDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillDetailId",   billsDtl.BillDetailId),
                            new SqlParameter("@BillsMasterId",  billsDtl.BillsMasterId),
                            new SqlParameter("@BillingStation",    billsDtl.BillingStation),
                            new SqlParameter("@BillNo", billsDtl.BillNo),
                            new SqlParameter("@BillDate", billsDtl.BillDate),
                            new SqlParameter("@BillType", billsDtl.BillType),
                            new SqlParameter("@PartyCode", billsDtl.PartyCode),
                            new SqlParameter("@GcBranch", billsDtl.GcBranch),
                            new SqlParameter("@GcYear", billsDtl.GcYear),
                            new SqlParameter("@GcNoteNo", billsDtl.GcNoteNo),
                            new SqlParameter("@Consignmentid", billsDtl.Consignmentid),
                            new SqlParameter("@Freight", billsDtl.Freight),
                            new SqlParameter("@Statistical", billsDtl.Statistical),
                            new SqlParameter("@Fov", billsDtl.Fov),
                            new SqlParameter("@DoorColl", billsDtl.DoorColl),
                            new SqlParameter("@Handling", billsDtl.Handling),
                            new SqlParameter("@LoadingDetn", billsDtl.LoadingDetn),
                            new SqlParameter("@Enroute", billsDtl.Enroute),
                            new SqlParameter("@Misc", billsDtl.Misc),
                            new SqlParameter("@DoorDel", billsDtl.DoorDel),
                            new SqlParameter("@UnLoading", billsDtl.UnLoading),
                            new SqlParameter("@Detention", billsDtl.Detention),
                            new SqlParameter("@Extras", billsDtl.Extras),
                            new SqlParameter("@Others", billsDtl.Others),
                            new SqlParameter("@SubTotal", billsDtl.SubTotal),
                            new SqlParameter("@SgstAmt", billsDtl.SgstAmt),
                            new SqlParameter("@CgstAmt", billsDtl.CgstAmt),
                            new SqlParameter("@IgstAmt", billsDtl.IgstAmt),
                            new SqlParameter("@NonGstAmt1", billsDtl.NonGstAmt1),
                            new SqlParameter("@NonGstAmt2", billsDtl.NonGstAmt2),
                            new SqlParameter("@Gtotal", billsDtl.Gtotal),
                            new SqlParameter("@DedAmt", billsDtl.DedAmt),
                            new SqlParameter("@YearId", billsDtl.YearId),
                            new SqlParameter("@SuppBillDetRemarks", billsDtl.SuppBillDetRemarks),
                            new SqlParameter("@Remarks1", billsDtl.Remarks1),
                            new SqlParameter("@Remarks2", billsDtl.Remarks2),
                            new SqlParameter("@Remarks3", billsDtl.Remarks3),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsDtlsSaveLLP", param);

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
            { }
            return responseModel;
        }

        public async Task<BillsMasterSearchListModelLLP> GetBillsMasterSearchList(RequestModel request)
        {
            BillsMasterSearchListModelLLP billsMasterSearchList = new();
            List<BillsMasterSearchModelLLP> billsMasterSearchModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty",   request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsMasterSearchListLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = 0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsMasterSearchModel.Add(new BillsMasterSearchModelLLP
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                FovRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FovRs"]),
                                DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorCollRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDelRs"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingDetnRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                GstBy = Convert.ToString(dataSet.Tables[0].Rows[i]["GstBy"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),

                                Selected = false
                            });
                        }

                        billsMasterSearchList.BillsMasterSearchList = billsMasterSearchModel;
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return billsMasterSearchList;
        }
        public async Task<ResponseModel> LrBillUpdate(RequestModel reqmodel)
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
                            new SqlParameter("@GcNoteNo", reqmodel.strRequest),
                            new SqlParameter("@BillNo", reqmodel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LrBillUpdate", param);

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
        public async Task<BillsListModelLLP> GetBillsMasterList(ReportRequestModel request)
        {
            BillsListModelLLP billsMasterList = new();
            List<BillsMasterModelLLP> billsList = new();
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
                            new SqlParameter("@SuppYN",     request.FilterStr),
                            new SqlParameter("@LoginBranch",request.SortOrder),
                            new SqlParameter("@YearId",     request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsMasterListLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsList.Add(new BillsMasterModelLLP
                            {
                                BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsMasterId"]),
                                BillingStation = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingStation"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                BillStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStatus"]),
                                BillType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillType"]),
                                SacHsn = Convert.ToString(dataSet.Tables[0].Rows[i]["SacHsn"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                DueDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DueDate"]),
                                SuppYN = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppYN"]),
                                PartyCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                PartyGstLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyGstLocation"]),
                                CollBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["CollBranch"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                GstBy = Convert.ToString(dataSet.Tables[0].Rows[i]["GstBy"]),
                                TotalFreight = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalFreight"]),
                                TotalStatistical = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalStatistical"]),
                                TotalFov = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalFov"]),
                                TotalDoorColl = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDoorColl"]),
                                TotalHandling = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHandling"]),
                                TotalLoadingDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLoadingDetn"]),
                                TotalEnroute = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalEnroute"]),
                                TotalMisc = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalMisc"]),
                                TotalDoorDel = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDoorDel"]),
                                TotalUnLoading = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalUnLoading"]),
                                TotalDetention = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDetention"]),
                                TotalExtras = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalExtras"]),
                                TotalOthers = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthers"]),
                                TotalSubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSubTotal"]),
                                TotalSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                TotalNonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNonGstAmt1"]),
                                TotalNonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNonGstAmt2"]),
                                TotalGtotal = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalGtotal"]),
                                BillRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["BillRemarks"]),
                                EnlcosedDocs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnlcosedDocs"]),
                                SuppParticulars = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppParticulars"]),
                                Attachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachedfile"]),
                                BillAmtCleared = Convert.ToString(dataSet.Tables[0].Rows[i]["BillAmtCleared"]),
                                BillDed = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDed"]),
                                BillTDS = Convert.ToString(dataSet.Tables[0].Rows[i]["BillTDS"]),
                                Recoverable = Convert.ToString(dataSet.Tables[0].Rows[i]["Recoverable"]),
                                BillExcess = Convert.ToString(dataSet.Tables[0].Rows[i]["BillExcess"]),
                                SdEmdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SdEmdAmt"]),
                                RecoveredAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecoveredAmt"]),
                                PrintedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintedYN"]),
                                PrintedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PrintedDate"]),
                                MRDone = Convert.ToString(dataSet.Tables[0].Rows[i]["MRDone"]),
                                MRDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MRDate"]),
                                SubmitYN = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitYN"]),
                                SubmitDate = Convert.ToString(dataSet.Tables[0].Rows[i]["SubmitDate"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                FinFtmid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinFtmid"]),
                                CheckedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CheckedBy"]),
                                ApprovedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedBy"]),
                                DisputeType = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeType"]),
                                DisputeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeDate"]),
                                DisputeCaseNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeCaseNo"]),
                                DisputeCaseStory = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeCaseStory"]),
                                DisputeReleaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DisputeReleaseDate"]),
                                StationName = Convert.ToString(dataSet.Tables[0].Rows[i]["StationName"]),
                                Party = Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                BillSeries = Convert.ToString(dataSet.Tables[0].Rows[i]["BillSeries"]),
                                BillSlNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillSlNo"]),
                                CollectionBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["CollectionBranch"]),
                                CgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                IgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                SgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                            });
                        }

                        billsMasterList.BillsList = billsList;

                        billsMasterList.PageMetaData = new PaginationMetaData
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
            return billsMasterList;
        }
        public async Task<BillsMasterModelLLP> GetBillEnqDetails(RequestModel req)
        {
            BillsMasterModelLLP billmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillNo", req.strRequest),
                              new SqlParameter("@Branch", req.strRequest1),
                              new SqlParameter("@YearId", req.strRequest2),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillEnqDetailsLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        billmodel.BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[0]["BillsMasterId"]);
                        billmodel.BillingStation = Convert.ToString(dataSet.Tables[0].Rows[0]["BillingStation"]);
                        billmodel.BillNo = Convert.ToString(dataSet.Tables[0].Rows[0]["BillNo"]);
                        billmodel.BillStatus = Convert.ToString(dataSet.Tables[0].Rows[0]["BillStatus"]);
                        billmodel.BillType = Convert.ToString(dataSet.Tables[0].Rows[0]["BillType"]);
                        billmodel.SacHsn = Convert.ToString(dataSet.Tables[0].Rows[0]["SacHsn"]);
                        billmodel.BillDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BillDate"]);
                        billmodel.DueDate = Convert.ToString(dataSet.Tables[0].Rows[0]["DueDate"]);
                        billmodel.SuppYN = Convert.ToString(dataSet.Tables[0].Rows[0]["SuppYN"]);
                        billmodel.PartyCode = Convert.ToString(dataSet.Tables[0].Rows[0]["PartyCode"]);
                        billmodel.PartyGstLocation = Convert.ToString(dataSet.Tables[0].Rows[0]["PartyGstLocation"]);
                        billmodel.CollBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["CollBranch"]);
                        billmodel.GstType = Convert.ToString(dataSet.Tables[0].Rows[0]["GstType"]);
                        billmodel.TotalFreight = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalFreight"]);
                        billmodel.TotalStatistical = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalStatistical"]);
                        billmodel.TotalFov = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalFov"]);
                        billmodel.TotalDoorColl = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalDoorColl"]);
                        billmodel.TotalHandling = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalHandling"]);
                        billmodel.TotalLoadingDetn = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalLoadingDetn"]);
                        billmodel.TotalEnroute = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalEnroute"]);
                        billmodel.TotalMisc = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalMisc"]);
                        billmodel.TotalDoorDel = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalDoorDel"]);
                        billmodel.TotalUnLoading = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalUnLoading"]);
                        billmodel.TotalDetention = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalDetention"]);
                        billmodel.TotalExtras = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalExtras"]);
                        billmodel.TotalOthers = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalOthers"]);
                        billmodel.TotalSubTotal = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalSubTotal"]);
                        billmodel.TotalSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalSgstAmt"]);
                        billmodel.TotalCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalCgstAmt"]);
                        billmodel.TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalIgstAmt"]);
                        billmodel.TotalNonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalNonGstAmt1"]);
                        billmodel.TotalNonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalNonGstAmt2"]);
                        billmodel.TotalGtotal = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalGtotal"]);
                        billmodel.BillRemarks = Convert.ToString(dataSet.Tables[0].Rows[0]["BillRemarks"]);
                        billmodel.EnlcosedDocs = Convert.ToString(dataSet.Tables[0].Rows[0]["EnlcosedDocs"]);
                        billmodel.SuppParticulars = Convert.ToString(dataSet.Tables[0].Rows[0]["SuppParticulars"]);

                        billmodel.BillAmtCleared = Convert.ToString(dataSet.Tables[0].Rows[0]["BillAmtCleared"]);
                        billmodel.BillDed = Convert.ToString(dataSet.Tables[0].Rows[0]["BillDed"]);
                        billmodel.BillTDS = Convert.ToString(dataSet.Tables[0].Rows[0]["BillTDS"]);
                        billmodel.Recoverable = Convert.ToString(dataSet.Tables[0].Rows[0]["Recoverable"]);
                        billmodel.BillExcess = Convert.ToString(dataSet.Tables[0].Rows[0]["BillExcess"]);
                        billmodel.SdEmdAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["SdEmdAmt"]);
                        billmodel.RecoveredAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["RecoveredAmt"]);
                        billmodel.PrintedYN = Convert.ToString(dataSet.Tables[0].Rows[0]["PrintedYN"]);
                        billmodel.PrintedDate = Convert.ToString(dataSet.Tables[0].Rows[0]["PrintedDate"]);
                        billmodel.MRDone = Convert.ToString(dataSet.Tables[0].Rows[0]["MRDone"]);
                        billmodel.MRDate = Convert.ToString(dataSet.Tables[0].Rows[0]["MRDate"]);
                        billmodel.SubmitYN = Convert.ToString(dataSet.Tables[0].Rows[0]["SubmitYN"]);
                        billmodel.SubmitDate = Convert.ToString(dataSet.Tables[0].Rows[0]["SubmitDate"]);
                        billmodel.YearId = Convert.ToString(dataSet.Tables[0].Rows[0]["YearId"]);
                        billmodel.FinFtmid = Convert.ToString(dataSet.Tables[0].Rows[0]["FinFtmid"]);
                        billmodel.CheckedBy = Convert.ToString(dataSet.Tables[0].Rows[0]["CheckedBy"]);
                        billmodel.ApprovedBy = Convert.ToString(dataSet.Tables[0].Rows[0]["ApprovedBy"]);
                        billmodel.DisputeType = Convert.ToString(dataSet.Tables[0].Rows[0]["DisputeType"]);
                        billmodel.DisputeDate = Convert.ToString(dataSet.Tables[0].Rows[0]["DisputeDate"]);
                        billmodel.DisputeCaseNo = Convert.ToString(dataSet.Tables[0].Rows[0]["DisputeCaseNo"]);
                        billmodel.DisputeCaseStory = Convert.ToString(dataSet.Tables[0].Rows[0]["DisputeCaseStory"]);
                        billmodel.DisputeReleaseDate = Convert.ToString(dataSet.Tables[0].Rows[0]["DisputeReleaseDate"]);
                        billmodel.StationName = Convert.ToString(dataSet.Tables[0].Rows[0]["StationName"]);
                        billmodel.Party = Convert.ToString(dataSet.Tables[0].Rows[0]["Party"]);
                        billmodel.CollectionBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["CollectionBranch"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return billmodel;
        }
        public async Task<BillsMasterModelLLP> GetBillEnqInnerGridList(RequestModel request)
        {
            BillsMasterModelLLP billmodel = new()
            {
                BillsEnqListData = new List<BillsMasterSearchModelLLP>(),
                BillSubmitList = new List<BillSubmitMasterModel>(),
                MrList = new List<MrList>(),


            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillsMasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillEnqInnerGridListLLP", param);

                    if (dataSet != null)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billmodel.BillsEnqListData.Add(new BillsMasterSearchModelLLP
                            {
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                // ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                //StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                // FovRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FovRs"]),
                                //  DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorCollRs"]),
                                // HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                //  LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                // EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                //MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                //DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDelRs"]),
                                // UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                // UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingDetnRs"]),
                                // ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                // OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                //  Remarks1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks1"]),
                                //  Remarks2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks2"]),
                                // Remarks3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks3"]),
                                // SuppBillDetRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppBillDetRemarks"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[1].Rows.Count; i++)
                        {
                            billmodel.BillSubmitList.Add(new BillSubmitMasterModel
                            {
                                // SubmitMstId = Convert.ToString(dataSet.Tables[1].Rows[i]["SubmitMstId"]),
                                SubmitStn = Convert.ToString(dataSet.Tables[1].Rows[i]["SubmitStn"]),
                                SubmitNo = Convert.ToString(dataSet.Tables[1].Rows[i]["SubmitNo"]),
                                SubmitDt = Convert.ToString(dataSet.Tables[1].Rows[i]["SubmitDt"]),
                                //SubmitType = Convert.ToString(dataSet.Tables[1].Rows[i]["SubmitType"]),
                                //CourierCo = Convert.ToString(dataSet.Tables[1].Rows[i]["CourierCo"]),
                                //CourierDocketNo = Convert.ToString(dataSet.Tables[1].Rows[i]["CourierDocketNo"]),
                                //PartyCode = Convert.ToString(dataSet.Tables[1].Rows[i]["PartyCode"]),
                                //SubmitLocation = Convert.ToString(dataSet.Tables[1].Rows[i]["SubmitLocation"]),
                                //DeptId = Convert.ToString(dataSet.Tables[1].Rows[i]["DeptId"]),
                                //BillsUptoDt = Convert.ToString(dataSet.Tables[1].Rows[i]["BillsUptoDt"]),
                                //KindAttnTo = Convert.ToString(dataSet.Tables[1].Rows[i]["KindAttnTo"]),
                                Remarks = Convert.ToString(dataSet.Tables[1].Rows[i]["Remarks"]),
                                //PartyAcceptDt = Convert.ToString(dataSet.Tables[1].Rows[i]["PartyAcceptDt"]),
                                //PartyAccceptRemarks = Convert.ToString(dataSet.Tables[1].Rows[i]["PartyAccceptRemarks"]),
                                //TotalSubmitAmt = Convert.ToString(dataSet.Tables[1].Rows[i]["TotalSubmitAmt"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[2].Rows.Count; i++)
                        {
                            billmodel.MrList.Add(new MrList
                            {
                                //  MrMasterId = Convert.ToString(dataSet.Tables[2].Rows[i]["MrMasterId"]),
                                MrStation = Convert.ToString(dataSet.Tables[2].Rows[i]["MrStation"]),
                                //  MrStn = Convert.ToString(dataSet.Tables[2].Rows[i]["MrStn"]),
                                MrNo = Convert.ToString(dataSet.Tables[2].Rows[i]["MrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[2].Rows[i]["MrDate"]),
                                //  MrStatus = Convert.ToString(dataSet.Tables[2].Rows[i]["MrStatus"]),
                                MrReceiptType = Convert.ToString(dataSet.Tables[2].Rows[i]["MrReceiptType"]),
                                MrType = Convert.ToString(dataSet.Tables[2].Rows[i]["MrType"]),
                                //  BillLrOthType = Convert.ToString(dataSet.Tables[2].Rows[i]["BillLrOthType"]),
                                //  GroupMrYN = Convert.ToString(dataSet.Tables[2].Rows[i]["GroupMrYN"]),
                                //// PartyGroupId = Convert.ToString(dataSet.Tables[2].Rows[i]["PartyGroupId"]),
                                //  PartyCode = Convert.ToString(dataSet.Tables[2].Rows[i]["PartyCode"]),
                                //  PartyName = Convert.ToString(dataSet.Tables[2].Rows[i]["PartyName"]),
                                //  CheqCashAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["CheqCashAmt"]),
                                // OnAcAdjAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["OnAcAdjAmt"]),
                                // TotalAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["TotalAmt"]),
                                // OnAcNewAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["OnAcNewAmt"]),
                                // OnAcAdjusted = Convert.ToString(dataSet.Tables[2].Rows[i]["OnAcAdjusted"]),
                                //  OnAcStatus = Convert.ToString(dataSet.Tables[2].Rows[i]["OnAcStatus"]),
                                // OnAcAdjMrYn = Convert.ToString(dataSet.Tables[2].Rows[i]["OnAcAdjMrYn"]),
                                TotalRecdAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["RecdAmt"]),
                                TotalFreightDed = Convert.ToString(dataSet.Tables[2].Rows[i]["FreightDed"]),
                                TotalClaimsDed = Convert.ToString(dataSet.Tables[2].Rows[i]["ClaimsDed"]),
                                // TotalOldFrtDed = Convert.ToString(dataSet.Tables[2].Rows[i]["TotalOldFrtDed"]),
                                //  TotalOldClaims = Convert.ToString(dataSet.Tables[2].Rows[i]["TotalOldClaims"]),
                                TotalOthersDed = Convert.ToString(dataSet.Tables[2].Rows[i]["OthersDed"]),
                                TotalBankChrgDed = Convert.ToString(dataSet.Tables[2].Rows[i]["BankChrgDed"]),
                                TotalOthersDed1 = Convert.ToString(dataSet.Tables[2].Rows[i]["OthersDed1"]),
                                TotalOthersDed2 = Convert.ToString(dataSet.Tables[2].Rows[i]["OthersDed2"]),
                                TotalOthersDed3 = Convert.ToString(dataSet.Tables[2].Rows[i]["OthersDed3"]),
                                TotalRecoverable = Convert.ToString(dataSet.Tables[2].Rows[i]["Recoverable"]),
                                // TotalDed = Convert.ToString(dataSet.Tables[2].Rows[i]["Ded"]),
                                TotalTDSDed = Convert.ToString(dataSet.Tables[2].Rows[i]["TDSDed"]),
                                TotalSdEmdDed = Convert.ToString(dataSet.Tables[2].Rows[i]["SdEmdDed"]),
                                // TotalExcess = Convert.ToString(dataSet.Tables[2].Rows[i]["Excess"]),
                                TotalOthers1 = Convert.ToString(dataSet.Tables[2].Rows[i]["TotalOthers1"]),
                                TotalOthers2 = Convert.ToString(dataSet.Tables[2].Rows[i]["TotalOthers2"]),
                                //  MrRemarks = Convert.ToString(dataSet.Tables[2].Rows[i]["MrRemarks"]),
                                // CrAdviceNo = Convert.ToString(dataSet.Tables[2].Rows[i]["CrAdviceNo"]),
                                ////  MrDebitAc = Convert.ToString(dataSet.Tables[2].Rows[i]["MrDebitAc"]),
                                //MrSdEmdAc = Convert.ToString(dataSet.Tables[2].Rows[i]["SdEmdAc"]),
                                //  SdEmdRefNo = Convert.ToString(dataSet.Tables[2].Rows[i]["SdEmdRefNo"]),
                                // PartyBankDet = Convert.ToString(dataSet.Tables[2].Rows[i]["PartyBankDet"]),
                                // ChequeNo = Convert.ToString(dataSet.Tables[2].Rows[i]["ChequeNo"]),
                                // ChequeDt = Convert.ToString(dataSet.Tables[2].Rows[i]["ChequeDt"]),
                                //  ModifyRemarks = Convert.ToString(dataSet.Tables[2].Rows[i]["ModifyRemarks"]),
                                TotDed = Convert.ToString(dataSet.Tables[2].Rows[i]["TotDed"]),
                                ExcessRecd = Convert.ToString(dataSet.Tables[2].Rows[i]["ExcessRecd"]),
                                OthersDed1 = Convert.ToString(dataSet.Tables[2].Rows[i]["OthersDed1"]),
                                OthersDed2 = Convert.ToString(dataSet.Tables[2].Rows[i]["OthersDed2"]),

                            });
                        }

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return billmodel;
        }
        public async Task<ResponseModel> GetBillNoLLP(RequestModel req)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch",     req.strRequest),
                            new SqlParameter("@YearId",     req.strRequest1),
                            new SqlParameter("@billSeries", req.strRequest2),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillNoLLP", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        response.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
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
            }
            return response;
        }



        public async Task<BillsMasterSearchListModelLLP> GetBillsInnerGridList(RequestModel request)
        {
            BillsMasterSearchListModelLLP billsMasterSearchList = new();
            List<BillsMasterSearchModelLLP> billsMasterSearchModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@BillsMasterId", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsInnerGridLLP", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsMasterSearchModel.Add(new BillsMasterSearchModelLLP
                            {
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                FovRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FovRs"]),
                                DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorCollRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDelRs"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingDetnRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                GstBy = Convert.ToString(dataSet.Tables[0].Rows[i]["GstBy"]),                                
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Remarks1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks1"]),
                                Remarks2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks2"]),
                                Remarks3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks3"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                              //  YearId = Convert.ToString(dataSet.Tables[0].Rows[i][""]),
                                Selected = true,
                            });
                        }

                        billsMasterSearchList.BillsMasterSearchList = billsMasterSearchModel;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return billsMasterSearchList;
        }
        public async Task<ResponseModel> BillsMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@BillsMasterId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsMstDeleteLLP", param);

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
        public async Task<List<DropDownListModel>> GetBillPartyGstLocationList(RequestModel requestModel)
        {
            List<DropDownListModel> productList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Party", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillPartyGstLocationListLLP", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            productList.Add(new DropDownListModel
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
            return productList;
        }
        public async Task<ResponseModel> CheckDuplicateBillsNo(ReportRequestModel request)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@Branch",     request.FilterStr),
                        new SqlParameter("@BillSlNo",   request.FilterStr1),
                        new SqlParameter("@BillSeries", request.FilterStr2),
                        new SqlParameter("@YearId",     request.FilterStr3),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateBillNoLLP", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> GetBillTypeSacHsn(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillTypeId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillTypeSacHsnLLP", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> GetBillPdfLlp(RepReqModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/BillLLP/";

                string UrlParam = "?Copy=" + request.FilterStr +
                                    "&CnorCnee=" + request.FilterStr1 +
                                    "&Format=" + request.FilterStr2 +
                                    "&BillingStn=" + request.FilterStr3 +
                                    "&BillNo=" + request.FilterStr4 +
                                    "&YearId=" + request.FilterStr5 +
                                    "&PrintSign=" + request.FilterStr6;

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



    }


}
