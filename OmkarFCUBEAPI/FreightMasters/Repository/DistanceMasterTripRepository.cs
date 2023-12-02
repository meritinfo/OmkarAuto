

using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;

namespace FreightMasters.Repository
{
    public class DistanceMasterTripRepository : IDistanceMasterTripRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DistanceMasterTripRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", distanceMasterTripModel.MasterID == "" ? 0 : Convert.ToInt32(distanceMasterTripModel.MasterID)),
                            new SqlParameter("@ValidFrom", distanceMasterTripModel.ValidFrom),
                            new SqlParameter("@ValidUpto", distanceMasterTripModel.ValidUpto),
                            new SqlParameter("@FromLocation", distanceMasterTripModel.FromLocation),
                            new SqlParameter("@LoggedInUser", distanceMasterTripModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceMasterTrip_Insert", param);
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
                        for (int i = 0; i < distanceMasterTripModel.DistanceDetailsTripList.Count; i++)
                        {
                            if (Convert.ToString(distanceMasterTripModel.DistanceDetailsTripList[i].ToLocation) != "")
                            {
                                distanceMasterTripModel.DistanceDetailsTripList[i].Index = i.ToString();
                                distanceMasterTripModel.DistanceDetailsTripList[i].MasterID = MasterID;
                                responseModel = await DistanceDetailTripSave(distanceMasterTripModel.DistanceDetailsTripList[i]);
                            }
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
        //public async Task<DistanceMasterTripModel> GetTripInnerGridList()
        //{
        //    DistanceMasterTripModel tripInnerGridList = new()
        //    {
        //        DistanceDetailsTripList = new List<DistanceDetailTripModel>(),
             
        //    };
        //    try
        //    {
        //        if (dbconnection != null)
        //        {
                   
        //            var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TripSheetInnerGridList_Select", param);

        //            //LR Details
        //            if (resultData != null && resultData.Tables[0].Rows.Count > 0)
        //            {
        //                for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
        //                {
        //                    tripInnerGridList.DistanceDetailsTripList.Add(new DistanceDetailTripModel
        //                    {
        //                        DistanceDtlID = Convert.ToString(resultData.Tables[0].Rows[i]["DistanceDtlID"]),
        //                        MasterID = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
        //                        FromLocation = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocation"]),
        //                        ToLocation = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocation"]),
        //                        KMS = Convert.ToString(resultData.Tables[0].Rows[i]["KMS"]),
        //                        EnrouteExpTruck = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTruck"]),
        //                        EnrouteExpTrailer = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTrailer"]),
        //                        EnrouteExpCarCarrier = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
        //                        EnrouteExpEmpty = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpEmpty"]),
        //                        EnrouteExpRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpRemarks"]),
        //                        DefineTollExp = Convert.ToString(resultData.Tables[0].Rows[i]["DefineTollExp"]),
                             
        //                    });
        //                }
        //            }
        //            //Diseal Details
                 
                   
                 
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log exception on database
        //        //ExceptionModel exceptionModel = new()
        //        //{
        //        //    ExceptionMessage = Convert.ToString(ex.Message),
        //        //    ExceptionType = Convert.ToString(ex.GetType().Name),
        //        //    ExceptionSource = Convert.ToString(ex.StackTrace)
        //        //};

        //        //ExceptionRepository exception = new(dbconnection);
        //        //await exception.SaveExceptionDetails(exceptionModel);
        //    }
        //    return tripSheetInnerGridList;
        //}

        /// <summary>
        /// Service method for save destination details
        /// </summary>
        /// <param name="distanceDetailFrtModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", distanceDetailTripModel.MasterID == "" ? 0 : Convert.ToInt32(distanceDetailTripModel.MasterID)),
                            new SqlParameter("@FromLocation", distanceDetailTripModel.FromLocation == "" ? 0 : Convert.ToInt32(distanceDetailTripModel.FromLocation)),
                            new SqlParameter("@ToLocation", distanceDetailTripModel.ToLocation == "" ? 0 : Convert.ToInt32(distanceDetailTripModel.ToLocation)),
                            new SqlParameter("@KMS", distanceDetailTripModel.KMS == "" ? 0 : Convert.ToInt32(distanceDetailTripModel.KMS)),
                            new SqlParameter("@EnrouteExpTruck", distanceDetailTripModel.EnrouteExpTruck == "" ? 0 : Convert.ToDecimal(distanceDetailTripModel.EnrouteExpTruck)),
                            new SqlParameter("@EnrouteExpTrailer", distanceDetailTripModel.EnrouteExpTrailer == "" ? 0 : Convert.ToDecimal(distanceDetailTripModel.EnrouteExpTrailer)),
                            new SqlParameter("@EnrouteExpCarCarrier", distanceDetailTripModel.EnrouteExpCarCarrier == "" ? 0 : Convert.ToDecimal(distanceDetailTripModel.EnrouteExpCarCarrier)),
                            new SqlParameter("@EnrouteExpEmpty", distanceDetailTripModel.EnrouteExpEmpty == "" ? 0 : Convert.ToDecimal(distanceDetailTripModel.EnrouteExpEmpty)),
                            new SqlParameter("@EnrouteExpRemarks", distanceDetailTripModel.EnrouteExpRemarks),
                            new SqlParameter("@DefinedTollExp", distanceDetailTripModel.DefinedTollExp == "" ? 0 : Convert.ToDecimal(distanceDetailTripModel.DefinedTollExp)),
                            new SqlParameter("@Index", distanceDetailTripModel.Index),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceDetailTrip_Insert", param);
                   
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
        public async Task<DistanceMasterTripModel> GetFreightTripInnerGridList(FreightTripInnerGridListRequest request)
        {
            DistanceMasterTripModel tripSheetInnerGridList = new()
            {
                DistanceDetailsTripList = new List<DistanceDetailTripModel>(),

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

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetFreightTripInnerGridList_Select", param);

                   // LR Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DistanceDetailsTripList.Add(new DistanceDetailTripModel
                            {
                                //  
                                DistanceDtlID = Convert.ToString(resultData.Tables[0].Rows[i]["DistanceDtlID"]),
                                MasterID = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
                                FromLocation = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocation"]),

                                KMS = Convert.ToString(resultData.Tables[0].Rows[i]["KMS"]),
                                EnrouteExpTruck = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTruck"]),
                                EnrouteExpTrailer = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTrailer"]),
                                EnrouteExpCarCarrier = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
                                EnrouteExpEmpty = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpEmpty"]),
                                EnrouteExpRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpRemarks"]),
                                DefinedTollExp = Convert.ToString(resultData.Tables[0].Rows[i]["DefinedTollExp"]),
                                ToLocationName = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocationName"]),
                                FromLocationName = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocationName"]),

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

        public async Task<DistanceMasterTripList> GetDistanceMasterTripList(DistanceMasterTripListRequest request)
        {
            DistanceMasterTripList distanceMasterTripList = new();
            List<DistanceMasterTripModel> distanceTripList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "DistanceMasterTripList_Select", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceTripList.Add(new DistanceMasterTripModel
                            {
                                MasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                ValidFrom = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                FromLocation = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                LocationName = Convert.ToString(dataSet.Tables[0].Rows[i]["LocationName"]),
                            });
                        }

                        distanceMasterTripList.DistanceTripList = distanceTripList;

                        distanceMasterTripList.PageMetaData = new PaginationMetaData
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
            return distanceMasterTripList;
        }
    }
}

