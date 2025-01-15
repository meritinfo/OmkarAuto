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
    public class FleetLoadEntryRepository: IFleetLoadEntryRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public FleetLoadEntryRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<FleetLoadEntryList> GetFleetLoadEntryList(ReportRequestModel request)
        {
            FleetLoadEntryList fleetLoadEntryList = new();
            List<FleetLoadEntryModel> loadEntryList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber", request.PageNumber),
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@LoadFor",    request.FilterStr),
                            new SqlParameter("@VehicleMasterId",    request.FilterStr1),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFleetLoadEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            loadEntryList.Add(new FleetLoadEntryModel
                            {
                                LoadId = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadId"]),
                                LoadBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadBranch"]),

                                LoadDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadDate"]),
                                LoadType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadType"]),
                                VehicleMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterId"]),
                                LoadFor = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadFor"]),
                                LoadMemoNo = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadMemoNo"]),
                                LoadingFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingFrom"]),
                                ConsignorName = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignorName"]),
                                ConsignorAdd = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignorAdd"]),
                                LoadingTo = Convert.ToString(dataSet.Tables[0].Rows[i]["LoadingTo"]),
                                ConsigneeName = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsigneeName"]),
                                ConsigneeAdd = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsigneeAdd"]),
                                ProductId = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductId"]),
                                QtyWt = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyWt"]),
                                QtyPkgs = Convert.ToString(dataSet.Tables[0].Rows[i]["QtyPkgs"]),
                                RatePerTon = Convert.ToString(dataSet.Tables[0].Rows[i]["RatePerTon"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                AdvAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["AdvAmt"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                AttachMemocopy = Convert.ToString(dataSet.Tables[0].Rows[i]["AttachMemocopy"]),
                                TripAdjYN = Convert.ToString(dataSet.Tables[0].Rows[i]["TripAdjYN"]),
                                TripId = Convert.ToString(dataSet.Tables[0].Rows[i]["TripId"]),
                                TripBrName = Convert.ToString(dataSet.Tables[0].Rows[i]["TripBrName"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),


                            });
                        }

                        fleetLoadEntryList.LoadEntryList = loadEntryList;

                        fleetLoadEntryList.PageMetaData = new PaginationMetaData
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
            return fleetLoadEntryList;
        }

        public async Task<ResponseModel> FleetLoadEntryDelete(RequestModel requestModel)
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
                            new SqlParameter("@LoadId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FleetLoadEntryDelete", param);

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


        public async Task<ResponseModel> FleetLoadEntrySave(FleetLoadEntryModel fleetLoadEntryModel)
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
                            new SqlParameter("@LoadId", fleetLoadEntryModel.LoadId),
                            new SqlParameter("@LoadBranch", fleetLoadEntryModel.LoadBranch),
                            new SqlParameter("@LoadDate", fleetLoadEntryModel.LoadDate ),
                            new SqlParameter(@"LoadType", fleetLoadEntryModel.LoadType),
                            new SqlParameter("@VehicleMasterId", fleetLoadEntryModel.VehicleMasterId),
                            new SqlParameter("@LoadFor", fleetLoadEntryModel.LoadFor),
                            new SqlParameter("@LoadMemoNo", fleetLoadEntryModel.LoadMemoNo),
                            new SqlParameter("@LoadingFrom", fleetLoadEntryModel.LoadingFrom),
                            new SqlParameter("@ConsignorName", fleetLoadEntryModel.ConsignorName),
                            new SqlParameter("@ConsignorAdd", fleetLoadEntryModel.ConsignorAdd),
                            new SqlParameter("@LoadingTo", fleetLoadEntryModel.LoadingTo),
                            new SqlParameter("@ConsigneeName", fleetLoadEntryModel.ConsigneeName),
                            new SqlParameter("@ConsigneeAdd", fleetLoadEntryModel.ConsigneeAdd),
                            new SqlParameter("@ProductId", fleetLoadEntryModel.ProductId ),
                            new SqlParameter("@QtyWt", fleetLoadEntryModel.QtyWt ),
                            new SqlParameter("@QtyPkgs", fleetLoadEntryModel.QtyPkgs ),
                            new SqlParameter("@RatePerTon", fleetLoadEntryModel.RatePerTon ),
                            new SqlParameter("@HireAmt", fleetLoadEntryModel.HireAmt  ),
                            new SqlParameter("@AdvAmt", fleetLoadEntryModel.AdvAmt ),
                            new SqlParameter("@Remarks", fleetLoadEntryModel.Remarks  ),
                            new SqlParameter("@AttachMemocopy", fleetLoadEntryModel.AttachMemocopy ),
                           // new SqlParameter("@TripAdjYN", fleetLoadEntryModel.TripAdjYN ),
                           // new SqlParameter("@TripId", fleetLoadEntryModel.TripId ),
                            new SqlParameter("@LoggedInUser", fleetLoadEntryModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_FleetLoadEntrySave", param);

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

    }
}
