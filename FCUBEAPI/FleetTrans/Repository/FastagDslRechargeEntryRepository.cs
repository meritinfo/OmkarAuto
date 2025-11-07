using DocumentFormat.OpenXml.Bibliography;
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
    public class FastagDslRechargeEntryRepository: IFastagDslRechargeEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FastagDslRechargeEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> FastagDslRechargeEntrySave(FastagDslRechargeEntryModel fastagDslRechargeEntryModel)
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
                            new SqlParameter("@TransId"   , fastagDslRechargeEntryModel.TransId),
                            new SqlParameter("@TransBranch"           , fastagDslRechargeEntryModel.TransBranch),
                            new SqlParameter("@RechargeDate"        , fastagDslRechargeEntryModel.RechargeDate),
                            new SqlParameter("@RechargeType"     , fastagDslRechargeEntryModel.RechargeType),
                            new SqlParameter("@RechargeAmt"       , fastagDslRechargeEntryModel.RechargeAmt),
                            new SqlParameter("@VehicleID"      , fastagDslRechargeEntryModel.VehicleID),
                            new SqlParameter("@Remarks"         , fastagDslRechargeEntryModel.Remarks),
                            new SqlParameter("@TransType"           , fastagDslRechargeEntryModel.TransType),
                            new SqlParameter("@PaymentType"            , fastagDslRechargeEntryModel.PaymentType),
                            new SqlParameter("@CreditAc"             , fastagDslRechargeEntryModel.CreditAc),
                            //new SqlParameter("@DriverId"             , fastagDslRechargeEntryModel.DriverId),
                            new SqlParameter("@LoggedInUser"        , fastagDslRechargeEntryModel.LoggedInUser),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FastagDslRechargeEntrySave", param);

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
        public async Task<ResponseModel> FastagDslRechargeEntryDelete(RequestModel request)
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
                            new SqlParameter("@TransId",request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FastagDslRechargeEntryDelete", param);

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
        public async Task<List<DropDownListModel>> GetRechargeTypeList()
        {
            List<DropDownListModel> branchList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getRechargeType", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            branchList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
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
            return branchList;
        }
        public async Task<FastagDslRechargeEntryList> FastagDslRechargeEntryList(ReportRequestModel request)
        {
            FastagDslRechargeEntryList fastagDslEntryList = new();
            List<FastagDslRechargeEntryModel> fastList = new();
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
                            new SqlParameter("@VehicleID" , request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_FastagDslRechargeEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            fastList.Add(new FastagDslRechargeEntryModel
                            {
                                TransId = Convert.ToString(dataSet.Tables[0].Rows[i]["TransId"]),
                                TransBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["TransBranch"]),
                                RechargeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RechargeDate"]),
                                RechargeType = Convert.ToString(dataSet.Tables[0].Rows[i]["RechargeType"]),
                                RechargeAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RechargeAmt"]),
                                VehicleID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleID"]),
                                Remarks= Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TransType = Convert.ToString(dataSet.Tables[0].Rows[i]["TransType"]),
                                PaymentType = Convert.ToString(dataSet.Tables[0].Rows[i]["PaymentType"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["branch"]),
                                //DriverId = Convert.ToString(dataSet.Tables[0].Rows[i]["DriverId"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        fastagDslEntryList.FastList = fastList;

                        fastagDslEntryList.PageMetaData = new PaginationMetaData
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
            return fastagDslEntryList;
        }

    }
}
