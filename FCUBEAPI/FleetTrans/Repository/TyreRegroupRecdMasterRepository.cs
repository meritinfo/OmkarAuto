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
    public class TyreRegroupRecdMasterRepository: ITyreRegroupRecdMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public TyreRegroupRecdMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<TyreRegroupRecdMasterList> GetTyreRegroupRecdMasterList(PageFromDtToDtRequest request)
        {
            TyreRegroupRecdMasterList tyreRegroupRecdList = new();
            List<TyreRegroupRecdMasterModel> tyreRegroupMasterList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreRegroupRecdMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            tyreRegroupMasterList.Add(new TyreRegroupRecdMasterModel
                            {
                                RegroupRecdMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["RegroupRecdMasterID"]),
                                RecdDate = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdDate"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                VendorName= Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorBillNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorBillNo"]),
                                VendorBillDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorBillDt"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                TotalAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmt"]),
                                SgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                SubTotal = Convert.ToString(dataSet.Tables[0].Rows[i]["SubTotal"]),
                                RoundOffAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOffAmt"]),
                                NetBillAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NetBillAmt"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                FinDocID = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocID"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                AttatchFile = Convert.ToString(dataSet.Tables[0].Rows[i]["AttatchFile"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                            });
                        }

                        tyreRegroupRecdList.TyreRegroupRecdList = tyreRegroupMasterList;

                        tyreRegroupRecdList.PageMetaData = new PaginationMetaData
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
            return tyreRegroupRecdList;
        }
        public async Task<TyreRegroupRecdMasterModel> GetTyreRegroupRecdMasterInnerGridList(RequestModel request)
        {
            TyreRegroupRecdMasterModel tyreRegroupRecdMasterInnerGridModel = new()
            {
                TyreRegroupRecdDtlList = new List<TyreRegroupRecdDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RegroupRecdMasterID", request.strRequest),

                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreRegroupIssueMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreRegroupRecdMasterInnerGridModel.TyreRegroupRecdDtlList.Add(new TyreRegroupRecdDtlListmodel
                            {
                                RegroupRecdMasterID = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupRecdMasterID"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                TyreId = Convert.ToString(resultData.Tables[0].Rows[i]["TyreId"]),
                                RegroupDoneYN = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupDoneYN"]),
                                RegroupAmount = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupAmount"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                                RegroupIssueDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupIssueDtlId"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tyreRegroupRecdMasterInnerGridModel;
        }
        public async Task<TyreRegroupRecdMasterModel> GetTyreRegroupRecdMasterSearchList(RequestModel request)
        {
            TyreRegroupRecdMasterModel tyreRegroupRecdMasterInnerGridModel = new()
            {
                TyreRegroupRecdDtlList = new List<TyreRegroupRecdDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@VendorId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getTyreRegroupIssueSearchList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            tyreRegroupRecdMasterInnerGridModel.TyreRegroupRecdDtlList.Add(new TyreRegroupRecdDtlListmodel
                            {
                                RegroupIssueDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["RegroupIssDetailID"]),
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
            return tyreRegroupRecdMasterInnerGridModel;
        }      

        public async Task<ResponseModel> TyreRegroupRecdMasterSave(TyreRegroupRecdMasterModel tyreRegroupRecdMasterModel)
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
                            new SqlParameter("@RegroupRecdMasterID",       tyreRegroupRecdMasterModel.RegroupRecdMasterID ),
                            new SqlParameter("@VendorId",      tyreRegroupRecdMasterModel.VendorId ),
                            new SqlParameter("@RecdDate",      tyreRegroupRecdMasterModel.RecdDate ),
                            new SqlParameter("@VendorBillNo",   tyreRegroupRecdMasterModel.VendorBillNo),
                            new SqlParameter("@VendorBillDt",   tyreRegroupRecdMasterModel.VendorBillDt),
                            new SqlParameter("@Remarks",   tyreRegroupRecdMasterModel.Remarks),
                            new SqlParameter("@TotalAmt",   tyreRegroupRecdMasterModel.TotalAmt),
                            new SqlParameter("@SgstPct",   tyreRegroupRecdMasterModel.SgstPct),
                            new SqlParameter("@SgstAmt",   tyreRegroupRecdMasterModel.SgstAmt),
                            new SqlParameter("@CgstPct",   tyreRegroupRecdMasterModel.CgstPct),
                            new SqlParameter("@CgstAmt",   tyreRegroupRecdMasterModel.CgstAmt),
                            new SqlParameter("@IgstPct",   tyreRegroupRecdMasterModel.IgstPct),
                            new SqlParameter("@IgstAmt",   tyreRegroupRecdMasterModel.IgstAmt),
                            new SqlParameter("@OtherAmt",   tyreRegroupRecdMasterModel.OtherAmt),
                            new SqlParameter("@SubTotal",   tyreRegroupRecdMasterModel.SubTotal),
                            new SqlParameter("@RoundOffAmt",   tyreRegroupRecdMasterModel.RoundOffAmt),
                            new SqlParameter("@NetBillAmt",   tyreRegroupRecdMasterModel.RoundOffAmt),
                            new SqlParameter("@PmtType",   tyreRegroupRecdMasterModel.PmtType),
                            new SqlParameter("@ChequeNo",   tyreRegroupRecdMasterModel.ChequeNo),
                            new SqlParameter("@ChequeDt",   tyreRegroupRecdMasterModel.ChequeDt),
                            new SqlParameter("@CreditAc",   tyreRegroupRecdMasterModel.CreditAc),
                            new SqlParameter("@AttatchFile",   tyreRegroupRecdMasterModel.AttatchFile),
                            new SqlParameter("@BranchCode",   tyreRegroupRecdMasterModel.BranchCode),
                            new SqlParameter("@YearID",   tyreRegroupRecdMasterModel.YearID),
                            new SqlParameter("@LoggedInUser",   tyreRegroupRecdMasterModel.LoggedInUser)
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreRegroupIssueMasterSave", param);
                    string RegroupRecdMasterID = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        RegroupRecdMasterID = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < tyreRegroupRecdMasterModel.TyreRegroupRecdDtlList.Count; i++)
                            {
                                tyreRegroupRecdMasterModel.TyreRegroupRecdDtlList[i].RegroupRecdMasterID = RegroupRecdMasterID;
                                
                                responseModel = await TyreRegroupRecdMasterDetailSave(transaction, tyreRegroupRecdMasterModel.TyreRegroupRecdDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = tyreRegroupRecdMasterModel.TyreRegroupRecdDtlList.Count;
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
        public async Task<ResponseModel> TyreRegroupRecdMasterDetailSave(SqlTransaction transaction, TyreRegroupRecdDtlListmodel tyreRegroupRecdDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@RegroupRecdMasterID",    tyreRegroupRecdDtlListmodel.RegroupRecdMasterID),
                            new SqlParameter("@BrandId",                tyreRegroupRecdDtlListmodel.BrandId),
                            new SqlParameter("@BrandId",                tyreRegroupRecdDtlListmodel.BrandId),
                            new SqlParameter("@TyreId",                 tyreRegroupRecdDtlListmodel.TyreId),
                            new SqlParameter("@RegroupDoneYN",          tyreRegroupRecdDtlListmodel.RegroupDoneYN),
                            new SqlParameter("@RegroupAmount",          tyreRegroupRecdDtlListmodel.RegroupAmount),
                            new SqlParameter("@Remarks",                tyreRegroupRecdDtlListmodel.Remarks),
                            new SqlParameter("@RegroupIssueDtlId",      tyreRegroupRecdDtlListmodel.RegroupIssueDtlId),

                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreRegroupRecdDetailSave", param);

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
        public async Task<ResponseModel> TyreRegroupRecdMasterDelete(RequestModel req)
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
                            new SqlParameter("@RegroupRecdMasterID", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_TyreRegroupRecdMasterDelete", param);

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
