using DocumentFormat.OpenXml.Office2016.Excel;
using DocumentFormat.OpenXml.VariantTypes;
using DocumentFormat.OpenXml.Wordprocessing;
using FreightMasters.Models;
using Microsoft.Extensions.Options;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public class AddCostRecRepository: IAddCostRecRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public AddCostRecRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<AddCostRecListModel> GetAddCostRecMstList(ReportRequestModel request)
        {
            AddCostRecListModel addCostRecorvery = new();

            List<AddCostRecMstModel> addCostRecorveryList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                            new SqlParameter("@Branch",         request.FilterStr),
                            new SqlParameter("@AddCostType",    request.FilterStr1)

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecEntryList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            addCostRecorveryList.Add(new AddCostRecMstModel
                            {
                                MasterID            = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                BranchCode          = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                TransNo             = Convert.ToString(dataSet.Tables[0].Rows[i]["TransNo"]),
                                TransDate           = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                AddCostID           = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostID"]),
                                AddCostDescription  = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostDescription"]),
                                AddCostType         = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostType"]),
                                ManualOrDateRange   = Convert.ToString(dataSet.Tables[0].Rows[i]["ManualOrDateRange"]),
                                DocumentType        = Convert.ToString(dataSet.Tables[0].Rows[i]["DocumentType"]),
                                DocBranch           = Convert.ToString(dataSet.Tables[0].Rows[i]["DocBranch"]),
                                FromDate            = Convert.ToString(dataSet.Tables[0].Rows[i]["FromDate"]),
                                ToDate              = Convert.ToString(dataSet.Tables[0].Rows[i]["ToDate"]),
                                TotalAmount         = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmount"]),
                                DivisionOption      = Convert.ToString(dataSet.Tables[0].Rows[i]["DivisionOption"]),
                                PartyOption         = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyOption"]),
                                PartyCode           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                CostTot             = Convert.ToString(dataSet.Tables[0].Rows[i]["CostTot"]),
                                OthTot              = Convert.ToString(dataSet.Tables[0].Rows[i]["OthTot"]),
                                GrossTot            = Convert.ToString(dataSet.Tables[0].Rows[i]["GrossTot"]),
                                TdsRate             = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsRate"]),
                                TdsAmt              = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                NetTot              = Convert.ToString(dataSet.Tables[0].Rows[i]["NetTot"]),
                                Remarks             = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                OthDbCrAc           = Convert.ToString(dataSet.Tables[0].Rows[i]["OthDbCrAc"]),
                                TdsAc               = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAc"]),
                                ApprovedYN          = Convert.ToString(dataSet.Tables[0].Rows[i]["ApprovedYN"]),
                                RpType              = Convert.ToString(dataSet.Tables[0].Rows[i]["RpType"]),
                                NeftPmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                ChequeNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDate          = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDate"]),
                                FinDocID            = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocID"]),
                                FinDocIdJV          = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocIdJV"]),
                                BeneficiaryId       = Convert.ToString(dataSet.Tables[0].Rows[i]["BeneficiaryId"]),
                                AttatchFile1        = Convert.ToString(dataSet.Tables[0].Rows[i]["AttatchFile1"]),
                                AttatchFile2        = Convert.ToString(dataSet.Tables[0].Rows[i]["AttatchFile2"]),
                                ModifyRemarks       = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                Branch              = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                AddCostTp           = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostTp"]),
                            });
                        }

                        addCostRecorvery.AddCostRecMstList = addCostRecorveryList;

                        addCostRecorvery.PageMetaData = new PaginationMetaData
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
            return addCostRecorvery;
        }
        public async Task<AddCostRecMstModel> GetAddCostRecInnerGridList(RequestModel request)
        {
            AddCostRecMstModel addCostRecMst = new();
            List<AddCostRecDtlModel> addCostRecDtlList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterID", request.strRequest)
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBillsInnerGrid", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            addCostRecDtlList.Add(new AddCostRecDtlModel
                            {
                                MasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                AddCostID = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostID"]),
                                DocumentType = Convert.ToString(dataSet.Tables[0].Rows[i]["DocumentType"]),
                                DocYear = Convert.ToString(dataSet.Tables[0].Rows[i]["DocYear"]),
                                DocBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["DocBranch"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                DocId = Convert.ToString(dataSet.Tables[0].Rows[i]["DocId"]),
                                CostCode = Convert.ToString(dataSet.Tables[0].Rows[i]["CostCode"]),
                                CostAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["CostAmt"]),
                                OthAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OthAmt"]),
                                TotAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotAmt"]),
                                Narration = Convert.ToString(dataSet.Tables[0].Rows[i]["Narration"]),
                            });
                        }

                        addCostRecMst.AddCostRecDtlList = addCostRecDtlList;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return addCostRecMst;
        }
        public async Task<ResponseModel> AddCostRecSave(AddCostRecMstModel addCostRec)
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
                            new SqlParameter("@MasterID         ", addCostRec.MasterID         ),
                            new SqlParameter("@BranchCode       ", addCostRec.BranchCode       ),
                            new SqlParameter("@TransNo          ", addCostRec.TransNo          ),
                            new SqlParameter("@TransDate        ", addCostRec.TransDate        ),
                            new SqlParameter("@AddCostID        ", addCostRec.AddCostID        ),
                            new SqlParameter("@AddCostType      ", addCostRec.AddCostType      ),
                            new SqlParameter("@ManualOrDateRange", addCostRec.ManualOrDateRange),
                            new SqlParameter("@DocumentType     ", addCostRec.DocumentType     ),
                            new SqlParameter("@DocBranch        ", addCostRec.DocBranch        ),
                            new SqlParameter("@FromDate         ", addCostRec.FromDate         ),
                            new SqlParameter("@ToDate           ", addCostRec.ToDate           ),
                            new SqlParameter("@TotalAmount      ", addCostRec.TotalAmount      ),
                            new SqlParameter("@DivisionOption   ", addCostRec.DivisionOption   ),
                            new SqlParameter("@PartyOption      ", addCostRec.PartyOption      ),
                            new SqlParameter("@PartyCode        ", addCostRec.PartyCode        ),
                            new SqlParameter("@CostTot          ", addCostRec.CostTot          ),
                            new SqlParameter("@OthTot           ", addCostRec.OthTot           ),
                            new SqlParameter("@GrossTot         ", addCostRec.GrossTot         ),
                            new SqlParameter("@TdsRate          ", addCostRec.TdsRate          ),
                            new SqlParameter("@TdsAmt           ", addCostRec.TdsAmt           ),
                            new SqlParameter("@NetTot           ", addCostRec.NetTot           ),
                            new SqlParameter("@Remarks          ", addCostRec.Remarks          ),
                            new SqlParameter("@OthDbCrAc        ", addCostRec.OthDbCrAc        ),
                            new SqlParameter("@TdsAc            ", addCostRec.TdsAc            ),
                            new SqlParameter("@RpType           ", addCostRec.RpType           ),
                            new SqlParameter("@NeftPmt          ", addCostRec.NeftPmt          ),
                            new SqlParameter("@ChequeNo         ", addCostRec.ChequeNo         ),
                            new SqlParameter("@ChequeDate       ", addCostRec.ChequeDate       ),
                            new SqlParameter("@AttatchFile1     ", addCostRec.AttatchFile1     ),
                            new SqlParameter("@AttatchFile2     ", addCostRec.AttatchFile2     ),
                            new SqlParameter("@ModifyRemarks    ", addCostRec.ModifyRemarks    ),
                            new SqlParameter("@YearID           ", addCostRec.YearId),
                            new SqlParameter("@LoggedInUser     ", addCostRec.LoggedInUser)
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_AddCostRecEntryMstSave", param);

                    string MasterID = "";
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        MasterID = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < addCostRec.AddCostRecDtlList.Count; i++)
                            {
                               SqlParameter[] paramMisc =
                               {
                                   new SqlParameter("@MasterID"     , MasterID),
                                   new SqlParameter("@AddCostID"    , addCostRec.AddCostRecDtlList[i].AddCostID),
                                   new SqlParameter("@DocumentType" , addCostRec.AddCostRecDtlList[i].DocumentType),
                                   new SqlParameter("@DocYear"      , addCostRec.AddCostRecDtlList[i].DocYear),
                                   new SqlParameter("@DocBranch"    , addCostRec.AddCostRecDtlList[i].DocBranch),
                                   new SqlParameter("@DocNo"        , addCostRec.AddCostRecDtlList[i].DocNo),
                                   new SqlParameter("@DocId"        , addCostRec.AddCostRecDtlList[i].DocId),
                                   new SqlParameter("@CostCode"     , addCostRec.AddCostRecDtlList[i].CostCode),
                                   new SqlParameter("@CostAmt"      , addCostRec.AddCostRecDtlList[i].CostAmt),
                                   new SqlParameter("@OthAmt"       , addCostRec.AddCostRecDtlList[i].OthAmt),
                                   new SqlParameter("@TotAmt"       , addCostRec.AddCostRecDtlList[i].TotAmt),
                                   new SqlParameter("@Narration"    , addCostRec.AddCostRecDtlList[i].Narration),
                               };
                               var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_AddCostRecEntryDtlsSave", paramMisc);
                               if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0)
                               {
                                   responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                                   responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                                   if (!responseModel.Status)
                                   {
                                       i = addCostRec.AddCostRecDtlList.Count;
                                       transaction.Rollback();
                                   }
                               }
                               else
                               {
                                   i = addCostRec.AddCostRecDtlList.Count;
                                   transaction.Rollback();
                               }
                            }
                        }
                        else
                        {
                            transaction.Rollback();
                        }
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                    }
                    else
                    {
                        transaction.Rollback();
                        responseModel.Status = false;
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> AddCostRecDelete(RequestModel request)
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
                            new SqlParameter("@MasterId", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_AddCostRecEntryDelete", param);

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
        public async Task<ResponseModel> GetAddCostRecEntryTranNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@YearID", requestModel.strRequest1),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecEntryTranNo", param);

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
                responseModel.Status = false;
                responseModel.Message = ex.Message;
            }
            return responseModel;
        }
        public async Task<AddCostRecMstModel> GetAddCostRecEntryDocDetails(ReportRequestModel request)
        {

            AddCostRecMstModel addCostRecMst = new();
            List<AddCostRecDtlModel> addCostRecDtlList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@DocumentType",  request.FilterStr),
                            new SqlParameter("@DocYear",       request.FilterStr1),
                            new SqlParameter("@DocBranch",     request.FilterStr2),
                            new SqlParameter("@DocNo",         request.FilterStr3),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecEntryDocDetails", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            addCostRecDtlList.Add(new AddCostRecDtlModel
                            {
                                DocId = Convert.ToString(dataSet.Tables[0].Rows[i]["DocId"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                            });
                        }

                        addCostRecMst.AddCostRecDtlList = addCostRecDtlList;
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return addCostRecMst;
        }
        public async Task<AddCostRecMstModel> GetAddCostRecEntrySearchList(ReportRequestModel request)
        {

            AddCostRecMstModel addCostRecMst = new();
            List<AddCostRecDtlModel> addCostRecDtlList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@DocumentType",   request.FilterStr),
                            new SqlParameter("@DocBranch",      request.FilterStr1),
                            new SqlParameter("@FromDate",       request.FromDate),
                            new SqlParameter("@ToDate",         request.ToDate),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecEntrySearchList", param);
                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            addCostRecDtlList.Add(new AddCostRecDtlModel
                            {
                                DocId = Convert.ToString(dataSet.Tables[0].Rows[i]["DocId"]),
                                DocNo = Convert.ToString(dataSet.Tables[0].Rows[i]["DocNo"]),
                                DocBranch= Convert.ToString(dataSet.Tables[0].Rows[i]["DocBranch"]),
                                DocYear= Convert.ToString(dataSet.Tables[0].Rows[i]["DocYear"]),
                                FreightRs = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightRs"]),
                                Chargewt = Convert.ToString(dataSet.Tables[0].Rows[i]["Chargewt"]),
                            });
                        }

                        addCostRecMst.AddCostRecDtlList = addCostRecDtlList;
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return addCostRecMst;
        }
        public async Task<List<DropDownListModel>> GetAddCostRecList()
        {
            List<DropDownListModel> addCostRecList = new();
            try
            {
                if (dbconnection != null)
                {
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecList", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            addCostRecList.Add(new DropDownListModel
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
            return addCostRecList;
        }
        public async Task<List<DropDownListModel>> GetcostCodeList(RequestModel requestModel)
        {
            List<DropDownListModel> costCodeList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@AddCostID", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getCostCodeList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            costCodeList.Add(new DropDownListModel
                            {
                                DataId = Convert.ToString(statusData.Tables[0].Rows[i]["DataId"]),
                                DataName = Convert.ToString(statusData.Tables[0].Rows[i]["DataName"]),
                            });
                        }
                    }
                    else
                    {
                        costCodeList.Add(new DropDownListModel
                        {
                            DataId = "NA",
                            DataName = "NA",
                        });
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return costCodeList;
        }
        public async Task<AddCostRecorveryRptListModel> GetAddCostRecorveryRptList(ReportRequestModel request)
        {
            AddCostRecorveryRptListModel addCostRecorveryRpt = new();

            List<AddCostRecorveryRptModel> addCostRecorveryRptList = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PageNumber",     request.PageNumber),
                            new SqlParameter("@PageSize",       request.PageSize),
                            new SqlParameter("@SortColumn",     request.SortColumn),
                            new SqlParameter("@SortOrder",      request.SortOrder),
                            new SqlParameter("@Search",         request.Search),
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@AddCostType",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),


                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecorveryRptList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            addCostRecorveryRptList.Add(new AddCostRecorveryRptModel
                            {
                                Branch = Convert.ToString(dataSet.Tables[0].Rows[i]["Branch"]),
                                TransNo = Convert.ToString(dataSet.Tables[0].Rows[i]["TransNo"]),
                                TransDate = Convert.ToString(dataSet.Tables[0].Rows[i]["TransDate"]),
                                AddCostDescription = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostDescription"]),
                                AddCostType = Convert.ToString(dataSet.Tables[0].Rows[i]["AddCostType"]),
                                Amount = Convert.ToString(dataSet.Tables[0].Rows[i]["Amount"]),
                                OthTot = Convert.ToString(dataSet.Tables[0].Rows[i]["OthTot"]),
                                NetTot = Convert.ToString(dataSet.Tables[0].Rows[i]["NetTot"]),
                            

                            });
                        }

                        addCostRecorveryRpt.AddCostRecorveryRptList = addCostRecorveryRptList;

                        addCostRecorveryRpt.PageMetaData = new PaginationMetaData
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
            return addCostRecorveryRpt;
        }
        public async Task<ResponseModel> GetAddCostRecorveryRptExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@FromDate",   request.FromDate),
                            new SqlParameter("@ToDate",     request.ToDate),
                            new SqlParameter("@Branch",     request.FilterStr),
                            new SqlParameter("@AddCostType",     request.FilterStr1),
                            new SqlParameter("@RptType",     request.FilterStr2),

                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getAddCostRecorveryRptExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Addtional Cost/Rec Report", filter);
                    }
                    else
                    {
                        response.Status = false;
                        response.Message = "No Data Found";
                    }
                }
            }
            catch (Exception ex)
            {
                response.Status = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
