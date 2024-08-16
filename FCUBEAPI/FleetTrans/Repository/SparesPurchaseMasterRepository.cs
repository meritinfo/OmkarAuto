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
    public class SparesPurchaseMasterRepository: ISparesPurchaseMasterRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public SparesPurchaseMasterRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<SparesPurchaseMasterList> GetSparesPurchaseMasterList(PageFromDtToDtRequest request)
        {
            SparesPurchaseMasterList sparesPurchaseMasterList = new();
            List<SparesPurchaseMasterModel> purchaseList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesPurchaseMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            purchaseList.Add(new SparesPurchaseMasterModel
                            {
                                SpTransId = Convert.ToString(dataSet.Tables[0].Rows[i]["SpTransId"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                NonVendor = Convert.ToString(dataSet.Tables[0].Rows[i]["NonVendor"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                VendorInvDt = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                VendorInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorName = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorAddress = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorAddress"]),
                                VendorState = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorState"]),
                                VendorGstNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGstNo"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                TotItemAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotItemAmount"]),
                                TotSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotSgstAmt"]),
                                TotCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotCgstAmt"]),
                                TotIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotIgstAmt"]),
                                TotItemNetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["TotItemNetAmount"]),
                                OtherAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmount"]),
                                RoundOff = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                LinkFtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkFtmId"]),
                                LinkJVFtmId = Convert.ToString(dataSet.Tables[0].Rows[i]["LinkJVFtmId"]),
                                AuditedYN = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditedYN"]),
                                AuditDate = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditDate"]),
                                AuditedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["AuditedBy"]),
                                RefDocAttachedImage = Convert.ToString(dataSet.Tables[0].Rows[i]["RefDocAttachedImage"]),
                                BranchCode = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                YearID = Convert.ToString(dataSet.Tables[0].Rows[i]["YearID"]),
                                //LoggedInUser = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                            });
                        }

                        sparesPurchaseMasterList.PurchaseList = purchaseList;

                        sparesPurchaseMasterList.PageMetaData = new PaginationMetaData
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
            return sparesPurchaseMasterList;
        }
        public async Task<List<DropDownListModel>> GetSparesList()
        {
            List<DropDownListModel> SparesList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            SparesList.Add(new DropDownListModel
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
            return SparesList;
        }
        public async Task<SparesPurchaseMasterModel> GetSparesPurchaseMasterInnerGridList(RequestModel request)
        {
            SparesPurchaseMasterModel sparesPurchaseMasterInnerGridList = new()
            {
                SparesPurchaseDtlList = new List<SparesPurchaseDtlListmodel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SpTransId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getSparesPurchaseMasterInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            sparesPurchaseMasterInnerGridList.SparesPurchaseDtlList.Add(new SparesPurchaseDtlListmodel
                            {
                              //  SpTransDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["SpTransDtlId"]),
                                SpTransId = Convert.ToString(resultData.Tables[0].Rows[i]["SpTransId"]),
                                TransDate = Convert.ToString(resultData.Tables[0].Rows[i]["TransDate"]),
                                SpareLubId = Convert.ToString(resultData.Tables[0].Rows[i]["SpareLubId"]),
                                BrandId = Convert.ToString(resultData.Tables[0].Rows[i]["BrandId"]),
                                ItemQty = Convert.ToString(resultData.Tables[0].Rows[i]["ItemQty"]),
                                ItemRate = Convert.ToString(resultData.Tables[0].Rows[i]["ItemRate"]),
                                ItemAmount = Convert.ToString(resultData.Tables[0].Rows[i]["ItemAmount"]),
                                SgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["SgstPct"]),
                                CgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["IgstAmt"]),
                                NetAmount = Convert.ToString(resultData.Tables[0].Rows[i]["NetAmount"]),
                                Remarks = Convert.ToString(resultData.Tables[0].Rows[i]["Remarks"]),
                            });
                        }
                    }


                }
            }
            catch (Exception ex)
            {

            }
            return sparesPurchaseMasterInnerGridList;
        }
        public async Task<ResponseModel> SparesPurchaseMasterSave(SparesPurchaseMasterModel sparesPurchaseMasterModel)
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
                                 new SqlParameter( "@SpTransId", sparesPurchaseMasterModel.SpTransId ),
                                 new SqlParameter( "@TransDate", sparesPurchaseMasterModel.TransDate ),
                                 new SqlParameter( "@NonVendor", sparesPurchaseMasterModel.NonVendor ),
                                 new SqlParameter( "@VendorId", sparesPurchaseMasterModel.VendorId ),
                                 new SqlParameter( "@VendorInvDt", sparesPurchaseMasterModel.VendorInvDt ),
                                 new SqlParameter( "@VendorInvNo", sparesPurchaseMasterModel.VendorInvNo ),
                                 new SqlParameter( "@VendorName", sparesPurchaseMasterModel.VendorName ),
                                 new SqlParameter( "@VendorAddress", sparesPurchaseMasterModel.VendorAddress ),
                                 new SqlParameter( "@VendorState", sparesPurchaseMasterModel.VendorState ),
                                 new SqlParameter( "@VendorGstNo", sparesPurchaseMasterModel.VendorGstNo ),
                                 new SqlParameter( "@GstType", sparesPurchaseMasterModel.GstType ),
                                 new SqlParameter( "@TotItemAmount", sparesPurchaseMasterModel.TotItemAmount ),
                                 new SqlParameter( "@TotSgstAmt", sparesPurchaseMasterModel.TotSgstAmt ),
                                 new SqlParameter( "@TotCgstAmt", sparesPurchaseMasterModel.TotCgstAmt ),
                                 new SqlParameter( "@TotIgstAmt", sparesPurchaseMasterModel.TotIgstAmt ),
                                 new SqlParameter( "@TotItemNetAmount", sparesPurchaseMasterModel.TotItemNetAmount ),
                                 new SqlParameter( "@OtherAmount", sparesPurchaseMasterModel.OtherAmount ),
                                 new SqlParameter( "@RoundOff", sparesPurchaseMasterModel.RoundOff ),
                                 new SqlParameter( "@NetAmount", sparesPurchaseMasterModel.NetAmount ),
                                 new SqlParameter( "@Remarks", sparesPurchaseMasterModel.Remarks ),
                                 new SqlParameter( "@PmtType", sparesPurchaseMasterModel.PmtType ),
                                 new SqlParameter( "@CreditAc", sparesPurchaseMasterModel.CreditAc ),
                                 new SqlParameter( "@ChequeDate", sparesPurchaseMasterModel.ChequeDate ),
                                 new SqlParameter( "@LinkFtmId", sparesPurchaseMasterModel.LinkFtmId ),
                                 new SqlParameter( "@LinkJVFtmId", sparesPurchaseMasterModel.LinkJVFtmId ),
                                 new SqlParameter( "@AuditedYN", sparesPurchaseMasterModel.AuditedYN ),
                                 new SqlParameter( "@AuditDate", sparesPurchaseMasterModel.AuditDate ),
                                 new SqlParameter( "@AuditedBy", sparesPurchaseMasterModel.AuditedBy ),
                                 new SqlParameter( "@RefDocAttachedImage", sparesPurchaseMasterModel.RefDocAttachedImage ),
                                 new SqlParameter( "@BranchCode", sparesPurchaseMasterModel.BranchCode ),
                                 new SqlParameter( "@YearID", sparesPurchaseMasterModel.YearID ),
                                 new SqlParameter( "@LoggedInUser", sparesPurchaseMasterModel.LoggedInUser ),
                     };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesPurchaseMasterSave", param);
                    string SpTransId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        SpTransId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < sparesPurchaseMasterModel.SparesPurchaseDtlList.Count; i++)
                            {
                                sparesPurchaseMasterModel.SparesPurchaseDtlList[i].SpTransId = SpTransId;
                                sparesPurchaseMasterModel.SparesPurchaseDtlList[i].TransDate = sparesPurchaseMasterModel.TransDate;

                                responseModel = await SparesPurchaseMasterDetailSave(transaction, sparesPurchaseMasterModel.SparesPurchaseDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = sparesPurchaseMasterModel.SparesPurchaseDtlList.Count;
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
        public async Task<ResponseModel> SparesPurchaseMasterDetailSave(SqlTransaction transaction, SparesPurchaseDtlListmodel sparesPurchaseDtlListmodel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@SpTransDtlId ",sparesPurchaseDtlListmodel.SpTransDtlId ),
                             new SqlParameter("@SpTransId ",sparesPurchaseDtlListmodel.SpTransId ),
                             new SqlParameter("@TransDate ",sparesPurchaseDtlListmodel.TransDate ),
                             new SqlParameter("@SpareLubId ",sparesPurchaseDtlListmodel.SpareLubId ),
                             new SqlParameter("@BrandId ",sparesPurchaseDtlListmodel.BrandId ),
                             new SqlParameter("@ItemQty ",sparesPurchaseDtlListmodel.ItemQty ),
                             new SqlParameter("@ItemRate ",sparesPurchaseDtlListmodel.ItemRate ),
                             new SqlParameter("@ItemAmount ",sparesPurchaseDtlListmodel.ItemAmount ),
                             new SqlParameter("@SgstPct ",sparesPurchaseDtlListmodel.SgstPct ),
                             new SqlParameter("@CgstPct ",sparesPurchaseDtlListmodel.CgstPct ),
                             new SqlParameter("@CgstAmt ",sparesPurchaseDtlListmodel.CgstAmt ),
                             new SqlParameter("@IgstPct ",sparesPurchaseDtlListmodel.IgstPct ),
                             new SqlParameter("@IgstAmt ",sparesPurchaseDtlListmodel.IgstAmt ),
                             new SqlParameter("@NetAmount ",sparesPurchaseDtlListmodel.NetAmount ),
                             new SqlParameter("@Remarks ",sparesPurchaseDtlListmodel.Remarks ),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesPurchaseMasterDetailSave", param);

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
        public async Task<ResponseModel> SparesPurchaseMasterDelete(RequestModel req)
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
                            new SqlParameter("@SpTransId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_SparesPurchaseMasterDelete", param);

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
