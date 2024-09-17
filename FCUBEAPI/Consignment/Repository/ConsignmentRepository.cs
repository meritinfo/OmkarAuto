using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Presentation;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Drawing.Charts;
using Microsoft.VisualBasic;

namespace Consignment.Repository
{
    public class ConsignmentRepository : IConsignmentRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public ConsignmentRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<ConsignmentList> GetConsignmentList(ReportRequestModel request)
        {
            ConsignmentList cnList = new();
            List<ConsignmentModel> consignmentList = new();
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
                            new SqlParameter("@VehicleNo",  request.FilterStr3),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsignmentList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            consignmentList.Add(new ConsignmentModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingPlace"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingStatus"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                EwayBillEntryType = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillEntryType"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                FromPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPlace"]),
                                Kms = Convert.ToString(dataSet.Tables[0].Rows[i]["Kms"]),
                                OwnTruck = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnTruck"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),
                                BillingParty = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingParty"]),
                                BillingBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BillingBranch"]),
                                BusinessBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["BusinessBranch"]),
                                BusinessBy = Convert.ToString(dataSet.Tables[0].Rows[i]["BusinessBy"]),
                                InvoiceNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceNo"]),
                                InvoiceDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceDate"]),
                                InvoiceValue = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceValue"]),
                                DeclaredValue = Convert.ToString(dataSet.Tables[0].Rows[i]["DeclaredValue"]),
                                CnorName = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorName"]),
                                CnorAdd1 = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorAdd1"]),
                                CnorAdd2 = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorAdd2"]),
                                CnorAdd3 = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorAdd3"]),
                                CnorPin = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorPin"]),
                                CnorGst = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorGst"]),
                                CnorMobile = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorMobile"]),
                                CnorEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["CnorEmail"]),
                                CneeName = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeName"]),
                                CneeAdd1 = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd1"]),
                                CneeAdd2 = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd2"]),
                                CneeAdd3 = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeAdd3"]),
                                CneePin = Convert.ToString(dataSet.Tables[0].Rows[i]["CneePin"]),
                                CneeGst = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeGst"]),
                                CneeMobile = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeMobile"]),
                                CneeEmail = Convert.ToString(dataSet.Tables[0].Rows[i]["CneeEmail"]),
                                ShipmentNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ShipmentNo"]),
                                ShipmentDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ShipmentDt"]),
                                ProductId = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductId"]),
                                ProductDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductDesc"]),
                                ClassId = Convert.ToString(dataSet.Tables[0].Rows[i]["ClassId"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                ActualWt = Convert.ToString(dataSet.Tables[0].Rows[i]["ActualWt"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                                VehicleTypeId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeId"]),
                                RateType = Convert.ToString(dataSet.Tables[0].Rows[i]["RateType"]),
                                RateRs = Convert.ToString(dataSet.Tables[0].Rows[i]["RateRs"]),
                                GstBy = Convert.ToString(dataSet.Tables[0].Rows[i]["GstBy"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                FovRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FovRs"]),
                                DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorCollRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DoorDelRs"]),
                                ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRS"]),
                                UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingRs"]),
                                UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLoadingDetnRs"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotalRs"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                SgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                CnBilledYN = Convert.ToString(dataSet.Tables[0].Rows[i]["CnBilledYN"]),
                                CnBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CnBillDate"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["GeneralRemarks"]),
                                Attachedfile = Convert.ToString(dataSet.Tables[0].Rows[i]["Attachedfile"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                FPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["FPlace"]),
                                TPlace = Convert.ToString(dataSet.Tables[0].Rows[i]["TPlace"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                            });
                        }

                        cnList.cnList = consignmentList;

                        cnList.PageMetaData = new PaginationMetaData
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
            return cnList;
        }
        public async Task<ConsignmentModel> GetLrInnerGridList(RequestModel request)
        {
            ConsignmentModel consignment = new()
            {
                InvList  = new List<ConsignmentInvModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ConsignmentID", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLrInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            consignment.InvList.Add(new ConsignmentInvModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                InvoiceNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceNo"]),
                                InvoiceDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceDate"]),
                                InvoiceValue = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceValue"]),
                                DeliveryNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryNo"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return consignment;
        }
        
        public async Task<ResponseModel> ConsignmentDelete(RequestModel req)
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
                            new SqlParameter("@ConsignmentID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsignmentDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]))
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
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
        public async Task<ResponseModel> ConsignmentSave(ConsignmentModel ConsignmentModel)
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
                            new SqlParameter("@ConsignmentID",       ConsignmentModel.ConsignmentID             ),
                            new SqlParameter("@BookingPlace",        ConsignmentModel.BookingPlace              ),
                            new SqlParameter("@GcNoteNo",            ConsignmentModel.GcNoteNo                  ),
                            new SqlParameter("@BookingDate",         ConsignmentModel.BookingDate               ),
                            new SqlParameter("@BookingStatus",       ConsignmentModel.BookingStatus             ),
                            new SqlParameter("@EwayBillEntryType",   ConsignmentModel.EwayBillEntryType         ),
                            new SqlParameter("@EwayBillNo",          ConsignmentModel.EwayBillNo                ),
                            new SqlParameter("@EwayBillDate",        ConsignmentModel.EwayBillDate              ),
                            new SqlParameter("@EwayBillExpDate",     ConsignmentModel.EwayBillExpDate           ),
                            new SqlParameter("@InvoiceNo",           ConsignmentModel.InvoiceNo                 ),
                            new SqlParameter("@InvoiceDate",         ConsignmentModel.InvoiceDate               ),
                            new SqlParameter("@InvoiceValue",        ConsignmentModel.InvoiceValue              ),
                            new SqlParameter("@DeclaredValue",       ConsignmentModel.DeclaredValue             ),
                            new SqlParameter("@FromPlace",           ConsignmentModel.FromPlace                 ),
                            new SqlParameter("@ToPlace",             ConsignmentModel.ToPlace                   ),
                            new SqlParameter("@Kms",                 ConsignmentModel.Kms                       ),
                            new SqlParameter("@OwnTruck",            ConsignmentModel.OwnTruck                  ),
                            new SqlParameter("@TruckNo",             ConsignmentModel.TruckNo                   ),
                            new SqlParameter("@BillingParty",        ConsignmentModel.BillingParty              ),
                            new SqlParameter("@BillingBranch",       ConsignmentModel.BillingBranch             ),
                            new SqlParameter("@BusinessBy",          ConsignmentModel.BusinessBy                ),
                            new SqlParameter("@BusinessBranch",      ConsignmentModel.BusinessBranch            ),
                            new SqlParameter("@CnorName",            ConsignmentModel.CnorName              ),
                            new SqlParameter("@CnorAdd1",            ConsignmentModel.CnorAdd1              ),
                            new SqlParameter("@CnorAdd2",            ConsignmentModel.CnorAdd2              ),
                            new SqlParameter("@CnorAdd3",            ConsignmentModel.CnorAdd3              ),
                            new SqlParameter("@CnorPin",             ConsignmentModel.CnorPin              ),
                            new SqlParameter("@CnorGst",             ConsignmentModel.CnorGst              ),
                            new SqlParameter("@CnorMobile",          ConsignmentModel.CnorMobile              ),
                            new SqlParameter("@CnorEmail",           ConsignmentModel.CnorEmail              ),
                            new SqlParameter("@CneeName",            ConsignmentModel.CneeName              ),
                            new SqlParameter("@CneeAdd1",            ConsignmentModel.CneeAdd1              ),
                            new SqlParameter("@CneeAdd2",            ConsignmentModel.CneeAdd2              ),
                            new SqlParameter("@CneeAdd3",            ConsignmentModel.CneeAdd3              ),
                            new SqlParameter("@CneePin",             ConsignmentModel.CneePin              ),
                            new SqlParameter("@CneeGst",             ConsignmentModel.CneeGst              ),
                            new SqlParameter("@CneeMobile",          ConsignmentModel.CneeMobile              ),
                            new SqlParameter("@CneeEmail",           ConsignmentModel.CneeEmail              ),
                            new SqlParameter("@ShipmentNo",          ConsignmentModel.ShipmentNo              ),
                            new SqlParameter("@ShipmentDt",          ConsignmentModel.ShipmentDt              ),
                            new SqlParameter("@ClassId",             ConsignmentModel.ClassId                   ),
                            new SqlParameter("@ProductId",           ConsignmentModel.ProductId                 ),
                            new SqlParameter("@ProductDesc",         ConsignmentModel.ProductDesc               ),
                            new SqlParameter("@HsnSac",              ConsignmentModel.HsnSac                    ),
                            new SqlParameter("@NoPackages",          ConsignmentModel.NoPackages                ),
                            new SqlParameter("@LooseFlag",           ConsignmentModel.LooseFlag                 ),
                            new SqlParameter("@WeightType",          ConsignmentModel.WeightType                ),
                            new SqlParameter("@ActualWt",            ConsignmentModel.ActualWt                  ),
                            new SqlParameter("@SenderWt",            ConsignmentModel.SenderWt                  ),
                            new SqlParameter("@Chargewt",            ConsignmentModel.Chargewt                  ),
                            new SqlParameter("@WtDesc",              ConsignmentModel.WtDesc                    ),
                            new SqlParameter("@VehicleTypeId",       ConsignmentModel.VehicleTypeId             ),
                            new SqlParameter("@PrivateMark",         ConsignmentModel.PrivateMark               ),
                            new SqlParameter("@BulkYN",              ConsignmentModel.BulkYN                    ),
                            new SqlParameter("@LoadLength",          ConsignmentModel.LoadLength                ),
                            new SqlParameter("@LoadWidth",           ConsignmentModel.LoadWidth                 ),
                            new SqlParameter("@LoadHeight",          ConsignmentModel.LoadHeight                ),
                            new SqlParameter("@LoadCFT",             ConsignmentModel.LoadCFT                   ),
                            new SqlParameter("@RateType",            ConsignmentModel.RateType                  ),
                            new SqlParameter("@RateDesc",            ConsignmentModel.RateDesc                  ),
                            new SqlParameter("@GstBy",               ConsignmentModel.GstBy                     ),
                            new SqlParameter("@RateRs",              ConsignmentModel.RateRs                    ),
                            new SqlParameter("@FreightRs",           ConsignmentModel.FreightRs                 ),
                            new SqlParameter("@StatisticalRs",       ConsignmentModel.StatisticalRs             ),
                            new SqlParameter("@FovRs",               ConsignmentModel.FovRs                     ),
                            new SqlParameter("@DoorCollRs",          ConsignmentModel.DoorCollRs                ),
                            new SqlParameter("@HandlingRs",          ConsignmentModel.HandlingRs                ),
                            new SqlParameter("@LoadingDetnRs",       ConsignmentModel.LoadingDetnRs             ),
                            new SqlParameter("@EnrouteRs",           ConsignmentModel.EnrouteRs                 ),
                            new SqlParameter("@MiscRs",              ConsignmentModel.MiscRs                    ),
                            new SqlParameter("@DoorDelRs",           ConsignmentModel.DoorDelRs                 ),
                            new SqlParameter("@UnLoadingRs",         ConsignmentModel.UnLoadingRs               ),
                            new SqlParameter("@UnLoadingDetnRs",     ConsignmentModel.UnLoadingDetnRs           ),
                            new SqlParameter("@ExtrasRS",            ConsignmentModel.ExtrasRS                  ),
                            new SqlParameter("@OthersRs",            ConsignmentModel.OthersRs                  ),
                            new SqlParameter("@SubTotalRs",          ConsignmentModel.SubTotalRs                ),
                            new SqlParameter("@GstType",             ConsignmentModel.GstType                   ),
                            new SqlParameter("@SgstPct",             ConsignmentModel.SgstPct                   ),
                            new SqlParameter("@SgstAmt",             ConsignmentModel.SgstAmt                   ),
                            new SqlParameter("@CgstPct",             ConsignmentModel.CgstPct                   ),
                            new SqlParameter("@CgstAmt",             ConsignmentModel.CgstAmt                   ),
                            new SqlParameter("@IgstPct",             ConsignmentModel.IgstPct                   ),
                            new SqlParameter("@IgstAmt",             ConsignmentModel.IgstAmt                   ),
                            new SqlParameter("@NonGstAmt1",          ConsignmentModel.NonGstAmt1                ),
                            new SqlParameter("@NonGstAmt1Desc",      ConsignmentModel.NonGstAmt1Desc            ),
                            new SqlParameter("@NonGstAmt2",          ConsignmentModel.NonGstAmt2                ),
                            new SqlParameter("@NonGstAmt2Desc",      ConsignmentModel.NonGstAmt2Desc            ),
                            new SqlParameter("@GtotalRs",            ConsignmentModel.GtotalRs                  ),
                            new SqlParameter("@Attachedfile",        ConsignmentModel.Attachedfile              ),
                            new SqlParameter("@YearId",              ConsignmentModel.YearId                    ),
                            new SqlParameter("@LoggedInUser",        ConsignmentModel.LoggedInUser),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsignmentSave", param);
                    string MasterID = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < ConsignmentModel.InvList.Count; i++)
                        {
                            ConsignmentModel.InvList[i].ConsignmentID = MasterID.ToString();
                           
                            responseModel = await InvDtlSave(transaction, ConsignmentModel.InvList[i]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = ConsignmentModel.InvList.Count;
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else { transaction.Rollback(); }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }

        public async Task<ResponseModel> InvDtlSave(SqlTransaction transaction, ConsignmentInvModel invModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ConsignmentID",      invModel.ConsignmentID),
                            new SqlParameter("@EwayBillNo",         invModel.EwayBillNo),
                            new SqlParameter("@EwayBillDate",       invModel.EwayBillDate),
                            new SqlParameter("@EwayBillExpDate",    invModel.EwayBillExpDate),
                            new SqlParameter("@InvoiceNo",          invModel.InvoiceNo ),
                            new SqlParameter("@InvoiceDate",        invModel.InvoiceDate ),
                            new SqlParameter("@InvoiceValue",       invModel.InvoiceValue ),
                            new SqlParameter("@DeliveryNo",         invModel.DeliveryNo ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsignmentInvDtlsSave", param);

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
        public async Task<ResponseModel> GetLrNo(RequestModel req)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLRNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        response.Status     = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        response.Message    = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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

        public async Task<ConsignmentModel> GetConsignmentUpdateDetails(RequestModel req)
        {
            ConsignmentModel lrmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", req.strRequest),
                            new SqlParameter("@GCNoteNo", req.strRequest1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsignmentUpdateDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        lrmodel.ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]);
                        lrmodel.BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]);
                        lrmodel.BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingPlace"]);
                        lrmodel.GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]);
                        lrmodel.FromPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["FromPlace"]);
                        lrmodel.ToPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["ToPlace"]);
                        lrmodel.BillingParty = Convert.ToString(dataSet.Tables[0].Rows[0]["BillingParty"]);
                        lrmodel.CnorName = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorName"]);
                        lrmodel.CneeName = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeName"]);
                        lrmodel.NoPackages = Convert.ToString(dataSet.Tables[0].Rows[0]["NoPackages"]);
                        lrmodel.ActualWt = Convert.ToString(dataSet.Tables[0].Rows[0]["ActualWt"]);
                        lrmodel.Chargewt = Convert.ToString(dataSet.Tables[0].Rows[0]["Chargewt"]);
                        lrmodel.RateType = Convert.ToString(dataSet.Tables[0].Rows[0]["RateType"]);
                        lrmodel.RateRs = Convert.ToString(dataSet.Tables[0].Rows[0]["RateRs"]);
                        lrmodel.FreightRs = Convert.ToString(dataSet.Tables[0].Rows[0]["FreightRs"]);
                        lrmodel.StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[0]["StatisticalRs"]);
                        lrmodel.FovRs = Convert.ToString(dataSet.Tables[0].Rows[0]["FovRs"]);
                        lrmodel.DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[0]["DoorCollRs"]);
                        lrmodel.HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[0]["HandlingRs"]);
                        lrmodel.LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadingDetnRs"]);
                        lrmodel.EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[0]["EnrouteRs"]);
                        lrmodel.MiscRs = Convert.ToString(dataSet.Tables[0].Rows[0]["MiscRs"]);
                        lrmodel.DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[0]["DoorDelRs"]);
                        lrmodel.ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtrasRS"]);
                        lrmodel.UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[0]["UnLoadingRs"]);
                        lrmodel.UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[0]["UnLoadingDetnRs"]);
                        lrmodel.OthersRs = Convert.ToString(dataSet.Tables[0].Rows[0]["OthersRs"]);
                        lrmodel.SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[0]["SubTotalRs"]);
                        lrmodel.GstType = Convert.ToString(dataSet.Tables[0].Rows[0]["GstType"]);
                        lrmodel.SgstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["SgstPct"]);
                        lrmodel.SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["SgstAmt"]);
                        lrmodel.CgstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["CgstPct"]);
                        lrmodel.CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["CgstAmt"]);
                        lrmodel.IgstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["IgstPct"]);
                        lrmodel.IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["IgstAmt"]);
                        lrmodel.NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[0]["NonGstAmt1"]);
                        lrmodel.NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[0]["NonGstAmt2"]);
                        lrmodel.GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[0]["GtotalRs"]);
                        lrmodel.FreightNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["FreightNarr"]);
                        lrmodel.StatisticalNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["StatisticalNarr"]);
                        lrmodel.FovNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["FovNarr"]);
                        lrmodel.DoorCollNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["DoorCollNarr"]);
                        lrmodel.HandlingNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["HandlingNarr"]);
                        lrmodel.LoadingDetnNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadingDetnNarr"]);
                        lrmodel.EnrouteNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["EnrouteNarr"]);
                        lrmodel.MiscNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["MiscNarr"]);
                        lrmodel.DoorDelNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["DoorDelNarr"]);
                        lrmodel.UnLoadingNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["UnLoadingNarr"]);
                        lrmodel.UnloadingDetenNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["UnloadingDetenNarr"]);
                        lrmodel.ExtrasNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtrasNarr"]);
                        lrmodel.OthersNarr = Convert.ToString(dataSet.Tables[0].Rows[0]["OthersNarr"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lrmodel;
        }
        public async Task<ResponseModel> ConsignmentUpdate(ConsignmentUpdateModel ConsignmentModel)
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
                            new SqlParameter("@ConsignmentID",      ConsignmentModel.ConsignmentID ),
                            new SqlParameter("@RateType",           ConsignmentModel.RateType ),
                            new SqlParameter("@RateDesc",           ConsignmentModel.RateDesc ),
                            new SqlParameter("@GstBy",              ConsignmentModel.GstBy),
                            new SqlParameter("@RateRs",             ConsignmentModel.RateRs ),
                            new SqlParameter("@FreightRs",          ConsignmentModel.FreightRs ),
                            new SqlParameter("@StatisticalRs",      ConsignmentModel.StatisticalRs),
                            new SqlParameter("@FovRs",              ConsignmentModel.FovRs),
                            new SqlParameter("@DoorCollRs",         ConsignmentModel.DoorCollRs ),
                            new SqlParameter("@HandlingRs",         ConsignmentModel.HandlingRs ),
                            new SqlParameter("@LoadingDetnRs",      ConsignmentModel.LoadingDetnRs ),
                            new SqlParameter("@EnrouteRs",          ConsignmentModel.EnrouteRs ),
                            new SqlParameter("@MiscRs",             ConsignmentModel.MiscRs ),
                            new SqlParameter("@DoorDelRs",          ConsignmentModel.DoorDelRs ),
                            new SqlParameter("@UnLoadingRs",        ConsignmentModel.UnLoadingRs ),
                            new SqlParameter("@UnLoadingDetnRs",    ConsignmentModel.UnLoadingDetnRs ),
                            new SqlParameter("@ExtrasRS",           ConsignmentModel.ExtrasRS ),
                            new SqlParameter("@OthersRs",           ConsignmentModel.OthersRs ),
                            new SqlParameter("@FreightNarr",        ConsignmentModel.FreightNarr ),
                            new SqlParameter("@StatisticalNarr",    ConsignmentModel.StatisticalNarr),
                            new SqlParameter("@FovNarr",            ConsignmentModel.FovNarr ),
                            new SqlParameter("@DoorCollNarr",       ConsignmentModel.DoorCollNarr),
                            new SqlParameter("@HandlingNarr",       ConsignmentModel.HandlingNarr  ),
                            new SqlParameter("@LoadingDetnNarr",    ConsignmentModel.LoadingDetnNarr   ),
                            new SqlParameter("@EnrouteNarr",        ConsignmentModel.EnrouteNarr  ),
                            new SqlParameter("@MiscNarr",           ConsignmentModel.MiscNarr   ),
                            new SqlParameter("@DoorDelNarr",        ConsignmentModel.DoorDelNarr  ),
                            new SqlParameter("@UnLoadingNarr",      ConsignmentModel.UnLoadingNarr  ),
                            new SqlParameter("@UnLoadingDetnNarr",  ConsignmentModel.UnloadingDetenNarr   ),
                            new SqlParameter("@ExtrasNarr",         ConsignmentModel.ExtrasNarr    ),
                            new SqlParameter("@OthersNarr",         ConsignmentModel.OthersNarr    ),
                            new SqlParameter("@SubTotalRs",         ConsignmentModel.SubTotalRs    ),
                            new SqlParameter("@GstType",            ConsignmentModel.GstType   ),
                            new SqlParameter("@SgstPct",            ConsignmentModel.SgstPct  ),
                            new SqlParameter("@SgstAmt",            ConsignmentModel.SgstAmt ),
                            new SqlParameter("@CgstPct",            ConsignmentModel.CgstPct  ),
                            new SqlParameter("@CgstAmt",            ConsignmentModel.CgstAmt ),
                            new SqlParameter("@IgstPct",            ConsignmentModel.IgstPct  ),
                            new SqlParameter("@IgstAmt",            ConsignmentModel.IgstAmt    ),
                            new SqlParameter("@NonGstAmt1",         ConsignmentModel.NonGstAmt1   ),
                            new SqlParameter("@NonGstAmt1Desc",     ConsignmentModel.NonGstAmt1Desc  ),
                            new SqlParameter("@NonGstAmt2",         ConsignmentModel.NonGstAmt2   ),
                            new SqlParameter("@NonGstAmt2Desc",     ConsignmentModel.NonGstAmt2Desc    ),
                            new SqlParameter("@GtotalRs",           ConsignmentModel.GtotalRs  ),
                            new SqlParameter("@YearId",             ConsignmentModel.YearId   ),
                            new SqlParameter("@LoggedInUser",       ConsignmentModel.LoggedInUser),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ConsignmentUpdate", param);
                   
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]); 
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else {  transaction.Rollback(); }
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

        public async Task<ResponseModel> GetBillSeries(RequestModel request)
        {
            ResponseModel content = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {  };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetBillSeries_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        content.Message = Convert.ToString(statusData.Tables[0].Rows[0]["message"]);
                        content.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return content;
        }
        public async Task<ResponseModel> CheckEwaybillExits(RequestModel req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EwayBillNo", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkEwaybillExists", param);

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
        public async Task<ResponseModel> CheckDuplicateLr(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch",     request.strRequest),
                            new SqlParameter("@GCNoteNo",   request.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkDuplicateLR", param);

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
        public async Task<ResponseModel> CheckVehicleNo(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleNo",     request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckVehicleNo", param);

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
        public async Task<List<DropDownListModel>> GetContentList()
        {
            List<DropDownListModel> contentList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "ContentList_Select", null);

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
        public async Task<List<DropDownListModel>> GetRateList()
        {
            List<DropDownListModel> rateList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "RateList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            rateList.Add(new DropDownListModel
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
            return rateList;
        }
        public async Task<List<DropDownListModel>> GetClassList()
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getClassList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new DropDownListModel
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
            return locationList;
        }
        public async Task<List<DropDownListModel>> GetLocationList()
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "LocationList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new DropDownListModel
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
            return locationList;
        }
        public async Task<List<DropDownListModel>> GetVehicleNoList()
        {
            List<DropDownListModel> vehicleList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleNoList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            vehicleList.Add(new DropDownListModel
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
            return vehicleList;
        }
        public async Task<List<DropDownListModel>> GetVehicleIdList()
        {
            List<DropDownListModel> vehicleList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleIdList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            vehicleList.Add(new DropDownListModel
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
            return vehicleList;
        }
        public async Task<List<DropDownListModel>> GetVehicleGroupTypeList()
        {
            List<DropDownListModel> vehicleList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleGroupTypes", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            vehicleList.Add(new DropDownListModel
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
            return vehicleList;
        }

        public async Task<ConsignmentModel> GetCnEnqDetails(RequestModel req)
        {
            ConsignmentModel lrmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CnNo", req.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCnEnqDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        lrmodel.ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]);
                        lrmodel.BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]);
                        lrmodel.BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingPlace"]);
                        lrmodel.GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]);
                        lrmodel.BookingStatus = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingStatus"]);
                        lrmodel.EwayBillNo= Convert.ToString(dataSet.Tables[0].Rows[0]["EwayBillNo"]);
                        lrmodel.EwayBillDate= Convert.ToString(dataSet.Tables[0].Rows[0]["EwayBillDate"]);
                        lrmodel.EwayBillExpDate= Convert.ToString(dataSet.Tables[0].Rows[0]["EwayBillExpDate"]);
                        lrmodel.InvoiceNo= Convert.ToString(dataSet.Tables[0].Rows[0]["InvoiceNo"]);
                        lrmodel.InvoiceDate= Convert.ToString(dataSet.Tables[0].Rows[0]["InvoiceDate"]);
                        lrmodel.InvoiceValue= Convert.ToString(dataSet.Tables[0].Rows[0]["InvoiceValue"]);
                        lrmodel.DeclaredValue= Convert.ToString(dataSet.Tables[0].Rows[0]["DeclaredValue"]);
                        lrmodel.FromPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["FromPlace"]);
                        lrmodel.ToPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["ToPlace"]);
                        lrmodel.Kms = Convert.ToString(dataSet.Tables[0].Rows[0]["Kms"]);
                        lrmodel.OwnTruck = Convert.ToString(dataSet.Tables[0].Rows[0]["OwnTruck"]);
                        lrmodel.TruckNo = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckNo"]);
                        lrmodel.BillingParty = Convert.ToString(dataSet.Tables[0].Rows[0]["BillingParty"]);
                        lrmodel.BillingBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["BillingBranch"]);
                        lrmodel.BusinessBranch = Convert.ToString(dataSet.Tables[0].Rows[0]["BusinessBranch"]);
                        lrmodel.BusinessBy = Convert.ToString(dataSet.Tables[0].Rows[0]["BusinessBy"]);
                        lrmodel.CnorName    = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorName"]);
                        lrmodel.CnorAdd1    = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorAdd1"]);
                        lrmodel.CnorAdd2    = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorAdd2"]);
                        lrmodel.CnorAdd3    = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorAdd3"]);
                        lrmodel.CnorPin     = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorPin"]);
                        lrmodel.CnorGst     = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorGst"]);
                        lrmodel.CnorMobile  = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorMobile"]);
                        lrmodel.CnorEmail   = Convert.ToString(dataSet.Tables[0].Rows[0]["CnorEmail"]);
                        lrmodel.CneeName    = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeName"]);
                        lrmodel.CneeAdd1    = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeAdd1"]);
                        lrmodel.CneeAdd2    = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeAdd2"]);
                        lrmodel.CneeAdd3    = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeAdd3"]);
                        lrmodel.CneePin     = Convert.ToString(dataSet.Tables[0].Rows[0]["CneePin"]);
                        lrmodel.CneeGst     = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeGst"]);
                        lrmodel.CneeMobile  = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeMobile"]);
                        lrmodel.CneeEmail   = Convert.ToString(dataSet.Tables[0].Rows[0]["CneeEmail"]);
                        lrmodel.ShipmentNo = Convert.ToString(dataSet.Tables[0].Rows[0]["ShipmentNo"]);
                        lrmodel.ShipmentDt = Convert.ToString(dataSet.Tables[0].Rows[0]["ShipmentDt"]);
                        lrmodel.DeliveryNo = Convert.ToString(dataSet.Tables[0].Rows[0]["DeliveryNo"]);
                        lrmodel.DeliveryDt = Convert.ToString(dataSet.Tables[0].Rows[0]["DeliveryDt"]);
                        lrmodel.PoNo = Convert.ToString(dataSet.Tables[0].Rows[0]["PoNo"]);
                        lrmodel.PoDt = Convert.ToString(dataSet.Tables[0].Rows[0]["PoDt"]);
                        lrmodel.RiskBy = Convert.ToString(dataSet.Tables[0].Rows[0]["RiskBy"]);
                        lrmodel.InsCoName = Convert.ToString(dataSet.Tables[0].Rows[0]["InsCoName"]);
                        lrmodel.InsPolicyNo = Convert.ToString(dataSet.Tables[0].Rows[0]["InsPolicyNo"]);
                        lrmodel.InsValidDt = Convert.ToString(dataSet.Tables[0].Rows[0]["InsValidDt"]);
                        lrmodel.InsuredValue = Convert.ToString(dataSet.Tables[0].Rows[0]["InsuredValue"]);
                        lrmodel.ClassId = Convert.ToString(dataSet.Tables[0].Rows[0]["ClassId"]);
                        lrmodel.ProductId = Convert.ToString(dataSet.Tables[0].Rows[0]["ProductId"]);
                        lrmodel.ProductDesc = Convert.ToString(dataSet.Tables[0].Rows[0]["ProductDesc"]);
                        lrmodel.HsnSac = Convert.ToString(dataSet.Tables[0].Rows[0]["HsnSac"]);
                        lrmodel.NoPackages = Convert.ToString(dataSet.Tables[0].Rows[0]["NoPackages"]);
                        lrmodel.LooseFlag = Convert.ToString(dataSet.Tables[0].Rows[0]["LooseFlag"]);
                        lrmodel.WeightType = Convert.ToString(dataSet.Tables[0].Rows[0]["WeightType"]);
                        lrmodel.ActualWt = Convert.ToString(dataSet.Tables[0].Rows[0]["ActualWt"]);
                        lrmodel.Chargewt = Convert.ToString(dataSet.Tables[0].Rows[0]["Chargewt"]);
                        lrmodel.SenderWt = Convert.ToString(dataSet.Tables[0].Rows[0]["SenderWt"]);
                        lrmodel.WtDesc = Convert.ToString(dataSet.Tables[0].Rows[0]["WtDesc"]);
                        lrmodel.VehicleTypeId = Convert.ToString(dataSet.Tables[0].Rows[0]["VehicleTypeId"]);
                        lrmodel.PrivateMark = Convert.ToString(dataSet.Tables[0].Rows[0]["PrivateMark"]);
                        lrmodel.BulkYN = Convert.ToString(dataSet.Tables[0].Rows[0]["BulkYN"]);
                        lrmodel.LoadLength = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadLength"]);
                        lrmodel.LoadWidth = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadWidth"]);
                        lrmodel.LoadHeight = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadHeight"]);
                        lrmodel.LoadCFT = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadCFT"]);
                        lrmodel.RateType = Convert.ToString(dataSet.Tables[0].Rows[0]["RateType"]);
                        lrmodel.RateDesc = Convert.ToString(dataSet.Tables[0].Rows[0]["RateDesc"]);
                        lrmodel.GstBy = Convert.ToString(dataSet.Tables[0].Rows[0]["GstBy"]);
                        lrmodel.RateRs = Convert.ToString(dataSet.Tables[0].Rows[0]["RateRs"]);
                        lrmodel.FreightRs = Convert.ToString(dataSet.Tables[0].Rows[0]["FreightRs"]);
                        lrmodel.StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[0]["StatisticalRs"]);
                        lrmodel.FovRs = Convert.ToString(dataSet.Tables[0].Rows[0]["FovRs"]);
                        lrmodel.DoorCollRs = Convert.ToString(dataSet.Tables[0].Rows[0]["DoorCollRs"]);
                        lrmodel.HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[0]["HandlingRs"]);
                        lrmodel.LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[0]["LoadingDetnRs"]);
                        lrmodel.EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[0]["EnrouteRs"]);
                        lrmodel.MiscRs = Convert.ToString(dataSet.Tables[0].Rows[0]["MiscRs"]);
                        lrmodel.DoorDelRs = Convert.ToString(dataSet.Tables[0].Rows[0]["DoorDelRs"]);
                        lrmodel.ExtrasRS = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtrasRS"]);
                        lrmodel.UnLoadingRs = Convert.ToString(dataSet.Tables[0].Rows[0]["UnLoadingRs"]);
                        lrmodel.UnLoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[0]["UnLoadingDetnRs"]);
                        lrmodel.OthersRs = Convert.ToString(dataSet.Tables[0].Rows[0]["OthersRs"]);
                        lrmodel.SubTotalRs = Convert.ToString(dataSet.Tables[0].Rows[0]["SubTotalRs"]);
                        lrmodel.GstType = Convert.ToString(dataSet.Tables[0].Rows[0]["GstType"]);
                        lrmodel.SgstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["SgstPct"]);
                        lrmodel.SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["SgstAmt"]);
                        lrmodel.CgstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["CgstPct"]);
                        lrmodel.CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["CgstAmt"]);
                        lrmodel.IgstPct = Convert.ToString(dataSet.Tables[0].Rows[0]["IgstPct"]);
                        lrmodel.IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[0]["IgstAmt"]);
                        lrmodel.NonGstAmt1 = Convert.ToString(dataSet.Tables[0].Rows[0]["NonGstAmt1"]);
                        lrmodel.NonGstAmt2 = Convert.ToString(dataSet.Tables[0].Rows[0]["NonGstAmt2"]);
                        lrmodel.GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[0]["GtotalRs"]);
                        lrmodel.AdvanceRs = Convert.ToString(dataSet.Tables[0].Rows[0]["AdvanceRs"]);
                        lrmodel.AmountRecd = Convert.ToString(dataSet.Tables[0].Rows[0]["AmountRecd"]);
                        lrmodel.TdsDeducted = Convert.ToString(dataSet.Tables[0].Rows[0]["TdsDeducted"]);
                        lrmodel.Deduction1 = Convert.ToString(dataSet.Tables[0].Rows[0]["Deduction1"]);
                        lrmodel.Deduction2 = Convert.ToString(dataSet.Tables[0].Rows[0]["Deduction2"]);
                        lrmodel.Deduction3 = Convert.ToString(dataSet.Tables[0].Rows[0]["Deduction3"]);
                        lrmodel.ExtrasRecd1 = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtrasRecd1"]);
                        lrmodel.ExtrasRecd2 = Convert.ToString(dataSet.Tables[0].Rows[0]["ExtrasRecd2"]);
                        lrmodel.DeliveredYN = Convert.ToString(dataSet.Tables[0].Rows[0]["DeliveredYN"]);
                        lrmodel.LdReportingDateTime = Convert.ToString(dataSet.Tables[0].Rows[0]["LdReportingDateTime"]);
                        lrmodel.DespatchDateTime = Convert.ToString(dataSet.Tables[0].Rows[0]["DespatchDateTime"]);
                        lrmodel.LdDetentionDays = Convert.ToString(dataSet.Tables[0].Rows[0]["LdDetentionDays"]);
                        lrmodel.UlReportingDateTime = Convert.ToString(dataSet.Tables[0].Rows[0]["UlReportingDateTime"]);
                        lrmodel.DeliveryDateTime = Convert.ToString(dataSet.Tables[0].Rows[0]["DeliveryDateTime"]);
                        lrmodel.UlDetentionDays = Convert.ToString(dataSet.Tables[0].Rows[0]["UlDetentionDays"]);
                        lrmodel.PodRecdYN = Convert.ToString(dataSet.Tables[0].Rows[0]["PodRecdYN"]);
                        lrmodel.GeneralRemarks = Convert.ToString(dataSet.Tables[0].Rows[0]["GeneralRemarks"]);
                        lrmodel.CnBilledYN = Convert.ToString(dataSet.Tables[0].Rows[0]["CnBilledYN"]);
                        lrmodel.CnBillDate = Convert.ToString(dataSet.Tables[0].Rows[0]["CnBillDate"]);
                        lrmodel.IncludeCnYn = Convert.ToString(dataSet.Tables[0].Rows[0]["IncludeCnYn"]);
                        lrmodel.IncludeCnNo = Convert.ToString(dataSet.Tables[0].Rows[0]["IncludeCnNo"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lrmodel;
        }
        public async Task<ConsignmentModel> GetCnEnqInnerGridList(RequestModel request)
        {
            ConsignmentModel consignment = new()
            {
                InvList  = new List<ConsignmentInvModel>(),
                ChlnList= new List<ConsignmentChlnModel>(), 
                LhpmList= new List<ConsignmentLhpmModel>(),  
                BillList= new List<ConsignmentBillModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ConsignmentID", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCnEnqInnerGridList", param);

                    if (dataSet != null )
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            consignment.InvList.Add(new ConsignmentInvModel
                            {
                                EwayBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillNo"]),
                                EwayBillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillDate"]),
                                EwayBillExpDate = Convert.ToString(dataSet.Tables[0].Rows[i]["EwayBillExpDate"]),
                                InvoiceNo = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceNo"]),
                                InvoiceDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceDate"]),
                                InvoiceValue = Convert.ToString(dataSet.Tables[0].Rows[i]["InvoiceValue"]),
                                DeliveryNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DeliveryNo"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[1].Rows.Count; i++)
                        {
                            consignment.ChlnList.Add(new ConsignmentChlnModel
                            {
                                ChallanNo = Convert.ToString(dataSet.Tables[1].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[1].Rows[i]["ChallanDate"]),
                                ExpArrivalDate= Convert.ToString(dataSet.Tables[1].Rows[i]["ExpArrivalDate"]),
                                MainChallanNo= Convert.ToString(dataSet.Tables[1].Rows[i]["MainChallanNo"]),
                                FromStn = Convert.ToString(dataSet.Tables[1].Rows[i]["FromStn"]),
                                ToStn = Convert.ToString(dataSet.Tables[1].Rows[i]["ToStn"]),
                                OwnTruckYN = Convert.ToString(dataSet.Tables[1].Rows[i]["OwnTruckYN"]),
                                TruckNo = Convert.ToString(dataSet.Tables[1].Rows[i]["TruckNo"]),
                                TptName = Convert.ToString(dataSet.Tables[1].Rows[i]["TptName"]),
                                TotPkgs = Convert.ToString(dataSet.Tables[1].Rows[i]["TotPkgs"]),
                                TotChrgWt = Convert.ToString(dataSet.Tables[1].Rows[i]["TotChrgWt"]),
                                TotalHire= Convert.ToString(dataSet.Tables[1].Rows[i]["TotalHire"]),
                                TotalAdvance= Convert.ToString(dataSet.Tables[1].Rows[i]["TotalAdvance"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[2].Rows.Count; i++)
                        {
                            consignment.LhpmList.Add(new ConsignmentLhpmModel
                            {
                                PmtStation = Convert.ToString(dataSet.Tables[2].Rows[i]["PmtStation"]),
                                PmtNo = Convert.ToString(dataSet.Tables[2].Rows[i]["PmtNo"]),
                                PmtDate = Convert.ToString(dataSet.Tables[2].Rows[i]["PmtDate"]),
                                ChallanStn = Convert.ToString(dataSet.Tables[2].Rows[i]["ChallanStn"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[2].Rows[i]["ChallanNo"]),
                                ChallanDate = Convert.ToString(dataSet.Tables[2].Rows[i]["ChallanDate"]),
                                AbType = Convert.ToString(dataSet.Tables[2].Rows[i]["ABType"]),
                                HireAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["HireAmt"]),
                                HamaliAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["HamaliAmt"]),
                                DetenAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["DetenAmt"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["OtherAmt"]),
                                RecoveryAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["RecoveryAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["TdsAmt"]),
                                LhpmAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["LhpmAmt"]),
                                OthDedAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["OthDedAmt"]),
                                Oth2DedAmt = Convert.ToString(dataSet.Tables[2].Rows[i]["Oth2DedAmt"]),
                                DeductRemarks = Convert.ToString(dataSet.Tables[2].Rows[i]["DeductRemarks"]),
                                BenId = Convert.ToString(dataSet.Tables[2].Rows[i]["BenId"]),
                            });
                        }
                        for (int i = 0; i < dataSet.Tables[3].Rows.Count; i++)
                        {
                            consignment.BillList.Add(new ConsignmentBillModel
                            {
                                BillingStation = Convert.ToString(dataSet.Tables[3].Rows[i]["BillingStation"]),
                                BillNo = Convert.ToString(dataSet.Tables[3].Rows[i]["BillNo"]),
                                BillDate = Convert.ToString(dataSet.Tables[3].Rows[i]["BillDate"]),
                                BillType = Convert.ToString(dataSet.Tables[3].Rows[i]["BillType"]),
                                DueDate = Convert.ToString(dataSet.Tables[3].Rows[i]["DueDate"]),
                                CollBranch = Convert.ToString(dataSet.Tables[3].Rows[i]["CollBranch"]),
                                PartyGstLocation = Convert.ToString(dataSet.Tables[3].Rows[i]["PartyGstLocation"]),
                                Freight = Convert.ToString(dataSet.Tables[3].Rows[i]["Freight"]),
                                Others = Convert.ToString(dataSet.Tables[3].Rows[i]["Others"]),
                                SubTotal = Convert.ToString(dataSet.Tables[3].Rows[i]["SubTotal"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[3].Rows[i]["SgstAmt"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[3].Rows[i]["CgstAmt"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[3].Rows[i]["IgstAmt"]),
                                Gtotal = Convert.ToString(dataSet.Tables[3].Rows[i]["Gtotal"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return consignment;
        }


    }
}
