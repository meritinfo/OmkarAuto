

using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;

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
                            new SqlParameter("@MasterID", distanceMasterFrtModel.MasterID == "" ? 0 : Convert.ToInt32(distanceMasterFrtModel.MasterID)),
                            new SqlParameter("@ValidFrom", distanceMasterFrtModel.ValidFrom),
                            new SqlParameter("@ValidUpto", distanceMasterFrtModel.ValidUpto),
                            new SqlParameter("@FromLocation", distanceMasterFrtModel.FromLocation),
                            new SqlParameter("@LoggedInUser", distanceMasterFrtModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceMasterFrt_Insert", param);
                    string MasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
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
                            distanceMasterFrtModel.DistanceDetailsFreightList[i].Index = i.ToString();
                            distanceMasterFrtModel.DistanceDetailsFreightList[i].MasterID = MasterID;
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
                                new SqlParameter("@DistanceDtlID", distanceDetailFrtModel.DistanceDtlID),
                                  new SqlParameter("@MasterID", distanceDetailFrtModel.MasterID
                             == "" ? 0 : Convert.ToInt32(distanceDetailFrtModel.MasterID)),
                           // new SqlParameter("@MasterID", distanceDetailFrtModel.MasterID),
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
        public async Task<ResponseModel> ChkdistanceFrtValidity(DistanceMasterFrtModel distanceMasterFrtModel)
            {
                ResponseModel responseModel = new();
                try
                {
                    if (dbconnection != null)
                    {
                        SqlParameter[] param =
                            {
                            new SqlParameter("@FromLocation", distanceMasterFrtModel.FromLocation),
                            new SqlParameter("@ValidFrom", distanceMasterFrtModel.ValidFrom),
                            new SqlParameter("@ValidUpto", distanceMasterFrtModel.ValidUpto),
                        };
                        var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkDistanceFrtValidity", param);
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
            public async Task<ResponseModel> DistanceMasterFrtDelete(Request req)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DistanceMasterFrtDelete", param);

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
        public async Task<DistanceMasterFrtModel> GetFreightInnerGridList(FreightTripInnerGridListRequest request)
        {
            DistanceMasterFrtModel tripSheetInnerGridList = new()
            {
                DistanceDetailsFreightList = new List<DistanceDetailFrtModel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          //  new SqlParameter("@TripId", request.TripId),
                            new SqlParameter("@MasterId", request.MasterID)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetFreightInnerGridList_Select", param);

                    // LR Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DistanceDetailsFreightList.Add(new DistanceDetailFrtModel
                            {
                                //  
                              //  DistanceDtlID = Convert.ToString(resultData.Tables[0].Rows[i]["DistanceDtlID"]),
                                MasterID = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
                                FromLocation = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocation"]),
                                KMS = Convert.ToString(resultData.Tables[0].Rows[i]["KMS"]),
                               // EnrouteExpTruck = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTruck"]),
                               // EnrouteExpTrailer = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTrailer"]),
                              //  EnrouteExpCarCarrier = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
                              //  EnrouteExpEmpty = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpEmpty"]),
                              //  EnrouteExpRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpRemarks"]),
                             //   DefinedTollExp = Convert.ToString(resultData.Tables[0].Rows[i]["DefinedTollExp"]),

                            });
                        }
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
            return tripSheetInnerGridList;
        }


        public async Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequest request)
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

