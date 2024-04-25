

using FreightMasters.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using System.Transactions;

namespace FreightMasters.Repository
{
    public class DistanceMasterTripRepository : IDistanceMasterTripRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public DistanceMasterTripRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<DistanceMasterTripList> GetDistanceMasterTripList(ReportRequestModel request)
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
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterTripList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceTripList.Add(new DistanceMasterTripModel
                            {
                                MasterID        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                ValidFrom       = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto       = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                FromLocation    = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                LocationName    = Convert.ToString(dataSet.Tables[0].Rows[i]["LocationName"]),
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

            }
            return distanceMasterTripList;
        }

        public async Task<DistanceMasterTripModel> GetFreightTripInnerGridList(RequestModel request)
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
                        new SqlParameter("@MasterId", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "GetFreightTripInnerGridList_Select", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DistanceDetailsTripList.Add(new DistanceDetailTripModel
                            {
                                MasterID                = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
                                FromLocation            = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation              = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocation"]),
                                KMS                     = Convert.ToString(resultData.Tables[0].Rows[i]["KMS"]),
                                EnrouteExpTruck         = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTruck"]),
                                EnrouteExpTrailer       = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpTrailer"]),
                                EnrouteExpCarCarrier    = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpCarCarrier"]),
                                EnrouteExpEmpty         = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpEmpty"]),
                                EnrouteExpRemarks       = Convert.ToString(resultData.Tables[0].Rows[i]["EnrouteExpRemarks"]),
                                DefinedTollExp          = Convert.ToString(resultData.Tables[0].Rows[i]["DefinedTollExp"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tripSheetInnerGridList;
        }       
        public async Task<ResponseModel> DistanceMasterTripSave(DistanceMasterTripModel distanceMasterTripModel)
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
                            new SqlParameter("@MasterID",       distanceMasterTripModel.MasterID),
                            new SqlParameter("@ValidFrom",      distanceMasterTripModel.ValidFrom),
                            new SqlParameter("@ValidUpto",      distanceMasterTripModel.ValidUpto),
                            new SqlParameter("@FromLocation",   distanceMasterTripModel.FromLocation),
                            new SqlParameter("@LoggedInUser",   distanceMasterTripModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DistanceMasterTripSave", param);
                    string MasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status    = false;
                        transaction.Rollback();
                    }

                    if (responseModel.Status)
                    {
                        for (int i = 0; i < distanceMasterTripModel.DistanceDetailsTripList.Count; i++)
                        {
                            if (Convert.ToString(distanceMasterTripModel.DistanceDetailsTripList[i].ToLocation) != "")
                            {
                                distanceMasterTripModel.DistanceDetailsTripList[i].MasterID = MasterID;
                                responseModel = await DistanceDetailTripSave(transaction, distanceMasterTripModel.DistanceDetailsTripList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i= distanceMasterTripModel.DistanceDetailsTripList.Count;
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
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> DistanceDetailTripSave(SqlTransaction transaction, DistanceDetailTripModel distanceDetailTripModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID",               distanceDetailTripModel.MasterID),
                            new SqlParameter("@FromLocation",           distanceDetailTripModel.FromLocation),
                            new SqlParameter("@ToLocation",             distanceDetailTripModel.ToLocation),
                            new SqlParameter("@KMS",                    distanceDetailTripModel.KMS),
                            new SqlParameter("@EnrouteExpTruck",        distanceDetailTripModel.EnrouteExpTruck),
                            new SqlParameter("@EnrouteExpTrailer",      distanceDetailTripModel.EnrouteExpTrailer),
                            new SqlParameter("@EnrouteExpCarCarrier",   distanceDetailTripModel.EnrouteExpCarCarrier),
                            new SqlParameter("@EnrouteExpEmpty",        distanceDetailTripModel.EnrouteExpEmpty),
                            new SqlParameter("@EnrouteExpRemarks",      distanceDetailTripModel.EnrouteExpRemarks),
                            new SqlParameter("@DefinedTollExp",         distanceDetailTripModel.DefinedTollExp),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DistanceTripDetailSave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status    = false;
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return responseModel;
        }
       
        public async Task<ResponseModel> ChkdistanceTripValidity(DistanceMasterTripModel distanceMasterTripModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromLocation",   distanceMasterTripModel.FromLocation),
                            new SqlParameter("@ValidFrom",      distanceMasterTripModel.ValidFrom),
                            new SqlParameter("@ValidUpto",      distanceMasterTripModel.ValidUpto),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkDistanceTripValidity", param);
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status    = false;
                    }

                }
            }
            catch (Exception ex)
            {
                
            }
            return responseModel;
        }


        public async Task<ResponseModel> DistanceMasterTripDelete(RequestModel req)
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
                            new SqlParameter("@MasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DistanceMasterTripDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status    = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message   = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        responseModel.Status    = false;
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

        public async Task<List<DropDownListModel>> GetDistanceTripFromLocationList()
        {
            List<DropDownListModel> list = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTripFromLocationList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            list.Add(new DropDownListModel
                            {
                                DataId      = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName    = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return list;
        }

        public async Task<DistanceTripEditModel> GetDistanceTripDtls(RequestModel request)
        {
            DistanceTripEditModel distanceTripEdit = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          new SqlParameter("@FromLocation", request.strRequest)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceTripDtls", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        distanceTripEdit.MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["MasterID"]);
                        distanceTripEdit.ValidUpto = Convert.ToString(statusData.Tables[0].Rows[0]["ValidUpto"]);
                        distanceTripEdit.FromLocation = Convert.ToString(statusData.Tables[0].Rows[0]["FromLocation"]);
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return distanceTripEdit;
        }

        public async Task<DistanceTripEditModel> GetDistanceTripEditDetails(DistanceTripEditModel distanceTripEdit)
        {
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          new SqlParameter("@MasterID", distanceTripEdit.MasterID),
                          new SqlParameter("@FromLocation", distanceTripEdit.FromLocation),
                          new SqlParameter("@ToLocation",   distanceTripEdit.ToLocation)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceTripEditDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        distanceTripEdit.DistanceDtlID          = Convert.ToString(statusData.Tables[0].Rows[0]["DistanceDtlID"]);
                        distanceTripEdit.MasterID               = Convert.ToString(statusData.Tables[0].Rows[0]["MasterID"]);
                        distanceTripEdit.FromLocation           = Convert.ToString(statusData.Tables[0].Rows[0]["FromLocation"]);
                        distanceTripEdit.ToLocation             = Convert.ToString(statusData.Tables[0].Rows[0]["ToLocation"]);
                        distanceTripEdit.Kms                    = Convert.ToString(statusData.Tables[0].Rows[0]["Kms"]);
                        distanceTripEdit.EnrouteExpTruck        = Convert.ToString(statusData.Tables[0].Rows[0]["EnrouteExpTruck"]);
                        distanceTripEdit.EnrouteExpTrailer      = Convert.ToString(statusData.Tables[0].Rows[0]["EnrouteExpTrailer"]);
                        distanceTripEdit.EnrouteExpCarCarrier   = Convert.ToString(statusData.Tables[0].Rows[0]["EnrouteExpCarCarrier"]);
                        distanceTripEdit.EnrouteExpEmpty        = Convert.ToString(statusData.Tables[0].Rows[0]["EnrouteExpEmpty"]);
                        distanceTripEdit.EnrouteExpRemarks      = Convert.ToString(statusData.Tables[0].Rows[0]["EnrouteExpRemarks"]);
                        distanceTripEdit.DefinedTollExp         = Convert.ToString(statusData.Tables[0].Rows[0]["DefinedTollExp"]);
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return distanceTripEdit;
        }
        public async Task<ResponseModel> DistanceTripEditDetailsSave(DistanceTripEditModel distanceTripEdit)
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
                    SqlParameter[] paramdata =
                        {
                            new SqlParameter("@DistanceDtlID",          distanceTripEdit.DistanceDtlID),
                            new SqlParameter("@MasterID",               distanceTripEdit.MasterID),
                            new SqlParameter("@FromLocation",           distanceTripEdit.FromLocation),
                            new SqlParameter("@ToLocation",             distanceTripEdit.ToLocation),
                            new SqlParameter("@Kms",                    distanceTripEdit.Kms),
                            new SqlParameter("@EnrouteExpTruck",        distanceTripEdit.EnrouteExpTruck),
                            new SqlParameter("@EnrouteExpTrailer",      distanceTripEdit.EnrouteExpTrailer),
                            new SqlParameter("@EnrouteExpCarCarrier",   distanceTripEdit.EnrouteExpCarCarrier),
                            new SqlParameter("@EnrouteExpEmpty",        distanceTripEdit.EnrouteExpEmpty),
                            new SqlParameter("@EnrouteExpRemarks",      distanceTripEdit.EnrouteExpRemarks),
                            new SqlParameter("@DefinedTollExp",         distanceTripEdit.DefinedTollExp),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_DistanceTripEditDetailsSave", paramdata);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
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

