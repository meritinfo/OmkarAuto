

using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FreightMasters.Repository
{
    public class DistanceMasterFrtRepository : IDistanceMasterFrtRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DistanceMasterFrtRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", distanceMasterFrtModel.MasterID),
                            new SqlParameter("@ValidFrom", distanceMasterFrtModel.ValidFrom),
                            new SqlParameter("@ValidUpto", distanceMasterFrtModel.ValidUpto),
                            new SqlParameter("@FromLocation", distanceMasterFrtModel.FromLocation),
                            new SqlParameter("@LoggedInUser", distanceMasterFrtModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceMasterFrt_Insert", param);

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

                    if (responseModel.Status)
                    {
                        for(int i=0; i< distanceMasterFrtModel.DistanceDetailsFreightList.Count; i++)
                        {
                            if (i == 0)
                            {
                                distanceMasterFrtModel.DistanceDetailsFreightList[i].Index = i.ToString();
                            }
                            distanceMasterFrtModel.DistanceDetailsFreightList[i].MasterID = responseModel.Message;
                            responseModel = await DistanceDetailFrtSave(distanceMasterFrtModel.DistanceDetailsFreightList[i]);
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
            return responseModel;
        }

        /// <summary>
        /// Service method for save destination details
        /// </summary>
        /// <param name="distanceDetailFrtModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", distanceDetailFrtModel.MasterID),
                            new SqlParameter("@FromLocation", distanceDetailFrtModel.FromLocation),
                            new SqlParameter("@ToLocation", distanceDetailFrtModel.ToLocation),
                            new SqlParameter("@KMS", distanceDetailFrtModel.KMS),
                            new SqlParameter("@Index", distanceDetailFrtModel.Index)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceDetailFrt_Insert", param);

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
        public async Task<DistanceMasterFrtList> GetDistanceMasterFrtList(DistanceMasterFreightListRequest request)
        {
            DistanceMasterFrtList distanceMasterFreightList = new();
            List<DistanceMasterFrtModel> distanceFrtList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceMasterFrtList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceFrtList.Add(new DistanceMasterFrtModel
                            {
                                MasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                FromPoint = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),


                            });
                        }

                        distanceMasterFreightList.DistanceFrtList = distanceFrtList;

                        distanceMasterFreightList.PageMetaData = new PaginationMetaData
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
            return distanceMasterFreightList;
        }
    }
}

