using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public class VehicleAdvBalReceiptMstLLPRepository: IVehicleAdvBalReceiptMstLLPRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleAdvBalReceiptMstLLPRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<VehicleAdvBalReceiptMstLLPList> GetVehicleAdvBalReceiptMstListLLP(PageFromDtToDtRequest request)
        {
            VehicleAdvBalReceiptMstLLPList vehicleAdvBalReceiptMstList = new();
            List<VehicleAdvBalReceiptMstLLPModel> advanceList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleAdvBalReceiptListBrpl", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            advanceList.Add(new VehicleAdvBalReceiptMstLLPModel
                            {
                                TransId = Convert.ToString(dataSet.Tables[0].Rows[i]["TransId"]),
                                TransBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBranch"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TripsUptoDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripsUptoDate"]),
                                PartyId = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyId"]),
                                CheqCashAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqCashAmt"]),
                                TripOnAcAdj = Convert.ToString(dataSet.Tables[0].Rows[i]["TripOnAcAdj"]),
                                OnAcAdjAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjAmt"]),
                                AmtRecd = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtRecd"]),
                                AmtDed = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtDed"]),
                                AmtTDS = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtTDS"]),
                                AmtExtras = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtExtras"]),
                                TotalAmtRecd = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmtRecd"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ReceiptType = Convert.ToString(dataSet.Tables[0].Rows[i]["ReceiptType"]),
                                NeftYN = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                DebitAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),
                                FinDocid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocid"]),
                                FinDocidJV = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocidJV"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                Party= Convert.ToString(dataSet.Tables[0].Rows[i]["Party"]),
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                            });
                        }

                        vehicleAdvBalReceiptMstList.AdvanceList = advanceList;

                        vehicleAdvBalReceiptMstList.PageMetaData = new PaginationMetaData
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
            return vehicleAdvBalReceiptMstList;
        }
        public async Task<VehicleAdvBalReceiptMstLLPModel> GetVehicleAdvBalReceiptMstInnerGridListLLP(RequestModel request)
        {
            VehicleAdvBalReceiptMstLLPModel vehicleRepMaintMasterInnerGridList = new()
            {
                VehicleAdvBalReceiptDtlList = new List<VehicleAdvBalReceiptDtlListLLPmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@TransId", request.strRequest),
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleAdvBalInnerGridListBrpl", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            vehicleRepMaintMasterInnerGridList.VehicleAdvBalReceiptDtlList.Add(new VehicleAdvBalReceiptDtlListLLPmodel
                            {
                                LoadId = Convert.ToString(resultData.Tables[0].Rows[i]["LoadId"]),
                                LoadBranch = Convert.ToString(resultData.Tables[0].Rows[i]["LoadBranch"]),
                                LoadMemoNo = Convert.ToString(resultData.Tables[0].Rows[i]["LoadMemoNo"]),
                                LoadDate = Convert.ToString(resultData.Tables[0].Rows[i]["LoadDate"]),
                                TripNo = Convert.ToString(resultData.Tables[0].Rows[i]["TripNo"]),
                                FromPlace = Convert.ToString(resultData.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(resultData.Tables[0].Rows[i]["ToPlace"]),
                                VehicleNo= Convert.ToString(resultData.Tables[0].Rows[i]["VehicleNo"]),
                                DueAmt = Convert.ToString(resultData.Tables[0].Rows[i]["DueAmt"]),
                                PaidAmt = Convert.ToString(resultData.Tables[0].Rows[i]["PaidAmt"]),
                                Received = Convert.ToString(resultData.Tables[0].Rows[i]["Received"]),
                                Deduction = Convert.ToString(resultData.Tables[0].Rows[i]["Deduction"]),
                                TDS = Convert.ToString(resultData.Tables[0].Rows[i]["TDS"]),
                                Extras = Convert.ToString(resultData.Tables[0].Rows[i]["Extras"]),
                                DtlRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["DtlRemarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return vehicleRepMaintMasterInnerGridList;
        }


        public async Task<VehicleAdvBalReceiptMstLLPModel> GetVehicleAdvBalTripDetailsLLP(RequestModel request)
        {
            VehicleAdvBalReceiptMstLLPModel vehicleAdvBalReceiptDtlList = new()
            {
                VehicleAdvBalReceiptDtlList = new List<VehicleAdvBalReceiptDtlListLLPmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@TripsUptoDate",      request.strRequest),
                        new SqlParameter("@Party",    request.strRequest1),
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleAdvBalTripDetailsBrpl", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            vehicleAdvBalReceiptDtlList.VehicleAdvBalReceiptDtlList.Add(new VehicleAdvBalReceiptDtlListLLPmodel
                            {
                                LoadId = Convert.ToString(resultData.Tables[0].Rows[i]["LoadId"]),
                                LoadBranch = Convert.ToString(resultData.Tables[0].Rows[i]["LoadBranch"]),
                                LoadMemoNo = Convert.ToString(resultData.Tables[0].Rows[i]["LoadMemoNo"]),
                                LoadDate = Convert.ToString(resultData.Tables[0].Rows[i]["LoadDate"]),
                                FromPlace = Convert.ToString(resultData.Tables[0].Rows[i]["FromPlace"]),
                                ToPlace = Convert.ToString(resultData.Tables[0].Rows[i]["ToPlace"]),
                                VehicleNo = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleNo"]),
                                TripNo = Convert.ToString(resultData.Tables[0].Rows[i]["TripNo"]),
                                DueAmt = Convert.ToString(resultData.Tables[0].Rows[i]["DueAmt"]),
                                PaidAmt = Convert.ToString(resultData.Tables[0].Rows[i]["PaidAmt"]),
                                Received = Convert.ToString(resultData.Tables[0].Rows[i]["Received"]),
                                Deduction = Convert.ToString(resultData.Tables[0].Rows[i]["Deduction"]),
                                TDS = Convert.ToString(resultData.Tables[0].Rows[i]["TDS"]),
                                Extras = Convert.ToString(resultData.Tables[0].Rows[i]["Extras"]),
                                DtlRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["DtlRemarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return vehicleAdvBalReceiptDtlList;
        }

        public async Task<ResponseModel> VehicleAdvBalReceiptMstSaveLLP(VehicleAdvBalReceiptMstLLPModel vehicleAdvBalReceiptMstModel)
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
                             new SqlParameter("@TransId" , vehicleAdvBalReceiptMstModel.TransId),
                             new SqlParameter("@TransBranch" , vehicleAdvBalReceiptMstModel.TransBranch),
                             new SqlParameter("@TransDate" , vehicleAdvBalReceiptMstModel.TransDate),
                             new SqlParameter("@TripsUptoDate" , vehicleAdvBalReceiptMstModel.TripsUptoDate),
                             new SqlParameter("@PartyId" , vehicleAdvBalReceiptMstModel.PartyId),
                             new SqlParameter("@CheqCashAmt" , vehicleAdvBalReceiptMstModel.CheqCashAmt),
                             new SqlParameter("@TripOnAcAdj" , vehicleAdvBalReceiptMstModel.TripOnAcAdj),
                             new SqlParameter("@OnAcAdjAmt" , vehicleAdvBalReceiptMstModel.OnAcAdjAmt),
                             new SqlParameter("@AmtRecd" , vehicleAdvBalReceiptMstModel.AmtRecd),
                             new SqlParameter("@AmtDed" , vehicleAdvBalReceiptMstModel.AmtDed),
                             new SqlParameter("@AmtTDS" , vehicleAdvBalReceiptMstModel.AmtTDS),
                             new SqlParameter("@AmtExtras" , vehicleAdvBalReceiptMstModel.AmtExtras ),
                             new SqlParameter("@TotalAmtRecd" , vehicleAdvBalReceiptMstModel.TotalAmtRecd),
                             new SqlParameter("@Remarks" , vehicleAdvBalReceiptMstModel.Remarks),
                             new SqlParameter("@ReceiptType" , vehicleAdvBalReceiptMstModel.ReceiptType),
                             new SqlParameter("@NeftYN" , vehicleAdvBalReceiptMstModel.NeftYN),
                             new SqlParameter("@ChequeNo" , vehicleAdvBalReceiptMstModel.ChequeNo),
                             new SqlParameter("@ChequeDate" , vehicleAdvBalReceiptMstModel.ChequeDate),
                             new SqlParameter("@DebitAc" , vehicleAdvBalReceiptMstModel.DebitAc),
                             new SqlParameter("@YearId" , vehicleAdvBalReceiptMstModel.YearId),
                             new SqlParameter("@LoggedInUser" , vehicleAdvBalReceiptMstModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleAdvBalReceiptMstSaveBrpl", param);
                    string TransId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        TransId = responseModel.Message;

                        if (responseModel.Status)
                        {
                            var dtllist = vehicleAdvBalReceiptMstModel.VehicleAdvBalReceiptDtlList;

                            for (int i = 0; i < dtllist.Count; i++)
                            {
                                SqlParameter[] paramDtl =
                                    {
                                        new SqlParameter("@TransId",        TransId),
                                        new SqlParameter("@TripRouteDtlId", dtllist[i].LoadId),
                                        new SqlParameter("@TripNo",         dtllist[i].TripNo),
                                        new SqlParameter("@Received",       dtllist[i].Received),
                                        new SqlParameter("@Deduction",      dtllist[i].Deduction),
                                        new SqlParameter("@TDS",            dtllist[i].TDS),
                                        new SqlParameter("@Extras",         dtllist[i].Extras),
                                        new SqlParameter("@DtlRemarks",     dtllist[i].DtlRemarks),
                                    };

                                var data = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleAdvBalReceiptDtlSaveBrpl", paramDtl);

                                if (data != null && data.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(data.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(data.Tables[0].Rows[0]["Message"]);
                                }
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = dtllist.Count;
                                }
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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
                transaction.Rollback();
            }
            return responseModel;
        }


        public async Task<ResponseModel> VehicleAdvBalReceiptMstDeleteLLP(RequestModel req)
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
                            new SqlParameter("@TransId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleAdvBalReceiptDeleteBrpl", param);

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


