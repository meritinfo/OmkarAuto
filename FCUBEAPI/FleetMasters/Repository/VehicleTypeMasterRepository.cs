using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using FreightMasters.Models;

namespace FleetMasters.Repository
{
    public class VehicleTypeMasterRepository : IVehicleTypeMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleTypeMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        //public async Task<ResponseModel> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel)
        //{
        //    ResponseModel responseModel = new();

        //    var connection = new SqlConnection(dbconnection.Value.DBConnection);
        //    connection.Open();
        //    SqlTransaction transaction;
        //    transaction = connection.BeginTransaction();
        //    try
        //    {
        //        if (dbconnection != null)
        //        {
        //            SqlParameter[] param =
        //                {
        //                    new SqlParameter("@VehTypeID", vehicleTypeMasterModel.VehicleTypeID),
        //                    new SqlParameter("@VehTypeDesc", vehicleTypeMasterModel.VehicleTypeDesc),
        //                    new SqlParameter("@VehGroup", vehicleTypeMasterModel.VehicleTypeGroupId),
        //                    new SqlParameter("@TonCap", vehicleTypeMasterModel.TonCap),                     
        //                    new SqlParameter("@RunPerDayKM", vehicleTypeMasterModel.RunPerDayKM),
        //                    new SqlParameter("@LoggedInUser", vehicleTypeMasterModel.LoggedInUser)

        //                };
        //            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "VehicleTypeMaster_Insert", param);

        //            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
        //            {
        //                responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
        //                responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
        //                if (responseModel.Status) { transaction.Commit(); }
        //                else { transaction.Rollback(); }
        //            }
        //            else
        //            {
        //                responseModel.Status = false;
        //                transaction.Rollback();
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction.Rollback();
        //    }
        //    return responseModel;
        //}
        public async Task<ResponseModel> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel)
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
                            new SqlParameter("@VehTypeID", vehicleTypeMasterModel.VehicleTypeID),
                               new SqlParameter("@VehTypeDesc", vehicleTypeMasterModel.VehicleTypeDesc),
                               new SqlParameter("@VehGroup", vehicleTypeMasterModel.VehicleTypeGroupId),
                               new SqlParameter("@TonCap", vehicleTypeMasterModel.TonCap),                     
                              new SqlParameter("@RunPerDayKM", vehicleTypeMasterModel.RunPerDayKM),
                                new SqlParameter("@LoggedInUser", vehicleTypeMasterModel.LoggedInUser)



                     };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "VehicleTypeMaster_Insert", param);
                    string RateId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        RateId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < vehicleTypeMasterModel.vehicletypeDetailList.Count; i++)
                            {
                                vehicleTypeMasterModel.vehicletypeDetailList[i].VehTypeId = RateId;
                                // ratesMasterNewModel.RatesMasterNewDetailList[i].TransDate = ratesMasterNewModel.TransDate;

                                responseModel = await VehicleTypeDetailSave(transaction, vehicleTypeMasterModel.vehicletypeDetailList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = vehicleTypeMasterModel.vehicletypeDetailList.Count;
                                }
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else { transaction.Rollback(); }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<VehicleTypeMasterModel> GetVehicleTypeInnerGridList(RequestModel request)
        {
            VehicleTypeMasterModel getVehicleTypeInnerGridList = new()
            {
                vehicletypeDetailList = new List<VehicleTypeDetailModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@VehTypeId", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleTypeDetailInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            getVehicleTypeInnerGridList.vehicletypeDetailList.Add(new VehicleTypeDetailModel
                            {
                                // Id = Convert.ToString(resultData.Tables[0].Rows[i]["Id"]),

                                // SpareLubId = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                VehTypeAlias = Convert.ToString(resultData.Tables[0].Rows[i]["VehTypeAlias"]),

                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return getVehicleTypeInnerGridList;
        }
        public async Task<ResponseModel> CheckDuplicateAlias(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehTypeDesc", requestModel.strRequest),
                            new SqlParameter("@VehTypeAlias",         requestModel.strRequest1),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckDuplicateAlias", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> VehicleTypeDetailSave(SqlTransaction transaction, VehicleTypeDetailModel vehicleTypeDetailModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehTypeId",               vehicleTypeDetailModel.VehTypeId ),
                             new SqlParameter("@VehTypeAlias", vehicleTypeDetailModel.VehTypeAlias),

                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleTypeDetailSave", param);

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

            }
            return responseModel;
        }
        public async Task<ResponseModel> VehicleTypeMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@VehTypeId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_VehicleTypeMasterDelete", param);

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
        public async Task<ResponseModel> CheckDuplicateVehicleDesc(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RateDesc", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkDuplicateVehicleDesc", param);

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
            }
            return responseModel;
        }


        public async Task<VehicleTypeMasterList> GetVehicleTypeMasterList(PageRequest request)
        {
            VehicleTypeMasterList vehicleTypeMasterList = new();
            List<VehicleTypeMasterModel> VehicleList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleTypeMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            VehicleList.Add(new VehicleTypeMasterModel
                            {
                                VehicleTypeID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehTypeID"]),
                                VehicleTypeDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehTypeDesc"]),
                                VehicleTypeGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehGroup"]),
                                TonCap = Convert.ToString(dataSet.Tables[0].Rows[i]["TonCap"]),
                                RunPerDayKM = Convert.ToString(dataSet.Tables[0].Rows[i]["RunPerDayKM"]),
                            });
                        }

                        vehicleTypeMasterList.vehicleTypeMasterList = VehicleList;

                        vehicleTypeMasterList.PageMetaData = new PaginationMetaData
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
            return vehicleTypeMasterList;
        }
        
        public async Task<ResponseModel> GetVehiCapacity(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehTypeId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehiCapacity", param);

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
            }
            return responseModel;
        }
    }
}
