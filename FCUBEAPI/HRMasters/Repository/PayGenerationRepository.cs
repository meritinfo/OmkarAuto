using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using HRMasters.Models;
using Shared.Models;
using System.Reflection.Emit;

namespace HRMasters.Repository
{
    public class PayGenerationRepository : IPayGenerationRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public PayGenerationRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        
        public async Task<EmpPayGenList> GetEmpPayGenerationList(PageFromDtToDtRequest request)
        {
            EmpPayGenList payGenList = new();
            List<EmpPayGenModel> paylist = new();
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
                            new SqlParameter("@BranchCode", request.strRequest),
                            new SqlParameter("@MonthYear", request.FromDate),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPayGenerationList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            paylist.Add(new EmpPayGenModel
                            {
                                SlNo            = Convert.ToString(dataSet.Tables[0].Rows[i]["SlNo"]),
                                PsId            = Convert.ToString(dataSet.Tables[0].Rows[i]["PsId"]),
                                MonthYear       = Convert.ToString(dataSet.Tables[0].Rows[i]["MonthYear"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                                EmpId           = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                EmpCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpName         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                DaysOfMonth     = Convert.ToString(dataSet.Tables[0].Rows[i]["DaysOfMonth"]),
                                WorkedDays      = Convert.ToString(dataSet.Tables[0].Rows[i]["WorkedDays"]),
                                HolSun          = Convert.ToString(dataSet.Tables[0].Rows[i]["HolSun"]),
                                EL_Days         = Convert.ToString(dataSet.Tables[0].Rows[i]["EL_Days"]),
                                CL_Days         = Convert.ToString(dataSet.Tables[0].Rows[i]["CL_Days"]),
                                SL_Days         = Convert.ToString(dataSet.Tables[0].Rows[i]["SL_Days"]),
                                LossOfPayDays   = Convert.ToString(dataSet.Tables[0].Rows[i]["LossOfPayDays"]),
                                PayDays         = Convert.ToString(dataSet.Tables[0].Rows[i]["PayDays"]),
                                BasicRate       = Convert.ToString(dataSet.Tables[0].Rows[i]["BasicRate"]),
                                HraRate         = Convert.ToString(dataSet.Tables[0].Rows[i]["HraRate"]),
                                FdaRate         = Convert.ToString(dataSet.Tables[0].Rows[i]["FdaRate"]),
                                OthRate1        = Convert.ToString(dataSet.Tables[0].Rows[i]["OthRate1"]),
                                OthRate2        = Convert.ToString(dataSet.Tables[0].Rows[i]["OthRate2"]),
                                BasicEarn       = Convert.ToString(dataSet.Tables[0].Rows[i]["BasicEarn"]),
                                HraEarn         = Convert.ToString(dataSet.Tables[0].Rows[i]["HraEarn"]),
                                FdaEarn         = Convert.ToString(dataSet.Tables[0].Rows[i]["FdaEarn"]),
                                Oth1Earn        = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth1Earn"]),
                                Oth2Earn        = Convert.ToString(dataSet.Tables[0].Rows[i]["Oth2Earn"]),
                                TotalEarn       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalEarn"]),
                                PfDed           = Convert.ToString(dataSet.Tables[0].Rows[i]["PfDed"]),
                                EsiDed          = Convert.ToString(dataSet.Tables[0].Rows[i]["EsiDed"]),
                                TdsDed          = Convert.ToString(dataSet.Tables[0].Rows[i]["TdsDed"]),
                                PtDed           = Convert.ToString(dataSet.Tables[0].Rows[i]["PtDed"]),
                                SalAdvDed       = Convert.ToString(dataSet.Tables[0].Rows[i]["SalAdvDed"]),
                                LoanDed         = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDed"]),
                                TotalDed        = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDed"]),
                                NetPay          = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPay"]),
                                BalSalAdvAmt    = Convert.ToString(dataSet.Tables[0].Rows[i]["BalSalAdvAmt"]),
                                BalLoanAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["BalLoanAmt"]),
                                BalEL           = Convert.ToString(dataSet.Tables[0].Rows[i]["BalEL"]),
                                BalCL           = Convert.ToString(dataSet.Tables[0].Rows[i]["BalCL"]),
                                BalSL           = Convert.ToString(dataSet.Tables[0].Rows[i]["BalSL"]),
                                CreatedBy = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedBy"]),
                                CreatedDate = Convert.ToString(dataSet.Tables[0].Rows[i]["CreatedDate"]),
                            });
                        }

                        payGenList.PayGenMstList = paylist;

                        payGenList.PageMetaData = new PaginationMetaData
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
            return payGenList;
        }
          

