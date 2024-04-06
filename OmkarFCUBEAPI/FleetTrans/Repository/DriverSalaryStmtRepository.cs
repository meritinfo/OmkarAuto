using FleetTrans.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System.Collections.Generic;
using System.Data.Common;
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
                           // new SqlParameter("@NewTripDate", request.NewTripDate),
                         //  new SqlParameter("@FromDate", request.FromDate),
                        //  new SqlParameter("@ToDate", request.ToDate),
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
                                SalaryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryAmt"]),
                                PoolAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PoolAmt"]),
                                // VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                              //  VehicleLedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleLedgerAc"]),
                                FromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDt"]),
                                ToDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDt"]),
                                NetPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPayable"]),
                                LastTripBal = Convert.ToString(dataSet.Tables[0].Rows[i]["LastTripBal"]),
                                LastTripDt = Convert.ToString(dataSet.Tables[0].Rows[i]["LastTripDt"]),

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
        public async Task<DriverSalarySearchListModel> GetDriverSalaryInnerGridList(RequestModel request)
        {

            //BillStatementModel billstatementInnerGridList = new()
            //{
            //    BillStatementListData = new List<BillStatementSearchModel>(),

            //};
            DriverSalarySearchListModel driverSalarySearchList = new();
            List<DriverSalarySearchModel> driverSalarySearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", request.strRequest),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetDriverSalaryInnerGridList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        //int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            driverSalarySearchModels.Add(new DriverSalarySearchModel
                            {
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                DriverMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverMasterId"]),

                                SalaryDays = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryDays"]),
                                SalaryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryAmt"]),
                                PoolAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["PoolAmt"]),
                                // VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                DriverName = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverName"]),
                                FromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDt"]),
                                ToDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDt"]),
                                NetPayable = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPayable"]),
                                LastTripBal = Convert.ToString(dataSet.Tables[0].Rows[i]["LastTripBal"]),
                                LastTripDt = Convert.ToString(dataSet.Tables[0].Rows[i]["LastTripDt"]),
                              //  VehicleLedgerAc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleLedgerAc"]),
                              
                                Selected = true
                            });
                        }
                        driverSalarySearchList.DriverSalarySearchList = driverSalarySearchModels;
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
            return driverSalarySearchList;
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

                               PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),

                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalSalaryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSalaryAmt"]),
                                TotalPoolAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalPoolAmt"]),
                                TotalNetPayAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetPayAmt"]),
                               CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),

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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "DriverSalaryStatement_Insert", param);
                    string MasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        transaction.Rollback();
                        responseModel.Status = false;
                    }                   

                    if (responseModel.Status)
                    {
                        for (int i = 0; i < request.DriverSalaryListData.Count; i++)
                        {
                            if (request.DriverSalaryListData[i].Selected)
                            {
                                request.DriverSalaryListData[i].Index = i.ToString();
                                request.DriverSalaryListData[i].MasterId = MasterID;
                                responseModel = await DriverSalaryDetailSave(transaction,request.DriverSalaryListData[i]);
                                if (!responseModel.Status) 
                                { 
                                    transaction.Rollback();
                                    i = request.DriverSalaryListData.Count;
                                }
                            }
                        }
                    }
                    if (responseModel.Status)
                    { 
                        transaction.Commit();
                    }
                    else
                    {
                        transaction.Rollback();
                    }

                    //string MasterID = "";
                    //if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    //{
                    //    MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);
                    //    responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    //    // statement list insert
                    //    if (request.DriverSalaryListData.Count > 0)
                    //    {
                    //        for (int i = 0; i < request.DriverSalaryListData.Count; i++)
                    //        {
                    //            if (request.DriverSalaryListData[i].Selected)
                    //            {
                    //                SqlParameter[] paramMisc =
                    //                {

                    //                    new SqlParameter("@DetailId", request.DriverSalaryListData[i].DetailId != "" ? request.DriverSalaryListData[i].DetailId : "0"),
                    //                     new SqlParameter("@MasterID", MasterID),
                    //                 //   new SqlParameter("@FreightRs", request.DriverSalaryListData[i].MasterId != "" ? request.DriverSalaryListData[i].MasterId : "0"),
                    //                    new SqlParameter("@VehicleMasterId", request.DriverSalaryListData[i].VehicleMasterId != "" ? request.DriverSalaryListData[i].VehicleMasterId : "0"),
                    //                    new SqlParameter("@DriverMasterId", request.DriverSalaryListData[i].DriverMasterId != "" ? request.DriverSalaryListData[i].DriverMasterId : "0"),
                    //                    new SqlParameter("@FromDt", request.DriverSalaryListData[i].FromDt != "" ? request.DriverSalaryListData[i].FromDt : "0"),
                    //                    new SqlParameter("@ToDt", request.DriverSalaryListData[i].ToDt != "" ? request.DriverSalaryListData[i].ToDt : "0"),
                    //                    new SqlParameter("@SalaryDays", request.DriverSalaryListData[i].SalaryDays != "" ? request.DriverSalaryListData[i].SalaryDays : "0"),
                    //                    new SqlParameter("@SalaryAmt", request.DriverSalaryListData[i].SalaryAmt != "" ? request.DriverSalaryListData[i].SalaryAmt : "0"),
                    //                    new SqlParameter("@PoolAmt", request.DriverSalaryListData[i].PoolAmt != "" ? request.DriverSalaryListData[i].PoolAmt : "0"),
                    //                    new SqlParameter("@LastTripBal", request.DriverSalaryListData[i].LastTripBal != "" ? request.DriverSalaryListData[i].LastTripBal : "0"),
                    //                    new SqlParameter("@LastTripDt", request.DriverSalaryListData[i].LastTripBal != "" ? request.DriverSalaryListData[i].LastTripDt : "0"),
                    //                    new SqlParameter("@NetPayable", request.DriverSalaryListData[i].NetPayable != "" ? request.DriverSalaryListData[i].NetPayable : "0"),
                    //                     new SqlParameter("@Index", distanceDetailTripModel.Index),
                    //                  //  new SqlParameter("@DetRemarks", request.DriverSalaryListData[i].DetRemarks != "" ? request.DriverSalaryListData[i].DetRemarks : "0")
                    //                };
                    //                var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryDetails_Insert", paramMisc);
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
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> DriverSalaryDelete(RequestModel req)
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
                            new SqlParameter("@MasterId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DriverSalaryDelete", param);

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
        public async Task<ResponseModel> DriverSalaryDetailSave(SqlTransaction transaction, DriverSalarySearchModel driverSalarySearchModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", driverSalarySearchModel.MasterId == "" ? 0 : Convert.ToInt32(driverSalarySearchModel.MasterId)),
                            new SqlParameter("@VehicleMasterId", driverSalarySearchModel.VehicleMasterId == "" ? 0 : Convert.ToInt32(driverSalarySearchModel.VehicleMasterId)),
                            new SqlParameter("@DriverMasterId", driverSalarySearchModel.DriverMasterId == "" ? 0 : Convert.ToInt32(driverSalarySearchModel.DriverMasterId)),
                            new SqlParameter("@FromDt", driverSalarySearchModel.FromDt),
                            new SqlParameter("@ToDt", driverSalarySearchModel.ToDt),
                            new SqlParameter("@SalaryDays", driverSalarySearchModel.SalaryDays ),
                            new SqlParameter("@SalaryAmt", driverSalarySearchModel.SalaryAmt == "" ? 0 : Convert.ToDecimal(driverSalarySearchModel.SalaryAmt)),
                            new SqlParameter("@PoolAmt", driverSalarySearchModel.PoolAmt == "" ? 0 : Convert.ToDecimal(driverSalarySearchModel.PoolAmt)),
                            new SqlParameter("@LastTripBal", driverSalarySearchModel.LastTripBal == "" ? 0 : Convert.ToDecimal(driverSalarySearchModel.LastTripBal)),
                            new SqlParameter("@LastTripDt", driverSalarySearchModel.LastTripDt),
                            new SqlParameter("@NetPayable", driverSalarySearchModel.NetPayable == "" ? 0 : Convert.ToDecimal(driverSalarySearchModel.NetPayable)),
                            new SqlParameter("@Index", driverSalarySearchModel.Index),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DriverSalaryDetails_Insert", param);

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
            return responseModel;
        }
    }
 

}
