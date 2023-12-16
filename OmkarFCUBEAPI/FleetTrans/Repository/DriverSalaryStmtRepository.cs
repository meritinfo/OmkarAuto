using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
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


        public async Task<DriverSalaryStatementList> GetDriverSalaryStatementList(PageRequest request)
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
                            new SqlParameter("@TotalNetPayAmt", request.TotalNetPayAmt== "" ? "0" : request.TotalNetPayAmt ),
                            new SqlParameter("@PmtType", request.PmtType),
                            new SqlParameter("@CreditAc", request.CreditAc),

                            new SqlParameter("@YearId", request.YearId),
                            new SqlParameter("@LoggedInUser", request.LoggedInUser)



                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryStatement_Insert", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        // statement list insert
                        if (request.DriverSalaryListData.Count > 0)
                        {
                            for (int i = 0; i < request.DriverSalaryListData.Count; i++)
                            {
                                if (request.DriverSalaryListData[i].Selected)
                                {
                                    SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@MasterID", MasterID),
                                        new SqlParameter("@ConsignmentID", request.DriverSalaryListData[i].DetailId != "" ? request.DriverSalaryListData[i].DetailId : "0"),
                                        new SqlParameter("@FreightRs", request.DriverSalaryListData[i].MasterId != "" ? request.DriverSalaryListData[i].MasterId : "0"),
                                        new SqlParameter("@StatisticalRs", request.DriverSalaryListData[i].VehicleMasterId != "" ? request.DriverSalaryListData[i].VehicleMasterId : "0"),
                                        new SqlParameter("@HandlingRs", request.DriverSalaryListData[i].DriverMasterId != "" ? request.DriverSalaryListData[i].DriverMasterId : "0"),
                                        new SqlParameter("@LoadingDetnRs", request.DriverSalaryListData[i].FromDt != "" ? request.DriverSalaryListData[i].FromDt : "0"),
                                        new SqlParameter("@EnrouteRs", request.DriverSalaryListData[i].ToDt != "" ? request.DriverSalaryListData[i].ToDt : "0"),
                                        new SqlParameter("@MiscRs", request.DriverSalaryListData[i].SalaryDays != "" ? request.DriverSalaryListData[i].SalaryDays : "0"),
                                        new SqlParameter("@ExtrasRS", request.DriverSalaryListData[i].SalaryAmt != "" ? request.DriverSalaryListData[i].SalaryAmt : "0"),
                                        new SqlParameter("@UnLoadingRs", request.DriverSalaryListData[i].PoolAmt != "" ? request.DriverSalaryListData[i].PoolAmt : "0"),
                                        new SqlParameter("@DetentionRs", request.DriverSalaryListData[i].LastTripBal != "" ? request.DriverSalaryListData[i].LastTripBal : "0"),
                                        new SqlParameter("@OthersRs", request.DriverSalaryListData[i].NetPayable != "" ? request.DriverSalaryListData[i].NetPayable : "0"),
                                        new SqlParameter("@TotalRs", request.DriverSalaryListData[i].DetRemarks != "" ? request.DriverSalaryListData[i].DetRemarks : "0")
                                    };
                                    var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryDetails_Insert", paramMisc);
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
