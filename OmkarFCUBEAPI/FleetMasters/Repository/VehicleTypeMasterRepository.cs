using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetMasters.Repository
{
    public class VehicleTypeMasterRepository : IVehicleTypeMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleTypeMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type master details
        /// </summary>
        /// <param name="vehicleTypeMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> VehicleTypeMasterSave(VehicleTypeMasterModel vehicleTypeMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleTypeID", vehicleTypeMasterModel.VehicleTypeID),
                            new SqlParameter("@VehicleTypeDesc", vehicleTypeMasterModel.VehicleTypeDesc),
                            new SqlParameter("@VehicleTypeGroupId", vehicleTypeMasterModel.VehicleTypeGroupId),
                            new SqlParameter("@IsActive", vehicleTypeMasterModel.IsActive),
                            new SqlParameter("@LoggedInUser", vehicleTypeMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleTypeMaster_Insert", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
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
        public async Task<VehicleTypeMasterList> GetVehicleTypeMasterList(VehicleTypeMasterListRequest request)
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
                                VehicleTypeID = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeID"]),
                                VehicleTypeDesc = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeDesc"]),

                                VehicleTypeGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeGroupId"]),



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
    }
}
