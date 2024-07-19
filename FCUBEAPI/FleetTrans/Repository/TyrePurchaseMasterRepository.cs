using FleetMasters.Models;
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
    public class TyrePurchaseMasterRepository : ITyrePurchaseMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyrePurchaseMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<ResponseModel> TyrePurchaseMasterSave(TyrePurchaseMasterModel tyrePurchaseMasterModel)
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
                            new SqlParameter("@PurchaseMasterID ",       tyrePurchaseMasterModel.PurchaseMasterID ),
                            new SqlParameter("@BranchCode",      tyrePurchaseMasterModel.BranchCode ),
                            new SqlParameter("@PurchaseDate",      tyrePurchaseMasterModel.PurchaseDate ),
                            new SqlParameter("@PurchaseType",   tyrePurchaseMasterModel.PurchaseType),
                            new SqlParameter("@NoVendor",   tyrePurchaseMasterModel.NoVendor),
                            new SqlParameter("@VendorId",   tyrePurchaseMasterModel.VendorId),
                            new SqlParameter("@VendorName",   tyrePurchaseMasterModel.VendorName),
                            new SqlParameter("@VendorAddress",   tyrePurchaseMasterModel.VendorAddress),
                             new SqlParameter("@VendorGstNo",   tyrePurchaseMasterModel.VendorGstNo),
                            new SqlParameter("@VendorInvNo",   tyrePurchaseMasterModel.VendorInvNo),
                            new SqlParameter("@VendorInvDt",   tyrePurchaseMasterModel.VendorInvDt),
                            new SqlParameter("@TyreSacCode",   tyrePurchaseMasterModel.TyreSacCode),
                            new SqlParameter("@GstType",   tyrePurchaseMasterModel.GstType),
                            new SqlParameter("@TotalTyresAmt",   tyrePurchaseMasterModel.TotalTyresAmt ),
                            new SqlParameter("@TotalSgstAmt",   tyrePurchaseMasterModel.TotalSgstAmt ),
                            new SqlParameter("@TotalCgstAmt",   tyrePurchaseMasterModel.TotalCgstAmt ),
                            new SqlParameter("@TotalIgstAmt ",   tyrePurchaseMasterModel.TotalIgstAmt  ),
                            new SqlParameter("@TotalAmt ",   tyrePurchaseMasterModel.TotalAmt ),
                            new SqlParameter("@RoundOff",   tyrePurchaseMasterModel.RoundOff),
                            new SqlParameter("@NetAmount",   tyrePurchaseMasterModel.NetAmount),
                            new SqlParameter("@Remarks",   tyrePurchaseMasterModel.Remarks),
                            new SqlParameter("@PmtType",   tyrePurchaseMasterModel.PmtType),
                            new SqlParameter("@NeftPmt",   tyrePurchaseMasterModel.NeftPmt),
                            new SqlParameter("@CreditAc",   tyrePurchaseMasterModel.CreditAc),
                            new SqlParameter("@ChequeNo",   tyrePurchaseMasterModel.ChequeNo),
                             new SqlParameter("@ChequeDate",   tyrePurchaseMasterModel.ChequeDate),
                            new SqlParameter("@Findocid ",   tyrePurchaseMasterModel.Findocid),
                            new SqlParameter("@FindocidJV",   tyrePurchaseMasterModel.FindocidJV),
                            new SqlParameter("@RefDocAttachedImage",   tyrePurchaseMasterModel.RefDocAttachedImage ),
                            new SqlParameter("@YearID",   tyrePurchaseMasterModel.YearID),
                            new SqlParameter("@LoggedInUser",   tyrePurchaseMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyrePurchaseMaster_Insert", param);
                    string PurchaseMasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        PurchaseMasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tyrePurchaseMasterModel.TyrePurchaseDtlList.Count; i++)
                            {
                                if (Convert.ToString(tyrePurchaseMasterModel.TyrePurchaseDtlList[i].BrandID) != "")
                                {
                                    tyrePurchaseMasterModel.TyrePurchaseDtlList[i].PurchaseMasterID = PurchaseMasterID;
                                    responseModel = await TyrePurchaseMasterDetailSave(transaction, tyrePurchaseMasterModel.TyrePurchaseDtlList[i]);
                                    if (!responseModel.Status)
                                    {
                                        transaction.Rollback();
                                        i = tyrePurchaseMasterModel.TyrePurchaseDtlList.Count;
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
        public async Task<TyrePurchaseMasterInnerGridModel> GetTyrePurchaseMasterInnerGridList(RequestModel request)
        {
            TyrePurchaseMasterInnerGridModel tyrePurchaseMasterInnerGridList = new()
            {

                TyrePurchaseList = new List<TyrePurchaseDtlListmodel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PurchaseMasterID", request.strRequest),

                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "TyrePurchaseMasterInnerGridList_Select", param);
                    // tripSheetInnerGridList.Incentive = "0";
                    //LR Details

                    //Diseal Details
                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyrePurchaseMasterInnerGridList.TyrePurchaseList.Add(new TyrePurchaseDtlListmodel
                            {
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                                PurchaseMasterID = Convert.ToString(resultData.Tables[0].Rows[i]["PurchaseMasterID"]),
                                PurchaseDate = Convert.ToString(resultData.Tables[0].Rows[i]["PurchaseDate"]),
                                TyreNo = Convert.ToString(resultData.Tables[0].Rows[i]["TyreNo"]),
                                BrandID = Convert.ToString(resultData.Tables[0].Rows[i]["BrandID"]),
                                TyrePattern = Convert.ToString(resultData.Tables[0].Rows[i]["TyrePattern"]),
                                TyreModel = Convert.ToString(resultData.Tables[0].Rows[i]["TyreModel"]),
                                TyreAmount = Convert.ToString(resultData.Tables[0].Rows[i]["TyreAmount"]),
                                SgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["IgstAmt"]),
                                NetTyreAmount = Convert.ToString(resultData.Tables[0].Rows[i]["NetTyreAmount"]),
                                EstLifeKM = Convert.ToString(resultData.Tables[0].Rows[i]["EstLifeKM"]),
                                RegroupAmt = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupAmt"]),
                                CurrentTyreStatus = Convert.ToString(resultData.Tables[0].Rows[i]["CurrentTyreStatus"]),
                                CurrentStatusDate = Convert.ToString(resultData.Tables[0].Rows[i]["CurrentStatusDate"]),
                                CurrentVehicleNo = Convert.ToString(resultData.Tables[0].Rows[i]["CurrentVehicleNo"]),

                            });
                        }
                    }


                    //Misc Details
                   
                   

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
            return tyrePurchaseMasterInnerGridList;
        }

        public async Task<ResponseModel> TyrePurchaseMasterDetailSave(SqlTransaction transaction, TyrePurchaseDtlListmodel tyrePurchaseDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TyreId",               tyrePurchaseDtlListmodel.TyreId),
                            new SqlParameter("@PurchaseMasterID",           tyrePurchaseDtlListmodel.PurchaseMasterID),
                            new SqlParameter("@PurchaseDate",               tyrePurchaseDtlListmodel.PurchaseDate),
                            new SqlParameter("@BrandID",             tyrePurchaseDtlListmodel.BrandID),
                            new SqlParameter("@TyreNo",                    tyrePurchaseDtlListmodel.TyreNo),
                            new SqlParameter("@TyrePattern",        tyrePurchaseDtlListmodel.TyrePattern) ,
                            new SqlParameter("@TyreModel",        tyrePurchaseDtlListmodel.TyreModel) ,
                            new SqlParameter("@TyreAmount",        tyrePurchaseDtlListmodel.TyreAmount) ,
                            new SqlParameter("@SgstPct",        tyrePurchaseDtlListmodel.SgstPct) ,
                            new SqlParameter("@SgstAmt",        tyrePurchaseDtlListmodel.SgstAmt) ,
                            new SqlParameter("@CgstPct",        tyrePurchaseDtlListmodel.CgstPct) ,
                            new SqlParameter("@CgstAmt",        tyrePurchaseDtlListmodel.CgstAmt) ,
                            new SqlParameter("@IgstPct",        tyrePurchaseDtlListmodel.IgstPct) ,
                            new SqlParameter("@IgstAmt",        tyrePurchaseDtlListmodel.IgstAmt) ,
                            new SqlParameter("@NetTyreAmount",        tyrePurchaseDtlListmodel.NetTyreAmount) ,
                            new SqlParameter("@EstLifeKM",        tyrePurchaseDtlListmodel.EstLifeKM) ,
                            new SqlParameter("@RegroupAmt",        tyrePurchaseDtlListmodel.RegroupAmt) ,
                     new SqlParameter("@CurrentTyreStatus",        tyrePurchaseDtlListmodel.CurrentTyreStatus) ,
                      new SqlParameter("@CurrentStatusDate",        tyrePurchaseDtlListmodel.CurrentStatusDate) ,
                    new SqlParameter("@CurrentVehicleNo",        tyrePurchaseDtlListmodel.CurrentVehicleNo) 
                    
                };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyrePurchaseDetailSave", param);

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
        public async Task<ResponseModel> TyrePurchaseMasterDelete(RequestModel req)
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
                            new SqlParameter("@TyreId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyrePurchaseMasterDelete", param);

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
        public async Task<List<DropDownListModel>> GetModelList()
        {
            List<DropDownListModel> BrandList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getModelList", param);

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
        public async Task<List<DropDownListModel>> GetVendorList()
        {
            List<DropDownListModel> BrandList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "VendorList_Select", param);

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
        public async Task<TyrePurchaseMasterList> GetTyrePurchaseMasterList(PageRequest request)
        {
            TyrePurchaseMasterList tyrePurchaseMasterList = new();
            List<TyrePurchaseMasterModel> tyreList = new();
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
                          //  new SqlParameter("@FromDate",   request.FromDate),
                           // new SqlParameter("@ToDate",     request.ToDate),
                           // new SqlParameter("@Type",       request.FilterStr)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyrePurchaseMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyreList.Add(new TyrePurchaseMasterModel
                            {
                                PurchaseMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseMasterID"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                PurchaseDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseDate"]),
                                PurchaseType = Convert.ToString(dataSet.Tables[0].Rows[i]["PurchaseType"]),
                                NoVendor = Convert.ToString(dataSet.Tables[0].Rows[i]["NoVendor"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                TyreSacCode = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreSacCode"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                TotalTyresAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTyresAmt"]),
                                TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                TotalAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmt"]),
                                RoundOff = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                Findocid = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                FindocidJV = Convert.ToString(dataSet.Tables[0].Rows[i]["FindocidJV"]),
                                RefDocAttachedImage = Convert.ToString(dataSet.Tables[0].Rows[i]["RefDocAttachedImage"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),


                                //  LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["LoggedInUser"]),


                            });
                        }

                        tyrePurchaseMasterList.TyreList = tyreList;

                        tyrePurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return tyrePurchaseMasterList;
        }
    }
}
