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
    public class VehicleRepMaintMasterRepository: IVehicleRepMaintMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleRepMaintMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<VehicleRepMaintMasterList> GetVehicleRepMaintMasterList(PageFromDtToDtRequest request)
        {
            VehicleRepMaintMasterList vehicleRepMaintMasterList = new();
            List<VehicleRepMaintMasterModel> maintList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepMaintMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            maintList.Add(new VehicleRepMaintMasterModel
                            {
                                VrmTransId = Convert.ToString(dataSet.Tables[0].Rows[i]["VrmTransId"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                StockType = Convert.ToString(dataSet.Tables[0].Rows[i]["StockType"]),
                                MaintID = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintID"]),
                                MaintType = Convert.ToString(dataSet.Tables[0].Rows[i]["MaintType"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                KmReading = Convert.ToString(dataSet.Tables[0].Rows[i]["KmReading"]),
                                NonVendor = Convert.ToString(dataSet.Tables[0].Rows[i]["NonVendor"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorAddress = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorAddress"]),
                                VendorState = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorState"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                TotItemAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotItemAmount"]),
                                TotSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotSgstAmt"]),
                                TotCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotCgstAmt"]),
                                TotIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotIgstAmt"]),
                                TotItemNetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotItemNetAmount"]),
                                OtherAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmount"]),
                                RoundOff = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                LinkFtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkFtmId"]),
                                LinkJVFtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkJVFtmId"]),
                                AuditedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditedYN"]),
                                AuditDate = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditDate"]),
                                AuditedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditedBy"]),
                                RefDocAttachedImage = Convert.ToString(dataSet.Tables[0].Rows[i]["RefDocAttachedImage"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                            });
                        }

                        vehicleRepMaintMasterList.MaintList = maintList;

                        vehicleRepMaintMasterList.PageMetaData = new PaginationMetaData
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
            return vehicleRepMaintMasterList;
        }
        public async Task<List<DropDownListModel>> GetMaintanenceList()
        {
            List<DropDownListModel> stateList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "MaintanenceList_Select", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            stateList.Add(new DropDownListModel
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
            return stateList;
        }
        public async Task<VehicleRepMaintMasterModel> GetVehicleRepMaintMasterInnerGridList(RequestModel request)
        {
            VehicleRepMaintMasterModel vehicleRepMaintMasterInnerGridList = new()
            {
                VehicleRepMaintDtlList = new List<VehicleRepMaintDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VrmTransId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepMaintMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            vehicleRepMaintMasterInnerGridList.VehicleRepMaintDtlList.Add(new VehicleRepMaintDtlListmodel
                            {
                                VrmTransDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["VrmTransDtlId"]),
                                VrmTransId = Convert.ToString(resultData.Tables[0].Rows[i]["VrmTransId"]),
                                TransDate = Convert.ToString(resultData.Tables[0].Rows[i]["TransDate"]),
                                SpareLubId = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandID"]),
                                ItemQty = Convert.ToString(resultData.Tables[0].Rows[i]["ItemQty"]),
                                ItemRate = Convert.ToString(resultData.Tables[0].Rows[i]["ItemRate"]),
                                ItemAmount = Convert.ToString(resultData.Tables[0].Rows[i]["ItemAmount"]),
                                SgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["IgstAmt"]),
                                NetAmount = Convert.ToString(resultData.Tables[0].Rows[i]["NetAmount"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
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
        public async Task<ResponseModel> VehicleRepMaintMasterSave(VehicleRepMaintMasterModel vehicleRepMaintMasterModel)
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
                                     new SqlParameter("@VrmTransId",vehicleRepMaintMasterModel.VrmTransId ),
                                 new SqlParameter("@TransDate",vehicleRepMaintMasterModel.TransDate ),
                                 new SqlParameter("@StockType",vehicleRepMaintMasterModel.StockType ),
                                 new SqlParameter("@MaintID",vehicleRepMaintMasterModel.MaintID ),
                                 new SqlParameter("@MaintType",vehicleRepMaintMasterModel.MaintType ),
                                 new SqlParameter("@VehicleMasterId",vehicleRepMaintMasterModel.VehicleMasterId ),
                                 new SqlParameter("@KmReading",vehicleRepMaintMasterModel.KmReading ),
                                 new SqlParameter("@NonVendor",vehicleRepMaintMasterModel.NonVendor ),
                                 new SqlParameter("@VendorId",vehicleRepMaintMasterModel.VendorId ),
                                 new SqlParameter("@VendorInvDt",vehicleRepMaintMasterModel.VendorInvDt ),
                                 new SqlParameter("@VendorInvNo",vehicleRepMaintMasterModel.VendorInvNo ),
                                 new SqlParameter("@VendorName",vehicleRepMaintMasterModel.VendorName ),
                                 new SqlParameter("@VendorAddress",vehicleRepMaintMasterModel.VendorAddress ),
                                 new SqlParameter("@VendorState",vehicleRepMaintMasterModel.VendorState ),
                                 new SqlParameter("@VendorGstNo",vehicleRepMaintMasterModel.VendorGstNo ),
                                 new SqlParameter("@GstType",vehicleRepMaintMasterModel.GstType ),
                                 new SqlParameter("@TotItemAmount",vehicleRepMaintMasterModel.TotItemAmount ),
                                 new SqlParameter("@TotSgstAmt",vehicleRepMaintMasterModel.TotSgstAmt ),
                                 new SqlParameter("@TotCgstAmt",vehicleRepMaintMasterModel.TotCgstAmt ),
                                 new SqlParameter("@TotIgstAmt",vehicleRepMaintMasterModel.TotIgstAmt ),
                                 new SqlParameter("@TotItemNetAmount",vehicleRepMaintMasterModel.TotItemNetAmount ),
                                 new SqlParameter("@OtherAmount",vehicleRepMaintMasterModel.OtherAmount ),
                                 new SqlParameter("@RoundOff",vehicleRepMaintMasterModel.RoundOff ),
                                 new SqlParameter("@NetAmount",vehicleRepMaintMasterModel.NetAmount ),
                                 new SqlParameter("@Remarks",vehicleRepMaintMasterModel.Remarks ),
                                 new SqlParameter("@PmtType",vehicleRepMaintMasterModel.PmtType ),
                                 new SqlParameter("@NeftPmt",vehicleRepMaintMasterModel.NeftPmt ),
                                 new SqlParameter("@CreditAc",vehicleRepMaintMasterModel.CreditAc ),
                                 new SqlParameter("@ChequeNo",vehicleRepMaintMasterModel.ChequeNo ),
                                 new SqlParameter("@ChequeDate",vehicleRepMaintMasterModel.ChequeDate ),
                                 //new SqlParameter("@LinkFtmId",vehicleRepMaintMasterModel.LinkFtmId ),
                                 //new SqlParameter("@LinkJVFtmId",vehicleRepMaintMasterModel.LinkJVFtmId ),
                                 //new SqlParameter("@AuditedYN",vehicleRepMaintMasterModel.AuditedYN ),
                                 //new SqlParameter("@AuditDate",vehicleRepMaintMasterModel.AuditDate ),
                                 //new SqlParameter("@AuditedBy",vehicleRepMaintMasterModel.AuditedBy ),
                                 new SqlParameter("@RefDocAttachedImage",vehicleRepMaintMasterModel.RefDocAttachedImage ),
                                 new SqlParameter("@BranchCode",vehicleRepMaintMasterModel.BranchCode ),
                                 new SqlParameter("@YearID",vehicleRepMaintMasterModel.YearID ),
                                 new SqlParameter("@LoggedInUser",vehicleRepMaintMasterModel.LoggedInUser ),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleRepMaintMasterSave", param);
                    string VrmTransId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        VrmTransId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < vehicleRepMaintMasterModel.VehicleRepMaintDtlList.Count; i++)
                            {
                                vehicleRepMaintMasterModel.VehicleRepMaintDtlList[i].VrmTransId = VrmTransId;
                                vehicleRepMaintMasterModel.VehicleRepMaintDtlList[i].TransDate = vehicleRepMaintMasterModel.TransDate;

                                responseModel = await VehicleRepMaintMasterDetailSave(transaction, vehicleRepMaintMasterModel.VehicleRepMaintDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = vehicleRepMaintMasterModel.VehicleRepMaintDtlList.Count;
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
        public async Task<ResponseModel> VehicleRepMaintMasterDetailSave(SqlTransaction transaction, VehicleRepMaintDtlListmodel vehicleRepMaintDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@VrmTransDtlId",vehicleRepMaintDtlListmodel.VrmTransDtlId),
                             new SqlParameter("@VrmTransId",vehicleRepMaintDtlListmodel.VrmTransId),
                             new SqlParameter("@TransDate",vehicleRepMaintDtlListmodel.TransDate),
                             new SqlParameter("@SpareLubId",vehicleRepMaintDtlListmodel.SpareLubId),
                             new SqlParameter("@BrandId",vehicleRepMaintDtlListmodel.BrandId),
                             new SqlParameter("@ItemQty",vehicleRepMaintDtlListmodel.ItemQty),
                             new SqlParameter("@ItemRate",vehicleRepMaintDtlListmodel.ItemRate),
                             new SqlParameter("@ItemAmount",vehicleRepMaintDtlListmodel.ItemAmount),
                             new SqlParameter("@SgstPct",vehicleRepMaintDtlListmodel.SgstPct),
                             new SqlParameter("@SgstAmt",vehicleRepMaintDtlListmodel.SgstAmt),
                             new SqlParameter("@CgstPct",vehicleRepMaintDtlListmodel.CgstPct),
                             new SqlParameter("@CgstAmt",vehicleRepMaintDtlListmodel.CgstAmt),
                             new SqlParameter("@IgstPct",vehicleRepMaintDtlListmodel.IgstPct),
                             new SqlParameter("@IgstAmt",vehicleRepMaintDtlListmodel.IgstAmt),
                             new SqlParameter("@NetAmount",vehicleRepMaintDtlListmodel.NetAmount),
                             new SqlParameter("@Remarks",vehicleRepMaintDtlListmodel.Remarks),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleRepMaintDetailSave", param);

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
        public async Task<ResponseModel> VehicleRepMaintMasterDelete(RequestModel req)
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
                            new SqlParameter("@VrmTransId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleRepMaintMasterDelete", param);

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
