using FleetMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FleetMasters.Repository
{    
    public class VehicleTypeGroupMasterRepository : IVehicleTypeGroupMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public VehicleTypeGroupMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        /// <summary>
        /// Service method for save vehicle type group master details
        /// </summary>
        /// <param name="vehicleTypeGroupMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> VehicleTypeGroupMasterSave(VehicleTypeGroupMasterModel vehicleTypeGroupMasterModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleTypeGroupId", vehicleTypeGroupMasterModel.VehicleTypeGroupId),
                            new SqlParameter("@VehicleTypeGroupName", vehicleTypeGroupMasterModel.VehicleTypeGroupName),
                            new SqlParameter("@IsActive", vehicleTypeGroupMasterModel.IsActive),
                             new SqlParameter("@LoggedInUser", vehicleTypeGroupMasterModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleTypeGroupMaster_Insert", param);

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
        public async Task<VehicleTypeGroupMasterList> GetVehicleTypeGroupMasterList(VehicleTypeGroupMasterListRequest request)
        {
            VehicleTypeGroupMasterList vehicleTypeGroupMasterList = new();
            List<VehicleTypeGroupMasterModel> vehicleTypeGroupList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VehicleTypeGroupMasterList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            vehicleTypeGroupList.Add(new VehicleTypeGroupMasterModel
                            {
                                VehicleTypeGroupId = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeGroupId"]),
                                VehicleTypeGroupName = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleTypeGroupName"]),

                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                            
                             


                            });
                        }

                        vehicleTypeGroupMasterList.vehicleTypeGroupMasterList = vehicleTypeGroupList;

                        vehicleTypeGroupMasterList.PageMetaData = new PaginationMetaData
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
            return vehicleTypeGroupMasterList;
        }
    }
}
