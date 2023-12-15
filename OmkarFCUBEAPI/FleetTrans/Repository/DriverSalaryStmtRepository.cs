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
        public async Task<DriverSalarySearchListModel> GetDriverSalarySearchList(DriverSalarySearchListRequest request)
        {
            DriverSalarySearchListModel driverSalarySearchList = new();
            List<DriverSalarySearchModel> driverSalarySearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          //  new SqlParameter("@NewTripDate", request.NewTripDate),
                            new SqlParameter("@VehicleMasterID", request.VehicleMasterID),
                            new SqlParameter("@DriverMasterID", request.DriverMasterID),
                          
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalarySearchList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverSalarySearchModels.Add(new DriverSalarySearchModel
                            {
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                DriverMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterId"]),
                                SalaryDays = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryDays"]),
                                PoolAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PoolAmt"]),
                                // VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                VehicleLedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleLedgerAc"]),
                              
                                Selected = false
                            });
                        }

                        driverSalarySearchList.DriverSalarySearchList = driverSalarySearchModels;
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
            return driverSalarySearchList;
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
                                        new SqlParameter("@DetailId", request.DriverSalaryListData[i].DetailId != "" ? request.DriverSalaryListData[i].DetailId : "0"),
                                     //   new SqlParameter("@FreightRs", request.DriverSalaryListData[i].MasterId != "" ? request.DriverSalaryListData[i].MasterId : "0"),
                                        new SqlParameter("@VehicleMasterId", request.DriverSalaryListData[i].VehicleMasterId != "" ? request.DriverSalaryListData[i].VehicleMasterId : "0"),
                                        new SqlParameter("@DriverMasterId", request.DriverSalaryListData[i].DriverMasterId != "" ? request.DriverSalaryListData[i].DriverMasterId : "0"),
                                        new SqlParameter("@FromDt", request.DriverSalaryListData[i].FromDt != "" ? request.DriverSalaryListData[i].FromDt : "0"),
                                        new SqlParameter("@ToDt", request.DriverSalaryListData[i].ToDt != "" ? request.DriverSalaryListData[i].ToDt : "0"),
                                        new SqlParameter("@SalaryDays", request.DriverSalaryListData[i].SalaryDays != "" ? request.DriverSalaryListData[i].SalaryDays : "0"),
                                        new SqlParameter("@SalaryAmt", request.DriverSalaryListData[i].SalaryAmt != "" ? request.DriverSalaryListData[i].SalaryAmt : "0"),
                                        new SqlParameter("@PoolAmt", request.DriverSalaryListData[i].PoolAmt != "" ? request.DriverSalaryListData[i].PoolAmt : "0"),
                                        new SqlParameter("@LastTripBal", request.DriverSalaryListData[i].LastTripBal != "" ? request.DriverSalaryListData[i].LastTripBal : "0"),
                                        new SqlParameter("@NetPayable", request.DriverSalaryListData[i].NetPayable != "" ? request.DriverSalaryListData[i].NetPayable : "0"),
                                        new SqlParameter("@DetRemarks", request.DriverSalaryListData[i].DetRemarks != "" ? request.DriverSalaryListData[i].DetRemarks : "0")
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
