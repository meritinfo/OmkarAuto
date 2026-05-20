using Consignment.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Shared.Models;
using Shared.Repository;
using SqlHelper.Models;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public class LorryHireLLPRepository : ILorryHireLLPRepository
    {
        private readonly IOptions<DBModel> dbconnection;
        private readonly ISharedRepository sharedRepository;

        public LorryHireLLPRepository(IOptions<DBModel> _dbconnection, ISharedRepository _sharedRepository)
        {
            dbconnection = _dbconnection;
            sharedRepository = _sharedRepository;
        }

        public async Task<LorryHireListLLPModel> GetLorryHirePaymentListLLP(ReportRequestModel request)
        {
            LorryHireListLLPModel lorryHire = new();
            List<LorryHireMasterLLPModel> lorryHireMasters = new();
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
                            new SqlParameter("@PmtNo",      request.FilterStr2),
                            new SqlParameter("@BrokerId",      request.FilterStr3)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHirePaymentListLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHireMasters.Add(new LorryHireMasterLLPModel
                            {

                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                PmtStation = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtStation"]),
                                PmtNo = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtNo"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                PmtType = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtType"]),
                                OnAcBranchYN = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcBranchYN"]),
                                OnAcBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["OnAcBranch"]),
                                CardId = Convert.ToString(dataSet.Tables[0].Rows[i]["CardId"]),
                                ChequePayeeName = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequePayeeName"]),
                                BenId = Convert.ToString(dataSet.Tables[0].Rows[i]["BenId"]),
                                TotalHireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHireAmt"]),
                                TotalHamaliAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalHamaliAmt"]),
                                TotalDetenAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDetenAmt"]),
                                TotalOtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOtherAmt"]),
                                TotalOther2Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOther2Amt"]),
                                TotalOther3Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOther3Amt"]),
                                TotalNetAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalNetAmt"]),
                                TotalRecoveryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalRecoveryAmt"]),
                                TotalLhpmAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLhpmAmt"]),
                                TotalOthDedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOthDedAmt"]),
                                TotalOth2DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalOth2DedAmt"]),
                                TotalTdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalTdsAmt"]),
                                CreditAc = Convert.ToString(dataSet.Tables[0].Rows[i]["CreditAc"]),
                                ChequeNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeNo"]),
                                ChequeDt = Convert.ToString(dataSet.Tables[0].Rows[i]["ChequeDt"]),
                                NeftPmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NeftPmt"]),
                                Remarks = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                FinDocid = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocid"]),
                                FinDocidJV = Convert.ToString(dataSet.Tables[0].Rows[i]["FinDocidJV"]),
                                FindocIdOpp = Convert.ToString(dataSet.Tables[0].Rows[i]["FindocIdOpp"]),
                                ModifyRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifyRemarks"]),
                                PmtStn = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtStn"]),
                                PmtTp = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtTp"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                                ModifiedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedBy"]),
                                ModifiedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["ModifiedDate"]),
                                BrokerId = Convert.ToString(dataSet.Tables[0].Rows[i]["BrokerId"])

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

        public async Task<ResponseModel> GetLorryHirePaymentExcel(ReportRequestModel request)
        {
            ResponseModel response = new();
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
                            new SqlParameter("@PmtNo",      request.FilterStr2),
                            new SqlParameter("@BrokerId",      request.FilterStr3)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHirePaymentExcel", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        var filter = "From " + Convert.ToDateTime(request.FromDate).ToString("dd/MM/yyyy");
                        filter = filter + " To " + Convert.ToDateTime(request.ToDate).ToString("dd/MM/yyyy");

                        response = await sharedRepository.GetExcelReport(dataSet.Tables[0], "Lorry Hire Payment Details", filter);
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

        public async Task<LorryHireMasterLLPModel> GetLorryHireInnerGridLLP(RequestModel request)
        {
            LorryHireMasterLLPModel lorryHire = new()
            {
                LhpmDetails = new List<LorryHireDetailLLPModel>(),
            };

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                            new SqlParameter("@MasterId", request.strRequest)
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireInnerGridLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHire.LhpmDetails.Add(new LorryHireDetailLLPModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterId"]),
                                PmtDate = Convert.ToString(dataSet.Tables[0].Rows[i]["PmtDate"]),
                                AbType = Convert.ToString(dataSet.Tables[0].Rows[i]["ABType"]),
                                ChYear = Convert.ToString(dataSet.Tables[0].Rows[i]["ChYear"]),
                                ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                BenId = Convert.ToString(dataSet.Tables[0].Rows[i]["BenId"]),
                                DueAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                HamaliAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliAmt"]),
                                DetenAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DetenAmt"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                Other2Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Other2Amt"]),
                                Other3Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Other3Amt"]),
                                NetAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                RecoveryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecoveryAmt"]),
                                LhpmAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["LhpmAmt"]),
                                OthDedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OthDedAmt"]),
                                Oth2DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth2DedAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                TotPaid = Convert.ToString(dataSet.Tables[0].Rows[i]["TotPaid"]),
                                ExtraRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraRemarks"]),
                                DeductRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["DeductRemarks"]),
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
        public async Task<LorryHireMasterLLPModel> GetChallanLorryhireDetailsLLP(ReportRequestModel request)
        {
            LorryHireMasterLLPModel lorryHire = new()
            {
                LhpmDetails = new List<LorryHireDetailLLPModel>(),
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
                            new SqlParameter("@BrokerId",       request.SortColumn),
                        };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireChallanDetailsLLP", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            lorryHire.LhpmDetails.Add(new LorryHireDetailLLPModel
                            {
                                ChYear = Convert.ToString(dataSet.Tables[0].Rows[i]["ChYear"]),
                                ChallanBranch = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanBranch"]),
                                ChallanNo = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanNo"]),
                                ChallanId = Convert.ToString(dataSet.Tables[0].Rows[i]["ChallanId"]),
                                AbType = Convert.ToString(dataSet.Tables[0].Rows[i]["AbType"]),
                                DueAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DueAmt"]),
                                HireAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HireAmt"]),
                                HamaliAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["HamaliAmt"]),
                                DetenAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["DetenAmt"]),
                                OtherAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OtherAmt"]),
                                Other2Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Other2Amt"]),
                                Other3Amt = Convert.ToString(dataSet.Tables[0].Rows[i]["Other3Amt"]),
                                NetAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["NetAmt"]),
                                RecoveryAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["RecoveryAmt"]),
                                LhpmAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["LhpmAmt"]),
                                OthDedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["OthDedAmt"]),
                                Oth2DedAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth2DedAmt"]),
                                TdsAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsAmt"]),
                                ExtraRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["ExtraRemarks"]),
                                DeductRemarks = Convert.ToString(dataSet.Tables[0].Rows[i]["DeductRemarks"]),
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
        public async Task<LhpmChallanViewModel> GetLorryHireChallanDetailViewLLP(ReportRequestModel request)
        {
            LhpmChallanViewModel lorryHire = new();
            

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

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLorryHireChallanDetailViewLLP", param);

                

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        lorryHire.TruckNo = Convert.ToString(dataSet.Tables[0].Rows[0]["TruckNo"]);
                        lorryHire.TotalHire = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalHire"]);
                        lorryHire.TotalAdvance = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalAdvance"]);
                        lorryHire.TotalBalance = Convert.ToString(dataSet.Tables[0].Rows[0]["TotalBalance"]);
                        lorryHire.AdvPaid = Convert.ToString(dataSet.Tables[0].Rows[0]["AdvPaid"]);
                        lorryHire.BalPaid = Convert.ToString(dataSet.Tables[0].Rows[0]["BalPaid"]);
                        lorryHire.AdvDed = Convert.ToString(dataSet.Tables[0].Rows[0]["AdvDed"]);
                        lorryHire.BalDed = Convert.ToString(dataSet.Tables[0].Rows[0]["BalDed"]);


                    }
                    else
                    {

                        //tripKmsModel.Status = false;
                        // tripKmsModel.Message = "data not found";
                        // tripKmsModel.RunKmsPerDay = Convert.ToString(userData.Tables[0].Rows[0]["RunKmsPerDay"]);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return lorryHire;
        }
        public async Task<ResponseModel> LorryHireMasterSaveLLP(LorryHireMasterLLPModel lorryHire)
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
                            new SqlParameter("@BrokerId                              ",          lorryHire.BrokerId             ),
                            new SqlParameter("@ModifyRemarks                       ",          lorryHire.ModifyRemarks      ),
                            new SqlParameter("@LoggedInUserID                      ",          lorryHire.LoggedInUserID     ),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_LorryHireMasterSaveLLP", param);
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
                                lorryHire.LhpmDetails[i].MasterId = MasterId.ToString();
                                lorryHire.LhpmDetails[i].PmtDate = lorryHire.PmtDate;
                                responseModel = await lorryHireDtlSaveLLP(transaction, lorryHire.LhpmDetails[i]);
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
        public async Task<ResponseModel> lorryHireDtlSaveLLP(SqlTransaction transaction, LorryHireDetailLLPModel lhDetail)
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
       

    }

}


