using Consignment.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
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
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getVehicleRepMaintMasterList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            invoiceList.Add(new CciInvoiceMstModel
                            {
                                CciInvMstId = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvMstId"]),
                                CciInvNo = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvNo"]),
                                CciInvDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CciInvDate"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                GstType = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                TotalTaxableAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTaxableAmt"]),
                                TotalSgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSgstAmt"]),
                                TotalCgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalCgstAmt"]),
                                TotalIgstAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalIgstAmt"]),
                                TotalInvAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalInvAmt"]),
                                YearId = Convert.ToString(dataSet.Tables[0].Rows[i]["YearId"]),
                           
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
                CciInvoiceDetails = new List<CciInvoiceDtlModel>(),
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
                            cciInvoiceMstInnerGridList.CciInvoiceDetails.Add(new CciInvoiceDtlModel
                            {
                                CciInvDtlId = Convert.ToString(resultData.Tables[0].Rows[i]["CciInvDtlId"]),
                                CciInvMstId = Convert.ToString(resultData.Tables[0].Rows[i]["CciInvMstId"]),
                                ContainerNo = Convert.ToString(resultData.Tables[0].Rows[i]["ContainerNo"]),
                                GcYear = Convert.ToString(resultData.Tables[0].Rows[i]["GcYear"]),
                                GcBook = Convert.ToString(resultData.Tables[0].Rows[i]["GcBook"]),
                                GcNoteNo = Convert.ToString(resultData.Tables[0].Rows[i]["GcNoteNo"]),
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
                                 new SqlParameter("@CciInvNo",cciInvoiceMstModel.CciInvNo ),
                                 new SqlParameter("@CciInvDate",cciInvoiceMstModel.CciInvDate ),
                                 new SqlParameter("@Remarks",cciInvoiceMstModel.Remarks ),
                                 new SqlParameter("@GstType",cciInvoiceMstModel.GstType  ),
                                 new SqlParameter("@TotalTaxableAmt",cciInvoiceMstModel.TotalTaxableAmt  ),
                                 new SqlParameter("@TotalSgstAmt",cciInvoiceMstModel.TotalSgstAmt  ),
                                 new SqlParameter("@TotalCgstAmt ",cciInvoiceMstModel.TotalCgstAmt  ),
                                 new SqlParameter("@TotalIgstAmt ",cciInvoiceMstModel.TotalIgstAmt ),
                                 new SqlParameter("@TotalInvAmt",cciInvoiceMstModel.TotalInvAmt),
                                 new SqlParameter("@LoggedInUser",cciInvoiceMstModel.LoggedInUser ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CciInvoiceMstSave", param);
                    string CciInvMstId = "0";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        CciInvMstId = Convert.ToString(responseModel.Message);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < cciInvoiceMstModel.CciInvoiceDetails.Count; i++)
                            {
                                cciInvoiceMstModel.CciInvoiceDetails[i].CciInvMstId = CciInvMstId;
                              //  cciInvoiceMstModel.CciInvoiceDetails[i].TransDate = vehicleRepMaintMasterModel.TransDate;

                                responseModel = await CciInvoiceDetailSave(transaction, cciInvoiceMstModel.CciInvoiceDetails[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = cciInvoiceMstModel.CciInvoiceDetails.Count;
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
                             new SqlParameter("@CciInvDtlId",cciInvoiceDtlModel.CciInvDtlId ),
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

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_CciInvoiceDtllSave", param);

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

    }
}
