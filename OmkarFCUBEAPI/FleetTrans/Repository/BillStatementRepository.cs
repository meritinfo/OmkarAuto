using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetTrans.Repository
{
    public class BillStatementRepository : IBillStatementRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillStatementRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for get Bill Statement Search List
        /// </summary>
        /// <returns>BillStatementSearchListModel</returns>
        public async Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request)
        {
            BillStatementSearchListModel billStatementSearchList = new();
            List<BillStatementSearchModel> billStatementSearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty", request.BillingParty),
                            new SqlParameter("@FromPlace", request.FromPlace),
                            new SqlParameter("@ToPlace", request.ToPlace),
                            new SqlParameter("@CnorPlantCode", request.CnorPlantCode),
                            new SqlParameter("@ProductId", request.ProductId)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BillStatementSearchList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billStatementSearchModels.Add(new BillStatementSearchModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                ProductName = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductName"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                StatisticalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["StatisticalRs"]),
                                HandlingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["HandlingRs"]),
                                LoadingDetnRs = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingDetnRs"]),
                                EnrouteRs = Convert.ToString(dataSet.Tables[0].Rows[i]["EnrouteRs"]),
                                MiscRs = Convert.ToString(dataSet.Tables[0].Rows[i]["MiscRs"]),
                                ExtrasRs = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtrasRs"]),
                                UnloadingRs = Convert.ToString(dataSet.Tables[0].Rows[i]["UnloadingRs"]),
                                DetentionRs = Convert.ToString(dataSet.Tables[0].Rows[i]["DetentionRs"]),
                                OthersRs = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersRs"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Selected = false
                            });
                        }

                        billStatementSearchList.BillStatementSearchList = billStatementSearchModels;
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
            return billStatementSearchList;
        }
        public async Task<BillStatementList> GetBillStatementList(BillStatementListRequest request)
        {
            BillStatementList billStatementList = new();
            List<BillStatementModel> billList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BillStatementList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billList.Add(new BillStatementModel
                            {
                                BillStation = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStation"]),
                                SeriesCode = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesCode"]),
                                Bill_StmtNo = Convert.ToString(dataSet.Tables[0].Rows[i]["Bill_StmtNo"]),

                                BillDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),

                                BillStatus = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStatus"]),
                              ////  Location = Convert.ToString(dataSet.Tables[0].Rows[i]["Location"]),
                              // // Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                              //  TotalDslLtrs = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDslLtrs"]),
                              //  TotalCashAdv = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCashAdv"]),

                              //  TotalNetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetAmount"]),
                              //  BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                              //  YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),





                            });
                        }

                        billStatementList.BillList = billList;

                        billStatementList.PageMetaData = new PaginationMetaData
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
            return billStatementList;
        }

        /// <summary>
        /// Service method for save Bill Statement details
        /// </summary>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> SaveBillStatementDetails(BillStatementSaveRequest request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty", request.BillingParty),
                            new SqlParameter("@FromPlace", request.FromPlace),
                            new SqlParameter("@ToPlace", request.ToPlace),
                            new SqlParameter("@CnorPlantCode", request.CnorPlantCode),
                            new SqlParameter("@ProductId", request.ProductId),
                            new SqlParameter("@TotFreight", request.TotFreight),
                            new SqlParameter("@TotExtraChrg", request.TotExtraChrg),
                            new SqlParameter("@TotSubTotal", request.TotSubTotal),
                            new SqlParameter("@GstType", request.GstType),
                            new SqlParameter("@SgstPct", request.SgstPct),
                            new SqlParameter("@SgstAmt", request.SgstAmt),
                            new SqlParameter("@CgstPct", request.CgstPct),
                            new SqlParameter("@CgstAmt", request.CgstAmt),
                            new SqlParameter("@IgstPct", request.IgstPct),
                            new SqlParameter("@IgstAmt", request.IgstAmt),
                            new SqlParameter("@TotalBillAmt", request.TotalBillAmt),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BilStatementMaster_Insert", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // statement list insert
                        if (request.BillStatementListData.Count > 0)
                        {
                            for (int i = 0; i < request.BillStatementListData.Count; i++)
                            {
                                if (request.BillStatementListData[i].Selected)
                                {
                                    SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@MasterID", MasterID),
                                        new SqlParameter("@FreightRs", request.BillStatementListData[i].FreightRs != "" ? request.BillStatementListData[i].FreightRs : "0"),
                                        new SqlParameter("@StatisticalRs", request.BillStatementListData[i].StatisticalRs != "" ? request.BillStatementListData[i].StatisticalRs : "0"),
                                        new SqlParameter("@HandlingRs", request.BillStatementListData[i].HandlingRs != "" ? request.BillStatementListData[i].HandlingRs : "0"),
                                        new SqlParameter("@LoadingDetnRs", request.BillStatementListData[i].LoadingDetnRs != "" ? request.BillStatementListData[i].LoadingDetnRs : "0"),
                                        new SqlParameter("@EnrouteRs", request.BillStatementListData[i].EnrouteRs != "" ? request.BillStatementListData[i].EnrouteRs : "0"),
                                        new SqlParameter("@MiscRs", request.BillStatementListData[i].MiscRs != "" ? request.BillStatementListData[i].MiscRs : "0"),
                                        new SqlParameter("@ExtrasRS", request.BillStatementListData[i].ExtrasRs != "" ? request.BillStatementListData[i].ExtrasRs : "0"),
                                        new SqlParameter("@UnLoadingRs", request.BillStatementListData[i].UnloadingRs != "" ? request.BillStatementListData[i].UnloadingRs : "0"),
                                        new SqlParameter("@DetentionRs", request.BillStatementListData[i].DetentionRs != "" ? request.BillStatementListData[i].DetentionRs : "0"),
                                        new SqlParameter("@OthersRs", request.BillStatementListData[i].OthersRs != "" ? request.BillStatementListData[i].OthersRs : "0"),
                                        new SqlParameter("@TotalRs", request.BillStatementListData[i].GtotalRs != "" ? request.BillStatementListData[i].GtotalRs : "0")
                                    };
                                    var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BillStatementDetails_Insert", paramMisc);
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
    }
}
