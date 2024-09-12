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
    public class VehicleAdvBalReceiptMstRepository: IVehicleAdvBalReceiptMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleAdvBalReceiptMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<VehicleAdvBalReceiptMstList> GetVehicleAdvBalReceiptMstList(PageFromDtToDtRequest request)
        {
            VehicleAdvBalReceiptMstList vehicleAdvBalReceiptMstList = new();
            List<VehicleAdvBalReceiptMstModel> advanceList = new();
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
                           // new SqlParameter("@Type",       request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleAdvBalReceiptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            advanceList.Add(new VehicleAdvBalReceiptMstModel
                            {
                                TransId = Convert.ToString(dataSet.Tables[0].Rows[i]["TransId"]),
                                TransBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBranch"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                TripsUptoDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TripsUptoDate"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
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
                                BranchName = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),

                                //  LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                                // Mtype = Convert.ToString(dataSet.Tables[0].Rows[i]["Mtype"]),
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

        public async Task<ResponseModel> VehicleAdvBalReceiptMstSave(VehicleAdvBalReceiptMstModel vehicleAdvBalReceiptMstModel)
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
                             new SqlParameter("@VehicleMasterId" , vehicleAdvBalReceiptMstModel.VehicleMasterId),
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
                             //new SqlParameter("@FinDocid " , vehicleAdvBalReceiptMstModel.FinDocid ),
                            // new SqlParameter("@FinDocidJV " , vehicleAdvBalReceiptMstModel.FinDocidJV ),
                             new SqlParameter("@YearId" , vehicleAdvBalReceiptMstModel.YearId),
                             new SqlParameter("@LoggedInUser" , vehicleAdvBalReceiptMstModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleAdvBalReceiptMstSave", param);
                    string TransId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        TransId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < vehicleAdvBalReceiptMstModel.VehicleAdvBalReceiptDtlList.Count; i++)
                            {
                                vehicleAdvBalReceiptMstModel.VehicleAdvBalReceiptDtlList[i].TransId = TransId;
                                vehicleAdvBalReceiptMstModel.VehicleAdvBalReceiptDtlList[i].TransDate = vehicleAdvBalReceiptMstModel.TransDate;

                                responseModel = await VehicleAdvBalReceiptMstDetailSave(transaction, vehicleAdvBalReceiptMstModel.VehicleAdvBalReceiptDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = vehicleAdvBalReceiptMstModel.VehicleAdvBalReceiptDtlList.Count;
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
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<VehicleAdvBalReceiptMstModel> GetVehicleAdvBalReceiptMstInnerGridList(RequestModel request)
        {
            VehicleAdvBalReceiptMstModel vehicleRepMaintMasterInnerGridList = new()
            {
                VehicleAdvBalReceiptDtlList = new List<VehicleAdvBalReceiptDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleAdvBalReceiptMstInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            vehicleRepMaintMasterInnerGridList.VehicleAdvBalReceiptDtlList.Add(new VehicleAdvBalReceiptDtlListmodel
                            {
                                TransDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["TransDtlId"]),
                                TransId = Convert.ToString(resultData.Tables[0].Rows[i]["TransId"]),
                                TransBranch = Convert.ToString(resultData.Tables[0].Rows[i]["TransBranch"]),
                                TransDate = Convert.ToString(resultData.Tables[0].Rows[i]["TransDate"]),

                                VehicleMasterId = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleMasterId"]),
                                TripNo = Convert.ToString(resultData.Tables[0].Rows[i]["TripNo"]),
                               // TripYear = Convert.ToString(resultData.Tables[0].Rows[i]["TripYear"]),
                             //   TripRouteDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["TripRouteDtlId"]),
                                Received = Convert.ToString(resultData.Tables[0].Rows[i]["Received"]),
                                Deduction = Convert.ToString(resultData.Tables[0].Rows[i]["Deduction"]),
                                TDS = Convert.ToString(resultData.Tables[0].Rows[i]["TDS"]),
                                Extras = Convert.ToString(resultData.Tables[0].Rows[i]["Extras"]),
                                DtlRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["DtlRemarks"]),
                                YearId = Convert.ToString(resultData.Tables[0].Rows[i]["YearId"]),
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
        public async Task<ResponseModel> VehicleAdvBalReceiptMstDetailSave(SqlTransaction transaction, VehicleAdvBalReceiptDtlListmodel vehicleAdvBalReceiptDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@TransDtlId" , vehicleAdvBalReceiptDtlListmodel.TransDtlId),
                             new SqlParameter("@TransId" , vehicleAdvBalReceiptDtlListmodel.TransId),
                             new SqlParameter("@TransBranch" , vehicleAdvBalReceiptDtlListmodel.TransBranch),
                             new SqlParameter("@TransDate" , vehicleAdvBalReceiptDtlListmodel.TransDate),
                             new SqlParameter("@VehicleMasterId" , vehicleAdvBalReceiptDtlListmodel.VehicleMasterId),
                             new SqlParameter("@TripNo" , vehicleAdvBalReceiptDtlListmodel.TripNo),
                            // new SqlParameter("@TripYear" , vehicleAdvBalReceiptDtlListmodel.TripYear),
                           //  new SqlParameter("@TripRouteDtlId" , vehicleAdvBalReceiptDtlListmodel.TripRouteDtlId),
                             new SqlParameter("@Received" , vehicleAdvBalReceiptDtlListmodel.Received),
                             new SqlParameter("@Deduction" , vehicleAdvBalReceiptDtlListmodel.Deduction),
                             new SqlParameter("@TDS" , vehicleAdvBalReceiptDtlListmodel.TDS),
                             new SqlParameter("@Extras" , vehicleAdvBalReceiptDtlListmodel.Extras),
                             new SqlParameter("@DtlRemarks" , vehicleAdvBalReceiptDtlListmodel.DtlRemarks),
                             new SqlParameter("@YearId" , vehicleAdvBalReceiptDtlListmodel.YearId),

                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleAdvBalReceiptDtlSave", param);

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

            }
            return responseModel;
        }
        public async Task<ResponseModel> VehicleAdvBalReceiptMstDelete(RequestModel req)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleAdvBalReceiptDelete", param);

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
