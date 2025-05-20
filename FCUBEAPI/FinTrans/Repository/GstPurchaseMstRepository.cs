
using FinTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using System.Transactions;

namespace FinTrans.Repository
{
    public class GstPurchaseMstRepository : IGstPurchaseMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public GstPurchaseMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

    
        /// <param name="GstPurchaseDtlModel"></param>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> GstPurchaseMstSave(GstPurchaseMstModel gstPurchaseMstModel)
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
                        new SqlParameter("@Masterid",       gstPurchaseMstModel.Masterid),
                        new SqlParameter("@TransDate",      gstPurchaseMstModel.TransDate),
                        new SqlParameter("@BranchCode",     gstPurchaseMstModel.BranchCode),
                        new SqlParameter("@GstType",        gstPurchaseMstModel.GstType),
                        new SqlParameter("@PmtType",        gstPurchaseMstModel.PmtType),
                        new SqlParameter("@NoVender",       gstPurchaseMstModel.NoVender),
                        new SqlParameter("@VendorId",       gstPurchaseMstModel.VendorId),
                        new SqlParameter("@VendorName",     gstPurchaseMstModel.VendorName),
                        new SqlParameter("@VendorAddress",  gstPurchaseMstModel.VendorAddress),
                        new SqlParameter("@VendorState",    gstPurchaseMstModel.VendorState),
                        new SqlParameter("@VendorGST",      gstPurchaseMstModel.VendorGST),
                        new SqlParameter("@VendorInvNo",    gstPurchaseMstModel.VendorInvNo),
                        new SqlParameter("@VendorInvDt",    gstPurchaseMstModel.VendorInvDt),
                        new SqlParameter("@InputEligible",  gstPurchaseMstModel.InputEligible),
                        new SqlParameter("@TotalItemAmt",   gstPurchaseMstModel.TotalItemAmt),
                        new SqlParameter("@TotalSgstAmt",   gstPurchaseMstModel.TotalSgstAmt),
                        new SqlParameter("@TotalCgstAmt",   gstPurchaseMstModel.TotalCgstAmt),
                        new SqlParameter("@TotalIgstAmt",   gstPurchaseMstModel.TotalIgstAmt),
                        new SqlParameter("@TotalAmount",    gstPurchaseMstModel.TotalAmount),
                        new SqlParameter("@TDSAmt",         gstPurchaseMstModel.TDSAmt),
                        new SqlParameter("@TdsAc",          gstPurchaseMstModel.TdsAc),
                        new SqlParameter("@RoundOff",       gstPurchaseMstModel.RoundOff),
                        new SqlParameter("@NetAmount",      gstPurchaseMstModel.NetAmount),
                        new SqlParameter("@CreditAc",       gstPurchaseMstModel.CreditAc),
                        new SqlParameter("@NeftPmt",        gstPurchaseMstModel.NeftPmt),
                        new SqlParameter("@ChequeNo",       gstPurchaseMstModel.ChequeNo),
                        new SqlParameter("@ChequeDate",     gstPurchaseMstModel.ChequeDate),
                        new SqlParameter("@YearId",         gstPurchaseMstModel.YearId),
                        new SqlParameter("@AttatchFile1",   gstPurchaseMstModel.AttatchFile1),
                        new SqlParameter("@AttatchFile2",   gstPurchaseMstModel.AttatchFile2),
                        new SqlParameter("@ModifyRemarks",  gstPurchaseMstModel.ModifyRemarks),
                        new SqlParameter("@LoggedInUser",   gstPurchaseMstModel.LoggedInUser)
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GstPurchaseMstSave", param);
                    string Masterid = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        Masterid = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status = false;
                    }
                    if (responseModel.Status)
                    {
                        var gstPurchase = gstPurchaseMstModel.GstPurchaseDetailsList;

                        for (int i = 0; i < gstPurchase.Count; i++)
                        {

                            SqlParameter[] parameters =
                            {
                                    new SqlParameter("@Masterid",   Masterid.ToString()),
                                    new SqlParameter("@DebitAc",    gstPurchase[i].DebitAc),
                                    new SqlParameter("@Narration",  gstPurchase[i].Narration),
                                    new SqlParameter("@SacHsnCode", gstPurchase[i].SacHsnCode),
                                    new SqlParameter("@SubLedger",  gstPurchase[i].SubLedger),
                                    new SqlParameter("@ItemAmt",    gstPurchase[i].ItemAmt),
                                    new SqlParameter("@SgstPct",    gstPurchase[i].SgstPct),
                                    new SqlParameter("@SgstAmt",    gstPurchase[i].SgstAmt),
                                    new SqlParameter("@CgstPct",    gstPurchase[i].CgstPct),
                                    new SqlParameter("@CgstAmt",    gstPurchase[i].CgstAmt),
                                    new SqlParameter("@IgstPct",    gstPurchase[i].IgstPct),
                                    new SqlParameter("@IgstAmt",    gstPurchase[i].IgstAmt),
                                    new SqlParameter("@TotAmount",  gstPurchase[i].TotAmount),
                                    new SqlParameter("@RefDocNo",   gstPurchase[i].RefDocNo),
                                    new SqlParameter("@Index",      (i + 1).ToString()),

                            };
                            var data = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GstPurchaseDtlsSave", parameters);

                            if (data != null && data.Tables[0].Rows.Count > 0)
                            {
                                responseModel.Status = Convert.ToBoolean(data.Tables[0].Rows[0]["Status"]);
                                responseModel.Message = Convert.ToString(data.Tables[0].Rows[0]["Message"]);
                            }   
                            if (!responseModel.Status) 
                            { 
                                transaction.Rollback();
                                i = gstPurchase.Count;
                            }
                        }
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                    else
                    {
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

        //public async Task<ResponseModel> GstPurchaseDtlSave(SqlTransaction transaction,GstPurchaseDtlModel gstPurchaseDtlModel)
        //{
        //    ResponseModel responseModel = new();
        //    try
        //    {
        //        if (dbconnection != null)
        //        {
        //            SqlParameter[] param =
        //            {
        //                    new SqlParameter("@Masterid",   gstPurchaseDtlModel.Masterid),
        //                    new SqlParameter("@DebitAc",    gstPurchaseDtlModel.DebitAc),
        //                    new SqlParameter("@Narration",  gstPurchaseDtlModel.Narration),
        //                    new SqlParameter("@SacHsnCode", gstPurchaseDtlModel.SacHsnCode),
        //                    new SqlParameter("@SubLedger",  gstPurchaseDtlModel.SubLedger),
        //                    new SqlParameter("@ItemAmt",    gstPurchaseDtlModel.ItemAmt),
        //                    new SqlParameter("@SgstPct",    gstPurchaseDtlModel.SgstPct),
        //                    new SqlParameter("@SgstAmt",    gstPurchaseDtlModel.SgstAmt),
        //                    new SqlParameter("@CgstPct",    gstPurchaseDtlModel.CgstPct),
        //                    new SqlParameter("@CgstAmt",    gstPurchaseDtlModel.CgstAmt),
        //                    new SqlParameter("@IgstPct",    gstPurchaseDtlModel.IgstPct),
        //                    new SqlParameter("@IgstAmt",    gstPurchaseDtlModel.IgstAmt),
        //                    new SqlParameter("@TotAmount",  gstPurchaseDtlModel.TotAmount),
        //                    new SqlParameter("@RefDocNo",   gstPurchaseDtlModel.RefDocNo),

        //            };
        //            var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GstPurchaseDtlsSave", param);

        //            if (statusData != null && statusData.Tables[0].Rows.Count > 0)
        //            {
        //                responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
        //                responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
        //            }
        //            else
        //            {
        //                responseModel.Status = false;
        //            }
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        transaction.Rollback();
        //    }
        //    return responseModel;
        //}

        public async Task<ResponseModel> GstPurchageDelete(RequestModel request)
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
                            new SqlParameter("@Masterid", request.strRequest),
                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_GstPurchaseMstDelete", param);

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
        public async Task<GstPurchaseMstList> GetGstPurchaseList(ReportRequestModel request)
        {
            GstPurchaseMstList gstPurchaseMstList = new();
            List<GstPurchaseMstModel> gstPurchaseList = new();
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
                            new SqlParameter("@FromDate", request.FromDate),
                            new SqlParameter("@ToDate", request.ToDate),
                            new SqlParameter("@LoginBranch", request.FilterStr),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstPurchaseMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gstPurchaseList.Add(new GstPurchaseMstModel
                            {
                                Masterid        = Convert.ToString(dataSet.Tables[0].Rows[i]["Masterid"]),
                                TransDate       = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                BranchName      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchName"]),
                                GstType         = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                PmtType         = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                Findocid        = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                NoVender        = Convert.ToString(dataSet.Tables[0].Rows[i]["NoVender"]),
                                VendorId        = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                VendorName      = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorName"]),
                                VendorAddress   = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorAddress"]),
                                VendorState     = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorState"]),
                                VendorGST       = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorGST"]),
                                VendorInvNo     = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvNo"]),
                                VendorInvDt     = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorInvDt"]),
                                TotalItemAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalItemAmt"]),
                                TotalSgstAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                TotalAmount     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmount"]),
                                TDSAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["TDSAmt"]),
                                TdsAc           = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAc"]),
                                RoundOff        = Convert.ToString(dataSet.Tables[0].Rows[i]["RoundOff"]),
                                NetAmount       = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmount"]),
                                CreditAc        = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                NeftPmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                ChequeNo        = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate      = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                InputEligible   = Convert.ToString(dataSet.Tables[0].Rows[i]["InputEligible"]),
                                AttatchFile1    = Convert.ToString(dataSet.Tables[0].Rows[i]["AttatchFile1"]),
                                AttatchFile2    = Convert.ToString(dataSet.Tables[0].Rows[i]["AttatchFile2"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                            });
                        }

                        gstPurchaseMstList.GstpurchaseList = gstPurchaseList;
                            
                        gstPurchaseMstList.PageMetaData = new PaginationMetaData
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
            return gstPurchaseMstList;
        }

        public async Task<GstPurchaseMstModel> GetGstPurchaseInnerGridList(RequestModel req)
        {
            GstPurchaseMstModel gstPurchaseMst = new()
            {
                GstPurchaseDetailsList  = new List<GstPurchaseDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", req.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstPurchaseInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            gstPurchaseMst.GstPurchaseDetailsList.Add(new GstPurchaseDtlModel
                            {
                                Masterid    = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                DebitAc     = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),
                                Narration   = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                                SubLedger   = Convert.ToString(dataSet.Tables[0].Rows[i]["SubLedger"]),
                                SacHsnCode  = Convert.ToString(dataSet.Tables[0].Rows[i]["SacHsnCode"]),
                                ItemAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["ItemAmt"]),
                                SgstPct     = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct     = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct     = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotAmount   = Convert.ToString(dataSet.Tables[0].Rows[i]["TotAmount"]),
                                RefDocNo    = Convert.ToString(dataSet.Tables[0].Rows[i]["RefDocNo"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return gstPurchaseMst;
        }
        

        public async Task<List<DropDownListModel>> GetGstVendorList()
        {
            List<DropDownListModel> vendorList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstVendorList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            vendorList.Add(new DropDownListModel
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
            return vendorList;
        }

        public async Task<List<DropDownListModel>> GetGstTdsAcList()
        {
            List<DropDownListModel> vendorList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param = { };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getGstTdsAcList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            vendorList.Add(new DropDownListModel
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
            return vendorList;
        }
    }
}
