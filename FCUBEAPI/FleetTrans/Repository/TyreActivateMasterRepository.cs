using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Drawing;
using FleetTrans.Models;
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
    public class TyreActivateMasterRepository: ITyreActivateMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyreActivateMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<TyreActivateMasterList> GetTyreActivateMasterList(PageFromDtToDtRequest request)
        {
            TyreActivateMasterList tyreActivateMasterList = new();
            List<TyreActivateMasterModel> tyreActivateList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreActivateMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyreActivateList.Add(new TyreActivateMasterModel
                            {
                                ActivateMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["ActivateMasterID"]),
                                ActivateDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ActivateDate"]),
                                RefNo = Convert.ToString(dataSet.Tables[0].Rows[i]["RefNo"]),
                                VehicleMasterid = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleMasterid"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                Kmr = Convert.ToString(dataSet.Tables[0].Rows[i]["Kmr"]),
                                InspectedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["InspectedBy"]),
                                FittedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["FittedBy"]),
                                TyreAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreAmt"]),
                                OthAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OthAmt"]),
                                NetAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                            });
                        }

                        tyreActivateMasterList.TyreActivateList = tyreActivateList;

                        tyreActivateMasterList.PageMetaData = new PaginationMetaData
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
            return tyreActivateMasterList;
        }
        public async Task<TyreActivateMasterModel> GetTyreActivateMasterInnerGridList(RequestModel request)
        {
            TyreActivateMasterModel tyreActivateMasterInnerGridList = new()
            {
                TyreActivateDtlList = new List<TyreActivateDtlmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ActivateMasterID", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreActivateMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreActivateMasterInnerGridList.TyreActivateDtlList.Add(new TyreActivateDtlmodel
                            {
                                ActivateMasterID = Convert.ToString(resultData.Tables[0].Rows[i]["ActivateMasterID"]),
                                ActivateDate = Convert.ToString(resultData.Tables[0].Rows[i]["ActivateDate"]),
                                VehicleMasterid = Convert.ToString(resultData.Tables[0].Rows[i]["VehicleMasterid"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                                TyrePosID = Convert.ToString(resultData.Tables[0].Rows[i]["TyrePosID"]),
                                TyreCostAmt = Convert.ToString(resultData.Tables[0].Rows[i]["TyreCostAmt"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return tyreActivateMasterInnerGridList;
        }
        public async Task<ResponseModel> TyreActivateMasterSave(TyreActivateMasterModel tyreActivateMasterModel)
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
                            new SqlParameter("@ActivateMasterID ",  tyreActivateMasterModel.ActivateMasterID ),
                            new SqlParameter("@ActivateDate",       tyreActivateMasterModel.ActivateDate ),
                            new SqlParameter("@RefNo",              tyreActivateMasterModel.RefNo ),
                            new SqlParameter("@VehicleMasterid",    tyreActivateMasterModel.VehicleMasterid),
                            new SqlParameter("@Kmr",                tyreActivateMasterModel.Kmr),
                            new SqlParameter("@InspectedBy",        tyreActivateMasterModel.InspectedBy),
                            new SqlParameter("@FittedBy",           tyreActivateMasterModel.FittedBy),
                            new SqlParameter("@TyreAmt",            tyreActivateMasterModel.TyreAmt),
                            new SqlParameter("@OthAmt",             tyreActivateMasterModel.OthAmt),
                            new SqlParameter("@NetAmt",             tyreActivateMasterModel.NetAmt),
                            new SqlParameter("@Remarks",            tyreActivateMasterModel.Remarks),
                            new SqlParameter("@BranchCode",         tyreActivateMasterModel.BranchCode),
                            new SqlParameter("@YearID",             tyreActivateMasterModel.YearID ),                         
                            new SqlParameter("@LoggedInUser",       tyreActivateMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreActivateMasterSave", param);
                    string ActivateMasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        ActivateMasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tyreActivateMasterModel.TyreActivateDtlList.Count; i++)
                            {
                                tyreActivateMasterModel.TyreActivateDtlList[i].ActivateMasterID = ActivateMasterID;
                                tyreActivateMasterModel.TyreActivateDtlList[i].ActivateDate = tyreActivateMasterModel.ActivateDate;
                                tyreActivateMasterModel.TyreActivateDtlList[i].VehicleMasterid = tyreActivateMasterModel.VehicleMasterid;
                                responseModel = await TyreActivateMasterDetailSave(transaction, tyreActivateMasterModel.TyreActivateDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tyreActivateMasterModel.TyreActivateDtlList.Count;
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
        public async Task<ResponseModel> TyreActivateMasterDetailSave(SqlTransaction transaction, TyreActivateDtlmodel tyreActivateDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ActivateMasterID",   tyreActivateDtlListmodel.ActivateMasterID),
                            new SqlParameter("@ActivateDate",       tyreActivateDtlListmodel.ActivateDate),
                            new SqlParameter("@VehicleMasterid",    tyreActivateDtlListmodel.VehicleMasterid),
                            new SqlParameter("@BrandId",            tyreActivateDtlListmodel.BrandId),
                            new SqlParameter("@TyreId",             tyreActivateDtlListmodel.TyreId),
                            new SqlParameter("@TyrePosID",          tyreActivateDtlListmodel.TyrePosID),
                            new SqlParameter("@TyreCostAmt",        tyreActivateDtlListmodel.TyreCostAmt),
                         
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreMasterDetailSave", param);

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
        public async Task<ResponseModel> TyreActivateMasterDelete(RequestModel req)
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
                            new SqlParameter("@ActivateMasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreActivateMasterDelete", param);

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
        public async Task<List<DropDownListModel>> GetTyrePositionList()
        {
            List<DropDownListModel> BrandList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyrePositionList", param);

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
            }
            return BrandList;
        }
        public async Task<List<DropDownListModel>> GetBrandTyreNoList(RequestModel request)
        {
            List<DropDownListModel> BrandList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@BrandId", request.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBrandTyreNoList", param);

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
            }
            return BrandList;
        }


    }
}
