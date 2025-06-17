using Consignment.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public class CciInvoiceMstRepository: ICciInvoiceMstRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public CciInvoiceMstRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        public async Task<CciInvoiceMstList> GetCciInvoiceMstMasterList(ReportRequestModel request)
        {
            CciInvoiceMstList cciInvoiceMstList = new();
            List<CciInvoiceMstModel> invoiceList = new();
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCciInvMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            invoiceList.Add(new CciInvoiceMstModel
                            {
                                CciInvMstId = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvMstId"]),
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                CciInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvNo"]),
                                CciInvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvDate"]),
                                VendorId = Convert.ToString(dataSet.Tables[0].Rows[i]["VendorId"]),
                                DebitAc = Convert.ToString(dataSet.Tables[0].Rows[i]["DebitAc"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                Lr_YN = Convert.ToString(dataSet.Tables[0].Rows[i]["Lr_YN"]),
                                TotalTaxableAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTaxableAmt"]),
                                TotalSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                TotalInvAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalInvAmt"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),

                                // Mtype = Convert.ToString(dataSet.Tables[0].Rows[i]["Mtype"]),
                            });
                        }

                        cciInvoiceMstList.InvoiceList = invoiceList;

                        cciInvoiceMstList.PageMetaData = new PaginationMetaData
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
            return cciInvoiceMstList;
        }
        public async Task<CciInvoiceMstModel> GetCciInvoiceDtlInnerGridList(RequestModel request)
        {
            CciInvoiceMstModel cciInvoiceMstInnerGridList = new()
            {
                CcinvmstDtlList = new List<CciInvoiceDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@CciInvMstId", request.strRequest),
                        };

                    var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCciInvoiceInnerGridList", param);

                    if (resultData != null && resultData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < resultData.Tables[0].Rows.Count; i++)
                        {
                            cciInvoiceMstInnerGridList.CcinvmstDtlList.Add(new CciInvoiceDtlModel
                            {
                                ContainerNo = Convert.ToString(resultData.Tables[0].Rows[i]["ContainerNo"]),
                                GcYear = Convert.ToString(resultData.Tables[0].Rows[i]["GcYear"]),
                                GcBook = Convert.ToString(resultData.Tables[0].Rows[i]["GcBook"]),
                                GcNoteNo = Convert.ToString(resultData.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(resultData.Tables[0].Rows[i]["BookingDate"]),
                                Party = Convert.ToString(resultData.Tables[0].Rows[i]["Party"]),
                                ChCostId = Convert.ToString(resultData.Tables[0].Rows[i]["ChCostId"]),
                                TaxableAmt = Convert.ToString(resultData.Tables[0].Rows[i]["TaxableAmt"]),
                                SgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct = Convert.ToString(resultData.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt = Convert.ToString(resultData.Tables[0].Rows[i]["IgstAmt"]),
                                TotalAmt = Convert.ToString(resultData.Tables[0].Rows[i]["TotalAmt"]),
                                DtlRemarks = Convert.ToString(resultData.Tables[0].Rows[i]["DtlRemarks"]),
                            });
                        }
                    }


                }
            }
            catch (Exception ex)
            {

            }
            return cciInvoiceMstInnerGridList;
        }

        public async Task<List<DropDownListModel>> GetCnDetail(RequestModel request)
        {
            List<DropDownListModel> moduleList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                         {
                            new SqlParameter("@ContainerNo", request.strRequest),
                            new SqlParameter("@InvDate", request.strRequest1),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getContainerCnList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            moduleList.Add(new DropDownListModel
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
            return moduleList;
        }
      
        public async Task<ResponseModel> GetChCostDetail(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChCostId", request.strRequest),
                        };

                   // var resultData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChCostDetails", param);
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getChCostDetails", param);

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
        public async Task<ResponseModel> CciInvoiceMstSave(CciInvoiceMstModel cciInvoiceMstModel)
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
                            new SqlParameter("@CciInvMstId",cciInvoiceMstModel.CciInvMstId ),                                 
                            new SqlParameter("@Branch",cciInvoiceMstModel.Branch ),
                            new SqlParameter("@CciInvNo",cciInvoiceMstModel.CciInvNo ),
                            new SqlParameter("@CciInvDate",cciInvoiceMstModel.CciInvDate ),
                            new SqlParameter("@VendorId",cciInvoiceMstModel.VendorId ),
                            new SqlParameter("@DebitAc",cciInvoiceMstModel.DebitAc ),
                            new SqlParameter("@Remarks",cciInvoiceMstModel.Remarks ),
                            new SqlParameter("@GstType",cciInvoiceMstModel.GstType  ),
                            new SqlParameter("@Lr_YN",cciInvoiceMstModel.Lr_YN),                                 
                            new SqlParameter("@TotalTaxableAmt",cciInvoiceMstModel.TotalTaxableAmt  ),
                            new SqlParameter("@TotalSgstAmt",cciInvoiceMstModel.TotalSgstAmt  ),
                            new SqlParameter("@TotalCgstAmt",cciInvoiceMstModel.TotalCgstAmt  ),
                            new SqlParameter("@TotalIgstAmt",cciInvoiceMstModel.TotalIgstAmt ),
                            new SqlParameter("@TotalInvAmt",cciInvoiceMstModel.TotalInvAmt),
                            new SqlParameter("@YearId",cciInvoiceMstModel.YearId),
                            new SqlParameter("@LoggedInUser",cciInvoiceMstModel.LoggedInUser ),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CciInvMstSave", param);
                    string CciInvMstId = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        CciInvMstId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < cciInvoiceMstModel.CcinvmstDtlList.Count; i++)
                            {
                                cciInvoiceMstModel.CcinvmstDtlList[i].CciInvMstId = CciInvMstId;
                            
                                responseModel = await CciInvoiceDetailSave(transaction, cciInvoiceMstModel.CcinvmstDtlList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = cciInvoiceMstModel.CcinvmstDtlList.Count;
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
        public async Task<ResponseModel> CciInvoiceDetailSave(SqlTransaction transaction, CciInvoiceDtlModel cciInvoiceDtlModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@CciInvMstId",cciInvoiceDtlModel.CciInvMstId ),
                        new SqlParameter("@ContainerNo",cciInvoiceDtlModel.ContainerNo),
                        new SqlParameter("@GcYear",cciInvoiceDtlModel.GcYear ),
                        new SqlParameter("@GcBook ",cciInvoiceDtlModel.GcBook ),
                        new SqlParameter("@GcNoteNo",cciInvoiceDtlModel.GcNoteNo),
                        new SqlParameter("@ChCostId",cciInvoiceDtlModel.ChCostId),
                        new SqlParameter("@TaxableAmt",cciInvoiceDtlModel.TaxableAmt),
                        new SqlParameter("@SgstPct",cciInvoiceDtlModel.SgstPct),
                        new SqlParameter("@SgstAmt",cciInvoiceDtlModel.SgstAmt),
                        new SqlParameter("@CgstPct",cciInvoiceDtlModel.CgstPct),
                        new SqlParameter("@CgstAmt",cciInvoiceDtlModel.CgstAmt),
                        new SqlParameter("@IgstPct",cciInvoiceDtlModel.IgstPct),
                        new SqlParameter("@IgstAmt",cciInvoiceDtlModel.IgstAmt),
                        new SqlParameter("@TotalAmt ",cciInvoiceDtlModel.TotalAmt ),
                        new SqlParameter("@DtlRemarks",cciInvoiceDtlModel.DtlRemarks),
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CciInvDtlSave", param);

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
        public async Task<List<DropDownListModel>> GetChCostList()
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChCostList_Select", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            locationList.Add(new DropDownListModel
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
            return locationList;
        }
        public async Task<ResponseModel> CciInvoiceMstDelete(RequestModel req)
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
                            new SqlParameter("@CciInvMstId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CciInvMstDelete", param);

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
        public async Task<ConsignmentModel> GetLRDetails(RequestModel req)
        {
            ConsignmentModel lrmodel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ConsignmentId", req.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getConsignmentDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        lrmodel.ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[0]["ConsignmentId"]);
                        lrmodel.BookingDate = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingDate"]);
                        lrmodel.BookingPlace = Convert.ToString(dataSet.Tables[0].Rows[0]["BookingPlace"]);
                        lrmodel.GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[0]["GcNoteNo"]);
                        lrmodel.BillingParty = Convert.ToString(dataSet.Tables[0].Rows[0]["BillingParty"]);
                        lrmodel.YearId = Convert.ToString(dataSet.Tables[0].Rows[0]["YearId"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lrmodel;
        }

    }
}
