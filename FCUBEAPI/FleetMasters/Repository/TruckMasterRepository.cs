using FleetMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public class TruckMasterRepository: ITruckMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TruckMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        /// 
        public async Task<ResponseModel> TruckMasterSave(TruckMasterModel truckMasterModel)
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
                            new SqlParameter("@TruckID", truckMasterModel.TruckID),
                            new SqlParameter("@TruckNo", truckMasterModel.TruckNo),
                            new SqlParameter("@RegnDate", truckMasterModel.RegnDate),
                             new SqlParameter("@OwnerName", truckMasterModel.OwnerName),
                              new SqlParameter("@OwnerType", truckMasterModel.OwnerType),
                             new SqlParameter("@OwnMarket", truckMasterModel.OwnMarket),
                             new SqlParameter("@PanNo", truckMasterModel.PanNo),
                             new SqlParameter("@AadharNo", truckMasterModel.AadharNo),
                            new SqlParameter("@AadharLinkedYN", truckMasterModel.AadharLinkedYN),
                            new SqlParameter("@PanValidYN", truckMasterModel.PanValidYN),
                            new SqlParameter("@ItFiledYN", truckMasterModel.ItFiledYN),
                            new SqlParameter("@Address1", truckMasterModel.Address1),
                            new SqlParameter("@Address2", truckMasterModel.Address2),
                            new SqlParameter("@Address3", truckMasterModel.Address3),
                            new SqlParameter("@Address4", truckMasterModel.Address4),
                            new SqlParameter("@StateCode", truckMasterModel.StateCode),
                            new SqlParameter("@PinCode", truckMasterModel.PinCode),
                            new SqlParameter("@PhoneNo", truckMasterModel.PhoneNo),
                            new SqlParameter("@ContactName", truckMasterModel.ContactName),
                            new SqlParameter("@MobileNo", truckMasterModel.MobileNo),
                            new SqlParameter("@ChasisNo", truckMasterModel.ChasisNo),
                            new SqlParameter("@EngineNo", truckMasterModel.EngineNo),
                            new SqlParameter("@VehCode", truckMasterModel.VehCode),
                            new SqlParameter("@Model", truckMasterModel.Model),
                            new SqlParameter("@MfrName", truckMasterModel.MfrName),
                            new SqlParameter("@LadenWt", truckMasterModel.LadenWt),
                            new SqlParameter("@UnLadenWt", truckMasterModel.UnLadenWt),
                            new SqlParameter("@InsuranceDt", truckMasterModel.InsuranceDt),
                            new SqlParameter("@NationalPermitDt", truckMasterModel.NationalPermitDt),
                            new SqlParameter("@FitnessDt", truckMasterModel.FitnessDt),
                            new SqlParameter("@RcUpload", truckMasterModel.RcUpload),
                            new SqlParameter("@OtherUpload", truckMasterModel.OtherUpload),
                            new SqlParameter("@IsActive", truckMasterModel.IsActive),
                            new SqlParameter("@InActiveDate", truckMasterModel.InActiveDate),
                            new SqlParameter("@Remarks", truckMasterModel.Remarks),
                             new SqlParameter("@LoggedInUser", truckMasterModel.LoggedInUser),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "TruckMaster_Insert", param);

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
        public async Task<ResponseModel> TruckMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@TruckId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TruckMasterDelete", param);

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

        public async Task<TruckMasterList> GetTruckMasterList(PageRequest request)
        {
            TruckMasterList truckMasterList = new();
            List<TruckMasterModel> truckList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TruckMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            truckList.Add(new TruckMasterModel
                            {
                                TruckID = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckID"]),
                                TruckNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TruckNo"]),

                                RegnDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RegnDate"]),
                                OwnerName = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerName"]),
                                OwnerType = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnerType"]),
                                OwnMarket = Convert.ToString(dataSet.Tables[0].Rows[i]["OwnMarket"]),
                                PanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PanNo"]),
                                AadharNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharNo"]),
                                AadharLinkedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AadharLinkedYN"]),
                                PanValidYN = Convert.ToString(dataSet.Tables[0].Rows[i]["PanValidYN"]),
                                ItFiledYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ItFiledYN"]),
                                Address1 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address1"]),
                                Address2 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address2"]),
                                Address3 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address3"]),
                                Address4 = Convert.ToString(dataSet.Tables[0].Rows[i]["Address4"]),
                                StateCode = Convert.ToString(dataSet.Tables[0].Rows[i]["StateCode"]),
                                PinCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PinCode"]),
                                PhoneNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PhoneNo"]),
                                ContactName = Convert.ToString(dataSet.Tables[0].Rows[i]["ContactName"]),
                                MobileNo = Convert.ToString(dataSet.Tables[0].Rows[i]["MobileNo"]),
                                ChasisNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChasisNo"]),
                                EngineNo = Convert.ToString(dataSet.Tables[0].Rows[i]["EngineNo"]),
                                VehCode = Convert.ToString(dataSet.Tables[0].Rows[i]["VehCode"]),
                                Model = Convert.ToString(dataSet.Tables[0].Rows[i]["Model"]),
                                MfrName = Convert.ToString(dataSet.Tables[0].Rows[i]["MfrName"]),
                                LadenWt = Convert.ToString(dataSet.Tables[0].Rows[i]["LadenWt"]),
                                UnLadenWt = Convert.ToString(dataSet.Tables[0].Rows[i]["UnLadenWt"]),
                                InsuranceDt = Convert.ToString(dataSet.Tables[0].Rows[i]["InsuranceDt"]),
                                NationalPermitDt = Convert.ToString(dataSet.Tables[0].Rows[i]["NationalPermitDt"]),
                                FitnessDt = Convert.ToString(dataSet.Tables[0].Rows[i]["FitnessDt"]),
                                RcUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["RcUpload"]),
                                OtherUpload = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherUpload"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                InActiveDate = Convert.ToString(dataSet.Tables[0].Rows[i]["InActiveDate"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        truckMasterList.TruckList = truckList;

                        truckMasterList.PageMetaData = new PaginationMetaData
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
            return truckMasterList;
        }

    }
}
