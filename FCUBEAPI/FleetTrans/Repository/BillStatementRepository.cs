using FleetTrans.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using System.Data;

namespace FleetTrans.Repository
{
    public class BillStatementRepository : IBillStatementRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public BillStatementRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        /// <summary>
        /// Service method for get Bill Statement Search List
        /// </summary>
        /// <returns>BillStatementSearchListModel</returns>
        public async Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request)
        {
            BillStatementSearchListModel billStatementSearchList = new();
            List<BillStatementSearchModel> billStatementSearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@BillingParty",   request.BillingParty),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@FromPlace",      request.FromPlace),
                            new SqlParameter("@ToPlace",        request.ToPlace),
                            new SqlParameter("@CnorPlantCode",  request.CnorPlantCode),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillStatementSearchList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords =0;
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billStatementSearchModels.Add(new BillStatementSearchModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                ProductName = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductName"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                Kms = Convert.ToString(dataSet.Tables[0].Rows[i]["Kms"]),
                                Rate = Convert.ToString(dataSet.Tables[0].Rows[i]["Rate"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Selected = false
                            });
                        }

                        billStatementSearchList.BillStatementSearchList = billStatementSearchModels;
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
            return billStatementSearchList;
        }

        public async Task<BillStatementList> GetBillStatementList(PageFromDtToDtRequest request)
        {
            BillStatementList billStatementList = new();
            List<BillStatementModel> billList = new();
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
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillStatementMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billList.Add(new BillStatementModel
                            {
                                MasterID        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasteriD"]),
                                BillStation     = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStation"]),
                                SeriesCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["SeriesCode"]),
                                Bill_StmtNo     = Convert.ToString(dataSet.Tables[0].Rows[i]["Bill_StmtNo"]),
                                BillDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["BillDate"]),
                                BillStatus      = Convert.ToString(dataSet.Tables[0].Rows[i]["BillStatus"]),
                                BillNo          = Convert.ToString(dataSet.Tables[0].Rows[i]["BillNo"]),
                                PdfUrl          = Convert.ToString(dataSet.Tables[0].Rows[i]["PdfUrl"]),
                                PartyCode       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                FromDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                ToDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                FromPoint       = Convert.ToString(dataSet.Tables[0].Rows[i]["FromPoint"]),
                                ToPoint         = Convert.ToString(dataSet.Tables[0].Rows[i]["ToPoint"]),
                                Findocid        = Convert.ToString(dataSet.Tables[0].Rows[i]["Findocid"]),
                                SuppYN          = Convert.ToString(dataSet.Tables[0].Rows[i]["SuppYN"]),
                                PartyRefNo      = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyRefNo"]),
                                TotFreight      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotFreight"]),
                                TotExtraChrg    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotExtraChrg"]),
                                TotSubTotal     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotSubTotal"]),
                                CreditAc        = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                GstType         = Convert.ToString(dataSet.Tables[0].Rows[i]["GstType"]),
                                SgstPct         = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstPct"]),
                                SgstAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["SgstAmt"]),
                                CgstPct         = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstPct"]),
                                CgstAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["CgstAmt"]),
                                IgstPct         = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstPct"]),
                                IgstAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["IgstAmt"]),
                                TotalBillAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBillAmt"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                FPlace          = Convert.ToString(dataSet.Tables[0].Rows[i]["FPlace"]),
                            });
                        }

                        billStatementList.BillList = billList;

                        billStatementList.PageMetaData = new PaginationMetaData
                        {
                            TotalCount = totalRecords,
                            CurrentPage = request.PageNumber
                        };
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
            return billStatementList;
        }
        public async Task<ResponseModel> BillsStatementDelete(RequestModel req)
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
                            new SqlParameter("@MasterId", req.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillsStatementDelete", param);

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

        public async Task<BillStatementSearchListModel> GetBillStatementInnerGridList(RequestModel request)
        {
            BillStatementSearchListModel billStatementSearchList = new();
            List<BillStatementSearchModel> billStatementSearchModels = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterId", request.strRequest),
                         
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillStatementInnergrid", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            billStatementSearchModels.Add(new BillStatementSearchModel
                            {
                                ConsignmentID = Convert.ToString(dataSet.Tables[0].Rows[i]["ConsignmentID"]),
                                BookedAt = Convert.ToString(dataSet.Tables[0].Rows[i]["BookedAt"]),
                                GcNoteNo = Convert.ToString(dataSet.Tables[0].Rows[i]["GcNoteNo"]),
                                BookingDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BookingDate"]),
                                VehicleNo = Convert.ToString(dataSet.Tables[0].Rows[i]["VehicleNo"]),
                                ProductName = Convert.ToString(dataSet.Tables[0].Rows[i]["ProductName"]),
                                NoPackages = Convert.ToString(dataSet.Tables[0].Rows[i]["NoPackages"]),
                                Kms = Convert.ToString(dataSet.Tables[0].Rows[i]["Kms"]),
                                Rate = Convert.ToString(dataSet.Tables[0].Rows[i]["Rate"]),
                                GtotalRs = Convert.ToString(dataSet.Tables[0].Rows[i]["GtotalRs"]),
                                Selected = true
                            });
                        }
                        billStatementSearchList.BillStatementSearchList = billStatementSearchModels;
                    }
                }                
            }
            catch (Exception ex)
            {
                //Log exception on database
                //ExceptionModel exceptionModel = new()
                //{
                //    ExceptionMessage = Convert.ToString(ex.Message),
                //    ExceptionType = Convert.ToString(ex.GetType().Name),
                //    ExceptionSource = Convert.ToString(ex.StackTrace)
                //};

                //ExceptionRepository exception = new(dbconnection);
                //await exception.SaveExceptionDetails(exceptionModel);
            }
            return billStatementSearchList;
        }

        /// <summary>
        /// Service method for save Bill Statement details
        /// </summary>
        /// <returns>ResponseModel</returns>
        public async Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request)
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
                            new SqlParameter("@MasterID",       request.MasterID),
                            new SqlParameter("@BillStation",    request.BillStation),
                            new SqlParameter("@SeriesCode",     request.SeriesCode),
                            new SqlParameter("@Bill_StmtNo",    request.Bill_StmtNo),
                            new SqlParameter("@BillDate",       request.BillDate),
                            new SqlParameter("@BillStatus",     request.BillStatus),
                            new SqlParameter("@PartyCode",      request.PartyCode),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@FromPoint",      request.FromPoint),
                            new SqlParameter("@ToPoint",        request.ToPoint),
                            new SqlParameter("@SuppYN",         request.SuppYN),
                            new SqlParameter("@PartyRefNo",     request.PartyRefNo),
                            new SqlParameter("@TotFreight",     request.TotFreight),
                            new SqlParameter("@TotExtraChrg",   request.TotExtraChrg),
                            new SqlParameter("@TotSubTotal",    request.TotSubTotal),
                            new SqlParameter("@CreditAc",       request.CreditAc),
                            new SqlParameter("@GstType",        request.GstType ),
                            new SqlParameter("@SgstPct",        request.SgstPct),
                            new SqlParameter("@SgstAmt",        request.SgstAmt),
                            new SqlParameter("@CgstPct",        request.CgstPct),
                            new SqlParameter("@CgstAmt",        request.CgstAmt),
                            new SqlParameter("@IgstPct",        request.IgstPct),
                            new SqlParameter("@IgstAmt",        request.IgstAmt),
                            new SqlParameter("@TotalBillAmt",   request.TotalBillAmt),
                            new SqlParameter("@Remarks",        request.Remarks),
                            new SqlParameter("@YearId",         request.YearId),
                            new SqlParameter("@LoggedInUser",   request.LoggedInUser)     
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillStatementMstSave", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Status"]);

                        // statement list insert
                        if (responseModel.Status)
                        {
                            responseModel.Message ="Bill Statement Saved ";
                            for (int i = 0; i < request.BillStatementListData.Count; i++)
                            {
                                if (request.BillStatementListData[i].Selected)
                                {
                                    SqlParameter[] paramMisc =
                                    {
                                        new SqlParameter("@MasterID", MasterID),
                                        new SqlParameter("@ConsignmentID", request.BillStatementListData[i].ConsignmentID != "" ? request.BillStatementListData[i].ConsignmentID : "0"),
                                        new SqlParameter("@TotalRs", request.BillStatementListData[i].GtotalRs != "" ? request.BillStatementListData[i].GtotalRs : "0")
                                    };
                                    var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_BillStatementDtlsSave", paramMisc);
                                    if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0)
                                    {
                                        responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                        responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                    }

                                    if (!responseModel.Status) { 
                                        transaction.Rollback();
                                        i = request.BillStatementListData.Count;
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
        public async Task<List<DropDownListModel>> GetBillStmtCreditAcList()
        {
            List<DropDownListModel> creditacList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillStmtCreditAcList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            creditacList.Add(new DropDownListModel
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
            return creditacList;
        }
    }
}
