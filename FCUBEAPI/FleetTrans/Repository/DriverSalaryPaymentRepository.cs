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
    public class DriverSalaryPaymentRepository: IDriverSalaryPaymentRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DriverSalaryPaymentRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> DriverSalaryPaymentSave(DriverSalaryPaymentModel driverSalaryPaymentModel)
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
                            new SqlParameter("@Masterid",       driverSalaryPaymentModel.Masterid),
                            new SqlParameter("@BranchCode",     driverSalaryPaymentModel.BranchCode),
                            new SqlParameter("@SalaryDate",     driverSalaryPaymentModel.SalaryDate),
                            new SqlParameter("@DriverId",       driverSalaryPaymentModel.DriverId),
                            new SqlParameter("@VehicleId",      driverSalaryPaymentModel.VehicleId),
                            new SqlParameter("@SalaryFromDt",   driverSalaryPaymentModel.SalaryFromDt),
                            new SqlParameter("@SalaryToDt",     driverSalaryPaymentModel.SalaryToDt),
                            new SqlParameter("@SalDays",        driverSalaryPaymentModel.SalDays),
                            new SqlParameter("@SalPerDay",      driverSalaryPaymentModel.SalPerDay),
                            new SqlParameter("@TotalSalary",    driverSalaryPaymentModel.TotalSalary),
                            new SqlParameter("@Remarks",        driverSalaryPaymentModel.Remarks),
                            new SqlParameter("@PmtType",        driverSalaryPaymentModel.PmtType),
                            new SqlParameter("@CreditAc",       driverSalaryPaymentModel.CreditAc),
                            new SqlParameter("@YearID",         driverSalaryPaymentModel.YearId),
                            new SqlParameter("@LoggedInUser",   driverSalaryPaymentModel.LoggedInUser),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DriverSalaryPaymentSave", param);

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
        public async Task<ResponseModel> DriverSalaryPaymentDelete(RequestModel request)
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
                            new SqlParameter("@Masterid",request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DriverSalaryPaymentDelete", param);

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

        public async Task<DriverSalaryPaymentList> GetDriverSalaryPaymentList(ReportRequestModel request)
        {
            DriverSalaryPaymentList salaryPaymentList = new();
            List<DriverSalaryPaymentModel> salaryList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber"      , request.PageNumber),
                            new SqlParameter("@PageSize"        , request.PageSize),
                            new SqlParameter("@SortColumn"      , request.SortColumn),
                            new SqlParameter("@SortOrder"       , request.SortOrder),
                            new SqlParameter("@Search"          , request.Search),
                            new SqlParameter("@FromDate"        , request.FromDate),
                            new SqlParameter("@ToDate"          , request.ToDate),
                           //new SqlParameter("@VehicleMasterID" , request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDriverSalaryPaymentList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            salaryList.Add(new DriverSalaryPaymentModel
                            {
                                Masterid = Convert.ToString(dataSet.Tables[0].Rows[i]["Masterid"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                SalaryDate = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryDate"]),
                                DriverId = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverId"]),
                                VehicleId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleId"]),
                                SalaryFromDt = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryFromDt"]),
                                SalaryToDt = Convert.ToString(dataSet.Tables[0].Rows[i]["SalaryToDt"]),
                                SalDays = Convert.ToString(dataSet.Tables[0].Rows[i]["SalDays"]),
                                SalPerDay = Convert.ToString(dataSet.Tables[0].Rows[i]["SalPerDay"]),
                                TotalSalary = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSalary"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                branch = Convert.ToString(dataSet.Tables[0].Rows[i]["branch"]),
                                driver = Convert.ToString(dataSet.Tables[0].Rows[i]["driver"]),
                                vehicle = Convert.ToString(dataSet.Tables[0].Rows[i]["vehicle"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        salaryPaymentList.SalaryList = salaryList;

                        salaryPaymentList.PageMetaData = new PaginationMetaData
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
            return salaryPaymentList;
        }
    }
}
