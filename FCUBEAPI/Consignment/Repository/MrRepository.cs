using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using Shared.Repository;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Newtonsoft.Json;
using System;
using System.Data;
using DocumentFormat.OpenXml.Office2016.Excel;
using System.Transactions;
using System.Net.Http;
using DocumentFormat.OpenXml.Office.CustomUI;
using Newtonsoft.Json.Linq;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.VariantTypes;
using System.Net.NetworkInformation;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Consignment.Repository
{
    public class MrRepository : IMrRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private ISharedRepository sharedRepository;

        public MrRepository(IOptions<DBModel> _dbconnection, 
            ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }
        public async Task<MrListModel> GetMrMstList(PageFromDtToDtRequest request)
        {
            MrListModel mrListModel = new();
            List<MrModel> mrlist = new();
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
                        new SqlParameter("@LoginBranch",     request.strRequest),
                    };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMrMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            mrlist.Add(new MrModel
                            {
                                MrMasterId          = Convert.ToString(dataSet.Tables[0].Rows[i]["MrMasterId"]),
                                MrStation           = Convert.ToString(dataSet.Tables[0].Rows[i]["MrStation"]),
                                MrStn               = Convert.ToString(dataSet.Tables[0].Rows[i]["MrStn"]),
                                MrNo                = Convert.ToString(dataSet.Tables[0].Rows[i]["MrNo"]),
                                MrDate              = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),
                                MrStatus            = Convert.ToString(dataSet.Tables[0].Rows[i]["MrStatus"]),
                                MrReceiptType       = Convert.ToString(dataSet.Tables[0].Rows[i]["MrReceiptType"]),
                                MrType              = Convert.ToString(dataSet.Tables[0].Rows[i]["MrType"]),
                                BillLrOthType       = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrOthType"]),
                                GroupMrYN           = Convert.ToString(dataSet.Tables[0].Rows[i]["GroupMrYN"]),
                                PartyGroupId        = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyGroupId"]),
                                PartyCode           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                PartyName           = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyName"]),
                                CheqCashAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["CheqCashAmt"]),
                                OnAcAdjAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjAmt"]),
                                TotalAmt            = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalAmt"]),
                                OnAcNewAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcNewAmt"]),
                                OnAcAdjusted        = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjusted"]),
                                OnAcStatus          = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcStatus"]),
                                OnAcAdjMrYn         = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAdjMrYn"]),
                                TotalRecdAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalRecdAmt"]),
                                TotalFreightDed     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalFreightDed"]),
                                TotalClaimsDed      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalClaimsDed"]),
                                TotalOldFrtDed      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOldFrtDed"]),
                                TotalOldClaims      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOldClaims"]),
                                TotalOthersDed      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthersDed"]),
                                TotalBankChrgDed    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalBankChrgDed"]),
                                TotalOthersDed1     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthersDed1"]),
                                TotalOthersDed2     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthersDed2"]),
                                TotalOthersDed3     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthersDed3"]),
                                TotalRecoverable    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalRecoverable"]),
                                TotalDed            = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDed"]),
                                TotalTDSDed         = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTDSDed"]),
                                TotalSdEmdDed       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalSdEmdDed"]),
                                TotalExcess         = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalExcess"]),
                                TotalOthers1        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthers1"]),
                                TotalOthers2        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthers2"]),
                                MrRemarks           = Convert.ToString(dataSet.Tables[0].Rows[i]["MrRemarks"]),
                                CrAdviceNo          = Convert.ToString(dataSet.Tables[0].Rows[i]["CrAdviceNo"]),
                                ChequeReturn        = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeReturn"]),
                                ChequeReturnDt      = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeReturnDt"]),
                                ChequeReturnRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeReturnRemarks"]),
                                Ftmid               = Convert.ToString(dataSet.Tables[0].Rows[i]["Ftmid"]),
                                FtmidJv             = Convert.ToString(dataSet.Tables[0].Rows[i]["FtmidJv"]),
                                NeftYN              = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftYN"]),
                                MrDebitAc           = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDebitAc"]),
                                MrSdEmdAc           = Convert.ToString(dataSet.Tables[0].Rows[i]["MrSdEmdAc"]),
                                SdEmdRefNo          = Convert.ToString(dataSet.Tables[0].Rows[i]["SdEmdRefNo"]),
                                PartyBankDet        = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyBankDet"]),
                                ChequeNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                ModifyRemarks       = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                            });
                        }

                        mrListModel.MrList = mrlist;

                        mrListModel.PageMetaData = new PaginationMetaData
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
            return mrListModel;
        }

        public async Task<ResponseModel> GetMrNo()
        {
            ResponseModel response = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_GetMrNo", null);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                       response.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                       response.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return response;
        }


        public async Task<List<DropDownListModel>> GetPartyGroupList()
        {
            List<DropDownListModel> locationList = new();
            try
            {
                if (dbconnection != null)
                {


                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getPartyGroupList", null);

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

        public async Task<MrModel> GetOnAcMrSearchList(DropDownListModel request)
        {
            MrModel mr = new()
            {
                MrOnAcList  = new List<MrOnAcModel>(),

            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Group", request.DataName),
                            new SqlParameter("@Party", request.DataId)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMROnActSearchList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            mr.MrOnAcList.Add(new MrOnAcModel
                            {
                                AdjMrMasterID = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjMrMasterID"]),
                                AdjMrYear = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjMrYear"]),
                                AdjMrStn = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjMrStn"]),
                                AdjMrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjMrNo"]),
                                MrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["MrDate"]),
                                OnAcAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return mr;
        }

        public async Task<MrModel> GetBillLRSearchDtls(ReportRequestModel request)
        {
            MrModel mr = new()
            {
                MrDtlsList  = new List<MrDtlsModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Group",         request.Search),
                            new SqlParameter("@BillNo",        request.FilterStr),
                            new SqlParameter("@PartyCode",     request.FilterStr1),
                            new SqlParameter("@BillStation",   request.FilterStr2),
                            new SqlParameter("@YearID",        request.FilterStr3),
                            new SqlParameter("@SType",         request.SortColumn),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMrBillLRSearchDtls", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            mr.MrDtlsList.Add(new MrDtlsModel
                            {
                                BillLrMasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrMasterId"]),
                                BillLrYear = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrYear"]),
                                BillLrStn = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrStn"]),
                                BillLrNo = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrNo"]),
                                BillLrDate = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrDate"]),
                                PartyCode = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                DueAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                OldDueAmt = "0",
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return mr;
        }

        public async Task<MrModel> GetMrInnerGridList(RequestModel request)
        {
            MrModel mr = new()
            {
                MrDtlsList  = new List<MrDtlsModel>(),
                MrOnAcList  = new List<MrOnAcModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MrMasterId", request.strRequest),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getMrInnerGridList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            mr.MrDtlsList.Add(new MrDtlsModel
                            {
                                BillLrMasterId  = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrMasterId"]),
                                BillLrYear      = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrYear"]),
                                BillLrStn       = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrStn"]),
                                BillLrNo        = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrNo"]),
                                BillLrDate      = Convert.ToString(dataSet.Tables[0].Rows[i]["BillLrDate"]),
                                PartyCode       = Convert.ToString(dataSet.Tables[0].Rows[i]["PartyCode"]),
                                DueAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                OldDueAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["OldDueAmt"]),
                                RecdAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["RecdAmt"]),
                                FreightDed      = Convert.ToString(dataSet.Tables[0].Rows[i]["FreightDed"]),
                                ClaimsDed       = Convert.ToString(dataSet.Tables[0].Rows[i]["ClaimsDed"]),
                                OthersDed       = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersDed"]),
                                BankChrgDed     = Convert.ToString(dataSet.Tables[0].Rows[i]["BankChrgDed"]),
                                OthersDed1      = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersDed1"]),
                                OthersDed2      = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersDed2"]),
                                OthersDed3      = Convert.ToString(dataSet.Tables[0].Rows[i]["OthersDed3"]),
                                Recoverable     = Convert.ToString(dataSet.Tables[0].Rows[i]["Recoverable"]),
                                TotDed          = Convert.ToString(dataSet.Tables[0].Rows[i]["TotDed"]),
                                TdsDed          = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsDed"]),
                                SdEmdDed        = Convert.ToString(dataSet.Tables[0].Rows[i]["SdEmdDed"]),
                                ExcessRecd      = Convert.ToString(dataSet.Tables[0].Rows[i]["ExcessRecd"]),
                                Others1Recd     = Convert.ToString(dataSet.Tables[0].Rows[i]["Others1Recd"]),
                                Others2Recd     = Convert.ToString(dataSet.Tables[0].Rows[i]["Others2Recd"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }
                    }

                    if (dataSet != null && dataSet.Tables[1].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[1].Rows.Count; i++)
                        {
                            mr.MrOnAcList.Add(new MrOnAcModel
                            {
                                AdjMrMasterID   = Convert.ToString(dataSet.Tables[1].Rows[i]["AdjMrMasterID"]),
                                AdjMrYear       = Convert.ToString(dataSet.Tables[1].Rows[i]["AdjMrYear"]),
                                AdjMrStn        = Convert.ToString(dataSet.Tables[1].Rows[i]["AdjMrStn"]),
                                AdjMrNo         = Convert.ToString(dataSet.Tables[1].Rows[i]["AdjMrNo"]),
                                MrDate          = Convert.ToString(dataSet.Tables[1].Rows[i]["MrDate"]),
                                OnAcAmt         = Convert.ToString(dataSet.Tables[1].Rows[i]["OnAcAmt"]),
                                AdjAmt          = Convert.ToString(dataSet.Tables[1].Rows[i]["AdjAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return mr;
        }
        public async Task<ResponseModel> MrMstDelete(RequestModel request)
        {
            ResponseModel response = new ResponseModel();

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
                            new SqlParameter("@MrMasterId", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MrMstDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        response.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        response.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (response.Status) { transaction.Commit(); }
                        else { transaction.Rollback(); }
                    }
                    else
                    {
                        response.Status = false;
                        transaction.Rollback();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return response;
        }

        public async Task<ResponseModel> MrMstSave(MrModel mr)
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
                        new SqlParameter("@MrMasterId",         mr.MrMasterId),
                        new SqlParameter("@MrStation",          mr.MrStation),
                        new SqlParameter("@MrNo",               mr.MrNo),
                        new SqlParameter("@MrDate",             mr.MrDate),
                        new SqlParameter("@MrStatus",           mr.MrStatus ),
                        new SqlParameter("@MrReceiptType",      mr.MrReceiptType ),
                        new SqlParameter("@NeftYN",             mr.NeftYN ),
                        new SqlParameter("@MrType",             mr.MrType),
                        new SqlParameter("@BillLrOthType",      mr.BillLrOthType),
                        new SqlParameter("@GroupMrYN",          mr.GroupMrYN),
                        new SqlParameter("@PartyGroupId",       mr.PartyGroupId),
                        new SqlParameter("@PartyCode",          mr.PartyCode),
                        new SqlParameter("@CheqCashAmt",        mr.CheqCashAmt),
                        new SqlParameter("@OnAcAdjAmt",         mr.OnAcAdjAmt ),
                        new SqlParameter("@TotalAmt",           mr.TotalAmt),
                        new SqlParameter("@OnAcNewAmt",         mr.OnAcNewAmt ),
                        new SqlParameter("@OnAcAdjusted",       mr.OnAcAdjusted ),
                        new SqlParameter("@OnAcStatus",         mr.OnAcStatus),
                        new SqlParameter("@OnAcAdjMrYn",        mr.OnAcAdjMrYn),
                        new SqlParameter("@TotalRecdAmt",       mr.TotalRecdAmt ),
                        new SqlParameter("@TotalFreightDed",    mr.TotalFreightDed ),
                        new SqlParameter("@TotalClaimsDed",     mr.TotalClaimsDed),
                        new SqlParameter("@TotalOldFrtDed",     mr.TotalOldFrtDed ),
                        new SqlParameter("@TotalOldClaims",     mr.TotalOldClaims ),
                        new SqlParameter("@TotalOthersDed",     mr.TotalOthersDed ),
                        new SqlParameter("@TotalBankChrgDed",   mr.TotalBankChrgDed),
                        new SqlParameter("@TotalOthersDed1",    mr.TotalOthersDed1 ),
                        new SqlParameter("@TotalOthersDed2",    mr.TotalOthersDed2 ),
                        new SqlParameter("@TotalOthersDed3",    mr.TotalOthersDed3 ),
                        new SqlParameter("@TotalRecoverable",   mr.TotalRecoverable),
                        new SqlParameter("@TotalDed",           mr.TotalDed ),
                        new SqlParameter("@TotalTDSDed",        mr.TotalTDSDed ),
                        new SqlParameter("@TotalSdEmdDed",      mr.TotalSdEmdDed ),
                        new SqlParameter("@TotalExcess",        mr.TotalExcess ),
                        new SqlParameter("@TotalOthers1",       mr.TotalOthers1 ),
                        new SqlParameter("@TotalOthers2",       mr.TotalOthers2),
                        new SqlParameter("@MrRemarks",          mr.MrRemarks ),
                        new SqlParameter("@MrDebitAc",          mr.MrDebitAc),
                        new SqlParameter("@MrSdEmdAc",          mr.MrSdEmdAc ),
                        new SqlParameter("@SdEmdRefNo",         mr.SdEmdRefNo ),
                        new SqlParameter("@PartyBankDet",       mr.PartyBankDet),
                        new SqlParameter("@ChequeNo",           mr.ChequeNo ),
                        new SqlParameter("@ChequeDt",           mr.ChequeDt ),
                        new SqlParameter("@ModifyRemarks",      mr.ModifyRemarks),
                        new SqlParameter("@YearId",             mr.YearId),
                        new SqlParameter("@LoggedInUser",       mr.LoggedInUser),

                    };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MrMstSave", param);
                    string MasterID = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterID = Convert.ToString(responseModel.Message);
                    }
                    else
                    {
                        responseModel.Status = false;
                        transaction.Rollback();
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < mr.MrOnAcList.Count; i++)
                        {
                            mr.MrOnAcList[i].MrMasterId = MasterID;
                            mr.MrOnAcList[i].MrDate     = mr.MrDate;
                            mr.MrOnAcList[i].MrStation  = mr.MrStation;
                            mr.MrOnAcList[i].MrNo       = mr.MrNo;
                            mr.MrOnAcList[i].YearId     = mr.YearId;

                            responseModel = await MROnAcSave(transaction, mr.MrOnAcList[i]);

                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = mr.MrOnAcList.Count;
                            }
                        }

                        for (int i = 0; i < mr.MrDtlsList.Count; i++)
                        {
                            mr.MrDtlsList[i].MrMasterId = MasterID;
                            mr.MrDtlsList[i].MrDate     = mr.MrDate;
                            mr.MrDtlsList[i].MrStation  = mr.MrStation;
                            mr.MrDtlsList[i].MrNo       = mr.MrNo;
                            mr.MrDtlsList[i].YearId     = mr.YearId;

                            responseModel = await MRDtlsSave(transaction, mr.MrDtlsList[i]);

                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = mr.MrDtlsList.Count;
                            }
                        }

                        //var groupedPartyList = mr.MrDtlsList.
                        //            Select(m => new {m.PartyCode })
                        //            .Distinct().ToList();
                        
                        //List<MrFinTransModel> mrfin = new();

                        //for (int j = 0; j < groupedPartyList.Count; j++)
                        //{
                        //    mrfin.Add(new MrFinTransModel
                        //    {
                        //        MrMasterId = MasterID,
                        //        MrDate     = mr.MrDate,
                        //        MrStation  = mr.MrStation,
                        //        MrNo       = mr.MrNo,
                        //        YearID     = mr.YearId,
                        //        PartyCode  = groupedPartyList[j].PartyCode
                        //    });                            
                        //}
                        //for (int j = 0; j < mrfin.Count; j++)
                        //{                           
                        //    for (int i = 0; i < mr.MrDtlsList.Count; i++)
                        //    {
                        //        if (mrfin[j].PartyCode == mr.MrDtlsList[i].PartyCode)
                        //        {
                        //            mrfin[j].RecdAmt = (Convert.ToDecimal(mrfin[j].RecdAmt==""?"0": mrfin[j].RecdAmt) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].RecdAmt=="" ? "0" : mr.MrDtlsList[i].RecdAmt)).ToString();
                        //            mrfin[j].FreightDed = (Convert.ToDecimal(mrfin[j].FreightDed=="" ? "0" : mrfin[j].FreightDed) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].FreightDed=="" ? "0" : mr.MrDtlsList[i].FreightDed)).ToString();
                        //            mrfin[j].ClaimsDed = (Convert.ToDecimal(mrfin[j].ClaimsDed=="" ? "0" : mrfin[j].ClaimsDed) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].ClaimsDed=="" ? "0" : mr.MrDtlsList[i].ClaimsDed)).ToString();
                        //            mrfin[j].OthersDed = (Convert.ToDecimal(mrfin[j].OthersDed=="" ? "0" : mrfin[j].OthersDed) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].OthersDed=="" ? "0" : mr.MrDtlsList[i].OthersDed)).ToString();
                        //            mrfin[j].BankChrgDed = (Convert.ToDecimal(mrfin[j].BankChrgDed=="" ? "0" : mrfin[j].BankChrgDed) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].BankChrgDed=="" ? "0" : mr.MrDtlsList[i].BankChrgDed)).ToString();
                        //            mrfin[j].OthersDed1 = (Convert.ToDecimal(mrfin[j].OthersDed1=="" ? "0" : mrfin[j].OthersDed1) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].OthersDed1=="" ? "0" : mr.MrDtlsList[i].OthersDed1)).ToString();
                        //            mrfin[j].OthersDed2 = (Convert.ToDecimal(mrfin[j].OthersDed2=="" ? "0" : mrfin[j].OthersDed2) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].OthersDed2=="" ? "0" : mr.MrDtlsList[i].OthersDed2)).ToString();
                        //            mrfin[j].OthersDed3 = (Convert.ToDecimal(mrfin[j].OthersDed3=="" ? "0" : mrfin[j].OthersDed3) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].OthersDed3=="" ? "0" : mr.MrDtlsList[i].OthersDed3)).ToString();
                        //            mrfin[j].Recoverable = (Convert.ToDecimal(mrfin[j].Recoverable=="" ? "0" : mrfin[j].Recoverable) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].Recoverable=="" ? "0" : mr.MrDtlsList[i].Recoverable)).ToString();
                        //            mrfin[j].TdsDed = (Convert.ToDecimal(mrfin[j].TdsDed=="" ? "0" : mrfin[j].TdsDed) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].TdsDed=="" ? "0" : mr.MrDtlsList[i].TdsDed)).ToString();
                        //            mrfin[j].SdEmdDed = (Convert.ToDecimal(mrfin[j].SdEmdDed=="" ? "0" : mrfin[j].SdEmdDed) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].SdEmdDed=="" ? "0" : mr.MrDtlsList[i].SdEmdDed)).ToString();
                        //            mrfin[j].ExcessRecd = (Convert.ToDecimal(mrfin[j].ExcessRecd=="" ? "0" : mrfin[j].ExcessRecd) +
                        //                            Convert.ToDecimal(mr.MrDtlsList[i].ExcessRecd=="" ? "0" : mr.MrDtlsList[i].ExcessRecd)).ToString();

                        //        }
                        //    }
                        //}

                        //for (int j = 0; j < mrfin.Count; j++)
                        //{
                        //    responseModel = await MRFinTransSave(transaction, mrfin[j]);

                        //    if (!responseModel.Status)
                        //    {
                        //        transaction.Rollback();
                        //        j = mrfin.Count;
                        //    }

                        //}
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit(); 
                        responseModel.Message = "MR Saved Successfully";
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
        public async Task<ResponseModel> MROnAcSave(SqlTransaction transaction, MrOnAcModel onac)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MrMasterId",         onac.MrMasterId),
                            new SqlParameter("@MrStation",          onac.MrStation),
                            new SqlParameter("@MrNo",               onac.MrNo),
                            new SqlParameter("@MrDate",             onac.MrDate),
                            new SqlParameter("@PartyCode",          onac.PartyCode),
                            new SqlParameter("@AdjMrMasterID",      onac.AdjMrMasterID),
                            new SqlParameter("@AdjMrYear",          onac.AdjMrYear),
                            new SqlParameter("@AdjMrStn",           onac.AdjMrStn),
                            new SqlParameter("@AdjMrNo",            onac.AdjMrNo),
                            new SqlParameter("@AdjAmt",             onac.AdjAmt),
                            new SqlParameter("@YearId",             onac.YearId),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MROnAcSave", param);

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
        public async Task<ResponseModel> MRDtlsSave(SqlTransaction transaction, MrDtlsModel mrdtls)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MrMasterId",     mrdtls.MrMasterId      ),
                            new SqlParameter("@MrStation",      mrdtls.MrStation       ),
                            new SqlParameter("@MrNo",           mrdtls.MrNo            ),
                            new SqlParameter("@MrDate",         mrdtls.MrDate          ),
                            new SqlParameter("@PartyCode",      mrdtls.PartyCode       ),
                            new SqlParameter("@BillLrYear",     mrdtls.BillLrYear      ),
                            new SqlParameter("@BillLrStn",      mrdtls.BillLrStn       ),
                            new SqlParameter("@BillLrNo",       mrdtls.BillLrNo        ),
                            new SqlParameter("@BillLrMasterId", mrdtls.BillLrMasterId  ),
                            new SqlParameter("@RecdAmt",        mrdtls.RecdAmt         ),
                            new SqlParameter("@FreightDed",     mrdtls.FreightDed      ),
                            new SqlParameter("@ClaimsDed",      mrdtls.ClaimsDed       ),
                            new SqlParameter("@OthersDed",      mrdtls.OthersDed       ),
                            new SqlParameter("@BankChrgDed",    mrdtls.BankChrgDed     ),
                            new SqlParameter("@OthersDed1",     mrdtls.OthersDed1      ),
                            new SqlParameter("@OthersDed2",     mrdtls.OthersDed2      ),
                            new SqlParameter("@OthersDed3",     mrdtls.OthersDed3      ),
                            new SqlParameter("@Recoverable",    mrdtls.Recoverable     ),
                            new SqlParameter("@TotDed",         mrdtls.TotDed          ),
                            new SqlParameter("@TdsDed",         mrdtls.TdsDed          ),
                            new SqlParameter("@SdEmdDed",       mrdtls.SdEmdDed        ),
                            new SqlParameter("@ExcessRecd",     mrdtls.ExcessRecd      ),
                            new SqlParameter("@Others1Recd",    mrdtls.Others1Recd     ),
                            new SqlParameter("@Others2Recd",    mrdtls.Others2Recd     ),
                            new SqlParameter("@Remarks",        mrdtls.Remarks         ),
                            new SqlParameter("@YearId",         mrdtls.YearId          ), 
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MRDtlsSave", param);

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
        public async Task<ResponseModel> MRFinTransSave(SqlTransaction transaction, MrFinTransModel mrFin)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MrMasterId",     mrFin.MrMasterId      ),
                            new SqlParameter("@MrStation",      mrFin.MrStation       ),
                            new SqlParameter("@MrNo",           mrFin.MrNo            ),
                            new SqlParameter("@MrDate",         mrFin.MrDate          ),
                            new SqlParameter("@PartyCode",      mrFin.PartyCode       ),
                            new SqlParameter("@RecdAmt",        mrFin.RecdAmt         ),
                            new SqlParameter("@FreightDed",     mrFin.FreightDed      ),
                            new SqlParameter("@ClaimsDed",      mrFin.ClaimsDed       ),
                            new SqlParameter("@OthersDed",      mrFin.OthersDed       ),
                            new SqlParameter("@BankChrgDed",    mrFin.BankChrgDed     ),
                            new SqlParameter("@OthersDed1",     mrFin.OthersDed1      ),
                            new SqlParameter("@OthersDed2",     mrFin.OthersDed2      ),
                            new SqlParameter("@OthersDed3",     mrFin.OthersDed3      ),
                            new SqlParameter("@Recoverable",    mrFin.Recoverable     ),
                            new SqlParameter("@TdsDed",         mrFin.TdsDed          ),
                            new SqlParameter("@SdEmdDed",       mrFin.SdEmdDed        ),
                            new SqlParameter("@ExcessRecd",     mrFin.ExcessRecd      ),
                            new SqlParameter("@YearID",         mrFin.YearID          ),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_MRFinTransSave", param);

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
    }
}
