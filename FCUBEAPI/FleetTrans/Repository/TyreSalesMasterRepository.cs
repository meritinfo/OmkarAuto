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
    public class TyreSalesMasterRepository : ITyreSalesMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyreSalesMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<TyreSalesMasterList> GetTyreSalesMasterList(PageFromDtToDtRequest request)
        {
            TyreSalesMasterList tyreSalesMasterList = new();
            List<TyreSalesMasterModel> tyreSalesList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreSalesMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyreSalesList.Add(new TyreSalesMasterModel
                            {
                                MasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                SaleIncharge = Convert.ToString(dataSet.Tables[0].Rows[i]["SaleIncharge"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                NonCustomer = Convert.ToString(dataSet.Tables[0].Rows[i]["NonCustomer"]),
                                CustomerId = Convert.ToString(dataSet.Tables[0].Rows[i]["CustomerId"]),
                                CustomerName = Convert.ToString(dataSet.Tables[0].Rows[i]["CustomerName"]),
                                CustomerAdd = Convert.ToString(dataSet.Tables[0].Rows[i]["CustomerAdd"]),
                                CustomerGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CustomerGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                TyreAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TyreAmount"]),
                                SgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotalAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmount"]),
                                RoundOff = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                ApprovedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedYN"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        tyreSalesMasterList.TyreSalesList = tyreSalesList;

                        tyreSalesMasterList.PageMetaData = new PaginationMetaData
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
            return tyreSalesMasterList;
        }
        public async Task<TyreSalesMasterModel> GetTyreSalesMasterInnerGridList(RequestModel request)
        {
            TyreSalesMasterModel tyreSalesMasterInnerGridList = new()
            {
                TyreSalesDtlList = new List<TyreSalesDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreSalesMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreSalesMasterInnerGridList.TyreSalesDtlList.Add(new TyreSalesDtlListmodel
                            {
                                MasterID = Convert.ToString(resultData.Tables[0].Rows[i]["MasterID"]),
                                TransDate = Convert.ToString(resultData.Tables[0].Rows[i]["TransDate"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                                TyreAmt = Convert.ToString(resultData.Tables[0].Rows[i]["TyreAmt"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                                BranchCode = Convert.ToString(resultData.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(resultData.Tables[0].Rows[i]["YearID"]),
                            });
                        }
                    }


                }
            }
            catch (Exception ex)
            {

            }
            return tyreSalesMasterInnerGridList;
        }
        public async Task<ResponseModel> TyreSalesMasterSave(TyreSalesMasterModel tyreSalesMasterModel)
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
                                 new SqlParameter("@MasterID"  , tyreSalesMasterModel.MasterID ),
                                 new SqlParameter("@TransDate"  , tyreSalesMasterModel.TransDate ),
                                 new SqlParameter("@SaleIncharge"  , tyreSalesMasterModel.SaleIncharge ),
                                 new SqlParameter("@PmtType"  , tyreSalesMasterModel.PmtType ),
                                 new SqlParameter("@NonCustomer"  , tyreSalesMasterModel.NonCustomer ),
                                 new SqlParameter("@CustomerId" , tyreSalesMasterModel.CustomerId ),
                                 new SqlParameter("@CustomerName" , tyreSalesMasterModel.CustomerName ),
                                 new SqlParameter("@CustomerAdd" , tyreSalesMasterModel.CustomerAdd ),
                                 new SqlParameter("@CustomerGstNo"  , tyreSalesMasterModel.CustomerGstNo ),
                                 new SqlParameter("@GstType"  , tyreSalesMasterModel.GstType ),
                                 new SqlParameter("@TyreAmount"  , tyreSalesMasterModel.TyreAmount ),
                                 new SqlParameter("@SgstPct"  , tyreSalesMasterModel.SgstPct ),
                                 new SqlParameter("@SgstAmt"  , tyreSalesMasterModel.SgstAmt ),
                                 new SqlParameter("@CgstPct"  , tyreSalesMasterModel.CgstPct ),
                                 new SqlParameter("@CgstAmt"  , tyreSalesMasterModel.CgstAmt ),
                                 new SqlParameter("@IgstPct"  , tyreSalesMasterModel.IgstPct ),
                                 new SqlParameter("@IgstAmt"  , tyreSalesMasterModel.IgstAmt ),
                                 new SqlParameter("@TotalAmount"  , tyreSalesMasterModel.TotalAmount ),
                                 new SqlParameter("@RoundOff"  , tyreSalesMasterModel.RoundOff ),
                                 new SqlParameter("@NetAmount"  , tyreSalesMasterModel.NetAmount ),
                                 new SqlParameter("@Remarks" , tyreSalesMasterModel.Remarks ),
                                 new SqlParameter("@ApprovedYN"  , tyreSalesMasterModel.ApprovedYN ),
                                 new SqlParameter("@BranchCode"  , tyreSalesMasterModel.BranchCode ),
                                 new SqlParameter("@YearID"  , tyreSalesMasterModel.YearID ),
                                 new SqlParameter("@LoggedInUser"  , tyreSalesMasterModel.LoggedInUser ),
                     };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreSalesMasterSave", param);
                    string MasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tyreSalesMasterModel.TyreSalesDtlList.Count; i++)
                            {
                                tyreSalesMasterModel.TyreSalesDtlList[i].MasterID = MasterID;
                                tyreSalesMasterModel.TyreSalesDtlList[i].TransDate = tyreSalesMasterModel.TransDate;

                                responseModel = await TyreSalesMasterDetailSave(transaction, tyreSalesMasterModel.TyreSalesDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tyreSalesMasterModel.TyreSalesDtlList.Count;
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
        public async Task<ResponseModel> TyreSalesMasterDetailSave(SqlTransaction transaction, TyreSalesDtlListmodel tyreSalesDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                             new SqlParameter("@MasterID", tyreSalesDtlListmodel.MasterID),
                             new SqlParameter("@TransDate", tyreSalesDtlListmodel.TransDate),
                             new SqlParameter("@BrandId", tyreSalesDtlListmodel.BrandId),
                             new SqlParameter("@TyreId", tyreSalesDtlListmodel.TyreId),
                             new SqlParameter("@TyreAmt", tyreSalesDtlListmodel.TyreAmt),
                             new SqlParameter("@Remarks", tyreSalesDtlListmodel.Remarks),
                             new SqlParameter("@BranchCode", tyreSalesDtlListmodel.BranchCode),
                             new SqlParameter("@YearID", tyreSalesDtlListmodel.YearID),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreSalesDetailSave", param);

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
        public async Task<ResponseModel> TyreSalesMasterDelete(RequestModel req)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreSalesMasterDelete", param);

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
        public async Task<List<DropDownListModel>> GetCustomerList()
        {
            List<DropDownListModel> BrandList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCustomerList", param);

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
        public async Task<TyreSalesMasterModel> GetCustomerDetailList(RequestModel req)
        {
            TyreSalesMasterModel tsmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@AccountID", req.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCustomerDetailList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        // tsmodel.AccountID = Convert.ToString(dataSet.Tables[0].Rows[0]["AccountID"]);
                        tsmodel.CustomerName = Convert.ToString(dataSet.Tables[0].Rows[0]["AccountName"]);
                        tsmodel.CustomerAdd = Convert.ToString(dataSet.Tables[0].Rows[0]["AccountAddress1"]);
                        tsmodel.CustomerGstNo = Convert.ToString(dataSet.Tables[0].Rows[0]["AccountGstNo"]);


                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tsmodel;
        }
    }
}
    
