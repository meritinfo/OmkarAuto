using FleetTrans.Models;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public class TyreDeActivateMasterRepository: ITyreDeActivateMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyreDeActivateMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<TyreDeActivateMasterList> GetTyreDeActivateMasterList(PageFromDtToDtRequest request)
        {
            TyreDeActivateMasterList tyreDeActivateMasterList = new();
            List<TyreDeActivateMasterModel> tyreDeActivateList = new();
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
                           // new SqlParameter("@Type",       request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreDeActivateMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyreDeActivateList.Add(new TyreDeActivateMasterModel
                            {
                                DeActivateMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["DeActivateMasterID"]),
                                DeActivateDate = Convert.ToString(dataSet.Tables[0].Rows[i]["DeActivateDate"]),
                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                VehicleMasterid = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterid"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["Kmr"]),
                                InspectedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["InspectedBy"]),
                                RemovedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["RemovedBy"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                UsableTyreAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["UsableTyreAmt"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        tyreDeActivateMasterList.TyreDeActivateList = tyreDeActivateList;

                        tyreDeActivateMasterList.PageMetaData = new PaginationMetaData
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
            return tyreDeActivateMasterList;
        }
        public async Task<TyreDeActivateMasterModel> GetTyreDeActivateMasterInnerGridList(RequestModel request)
        {
            TyreDeActivateMasterModel tyreDeActivateMasterInnerGridList = new()
            {
                TyreDeActivateDtlList = new List<TyreDeActivateDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DeActivateMasterID", request.strRequest),

                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreDeActivateMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreDeActivateMasterInnerGridList.TyreDeActivateDtlList.Add(new TyreDeActivateDtlListmodel
                            {
                                DeActivateMasterID = Convert.ToString(resultData.Tables[0].Rows[i]["DeActivateMasterID"]),
                                DeActivateDate = Convert.ToString(resultData.Tables[0].Rows[i]["DeActivateDate"]),
                                VehicleMasterid = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleMasterid"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                                RemoveStatus = Convert.ToString(resultData.Tables[0].Rows[i]["RemoveStatus"]),
                                UsableAmount = Convert.ToString(resultData.Tables[0].Rows[i]["UsableAmount"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tyreDeActivateMasterInnerGridList;
        }
        public async Task<TyreDeActivateMasterModel> GetTyredeactivateVehicleTyreList(RequestModel request)
        {
            TyreDeActivateMasterModel tyreDeActivateMasterInnerGridList = new()
            {
                TyreDeActivateDtlList = new List<TyreDeActivateDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VehicleMasterid", request.strRequest),

                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreDeActivateVehicleTyreList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreDeActivateMasterInnerGridList.TyreDeActivateDtlList.Add(new TyreDeActivateDtlListmodel
                            {
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tyreDeActivateMasterInnerGridList;
        }
        public async Task<ResponseModel> TyreDeActivateMasterSave(TyreDeActivateMasterModel tyreDeActivateMasterModel)
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
                            new SqlParameter("@DeActivateMasterID", tyreDeActivateMasterModel.DeActivateMasterID ),
                            new SqlParameter("@DeActivateDate",     tyreDeActivateMasterModel.DeActivateDate ),
                            new SqlParameter("@RefNo",              tyreDeActivateMasterModel.RefNo ),
                            new SqlParameter("@VehicleMasterid",    tyreDeActivateMasterModel.VehicleMasterid),
                            new SqlParameter("@KMR",                tyreDeActivateMasterModel.Kmr),
                            new SqlParameter("@InspectedBy",        tyreDeActivateMasterModel.InspectedBy),
                            new SqlParameter("@RemovedBy",          tyreDeActivateMasterModel.RemovedBy),
                            new SqlParameter("@Remarks",            tyreDeActivateMasterModel.Remarks),
                            new SqlParameter("@UsableTyreAmt",      tyreDeActivateMasterModel.UsableTyreAmt),
                            new SqlParameter("@BranchCode",         tyreDeActivateMasterModel.BranchCode),
                            new SqlParameter("@YearID",             tyreDeActivateMasterModel.YearID ),
                            new SqlParameter("@LoggedInUser",       tyreDeActivateMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreDeActivateMasterSave", param);
                    string DeActivateMasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        DeActivateMasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tyreDeActivateMasterModel.TyreDeActivateDtlList.Count; i++)
                            {
                                tyreDeActivateMasterModel.TyreDeActivateDtlList[i].DeActivateMasterID = DeActivateMasterID;
                                tyreDeActivateMasterModel.TyreDeActivateDtlList[i].DeActivateDate = tyreDeActivateMasterModel.DeActivateDate;
                                tyreDeActivateMasterModel.TyreDeActivateDtlList[i].VehicleMasterid = tyreDeActivateMasterModel.VehicleMasterid;
                                responseModel = await TyreDeActivateMasterDetailSave(transaction, tyreDeActivateMasterModel.TyreDeActivateDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tyreDeActivateMasterModel.TyreDeActivateDtlList.Count;
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
        public async Task<ResponseModel> TyreDeActivateMasterDetailSave(SqlTransaction transaction, TyreDeActivateDtlListmodel tyreDeActivateDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@DeActivateMasterID", tyreDeActivateDtlListmodel.DeActivateMasterID),
                            new SqlParameter("@DeActivateDate",     tyreDeActivateDtlListmodel.DeActivateDate),
                            new SqlParameter("@VehicleMasterid",    tyreDeActivateDtlListmodel.VehicleMasterid),
                            new SqlParameter("@BrandId",            tyreDeActivateDtlListmodel.BrandId),
                            new SqlParameter("@TyreId",             tyreDeActivateDtlListmodel.TyreId),
                            new SqlParameter("@RemoveStatus",       tyreDeActivateDtlListmodel.RemoveStatus),
                            new SqlParameter("@UsableAmount",       tyreDeActivateDtlListmodel.UsableAmount),
                            new SqlParameter("@Remarks",            tyreDeActivateDtlListmodel.Remarks),

                };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreDeActivateDetailSave", param);

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
        public async Task<ResponseModel> TyreDeActivateMasterDelete(RequestModel req)
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
                            new SqlParameter("@DeActivateMasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreDeActivateMasterDelete", param);

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
