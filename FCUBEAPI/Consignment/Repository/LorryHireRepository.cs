using Consignment.Models;
using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.VariantTypes;
using System.Data.Common;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace Consignment.Repository
{
    public class LorryHireRepository : ILorryHireRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public LorryHireRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }

        public async Task<LorryHireListModel> GetLorryHirePaymentList(ReportRequestModel request)
        {
            LorryHireListModel lorryHire = new();
            List<LorryHireMasterModel> lorryHireMasters = new();
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
                            new SqlParameter("@LoginBranch",request.FilterStr),
                            new SqlParameter("@YearId",     request.FilterStr1),
                            new SqlParameter("@PmtNo",      request.FilterStr2)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHirePaymentList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHireMasters.Add(new LorryHireMasterModel
                            {

                                MasterId            = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                PmtStation          = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtStation"]),
                                PmtNo               = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtNo"]),
                                PmtDate             = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                PmtType             = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                OnAcBranchYN        = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcBranchYN"]),
                                OnAcBranch          = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcBranch"]),
                                CardId              = Convert.ToString(dataSet.Tables[0].Rows[i]["CardId"]),
                                ChequePayeeName     = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequePayeeName"]),
                                BenId               = Convert.ToString(dataSet.Tables[0].Rows[i]["BenId"]),
                                TotalHireAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHireAmt"]),
                                TotalHamaliAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHamaliAmt"]),
                                TotalDetenAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDetenAmt"]),
                                TotalOtherAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOtherAmt"]),
                                TotalOther2Amt      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOther2Amt"]),
                                TotalOther3Amt      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOther3Amt"]),
                                TotalNetAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetAmt"]),
                                TotalRecoveryAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalRecoveryAmt"]),
                                TotalLhpmAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLhpmAmt"]),
                                TotalOthDedAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthDedAmt"]),
                                TotalOth2DedAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOth2DedAmt"]),
                                TotalTdsAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTdsAmt"]),
                                CreditAc            = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDt            = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                NeftPmt             = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                Remarks             = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                FinDocid            = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocid"]),
                                FinDocidJV          = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocidJV"]),
                                FindocIdOpp         = Convert.ToString(dataSet.Tables[0].Rows[i]["FindocIdOpp"]),
                                ModifyRemarks       = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                PmtStn              = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtStn"]),
                                PmtTp               = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtTp"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                            });
                        }

                        lorryHire.LorryHireList = lorryHireMasters;

                        lorryHire.PageMetaData = new PaginationMetaData
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
            return lorryHire;
        }
        public async Task<LorryHireMasterModel> GetLorryHireInnerGrid(RequestModel request)
        {
            LorryHireMasterModel lorryHire = new()
            {
                LhpmDetails  = new List<LorryHireDetailModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireInnerGrid", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHire.LhpmDetails.Add(new LorryHireDetailModel
                            {
                                MasterId        = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                PmtDate         = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                AbType          = Convert.ToString(dataSet.Tables[0].Rows[i]["ABType"]),
                                ChYear          = Convert.ToString(dataSet.Tables[0].Rows[i]["ChYear"]),
                                ChallanBranch   = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanId       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                BenId           = Convert.ToString(dataSet.Tables[0].Rows[i]["BenId"]),
                                DueAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                HireAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                HamaliAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliAmt"]),
                                DetenAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["DetenAmt"]),
                                OtherAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                Other2Amt       = Convert.ToString(dataSet.Tables[0].Rows[i]["Other2Amt"]),
                                Other3Amt       = Convert.ToString(dataSet.Tables[0].Rows[i]["Other3Amt"]),
                                NetAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                RecoveryAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["RecoveryAmt"]),
                                LhpmAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["LhpmAmt"]),
                                OthDedAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["OthDedAmt"]),
                                Oth2DedAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth2DedAmt"]),
                                TdsAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                TotPaid         = Convert.ToString(dataSet.Tables[0].Rows[i]["TotPaid"]),
                                ExtraRemarks    = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraRemarks"]),
                                DeductRemarks   = Convert.ToString(dataSet.Tables[0].Rows[i]["DeductRemarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lorryHire;
        }
        public async Task<ResponseModel> ChkLHPMBrokerDisputeDetails(ReportRequestModel request)
        {

            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {

                            new SqlParameter("@ChYear",         request.FilterStr1),
                            new SqlParameter("@ChallanBranch",  request.FilterStr2),
                            new SqlParameter("@ChallanNo",      request.FilterStr3),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_ChkLHPMBrokerDisputeDetails", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return responseModel;
        }
        public async Task<LorryHireMasterModel> GetChallanLorryhireDetails(ReportRequestModel request)
        {
            LorryHireMasterModel lorryHire = new()
            {
                LhpmDetails  = new List<LorryHireDetailModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@PmtType",        request.Search),
                            new SqlParameter("@AbType",         request.FilterStr),
                            new SqlParameter("@ChYear",         request.FilterStr1),
                            new SqlParameter("@ChallanBranch",  request.FilterStr2),
                            new SqlParameter("@ChallanNo",      request.FilterStr3),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireChallanDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHire.LhpmDetails.Add(new LorryHireDetailModel
                            {
                                ChYear          = Convert.ToString(dataSet.Tables[0].Rows[i]["ChYear"]),
                                ChallanBranch   = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanId       = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                AbType          = Convert.ToString(dataSet.Tables[0].Rows[i]["AbType"]),
                                DueAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                HireAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                HamaliAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliAmt"]),
                                DetenAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["DetenAmt"]),
                                OtherAmt        = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                Other2Amt       = Convert.ToString(dataSet.Tables[0].Rows[i]["Other2Amt"]),
                                Other3Amt       = Convert.ToString(dataSet.Tables[0].Rows[i]["Other3Amt"]),
                                NetAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                RecoveryAmt     = Convert.ToString(dataSet.Tables[0].Rows[i]["RecoveryAmt"]),
                                LhpmAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["LhpmAmt"]),
                                OthDedAmt       = Convert.ToString(dataSet.Tables[0].Rows[i]["OthDedAmt"]),
                                Oth2DedAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth2DedAmt"]),
                                TdsAmt          = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                ExtraRemarks    = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraRemarks"]),
                                DeductRemarks   = Convert.ToString(dataSet.Tables[0].Rows[i]["DeductRemarks"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lorryHire;
        }
        public async Task<ResponseModel> LorryHireMasterSave(LorryHireMasterModel lorryHire)
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
                            new SqlParameter("@MasterId                            ",          lorryHire.MasterId           ),
                            new SqlParameter("@PmtStation                          ",          lorryHire.PmtStation         ),
                            new SqlParameter("@PmtNo                               ",          lorryHire.PmtNo              ),
                            new SqlParameter("@PmtDate                             ",          lorryHire.PmtDate            ),
                            new SqlParameter("@PmtType                             ",          lorryHire.PmtType            ),
                            new SqlParameter("@OnAcBranchYN                        ",          lorryHire.OnAcBranchYN       ),
                            new SqlParameter("@OnAcBranch                          ",          lorryHire.OnAcBranch         ),
                            new SqlParameter("@CardId                              ",          lorryHire.CardId             ),
                            new SqlParameter("@ChequePayeeName                     ",          lorryHire.ChequePayeeName    ),
                            new SqlParameter("@BenId                               ",          lorryHire.BenId              ),
                            new SqlParameter("@TotalHireAmt                        ",          lorryHire.TotalHireAmt       ),
                            new SqlParameter("@TotalHamaliAmt                      ",          lorryHire.TotalHamaliAmt     ),
                            new SqlParameter("@TotalDetenAmt                       ",          lorryHire.TotalDetenAmt      ),
                            new SqlParameter("@TotalOtherAmt                       ",          lorryHire.TotalOtherAmt      ),
                            new SqlParameter("@TotalOther2Amt                      ",          lorryHire.TotalOther2Amt     ),
                            new SqlParameter("@TotalOther3Amt                      ",          lorryHire.TotalOther3Amt     ),
                            new SqlParameter("@TotalNetAmt                         ",          lorryHire.TotalNetAmt        ),
                            new SqlParameter("@TotalRecoveryAmt                    ",          lorryHire.TotalRecoveryAmt   ),
                            new SqlParameter("@TotalLhpmAmt                        ",          lorryHire.TotalLhpmAmt       ),
                            new SqlParameter("@TotalOthDedAmt                      ",          lorryHire.TotalOthDedAmt     ),
                            new SqlParameter("@TotalOth2DedAmt                     ",          lorryHire.TotalOth2DedAmt    ),
                            new SqlParameter("@TotalTdsAmt                         ",          lorryHire.TotalTdsAmt        ),
                            new SqlParameter("@CreditAc                            ",          lorryHire.CreditAc           ),
                            new SqlParameter("@ChequeNo                            ",          lorryHire.ChequeNo           ),
                            new SqlParameter("@ChequeDt                            ",          lorryHire.ChequeDt           ),
                            new SqlParameter("@NeftPmt                             ",          lorryHire.NeftPmt            ),
                            new SqlParameter("@Remarks                             ",          lorryHire.Remarks            ),
                            new SqlParameter("@YearId                              ",          lorryHire.YearId             ),
                            new SqlParameter("@ModifyRemarks                       ",          lorryHire.ModifyRemarks      ),
                            new SqlParameter("@LoggedInUserID                      ",          lorryHire.LoggedInUserID     ),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireMasterSave", param);
                    var MasterId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        MasterId = responseModel.Message;

                        if (responseModel.Status)
                        {
                            for (int i = 0; i < lorryHire.LhpmDetails.Count; i++)
                            {
                                lorryHire.LhpmDetails[i].MasterId= MasterId.ToString();
                                lorryHire.LhpmDetails[i].PmtDate= lorryHire.PmtDate;
                                responseModel = await lorryHireDtlSave(transaction, lorryHire.LhpmDetails[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = lorryHire.LhpmDetails.Count;
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
        public async Task<ResponseModel> lorryHireDtlSave(SqlTransaction transaction, LorryHireDetailModel lhDetail)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@MasterID",       lhDetail.MasterId),
                            new SqlParameter("@PmtDate",        lhDetail.PmtDate         ),
                            new SqlParameter("@ABType",         lhDetail.AbType          ),
                            new SqlParameter("@ChYear",         lhDetail.ChYear          ),
                            new SqlParameter("@ChallanBranch",  lhDetail.ChallanBranch   ),
                            new SqlParameter("@ChallanNo",      lhDetail.ChallanNo       ),
                            new SqlParameter("@ChallanId",      lhDetail.ChallanId       ),
                            new SqlParameter("@HireAmt",        lhDetail.HireAmt         ),
                            new SqlParameter("@HamaliAmt",      lhDetail.HamaliAmt       ),
                            new SqlParameter("@DetenAmt",       lhDetail.DetenAmt        ),
                            new SqlParameter("@OtherAmt",       lhDetail.OtherAmt        ),
                            new SqlParameter("@Other2Amt",      lhDetail.Other2Amt       ),
                            new SqlParameter("@Other3Amt",      lhDetail.Other3Amt       ),
                            new SqlParameter("@NetAmt",         lhDetail.NetAmt          ),
                            new SqlParameter("@RecoveryAmt",    lhDetail.RecoveryAmt     ),
                            new SqlParameter("@LhpmAmt",        lhDetail.LhpmAmt         ),
                            new SqlParameter("@OthDedAmt",      lhDetail.OthDedAmt       ),
                            new SqlParameter("@Oth2DedAmt",     lhDetail.Oth2DedAmt      ),
                            new SqlParameter("@TdsAmt",         lhDetail.TdsAmt          ),
                            new SqlParameter("@ExtraRemarks",   lhDetail.ExtraRemarks    ),
                            new SqlParameter("@DeductRemarks",  lhDetail.DeductRemarks   ),
                            new SqlParameter("@BenId",          lhDetail.BenId   ),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireDetailSave", param);

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
        public async Task<ResponseModel> LorryHireMasterDelete(RequestModel requestModel)
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
                            new SqlParameter("@MasterId", requestModel.strRequest),
                            new SqlParameter("@LoggedInUser", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireMasterDelete", param);

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
        public async Task<ResponseModel> GetLorryHirePmtNo(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@Branch", requestModel.strRequest),
                            new SqlParameter("@Year", requestModel.strRequest1),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHirePmtNo", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> CheckChallanNoExists(RequestModel requestModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@ChallanNo", requestModel.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_CheckChallanNoExists", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);

                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
        public async Task<ResponseModel> GetLorryHirePrintPdf(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                string baseUrl = dbconnection.Value.apiPath + "api/LH/";

                string UrlParam = "?MasterId=" + request.strRequest;
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                HttpResponseMessage response = client.GetAsync(UrlParam).Result;

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    dynamic data = JsonConvert.DeserializeObject(result);
                    if (data!="500")
                    {
                        responseModel.Status = true;
                        responseModel.Message = data;
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = data;
                    }


                    client.Dispose();
                }
            }
            catch (Exception ex)
            {
                responseModel.Status = false;
                responseModel.Message = "Error Fetching Report";
            }
            return responseModel;
        }

    }

}

