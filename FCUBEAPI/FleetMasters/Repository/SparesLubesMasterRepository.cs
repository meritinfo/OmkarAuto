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
    public class SparesLubesMasterRepository: ISparesLubesMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        public SparesLubesMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        //public async Task<ResponseModel> SparesLubesMasterSave(SparesLubesMasterModel sparesLubesMasterModel)
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
        //                    new SqlParameter("@SpareLubId", sparesLubesMasterModel.SpareLubId),
        //                    new SqlParameter("@SpareLubName", sparesLubesMasterModel.SpareLubName),
        //                    new SqlParameter("@SpareLubType", sparesLubesMasterModel.SpareLubType),
        //                    new SqlParameter("@Sch_Oth", sparesLubesMasterModel.Sch_Oth),
        //                    new SqlParameter("@LifeType", sparesLubesMasterModel.LifeType),
        //                    new SqlParameter("@LifeExpectancy", sparesLubesMasterModel.LifeExpectancy),
        //                    new SqlParameter("@IsActive", sparesLubesMasterModel.IsActive),
        //                    new SqlParameter("@InventroyYN", sparesLubesMasterModel.InventroyYN),
        //                   // new SqlParameter("@OpeningQty", sparesLubesMasterModel.OpeningQty),
        //                 //    new SqlParameter("@OpeningValue", sparesLubesMasterModel.OpeningValue),
        //                    new SqlParameter("@LoggedInUser", sparesLubesMasterModel.LoggedInUser)
        //                };
        //            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesLubesMasterSave", param);

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
        public async Task<ResponseModel> SparesLubesMasterSave(SparesLubesMasterModel sparesLubesMasterModel)
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
                            new SqlParameter("@SpareLubId", sparesLubesMasterModel.SpareLubId),
                            new SqlParameter("@SpareLubName", sparesLubesMasterModel.SpareLubName),
                            new SqlParameter("@SpareLubType", sparesLubesMasterModel.SpareLubType),
                            new SqlParameter("@Sch_Oth", sparesLubesMasterModel.Sch_Oth),
                            new SqlParameter("@LifeType", sparesLubesMasterModel.LifeType),
                            new SqlParameter("@LifeExpectancy", sparesLubesMasterModel.LifeExpectancy),
                            new SqlParameter("@IsActive", sparesLubesMasterModel.IsActive),
                            new SqlParameter("@InventroyYN", sparesLubesMasterModel.InventroyYN),
                            new SqlParameter("@LoggedInUser", sparesLubesMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesLubesMasterSave", param);
                    string SpareLubId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        SpareLubId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < sparesLubesMasterModel.SparesLubesDetailList.Count; i++)
                            {
                                if (Convert.ToString(sparesLubesMasterModel.SparesLubesDetailList[i].BrandId) != "")
                                {
                                    sparesLubesMasterModel.SparesLubesDetailList[i].SpareLubId = SpareLubId;
                                    responseModel = await SparesLubesDetailSave(transaction, sparesLubesMasterModel.SparesLubesDetailList[i]);
                                    if (!responseModel.Status)
                                    {
                                        transaction.Rollback();
                                        i = sparesLubesMasterModel.SparesLubesDetailList.Count;
                                    }

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
        public async Task<List<DropDownListModel>> GetBrandList()
        {
            List<DropDownListModel> BrandList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBrandList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            BrandList.Add(new DropDownListModel
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
            return BrandList;
        }


        public async Task<SparesLubesMasterModel> GetSparesLubesInnerGridList(RequestModel request)
        {
            SparesLubesMasterModel sparesLubesInnerGridList = new()
            {
                SparesLubesDetailList = new List<SparesLubesDetailModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@SpareLubId", request.strRequest)
                    };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesLubesInnergrid", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            sparesLubesInnerGridList.SparesLubesDetailList.Add(new SparesLubesDetailModel
                            {
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                OpeningQty = Convert.ToString(resultData.Tables[0].Rows[i]["OpeningQty"]),
                                OpeningValue = Convert.ToString(resultData.Tables[0].Rows[i]["OpeningValue"]),
                                GodownId = Convert.ToString(resultData.Tables[0].Rows[i]["GodownId"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return sparesLubesInnerGridList;
        }
        public async Task<ResponseModel> SparesLubesDetailSave(SqlTransaction transaction, SparesLubesDetailModel sparesLubesDetailModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@SpareLubId",     sparesLubesDetailModel.SpareLubId),                        
                            new SqlParameter("@BrandId",        sparesLubesDetailModel.BrandId),
                            new SqlParameter("@OpeningQty",     sparesLubesDetailModel.OpeningQty),
                            new SqlParameter("@OpeningValue",   sparesLubesDetailModel.OpeningValue) ,
                            new SqlParameter("@GodownId",       sparesLubesDetailModel.GodownId) ,
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesLubesDetailSave", param);

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
        public async Task<SparesLubesMasterList> GetSparesLubesMasterList(ReportRequestModel request)
        {
            SparesLubesMasterList sparesLubesMasterList = new();
            List<SparesLubesMasterModel> sparesList = new();
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
                            new SqlParameter("@Search", request.Search),
                            //new SqlParameter("@FromDate", request.FromDate),
                            //new SqlParameter("@ToDate", request.ToDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesLubesMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            sparesList.Add(new SparesLubesMasterModel
                            {
                                SpareLubId = Convert.ToString(dataSet.Tables[0].Rows[i]["SpareLubId"]),
                                SpareLubName = Convert.ToString(dataSet.Tables[0].Rows[i]["SpareLubName"]),
                                SpareLubType = Convert.ToString(dataSet.Tables[0].Rows[i]["SpareLubType"]),
                                Sch_Oth = Convert.ToString(dataSet.Tables[0].Rows[i]["Sch_Oth"]),
                                LifeType = Convert.ToString(dataSet.Tables[0].Rows[i]["LifeType"]),
                                LifeExpectancy = Convert.ToString(dataSet.Tables[0].Rows[i]["LifeExpectancy"]),
                                IsActive = Convert.ToString(dataSet.Tables[0].Rows[i]["IsActive"]),
                                InventroyYN = Convert.ToString(dataSet.Tables[0].Rows[i]["InventroyYN"]),
                              //  OpeningQty = Convert.ToString(dataSet.Tables[0].Rows[i]["OpeningQty"]),
                               // OpeningValue = Convert.ToString(dataSet.Tables[0].Rows[i]["OpeningValue"]),
                                stype = Convert.ToString(dataSet.Tables[0].Rows[i]["stype"]),
                                // LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),
                            });
                        }

                        sparesLubesMasterList.SparesList = sparesList;

                        sparesLubesMasterList.PageMetaData = new PaginationMetaData
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
            return sparesLubesMasterList;
        }
        public async Task<ResponseModel> CheckDuplicateSpares(RequestModel requestModel)
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
                            new SqlParameter("@SpareLubName", requestModel.strRequest),
                           
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_ChkDuplicateSpares", param);

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
        public async Task<ResponseModel> SparesLubesMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@SpareLubId", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesLubesMasterDelete", param);

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