        public async Task<ResponseModel> EmpPayGenerationSave(EmpPayGenList payGenModel)
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
                    for (int i = 0; i < payGenModel.PayGenMstList.Count; i++)
                    {
                        SqlParameter[] paramMisc =
                            {
                                new SqlParameter("@PsId"            ,payGenModel.PayGenMstList[i].PsId),
                                new SqlParameter("@MonthYear"       ,payGenModel.PayGenMstList[i].MonthYear),
                                new SqlParameter("@BranchCode"      ,payGenModel.PayGenMstList[i].BranchCode),
                                new SqlParameter("@EmpId"           ,payGenModel.PayGenMstList[i].EmpId),
                                new SqlParameter("@DaysOfMonth"     ,payGenModel.PayGenMstList[i].DaysOfMonth),
                                new SqlParameter("@WorkedDays"      ,payGenModel.PayGenMstList[i].WorkedDays),
                                new SqlParameter("@HolSun"          ,payGenModel.PayGenMstList[i].HolSun),
                                new SqlParameter("@EL_Days"         ,payGenModel.PayGenMstList[i].EL_Days),
                                new SqlParameter("@CL_Days"         ,payGenModel.PayGenMstList[i].CL_Days),
                                new SqlParameter("@SL_Days"         ,payGenModel.PayGenMstList[i].SL_Days),
                                new SqlParameter("@LossOfPayDays"   ,payGenModel.PayGenMstList[i].LossOfPayDays),
                                new SqlParameter("@PayDays"         ,payGenModel.PayGenMstList[i].PayDays),
                                new SqlParameter("@BasicRate"       ,payGenModel.PayGenMstList[i].BasicRate),
                                new SqlParameter("@HraRate"         ,payGenModel.PayGenMstList[i].HraRate),
                                new SqlParameter("@FdaRate"         ,payGenModel.PayGenMstList[i].FdaRate),
                                new SqlParameter("@OthRate1"        ,payGenModel.PayGenMstList[i].OthRate1),
                                new SqlParameter("@BasicEarn"       ,payGenModel.PayGenMstList[i].BasicEarn),
                                new SqlParameter("@HraEarn"         ,payGenModel.PayGenMstList[i].HraEarn),
                                new SqlParameter("@FdaEarn"         ,payGenModel.PayGenMstList[i].FdaEarn),
                                new SqlParameter("@Oth1Earn"        ,payGenModel.PayGenMstList[i].Oth1Earn),
                                new SqlParameter("@TotalEarn"       ,payGenModel.PayGenMstList[i].TotalEarn),
                                new SqlParameter("@PfDed"           ,payGenModel.PayGenMstList[i].PfDed),
                                new SqlParameter("@EsiDed"          ,payGenModel.PayGenMstList[i].EsiDed),
                                new SqlParameter("@TdsDed"          ,payGenModel.PayGenMstList[i].TdsDed),
                                new SqlParameter("@PtDed"           ,payGenModel.PayGenMstList[i].PtDed),
                                new SqlParameter("@SalAdvDed"       ,payGenModel.PayGenMstList[i].SalAdvDed),
                                new SqlParameter("@LoanDed"         ,payGenModel.PayGenMstList[i].LoanDed),
                                new SqlParameter("@TotalDed"        ,payGenModel.PayGenMstList[i].TotalDed),
                                new SqlParameter("@NetPay"          ,payGenModel.PayGenMstList[i].NetPay),
                                new SqlParameter("@BalSalAdvAmt"    ,payGenModel.PayGenMstList[i].BalSalAdvAmt),
                                new SqlParameter("@BalLoanAmt"      ,payGenModel.PayGenMstList[i].BalLoanAmt),
                                new SqlParameter("@BalEL"           ,payGenModel.PayGenMstList[i].BalEL),
                                new SqlParameter("@BalCL"           ,payGenModel.PayGenMstList[i].BalCL),
                                new SqlParameter("@BalSL"           ,payGenModel.PayGenMstList[i].BalSL),
                                new SqlParameter("@LoggedInUser"    ,payGenModel.PayGenMstList[i].LoggedInUser),
                            };
                        var statusMisc = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPayGenerationSave", paramMisc);
                        if (statusMisc != null && statusMisc.Tables[0].Rows.Count > 0 )
                        {
                            responseModel.Status = Convert.ToBoolean(statusMisc.Tables[0].Rows[0]["Status"]);
                            responseModel.Message = Convert.ToString(statusMisc.Tables[0].Rows[0]["Message"]);
                            if (!responseModel.Status)
                            {
                                i = payGenModel.PayGenMstList.Count;
                                transaction.Rollback();
                            }
                        }
                        else
                        {
                            i = payGenModel.PayGenMstList.Count;
                            transaction.Rollback();
                        }                       
                    }
                    if (responseModel.Status)
                    {
                        transaction.Commit();
                    }
                }
            }
            catch (Exception ex)
            {
                transaction.Rollback();
            }
            return responseModel;
        }
        public async Task<ResponseModel> EmpPayGenerationDelete(PageFromDtToDtRequest request)
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
                            new SqlParameter("@BranchCode", request.strRequest),
                            new SqlParameter("@MonthYear", request.FromDate),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPayGenerationDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        if (responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else
                        {
                            transaction.Rollback();
                        }
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
