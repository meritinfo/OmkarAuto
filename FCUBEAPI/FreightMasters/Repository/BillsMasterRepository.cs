using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace FreightMasters.Repository
{
    public class BillsMasterRepository: IBillsMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillsMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> BillsMasterSave(BillsMasterModel billsModel)
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
                            new SqlParameter("@YearId",             billsModel.YearId),
                            new SqlParameter("@LoggedInUser",       billsModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsMstSave", param);
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
                                responseModel = await BillsMasterDtlSave(transaction, billsModel.BillsMasterListData[i]);
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
        public async Task<ResponseModel> BillsMasterDtlSave(SqlTransaction transaction, BillsDetailModel billsDtl)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsDtlsSave", param);

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

        public async Task<BillsMasterSearchListModel> GetBillsMasterSearchList(RequestModel request)
        {
            BillsMasterSearchListModel billsMasterSearchList = new();
            List<BillsMasterSearchModel> billsMasterSearchModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty",   request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsMasterSearchList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = 0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsMasterSearchModel.Add(new BillsMasterSearchModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                GcNoteNo= Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
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
        public async Task<BillsListModel> GetBillsMasterList(PageFromDtToDtRequest request)
        {
            BillsListModel billsMasterList = new();
            List<BillsMasterModel> billsList = new();
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
                            new SqlParameter("@SuppYN",     request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsList.Add(new BillsMasterModel
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
                                CollectionBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["CollectionBranch"]),
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

        public async Task<BillsMasterSearchListModel> GetBillsInnerGridList(RequestModel request)
        {
            BillsMasterSearchListModel billsMasterSearchList = new();
            List<BillsMasterSearchModel> billsMasterSearchModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@BillsMasterId", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsInnerGrid", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsMasterSearchModel.Add(new BillsMasterSearchModel
                            {
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                GcNoteNo= Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
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
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Remarks1= Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks1"]),
                                Remarks2= Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks2"]),
                                Remarks3= Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks3"]),
                                SuppBillDetRemarks= Convert.ToString(dataSet.Tables[0].Rows[i]["SuppBillDetRemarks"]),
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsMstDelete", param);

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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillPartyGstLocationList", param);

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
        public async Task<ResponseModel> CheckDuplicateBillsNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
           
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillsNo", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateBillNo", param);

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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillTypeSacHsn", param);

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
        public async Task<ResponseModel> GetBillPdf(ReportRequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/Trip/";

                string UrlParam = "?BillingStn=" + request.FilterStr +
                                    "&BillNo=" + request.FilterStr1 +
                                    "&YearId=" + request.FilterStr2+
                                    "&PrintSign=" + request.FilterStr3;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data!="500")
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


    

