using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetTrans.Repository
{
    public class DieselStatementRepository : IDieselStatementRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DieselStatementRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for get Diesel Statement Search List
        /// </summary>
        /// <returns>DieselStatementSearchListModel</returns>
        public async Task<DieselStatementSearchListModel> GetDieselStatementSearchList(DieselStatementSearchListRequest request)
        {
            DieselStatementSearchListModel dieselStatementSearchList = new();
            List<DieselStatementSearchModel> dieselStatementSearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@StatementBranch", request.StatementBranch),
                            new SqlParameter("@StatementDate", request.StatementDate),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@Vendor", request.Vendor)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DieselStatementSearchList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselStatementSearchModels.Add(new DieselStatementSearchModel
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

                        dieselStatementSearchList.DieselStatementSearchList = dieselStatementSearchModels;
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
            return dieselStatementSearchList;
        }
    
        /// <summary>
        /// Service method for save Diesel Statement details
        /// </summary>
        /// <returns>ResponseModel</returns>
        /// 

    public async Task<ResponseModel> SaveDieselStatementDetails(DieselStatementSaveRequest request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@StatementBranch", request.StatementBranch),
                            new SqlParameter("@StatementDate", request.StatementDate),
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@Vendor", request.Vendor),
                            new SqlParameter("@Remarks", request.Remarks),
                            new SqlParameter("@TotalDslLtrs", request.TotalDslLtrs),
                            new SqlParameter("@TotalCashAdv", request.TotalCashAdv),
                            new SqlParameter("@TotalNetAmount", request.TotalNetAmount),
                            new SqlParameter("@BranchCode", request.BranchCode),
                            new SqlParameter("@YearId", request.YearId),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DieselStatementMaster_Insert", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // statement list insert
                        if (request.DieselStatementListData.Count > 0)
                        {
                            for (int i = 0; i < request.DieselStatementListData.Count; i++)
                            {
                                if (request.DieselStatementListData[i].Selected)
                                {
                                    SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@MasterID", MasterID),
                                        new SqlParameter("@VehicleNo", request.DieselStatementListData[i].VehicleNo),
                                        new SqlParameter("@HsdAdvTyps", request.DieselStatementListData[i].HsdAdvType),
                                        new SqlParameter("@DslQty", request.DieselStatementListData[i].QtyLtrs),
                                        new SqlParameter("@DslRate", request.DieselStatementListData[i].RatePerLtr),
                                        new SqlParameter("@Amount", request.DieselStatementListData[i].AmountPaid),
                                        new SqlParameter("@TripPmtId", request.DieselStatementListData[i].PmtId),
                                    };
                                    var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DieselStatementDetails_Insert", paramMisc);
                                }
                            }
                        }
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                //Log exception on database
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
        public async Task<DieselStatementList> GetDieselStatementList(DieselStatementListRequest request)
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
                            new SqlParameter("@Search", request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DieselStatementList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            dieselList.Add(new DieselStatementModel
                            {
                                DfVendor = Convert.ToString(dataSet.Tables[0].Rows[i]["DfVendor"]),
                                BillStmtNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtNo"]),
                                BillStmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStmtDate"]),

                                FromDate = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),

                                ToDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                Location = Convert.ToString(dataSet.Tables[0].Rows[i]["Location"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalDslLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslLtrs"]),
                                TotalCashAdv = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCashAdv"]),
                           
                                TotalNetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetAmount"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),





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
            return dieselStatementList;
        }

    }


}
