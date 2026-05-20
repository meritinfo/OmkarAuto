using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Shared.Models;
using System.Numerics;
using System.Data;
using System.Data.SqlClient;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Transactions;
using DocumentFormat.OpenXml.Bibliography;

namespace FleetTrans.Repository
{
    public class VendorPmtRepository : IVendorPmtRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VendorPmtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<VendorPmtListModel> GetVendorPmtList(ReportRequestModel request)
        {
            VendorPmtListModel VendorPmtList = new();
            List<VendorPmtModel> pmtList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize", request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder", request.SortOrder),
                            new SqlParameter("@Search", request.Search),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@VendorId",  request.FilterStr),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVendorPmtMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            pmtList.Add(new VendorPmtModel
                            {
                                TransId = Convert.ToString(dataSet.Tables[0].Rows[i]["TransId"]),
                                TransBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBranch"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                BillsUptoDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillsUptoDate"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                Vendor = Convert.ToString(dataSet.Tables[0].Rows[i]["Vendor"]),
                                TotalAmtPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmtPaid"]),
                                TotalAmtDed = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmtDed"]),
                                TotalAmtTDS = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmtTDS"]),
                                TotalAmtExtras = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmtExtras"]),
                                NetAmtPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmtPaid"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftYN = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                FinDocid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocid"]),
                                FinDocidJV = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocidJV"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        VendorPmtList.VendorPmtList = pmtList;

                        VendorPmtList.PageMetaData = new PaginationMetaData
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
            return VendorPmtList;
        }
        public async Task<VendorPmtModel> GetVendorPmtSearchList(ReportRequestModel request)
        {
            VendorPmtModel vendorPmt = new()
            {
                vendorPmtDetailList = new List<VendorPmtDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@ToDate", request.ToDate),
                        new SqlParameter("@Vendor", request.FilterStr),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVendorPmtSearchList", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vendorPmt.vendorPmtDetailList.Add(new VendorPmtDtlModel
                            {
                                PmtForm = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtForm"]),
                                VendorBillMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorBillMasterId"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                            });
                        }                       
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return vendorPmt;
        }
        public async Task<VendorPmtModel> GetVendorPmtInnerGridList(RequestModel request)
        {
            VendorPmtModel vendorPmt = new()
            {
                vendorPmtDetailList = new List<VendorPmtDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVendorPmtInnergrid", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vendorPmt.vendorPmtDetailList.Add(new VendorPmtDtlModel
                            {
                                PmtForm = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtForm"]),
                                VendorBillMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorBillMasterId"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                AmtPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtPaid"]),
                                AmtDed = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtDed"]),
                                AmtTDS = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtTDS"]),
                                AmtExtras = Convert.ToString(dataSet.Tables[0].Rows[i]["AmtExtras"]),
                                DtlRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["DtlRemarks"]),
                            });
                        }
                    }



                }
            }
            catch (Exception ex)
            {
                
            }
            return vendorPmt;
        }
        public async Task<ResponseModel> VendorPmtDetailsSave(VendorPmtModel vendorPmt)
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
                            new SqlParameter("@TransId"         , vendorPmt.TransId),
                            new SqlParameter("@TransBranch"     , vendorPmt.TransBranch),
                            new SqlParameter("@TransDate"       , vendorPmt.TransDate ),
                            new SqlParameter("@BillsUptoDate"   , vendorPmt.BillsUptoDate),
                            new SqlParameter("@VendorId"        , vendorPmt.VendorId ),
                            new SqlParameter("@TotalAmtPaid"    , vendorPmt.TotalAmtPaid ),
                            new SqlParameter("@TotalAmtDed"     , vendorPmt.TotalAmtDed ),
                            new SqlParameter("@TotalAmtTDS"     , vendorPmt.TotalAmtTDS ),
                            new SqlParameter("@TotalAmtExtras"  , vendorPmt.TotalAmtExtras),
                            new SqlParameter("@NetAmtPaid"      , vendorPmt.NetAmtPaid ),
                            new SqlParameter("@Remarks"         , vendorPmt.Remarks),
                            new SqlParameter("@PmtType"         , vendorPmt.PmtType ),
                            new SqlParameter("@NeftYN"          , vendorPmt.NeftYN ),
                            new SqlParameter("@ChequeNo"        , vendorPmt.ChequeNo ),
                            new SqlParameter("@ChequeDate"      , vendorPmt.ChequeDate ),
                            new SqlParameter("@CreditAc"        , vendorPmt.CreditAc ),
                            new SqlParameter("@YearId"          , vendorPmt.YearId ),
                            new SqlParameter("@LoggedInUser"    , vendorPmt.LoggedInUser ),
                        };                    
                    
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VendorPmtMasterSave", param);                                                               

                    string TransId = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        TransId = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < vendorPmt.vendorPmtDetailList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@TransId"         , TransId),
                                        new SqlParameter("@PmtForm"         , vendorPmt.vendorPmtDetailList[i].PmtForm),
                                        new SqlParameter("@VendorBillMasterId", vendorPmt.vendorPmtDetailList[i].VendorBillMasterId),
                                        new SqlParameter("@VehicleNo"       , vendorPmt.vendorPmtDetailList[i].VehicleNo),
                                        new SqlParameter("@VendorInvNo"     , vendorPmt.vendorPmtDetailList[i].VendorInvNo),
                                        new SqlParameter("@AmtPaid"         , vendorPmt.vendorPmtDetailList[i].AmtPaid),
                                        new SqlParameter("@AmtDed"          , vendorPmt.vendorPmtDetailList[i].AmtDed),
                                        new SqlParameter("@AmtTDS"          , vendorPmt.vendorPmtDetailList[i].AmtTDS),
                                        new SqlParameter("@AmtExtras"       , vendorPmt.vendorPmtDetailList[i].AmtExtras),
                                        new SqlParameter("@DtlRemarks"      , vendorPmt.vendorPmtDetailList[i].DtlRemarks),
                                    };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VendorPmtDtlsSave", paramMisc);
                                
                                if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0)
                                {
                                    responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = vendorPmt.vendorPmtDetailList.Count;
                                        transaction.Rollback();
                                    }
                                }
                                else
                                {
                                    i = vendorPmt.vendorPmtDetailList.Count;
                                    transaction.Rollback();
                                }                                   
                            }                           
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                    }
                    else
                    {
                        transaction.Rollback();
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> VendorPmtDetailsDelete(RequestModel request)
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
                            new SqlParameter("@TransId", request.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VendorPmtDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else
                    {
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
