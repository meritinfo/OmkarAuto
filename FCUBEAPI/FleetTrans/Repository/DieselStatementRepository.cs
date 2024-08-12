using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using Shared.Models;
using System.Numerics;
using System.Data;
using System.Data.SqlClient;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Transactions;

namespace FleetTrans.Repository
{
    public class DieselStatementRepository : IDieselStatementRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DieselStatementRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<DieselStatementModel> GetDieselStatementSearchList(ReportRequestModel request)
        {
            DieselStatementModel dieselStatementModel = new()
            {
                DieselStatementListData = new List<DieselStatementSearchModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@Location", request.Search),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@Vendor", request.FilterStr),
                            new SqlParameter("@PmtType", "V")
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselSearchGridList", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselStatementModel.DieselStatementListData.Add(new DieselStatementSearchModel
                            {
                                PmtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtId"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                HsdAdvType = Convert.ToString(dataSet.Tables[0].Rows[i]["HsdAdvType"]),
                                TransDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDesc"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                RatePerLtr = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerLtr"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                Selected = false
                            });
                        }                       
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return dieselStatementModel;
        }
        public async Task<DieselStatementModel> GetDieselStatementInnerGridList(RequestModel request)
        {
            DieselStatementModel dieselStatementModel = new()
            {
                DieselStatementListData = new List<DieselStatementSearchModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselInnergrid", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselStatementModel.DieselStatementListData.Add(new DieselStatementSearchModel
                            {
                                PmtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtId"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                HsdAdvType = Convert.ToString(dataSet.Tables[0].Rows[i]["HsdAdvType"]),
                                TransDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDesc"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                RatePerLtr = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerLtr"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                Selected = true
                            });
                        }
                    }



                }
            }
            catch (Exception ex)
            {
                
            }
            return dieselStatementModel;
        }
        public async Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel dieselStatementModel)
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
                            new SqlParameter("@MasterID"        , dieselStatementModel.MasterID),
                            new SqlParameter("@DfVendor"        , dieselStatementModel.DfVendor),
                            new SqlParameter("@BillStmtNo"      , dieselStatementModel.BillStmtNo),
                            new SqlParameter("@BillStmtDate"    , dieselStatementModel.BillStmtDate),
                            new SqlParameter("@FromDate"        , dieselStatementModel.FromDate),
                            new SqlParameter("@ToDate"          , dieselStatementModel.ToDate),
                            new SqlParameter("@Location"        , dieselStatementModel.Location),
                            new SqlParameter("@StatementFlag"   , "D"),
                            new SqlParameter("@Rate"            , dieselStatementModel.Rate),
                            new SqlParameter("@Remarks"         , dieselStatementModel.Remarks),
                            new SqlParameter("@TotalDslLtrs"    , dieselStatementModel.TotalDslLtrs),
                            new SqlParameter("@GrossDslAmt"     , dieselStatementModel.GrossDslAmt),
                            new SqlParameter("@DiscRateLtr"     , dieselStatementModel.DiscRateLtr),
                            new SqlParameter("@DiscAmt"         , dieselStatementModel.DiscAmt),
                            new SqlParameter("@TotalDslAmt"     , dieselStatementModel.TotalDslAmt),
                            new SqlParameter("@TdsRate"         , dieselStatementModel.TdsRate),
                            new SqlParameter("@TdsAmt"          , dieselStatementModel.TdsAmt),
                            new SqlParameter("@TotalCashAdv"    , dieselStatementModel.TotalCashAdv),
                            new SqlParameter("@TotalNetAmount"  , dieselStatementModel.TotalNetAmount),
                            new SqlParameter("@BranchCode"      , dieselStatementModel.BranchCode),
                            new SqlParameter("@YearID"          , dieselStatementModel.YearId),
                            new SqlParameter("@LoggedInUser"    , dieselStatementModel.LoggedInUser)
                        };                    
                    
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DieselStatementMstSave", param);                                                               

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < dieselStatementModel.DieselStatementListData.Count; i++)
                            {
                                if (dieselStatementModel.DieselStatementListData[i].Selected)
                                {
                                    SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@MasterID"    , MasterID),
                                        new SqlParameter("@TripPmtId"   , dieselStatementModel.DieselStatementListData[i].PmtId),
                                        new SqlParameter("@VehicleNo"   , dieselStatementModel.DieselStatementListData[i].VehicleNo),
                                        new SqlParameter("@HsdAdvTyps"  , dieselStatementModel.DieselStatementListData[i].HsdAdvType),
                                        new SqlParameter("@DslQty"      , dieselStatementModel.DieselStatementListData[i].QtyLtrs),
                                        new SqlParameter("@DslRate"     , dieselStatementModel.DieselStatementListData[i].RatePerLtr),
                                        new SqlParameter("@Amount"      , dieselStatementModel.DieselStatementListData[i].AmountPaid),
                                    };
                                    var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DieselStatementDtlsSave", paramMisc);
                                    if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0)
                                    {
                                        responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                        responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                        if (!responseModel.Status)
                                        {
                                            i = dieselStatementModel.DieselStatementListData.Count;
                                            transaction.Rollback();
                                        }
                                    }
                                    else
                                    {
                                        i = dieselStatementModel.DieselStatementListData.Count;
                                        transaction.Rollback();
                                    }
                                   
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
        public async Task<DieselStatementList> GetDieselStatementList(ReportRequestModel request)
        {
            DieselStatementList dieselStatementList = new();
            List<DieselStatementModel> dieselList = new();
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
                            new SqlParameter("@fromDate", request.FromDate),
                            new SqlParameter("@toDate", request.ToDate),
                            new SqlParameter("@StatementFlag", "D"),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStatementMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselList.Add(new DieselStatementModel
                            {
                                MasterID        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                DfVendor        = Convert.ToString(dataSet.Tables[0].Rows[i]["DfVendor"]),
                                Vendor          = Convert.ToString(dataSet.Tables[0].Rows[i]["Vendor"]),
                                BillStmtNo      = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtNo"]),
                                BillStmtDate    = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtDate"]),
                                FromDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                ToDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                Findocid        = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                Location        = Convert.ToString(dataSet.Tables[0].Rows[i]["Location"]),
                                Rate            = Convert.ToString(dataSet.Tables[0].Rows[i]["Rate"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalDslLtrs    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslLtrs"]),
                                GrossDslAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["GrossDslAmt"]),
                                DiscRateLtr     = Convert.ToString(dataSet.Tables[0].Rows[i]["DiscRateLtr"]),
                                DiscAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["DiscAmt"]),
                                TotalDslAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslAmt"]),
                                TdsRate         = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsRate"]),
                                TdsAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                TotalCashAdv    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCashAdv"]),
                                TotalNetAmount  = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetAmount"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearId          = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                            });
                        }

                        dieselStatementList.DieselList = dieselList;

                        dieselStatementList.PageMetaData = new PaginationMetaData
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
            return dieselStatementList;
        }
        public async Task<ResponseModel> DieselStatementDetailsDelete(RequestModel request)
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
                            new SqlParameter("@MasterID", request.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DieselStatementDelete", param);

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
        public async Task<DieselStatementList> GetHappayDieselList(ReportRequestModel request)
        {
            DieselStatementList dieselStatementList = new();
            List<DieselStatementModel> dieselList = new();
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
                            new SqlParameter("@fromDate", request.FromDate),
                            new SqlParameter("@toDate", request.ToDate),
                            new SqlParameter("@StatementFlag", "H"),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getHappayStatementMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselList.Add(new DieselStatementModel
                            {
                                MasterID        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                DfVendor        = Convert.ToString(dataSet.Tables[0].Rows[i]["DfVendor"]),
                                Vendor          = Convert.ToString(dataSet.Tables[0].Rows[i]["Vendor"]),
                                BillStmtNo      = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtNo"]),
                                BillStmtDate    = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtDate"]),
                                FromDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                ToDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                Findocid        = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                Location        = Convert.ToString(dataSet.Tables[0].Rows[i]["Location"]),
                                Rate            = Convert.ToString(dataSet.Tables[0].Rows[i]["Rate"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalDslLtrs    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslLtrs"]),
                                TotalDslAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslAmt"]),
                                TotalCashAdv    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCashAdv"]),
                                TotalNetAmount  = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetAmount"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearId          = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                            });
                        }

                        dieselStatementList.DieselList = dieselList;

                        dieselStatementList.PageMetaData = new PaginationMetaData
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
            return dieselStatementList;
        }
        public async Task<DieselStatementModel> GetHappayDieselSearchList(ReportRequestModel request)
        {
            DieselStatementModel dieselStatementModel = new()
            {
                DieselStatementListData = new List<DieselStatementSearchModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@Location", request.Search),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@Vendor", request.FilterStr),
                            new SqlParameter("@PmtType", "H")
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselSearchGridList", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselStatementModel.DieselStatementListData.Add(new DieselStatementSearchModel
                            {
                                PmtId = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtId"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                HsdAdvType = Convert.ToString(dataSet.Tables[0].Rows[i]["HsdAdvType"]),
                                TransDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDesc"]),
                                QtyLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyLtrs"]),
                                RatePerLtr = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerLtr"]),
                                AmountPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountPaid"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                Selected = false
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return dieselStatementModel;
        }
        public async Task<ResponseModel> SaveHappayStatementDetails(DieselStatementModel dieselStatementModel)
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
                            new SqlParameter("@MasterID"        , dieselStatementModel.MasterID),
                            new SqlParameter("@DfVendor"        , dieselStatementModel.DfVendor),
                            new SqlParameter("@BillStmtNo"      , dieselStatementModel.BillStmtNo),
                            new SqlParameter("@BillStmtDate"    , dieselStatementModel.BillStmtDate),
                            new SqlParameter("@FromDate"        , dieselStatementModel.FromDate),
                            new SqlParameter("@ToDate"          , dieselStatementModel.ToDate),
                            new SqlParameter("@Location"        , dieselStatementModel.Location),
                            new SqlParameter("@StatementFlag"   , "H"),
                            new SqlParameter("@Rate"            , dieselStatementModel.Rate),
                            new SqlParameter("@Remarks"         , dieselStatementModel.Remarks),
                            new SqlParameter("@TotalDslLtrs"    , dieselStatementModel.TotalDslLtrs),
                            new SqlParameter("@TotalDslAmt"     , dieselStatementModel.TotalDslAmt),
                            new SqlParameter("@TotalCashAdv"    , dieselStatementModel.TotalCashAdv),
                            new SqlParameter("@TotalNetAmount"  , dieselStatementModel.TotalNetAmount),
                            new SqlParameter("@BranchCode"      , dieselStatementModel.BranchCode),
                            new SqlParameter("@YearID"          , dieselStatementModel.YearId),
                            new SqlParameter("@LoggedInUser"    , dieselStatementModel.LoggedInUser)
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_HappayStatementMstSave", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < dieselStatementModel.DieselStatementListData.Count; i++)
                            {
                                if (dieselStatementModel.DieselStatementListData[i].Selected)
                                {
                                    SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@MasterID"    , MasterID),
                                        new SqlParameter("@TripPmtId"   , dieselStatementModel.DieselStatementListData[i].PmtId),
                                        new SqlParameter("@VehicleNo"   , dieselStatementModel.DieselStatementListData[i].VehicleNo),
                                        new SqlParameter("@HsdAdvTyps"  , dieselStatementModel.DieselStatementListData[i].HsdAdvType),
                                        new SqlParameter("@DslQty"      , dieselStatementModel.DieselStatementListData[i].QtyLtrs),
                                        new SqlParameter("@DslRate"     , dieselStatementModel.DieselStatementListData[i].RatePerLtr),
                                        new SqlParameter("@Amount"      , dieselStatementModel.DieselStatementListData[i].AmountPaid),
                                    };
                                    var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_HappayStatementDtlsSave", paramMisc);
                                    if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0)
                                    {
                                        responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                        responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                        if (!responseModel.Status)
                                        {
                                            i = dieselStatementModel.DieselStatementListData.Count;
                                            transaction.Rollback();
                                        }
                                    }
                                    else
                                    {
                                        i = dieselStatementModel.DieselStatementListData.Count;
                                        transaction.Rollback();
                                    }

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
        public async Task<ResponseModel> DieselStatementSave(DieselStmtModel dieselStmtModel)
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
                            new SqlParameter("@DfMasterID"      , dieselStmtModel.DfMasterID),
                            new SqlParameter("@DfAccount"       , dieselStmtModel.DfAccount),
                            new SqlParameter("@FromDate"        , dieselStmtModel.FromDate),
                            new SqlParameter("@ToDate"          , dieselStmtModel.ToDate),
                            new SqlParameter("@StmtDate"        , dieselStmtModel.StmtDate),
                            new SqlParameter("@Remarks"         , dieselStmtModel.Remarks),
                            new SqlParameter("@TotalDslLtrs"    , dieselStmtModel.TotalDslLtrs),
                            new SqlParameter("@TotalDslAmt"     , dieselStmtModel.TotalDslAmt),
                            new SqlParameter("@BranchCode"      , dieselStmtModel.BranchCode),
                            new SqlParameter("@YearID"          , dieselStmtModel.YearId),
                            new SqlParameter("@LoggedInUser"    , dieselStmtModel.LoggedInUser)
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DieselStatementMstSave", param);

                    string DfMasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        DfMasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < dieselStmtModel.DieselStmtDtlsList.Count; i++)
                            {
                                SqlParameter[] paramMisc =
                                {
                                    new SqlParameter("@DfMasterID"      , DfMasterID),
                                    new SqlParameter("@TransRefNo"      , dieselStmtModel.DieselStmtDtlsList[i].TransRefNo),
                                    new SqlParameter("@VehicleNo"       , dieselStmtModel.DieselStmtDtlsList[i].VehicleNo),
                                    new SqlParameter("@TransDateTime"   , dieselStmtModel.DieselStmtDtlsList[i].TransDateTime),
                                    new SqlParameter("@DslQty"          , dieselStmtModel.DieselStmtDtlsList[i].DslQty),
                                    new SqlParameter("@DslRate"         , dieselStmtModel.DieselStmtDtlsList[i].DslRate),
                                    new SqlParameter("@Amount"          , dieselStmtModel.DieselStmtDtlsList[i].Amount),
                                };
                                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DieselStatementDtlsSave", paramMisc);
                                if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0 )
                                {
                                    responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                    responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                    if (!responseModel.Status)
                                    {
                                        i = dieselStmtModel.DieselStmtDtlsList.Count;
                                        transaction.Rollback();
                                    }
                                }
                                else
                                {
                                    i = dieselStmtModel.DieselStmtDtlsList.Count;
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
        public async Task<DieselStmtListModel> GetDieselStmtList(ReportRequestModel request)
        {
            DieselStmtListModel dieselStatementList = new();
            List<DieselStmtModel> dieselList = new();
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
                            new SqlParameter("@fromDate", request.FromDate),
                            new SqlParameter("@toDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStatementMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselList.Add(new DieselStmtModel
                            {
                                DfMasterID      = Convert.ToString(dataSet.Tables[0].Rows[i]["DfMasterID"]),
                                DfAccount       = Convert.ToString(dataSet.Tables[0].Rows[i]["DfAccount"]),
                                AccountName     = Convert.ToString(dataSet.Tables[0].Rows[i]["AccountName"]),
                                StmtDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["StmtDate"]),
                                FromDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                ToDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                FtmidHsd        = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmidHsd"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalDslLtrs    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslLtrs"]),
                                TotalDslAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslAmt"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearId          = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                            });
                        }

                        dieselStatementList.DieselList = dieselList;

                        dieselStatementList.PageMetaData = new PaginationMetaData
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
            return dieselStatementList;
        }

        public async Task<DieselStmtModel> GetDieselStmtInnerGridList(RequestModel request)
        {
            DieselStmtModel dieselStatementList = new();
            List<DieselStmtDtlsModel> dieselList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DfMasterID", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDieselStmtInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselList.Add(new DieselStmtDtlsModel
                            {
                                DfMasterID      = Convert.ToString(dataSet.Tables[0].Rows[i]["DfMasterID"]),
                                TransRefNo      = Convert.ToString(dataSet.Tables[0].Rows[i]["TransRefNo"]),
                                VehicleNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                TransDateTime   = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDateTime"]),
                                DslQty          = Convert.ToString(dataSet.Tables[0].Rows[i]["DslQty"]),
                                DslRate         = Convert.ToString(dataSet.Tables[0].Rows[i]["DslRate"]),
                                Amount          = Convert.ToString(dataSet.Tables[0].Rows[i]["Amount"]),
                            });
                        }

                        dieselStatementList.DieselStmtDtlsList = dieselList;

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return dieselStatementList;
        }

    }
}
