

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

        public async Task<DistanceMasterFrtList> GetDistanceMasterFrtList(PageRequestDtBrVh request)
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
                            new SqlParameter("@PageSize",   request.PageSize),
                            new SqlParameter("@SortColumn", request.SortColumn),
                            new SqlParameter("@SortOrder",  request.SortOrder),
                            new SqlParameter("@Search",     request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterFrtList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            distanceFrtList.Add(new DistanceMasterFrtModel
                            {
                                MasterID        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                ValidFrom       = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidFrom"]),
                                ValidUpto       = Convert.ToString(dataSet.Tables[0].Rows[i]["ValidUpto"]),
                                FromLocation    = Convert.ToString(dataSet.Tables[0].Rows[i]["FromLocation"]),
                                FromPoint       = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),
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

            }
            return distanceMasterFreightList;
        }
        public async Task<DistanceMasterFrtModel> GetFreightInnerGridList(RequestModel request)
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
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceMasterFrtInnergrid", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tripSheetInnerGridList.DistanceDetailsFreightList.Add(new DistanceDetailFrtModel
                            {
                                MasterID        = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
                                FromLocation    = Convert.ToString(resultData.Tables[0].Rows[i]["FromLocation"]),
                                ToLocation      = Convert.ToString(resultData.Tables[0].Rows[i]["ToLocation"]),
                                KMS             = Convert.ToString(resultData.Tables[0].Rows[i]["KMS"]),                                
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

        public async Task<ResponseModel> DistanceMasterFrtSave(DistanceMasterFrtModel distanceMasterFrtModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID",       distanceMasterFrtModel.MasterID),
                            new SqlParameter("@ValidFrom",      distanceMasterFrtModel.ValidFrom),
                            new SqlParameter("@ValidUpto",      distanceMasterFrtModel.ValidUpto),
                            new SqlParameter("@FromLocation",   distanceMasterFrtModel.FromLocation),
                            new SqlParameter("@LoggedInUser",   distanceMasterFrtModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DistanceMasterFrtSave", param);
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
                            distanceMasterFrtModel.DistanceDetailsFreightList[i].MasterID = MasterID;
                            responseModel = await DistanceDetailFrtSave(distanceMasterFrtModel.DistanceDetailsFreightList[i]);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return responseModel;
        }
        public async Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel distanceDetailFrtModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID",       distanceDetailFrtModel.MasterID),
                            new SqlParameter("@FromLocation",   distanceDetailFrtModel.FromLocation),
                            new SqlParameter("@ToLocation",     distanceDetailFrtModel.ToLocation),
                            new SqlParameter("@KMS",            distanceDetailFrtModel.KMS),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DistanceFrtDetailSave", param);

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
        public async Task<ResponseModel> DistanceMasterFrtDelete(RequestModel req)
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
       
        public async Task<List<DropDownListModel>> GetDistancefrtFromLocationList()
        {
            List<DropDownListModel> list = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getFrtFromLocationList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            list.Add(new DropDownListModel
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
            return list;
        }

        public async Task<DistanceFrtEditModel> GetDistanceFrtDtls(RequestModel request)
        {
            DistanceFrtEditModel distanceFrtEdit = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          new SqlParameter("@FromLocation", request.strRequest)                          
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceFrtDtls", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        distanceFrtEdit.MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["MasterID"]);
                        distanceFrtEdit.ValidUpto = Convert.ToString(statusData.Tables[0].Rows[0]["ValidUpto"]);
                        distanceFrtEdit.FromLocation = Convert.ToString(statusData.Tables[0].Rows[0]["FromLocation"]);
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
            return distanceFrtEdit;
        }

        public async Task<DistanceFrtEditModel> GetDistanceFrtEditDetails(DistanceFrtEditModel distanceFrtEdit)
        {
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                          new SqlParameter("@MasterID", distanceFrtEdit.MasterID),
                          new SqlParameter("@FromLocation", distanceFrtEdit.FromLocation),
                          new SqlParameter("@ToLocation",   distanceFrtEdit.ToLocation)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getDistanceFrtEditDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        distanceFrtEdit.DistanceDtlID = Convert.ToString(statusData.Tables[0].Rows[0]["DistanceDtlID"]);
                        distanceFrtEdit.MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["MasterID"]);
                        distanceFrtEdit.FromLocation = Convert.ToString(statusData.Tables[0].Rows[0]["FromLocation"]);
                        distanceFrtEdit.ToLocation = Convert.ToString(statusData.Tables[0].Rows[0]["ToLocation"]);
                        distanceFrtEdit.Kms = Convert.ToString(statusData.Tables[0].Rows[0]["Kms"]);
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
            return distanceFrtEdit;
        }
        public async Task<ResponseModel> DistanceFrtEditDetailsSave(DistanceFrtEditModel distanceFrtEdit)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DistanceDtlID",  distanceFrtEdit.DistanceDtlID),
                            new SqlParameter("@MasterID",       distanceFrtEdit.MasterID),
                            new SqlParameter("@FromLocation",   distanceFrtEdit.FromLocation),
                            new SqlParameter("@ToLocation",     distanceFrtEdit.ToLocation),
                            new SqlParameter("@Kms",            distanceFrtEdit.Kms),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_DistanceFrtEditDetailsSave", param);

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

    }
}

