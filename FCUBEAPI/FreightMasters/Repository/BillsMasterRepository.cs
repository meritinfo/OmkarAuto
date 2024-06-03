using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                            new SqlParameter("@BillsMasterId",              billsModel.BillsMasterId),
                            new SqlParameter("@BillingStation",          billsModel.BillingStation),
                            new SqlParameter("@BillNo",            billsModel.BillNo),
                            new SqlParameter("@BillStatus",           billsModel.BillStatus),
                            new SqlParameter("@BillType",         billsModel.BillType),
                            new SqlParameter("@SacHsn",             billsModel.SacHsn),
                            new SqlParameter("@BillDate",        billsModel.BillDate),
                            new SqlParameter("@DueDate",      billsModel.DueDate),
                            new SqlParameter("@SuppYN",           billsModel.SuppYN),
                            new SqlParameter("@SacCode",           billsModel.SacCode),
                            new SqlParameter("@PartyCode",      billsModel.PartyCode),
                            new SqlParameter("@PartyGstLocation",           billsModel.PartyGstLocation),
                            new SqlParameter("@CollBranch",             billsModel.CollBranch),
                            new SqlParameter("@GstType",          billsModel.GstType),
                            new SqlParameter("@TotalFreight",          billsModel.TotalFreight),
                            new SqlParameter("@TotalStatistical",         billsModel.TotalStatistical),
                            new SqlParameter("@TotalFov",         billsModel.TotalFov),
                            new SqlParameter("@TotalDoorColl",        billsModel.TotalDoorColl),
                            new SqlParameter("@TotalHandling",           billsModel.TotalHandling),
                            new SqlParameter("@TotalLoadingDetn",          billsModel.TotalLoadingDetn),
                            new SqlParameter("@TotalEnroute",           billsModel.TotalEnroute),
                            new SqlParameter("@TotalMisc",          billsModel.TotalMisc),
                            new SqlParameter("@TotalDoorDel",      billsModel.TotalDoorDel),
                            new SqlParameter("@TotalUnLoading",   billsModel.TotalUnLoading),
                            new SqlParameter("@TotalDetention",       billsModel.TotalDetention),
                            new SqlParameter("@TotalExtras",       billsModel.TotalExtras),
                            new SqlParameter("@TotalOthers",         billsModel.TotalOthers),
                            new SqlParameter("@TotalSubTotal",         billsModel.TotalSubTotal),
                            new SqlParameter("@TotalSgstAmt",         billsModel.TotalSgstAmt),
                            new SqlParameter("@TotalCgstAmt",         billsModel.TotalCgstAmt),
                            new SqlParameter("@TotalIgstAmt",         billsModel.TotalIgstAmt),
                            new SqlParameter("@TotalNonGstAmt1",         billsModel.TotalNonGstAmt1),
                            new SqlParameter("@TotalNonGstAmt2",         billsModel.TotalNonGstAmt2),
                            new SqlParameter("@TotalGtotal",         billsModel.TotalGtotal),


                            new SqlParameter("@BillRemarks",         billsModel.BillRemarks),
                            new SqlParameter("@EnlcosedDocs",         billsModel.EnlcosedDocs),
                            new SqlParameter("@SuppParticulars",         billsModel.SuppParticulars),
                            new SqlParameter("@Attachedfile",         billsModel.Attachedfile),
                            new SqlParameter("@BillAmtCleared",         billsModel.BillAmtCleared),
                            new SqlParameter("@BillDed",         billsModel.BillDed),
                            new SqlParameter("@BillTDS",         billsModel.BillTDS),
                            new SqlParameter("@Recoverable",         billsModel.Recoverable),
                            new SqlParameter("@BillExcess",         billsModel.BillExcess),
                            new SqlParameter("@SdEmdAmt",         billsModel.SdEmdAmt),
                            new SqlParameter("@RecoveredAmt",         billsModel.RecoveredAmt),
                            new SqlParameter("@PrintedYN",         billsModel.PrintedYN),
                            new SqlParameter("@PrintedDate",         billsModel.PrintedDate),
                            new SqlParameter("@MRDone",         billsModel.MRDone),
                            new SqlParameter("@MRDate",         billsModel.MRDate),
                            new SqlParameter("@SubmitYN",         billsModel.SubmitYN),
                            new SqlParameter("@SubmitDate",         billsModel.SubmitDate),
                            new SqlParameter("@YearId",         billsModel.YearId),
                            new SqlParameter("@FinFtmid",         billsModel.FinFtmid),
                            new SqlParameter("@CheckedBy",         billsModel.CheckedBy),
                            new SqlParameter("@ApprovedBy",         billsModel.ApprovedBy),
                            new SqlParameter("@DisputeType",         billsModel.DisputeType),
                            new SqlParameter("@DisputeDate",         billsModel.DisputeDate),
                            new SqlParameter("@DisputeCaseNo",         billsModel.DisputeCaseNo),
                            new SqlParameter("@DisputeCaseStory",         billsModel.DisputeCaseStory),
                            new SqlParameter("@DisputeReleaseDate",         billsModel.DisputeReleaseDate),
                            new SqlParameter("@LoggedInUser",         billsModel.LoggedInUser)
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
                            for (int i = 0; i < billsModel.BillsDtls.Count; i++)
                            {
                                billsModel.BillsDtls[i].BillsMasterId = BillsMasterId.ToString();
                                responseModel = await BillsMasterDtlSave(transaction, billsModel.BillsDtls[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = billsModel.BillsDtls.Count;
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
        public async Task<BillsMasterSearchListModel> GetBillsMasterSearchList(BillsMasterSearchListRequest request)
        {
            BillsMasterSearchListModel billsMasterSearchList = new();
            List<BillsDetailModel> billsDetailModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty",   request.BillingParty),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@FromPlace",      request.FromPlace),
                            new SqlParameter("@ToPlace",        request.ToPlace),
                            new SqlParameter("@CnorPlantCode",  request.CnorPlantCode),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsMasterSearchList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = 0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billsDetailModel.Add(new BillsDetailModel
                            {
                                BillDetailId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDetailId"]),
                                BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsMasterId"]),
                                BillingStation = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingStation"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                BillType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillType"]),
                                PartyCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                GcBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["GcBranch"]),
                                GcYear = Convert.ToString(dataSet.Tables[0].Rows[i]["GcYear"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                Consignmentid = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignmentid"]),
                                Freight = Convert.ToString(dataSet.Tables[0].Rows[i]["Freight"]),
                                Statistical = Convert.ToString(dataSet.Tables[0].Rows[i]["Statistical"]),
                                Fov = Convert.ToString(dataSet.Tables[0].Rows[i]["Fov"]),
                                DoorColl = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorColl"]),
                                Handling = Convert.ToString(dataSet.Tables[0].Rows[i]["Handling"]),
                                LoadingDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetn"]),
                                Enroute = Convert.ToString(dataSet.Tables[0].Rows[i]["Enroute"]),
                                Misc = Convert.ToString(dataSet.Tables[0].Rows[i]["Misc"]),
                                DoorDel = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDel"]),
                                UnLoading = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoading"]),
                                Detention = Convert.ToString(dataSet.Tables[0].Rows[i]["Detention"]),
                                Extras = Convert.ToString(dataSet.Tables[0].Rows[i]["Extras"]),
                                Others = Convert.ToString(dataSet.Tables[0].Rows[i]["Others"]),
                                SubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotal"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                Gtotal = Convert.ToString(dataSet.Tables[0].Rows[i]["Gtotal"]),
                                DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DedAmt"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                SuppBillDetRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppBillDetRemarks"]),
                                Remarks1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks1"]),
                                Remarks2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks2"]),
                                Remarks3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks3"]),
                              //  Selected = false
                            });
                        }

                        billsMasterSearchList.BillsMasterSearchList = billsDetailModel;
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
        public async Task<BillsListModel> GetBillsMasterList(PageRequest request)
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
                          //  new SqlParameter("@FromDate",   request.FromDate),
                           // new SqlParameter("@ToDate",     request.ToDate),
                           // new SqlParameter("@Type",       request.FilterStr)
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
                                SacCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SacCode"]),
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
                              
                                //  LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),


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

        public async Task<BillsMasterModel> GetBillsInnerGridList(RequestModel request)
        {
            BillsMasterModel billsModel = new()
            {
                BillsDtls = new List<BillsDetailModel>(),
            };

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
                            billsModel.BillsDtls.Add(new BillsDetailModel
                            {
                                BillsMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsMasterId"]),
                                BillingStation = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingStation"]),
                                BillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                BillType = Convert.ToString(dataSet.Tables[0].Rows[i]["BillType"]),
                                PartyCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                GcBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["GcBranch"]),
                                GcYear = Convert.ToString(dataSet.Tables[0].Rows[i]["GcYear"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                Consignmentid = Convert.ToString(dataSet.Tables[0].Rows[i]["Consignmentid"]),
                                Freight = Convert.ToString(dataSet.Tables[0].Rows[i]["Freight"]),
                                Statistical = Convert.ToString(dataSet.Tables[0].Rows[i]["Statistical"]),
                                Fov = Convert.ToString(dataSet.Tables[0].Rows[i]["Fov"]),
                                DoorColl = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorColl"]),
                                Handling = Convert.ToString(dataSet.Tables[0].Rows[i]["Handling"]),
                                LoadingDetn = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetn"]),
                                Enroute = Convert.ToString(dataSet.Tables[0].Rows[i]["Enroute"]),
                                Misc = Convert.ToString(dataSet.Tables[0].Rows[i]["Misc"]),
                                DoorDel = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDel"]),
                                UnLoading = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoading"]),
                                Detention = Convert.ToString(dataSet.Tables[0].Rows[i]["Detention"]),
                                Extras = Convert.ToString(dataSet.Tables[0].Rows[i]["Extras"]),
                                Others = Convert.ToString(dataSet.Tables[0].Rows[i]["Others"]),
                                SubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotal"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt1"]),
                                NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[i]["NonGstAmt2"]),
                                Gtotal = Convert.ToString(dataSet.Tables[0].Rows[i]["Gtotal"]),
                                DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DedAmt"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                SuppBillDetRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppBillDetRemarks"]),
                                Remarks1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks1"]),
                                Remarks2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks2"]),
                                Remarks3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks3"]),
                               
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return billsModel;
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



    }




}


    

