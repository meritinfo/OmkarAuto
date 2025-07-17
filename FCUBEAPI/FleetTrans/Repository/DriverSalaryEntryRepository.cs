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
    public class DriverSalaryEntryRepository: IDriverSalaryEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DriverSalaryEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> DriverSalaryEntrySave(DriverSalaryEntryModel driverSalaryEntryModel)
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
                            new SqlParameter("@Transid"   , driverSalaryEntryModel.Transid),
                            new SqlParameter("@TransBranch"           , driverSalaryEntryModel.TransBranch),
                            new SqlParameter("@TransDate"        , driverSalaryEntryModel.TransDate),
                            new SqlParameter("@DriverId "        , driverSalaryEntryModel.DriverId ),
                            new SqlParameter("@SalFromDate"     , driverSalaryEntryModel.SalFromDate),
                            new SqlParameter("@SalToDate"       , driverSalaryEntryModel.SalToDate),
                            new SqlParameter("@NoOfDays"      , driverSalaryEntryModel.NoOfDays),
                            new SqlParameter("@GrossSalary"            , driverSalaryEntryModel.GrossSalary),
                            new SqlParameter("@LopDeduction"             , driverSalaryEntryModel.LopDeduction),
                            new SqlParameter("@PfDeduction"             , driverSalaryEntryModel.PfDeduction),
                            new SqlParameter("@EsiDeduction"             , driverSalaryEntryModel.EsiDeduction),
                            new SqlParameter("@OthDeduction"             , driverSalaryEntryModel.OthDeduction),
                            new SqlParameter("@NetSalary"            , driverSalaryEntryModel.NetSalary),
                            new SqlParameter("@Remarks"           , driverSalaryEntryModel.Remarks ),
                            new SqlParameter("@PmtType"           , driverSalaryEntryModel.PmtType),
                            new SqlParameter("@CreditAc"            , driverSalaryEntryModel.CreditAc),
                            new SqlParameter("@NeftYN"            , driverSalaryEntryModel.NeftYN),
                            new SqlParameter("@ChequeNo"            , driverSalaryEntryModel.ChequeNo),
                            new SqlParameter("@ChequeDt"            , driverSalaryEntryModel.ChequeDt),
                        
                            new SqlParameter("@LoggedInUser"        , driverSalaryEntryModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DriverSalaryEntrySave", param);

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
        public async Task<ResponseModel> DriverSalaryEntryDelete(RequestModel request)
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
                            new SqlParameter("@Transid",request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DriverSalaryEntryDelete", param);

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

        public async Task<DriverSalaryEntryList> GetDriverSalaryEntryList(ReportRequestModel request)
        {
            DriverSalaryEntryList driverSalaryEntryList = new();
            List<DriverSalaryEntryModel> salaryList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DriverSalaryEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            salaryList.Add(new DriverSalaryEntryModel
                            {
                                Transid = Convert.ToString(dataSet.Tables[0].Rows[i]["Transid"]),
                                TransBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBranch"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                DriverId = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverId"]),
                                SalFromDate = Convert.ToString(dataSet.Tables[0].Rows[i]["SalFromDate"]),
                                SalToDate = Convert.ToString(dataSet.Tables[0].Rows[i]["SalToDate"]),
                                NoOfDays = Convert.ToString(dataSet.Tables[0].Rows[i]["NoOfDays"]),
                                GrossSalary = Convert.ToString(dataSet.Tables[0].Rows[i]["GrossSalary"]),
                                LopDeduction = Convert.ToString(dataSet.Tables[0].Rows[i]["LopDeduction"]),
                                PfDeduction = Convert.ToString(dataSet.Tables[0].Rows[i]["PfDeduction"]),
                                EsiDeduction = Convert.ToString(dataSet.Tables[0].Rows[i]["EsiDeduction"]),
                                OthDeduction = Convert.ToString(dataSet.Tables[0].Rows[i]["OthDeduction"]),
                                NetSalary = Convert.ToString(dataSet.Tables[0].Rows[i]["NetSalary"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                NeftYN = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                ChequeDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),


                            });
                        }

                        driverSalaryEntryList.SalaryList = salaryList;

                        driverSalaryEntryList.PageMetaData = new PaginationMetaData
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
            return driverSalaryEntryList;
        }
    }
}
