using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace FleetTrans.Repository
{
    public class DriverSalaryStmtRepository : IDriverSalaryStmtRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public DriverSalaryStmtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }


        public async Task<DriverSalaryStatementList> GetDriverSalaryStatementList(DriverSalaryListRequest request)
        {
            DriverSalaryStatementList driverSalaryList = new();
            List<DriverSalaryStatementModel> driverStmtList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryStatementList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverStmtList.Add(new DriverSalaryStatementModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                TransDt = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDt"]),
                                FromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDt"]),
                                ToDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDt"]),

                              //  PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),

                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalSalaryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSalaryAmt"]),
                                TotalPoolAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalPoolAmt"]),
                              //  NetPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPayable"]),
                              //  CreditAC = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAC"]),

                              //  CheqNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqNo"]),



                            });
                        }

                        driverSalaryList.DriverSalaryList = driverStmtList;

                        driverSalaryList.PageMetaData = new PaginationMetaData
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
            return driverSalaryList;
        }
        public async Task<ResponseModel> SaveDriverSalaryStatementDetails(DriverSalaryStatementModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                           new SqlParameter("@MasterId", request.MasterId),
                            new SqlParameter("@TransDt", request.TransDt),
                            new SqlParameter("@FromDt", request.FromDt),
                            new SqlParameter("@ToDt", request.ToDt),
                          
                            new SqlParameter("@Remarks", request.Remarks),
                            new SqlParameter("@TotalSalaryAmt", request.TotalSalaryAmt  == "" ? "0" : request.TotalSalaryAmt),
                            new SqlParameter("@TotalPoolAmt", request.TotalPoolAmt== "" ? "0" : request.TotalPoolAmt ),
                           
                            new SqlParameter("@YearId", request.YearId),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)



                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryStatementMaster_Insert", param);

                    string MasterID = "";
                    //if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    //{
                    //    MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);
                    //    responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    //    // statement list insert
                    //    if (request.BillStatementListData.Count > 0)
                    //    {
                    //        for (int i = 0; i < request.BillStatementListData.Count; i++)
                    //        {
                    //            if (request.BillStatementListData[i].Selected)
                    //            {
                    //                SqlParameter[] paramMisc =
                    //                {
                    //                    new SqlParameter("@MasterID", MasterID),
                    //                    new SqlParameter("@ConsignmentID", request.BillStatementListData[i].ConsignmentID != "" ? request.BillStatementListData[i].ConsignmentID : "0"),
                    //                    new SqlParameter("@FreightRs", request.BillStatementListData[i].GtotalRs != "" ? request.BillStatementListData[i].GtotalRs : "0"),
                    //                    new SqlParameter("@StatisticalRs", request.BillStatementListData[i].StatisticalRs != "" ? request.BillStatementListData[i].StatisticalRs : "0"),
                    //                    new SqlParameter("@HandlingRs", request.BillStatementListData[i].HandlingRs != "" ? request.BillStatementListData[i].HandlingRs : "0"),
                    //                    new SqlParameter("@LoadingDetnRs", request.BillStatementListData[i].LoadingDetnRs != "" ? request.BillStatementListData[i].LoadingDetnRs : "0"),
                    //                    new SqlParameter("@EnrouteRs", request.BillStatementListData[i].EnrouteRs != "" ? request.BillStatementListData[i].EnrouteRs : "0"),
                    //                    new SqlParameter("@MiscRs", request.BillStatementListData[i].MiscRs != "" ? request.BillStatementListData[i].MiscRs : "0"),
                    //                    new SqlParameter("@ExtrasRS", request.BillStatementListData[i].ExtrasRs != "" ? request.BillStatementListData[i].ExtrasRs : "0"),
                    //                    new SqlParameter("@UnLoadingRs", request.BillStatementListData[i].UnloadingRs != "" ? request.BillStatementListData[i].UnloadingRs : "0"),
                    //                    new SqlParameter("@DetentionRs", request.BillStatementListData[i].DetentionRs != "" ? request.BillStatementListData[i].DetentionRs : "0"),
                    //                    new SqlParameter("@OthersRs", request.BillStatementListData[i].OthersRs != "" ? request.BillStatementListData[i].OthersRs : "0"),
                    //                    new SqlParameter("@TotalRs", request.BillStatementListData[i].GtotalRs != "" ? request.BillStatementListData[i].GtotalRs : "0")
                    //                };
                    //                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "BillStatementDetails_Insert", paramMisc);
                    //            }
                    //        }
                    //    }
                    //}
                    //else
                    //{
                    //    responseModel.Status = false;
                    //    responseModel.Message = "Unable to process";
                    //}
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
