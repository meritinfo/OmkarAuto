using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using HRMasters.Models;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;
using System.Transactions;

namespace HRMasters.Repository
{
    public class EmpSalaryCalcRepository : IEmpSalaryCalcRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public EmpSalaryCalcRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        
        public async Task<EmpPayCalcList> GetEmpPayCalList(ReportRequestModel request)
        {
            EmpPayCalcList empPayCalcList = new();
            List<EmpPayCalcModel> payCalcList = new();
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
                            new SqlParameter("@BranchCode", request.FilterStr),
                            new SqlParameter("@MonthYear",  request.FromDate)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPayCalMstList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            payCalcList.Add(new EmpPayCalcModel
                            {
                                TransId         = Convert.ToString(dataSet.Tables[0].Rows[i]["TransId"]),
                                EmpId           = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                EmpCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpName         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                MonthYear       = Convert.ToString(dataSet.Tables[0].Rows[i]["MonthYear"]),
                                DaysOfMonth     = Convert.ToString(dataSet.Tables[0].Rows[i]["DaysOfMonth"]),
                                HolSun          = Convert.ToString(dataSet.Tables[0].Rows[i]["HolSun"]),
                                TotLeaves       = Convert.ToString(dataSet.Tables[0].Rows[i]["TotLeaves"]),
                                AdjLeaves       = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjLeaves"]),
                                AbsentDays      = Convert.ToString(dataSet.Tables[0].Rows[i]["AbsentDays"]),
                                PayDays         = Convert.ToString(dataSet.Tables[0].Rows[i]["PayDays"]),
                                AffectYear      = Convert.ToString(dataSet.Tables[0].Rows[i]["AffectYear"]),
                                TotalEarnings   = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalEarnings"]),
                                TotalDeductions = Convert.ToString(dataSet.Tables[0].Rows[i]["TotalDeductions"]),
                                NetPay          = Convert.ToString(dataSet.Tables[0].Rows[i]["NetPay"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                                BranchCode      = Convert.ToString(dataSet.Tables[0].Rows[i]["BranchCode"]),
                            });
                        }

                        empPayCalcList.EmpPayCalcMstList = payCalcList;

                        empPayCalcList.PageMetaData = new PaginationMetaData
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
            return empPayCalcList;
        }          
        public async Task<EmpPayCalcModel> GetEmpSalEarnList(EmpSalaryMstModel empPayCalc)
        {
            EmpPayCalcModel empSalary = new()
            {
                empSalaryDtlList  = new List<EmpSalaryDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@EmpId",      empPayCalc.EmpId),
                        new SqlParameter("@FromDate",   empPayCalc.FromDate),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpSalEarningList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empSalaryDtlList.Add(new EmpSalaryDtlModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                EdCode = Convert.ToString(dataSet.Tables[0].Rows[i]["EdCode"]),
                                EdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["EdAmt"]),
                                EdName =Convert.ToString(dataSet.Tables[0].Rows[i]["EdName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
               
            }
            return empSalary;
            
        }
        public async Task<EmpPayCalcModel> GetEmpSalDedList(EmpSalaryMstModel empPayCalc)
        {
            EmpPayCalcModel empSalary = new()
            {
                empSalaryDtlList  = new List<EmpSalaryDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@EmpId",      empPayCalc.EmpId),
                        new SqlParameter("@FromDate",   empPayCalc.FromDate),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpSalDeductionList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empSalaryDtlList.Add(new EmpSalaryDtlModel
                            {
                                MasterId = Convert.ToString(dataSet.Tables[0].Rows[i]["MasterID"]),
                                EdCode = Convert.ToString(dataSet.Tables[0].Rows[i]["EdCode"]),
                                EdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["EdAmt"]),
                                EdName =Convert.ToString(dataSet.Tables[0].Rows[i]["EdName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }
        public async Task<EmpPayCalcModel> GetEmpLeaveDetails(EmpLeaveModel empleave)
        {
            EmpPayCalcModel empSalary = new()
            {
                empLeavesList  = new List<EmpLeaveModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@EmpId",  empleave.EmpId),
                        new SqlParameter("@YearId", empleave.YearId),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpLeaveList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empLeavesList.Add(new EmpLeaveModel
                            {
                                LeaveId = Convert.ToString(dataSet.Tables[0].Rows[i]["LeaveId"]),
                                LeaveCode = Convert.ToString(dataSet.Tables[0].Rows[i]["LeaveCode"]),
                                LeaveName =Convert.ToString(dataSet.Tables[0].Rows[i]["LeaveName"]),
                                TotalLeaves =Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLeaves"]),                              
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }
        public async Task<EmpPayCalcModel> GetEmpLoanDetails(RequestModel req)
        {
            EmpPayCalcModel empSalary = new()
            {
                empLoanDtlList  = new List<EmpLoanModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@EmpId",  req.strRequest),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpLoanPayList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empLoanDtlList.Add(new EmpLoanModel
                            {
                                LoanId = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanId"]),
                                LoanNumber = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanNumber"]),
                                EmpId = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                LoanDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDate"]),
                                LoanType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanType"]),
                                LoanDedId = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDedId"]),
                                DedName= Convert.ToString(dataSet.Tables[0].Rows[i]["DedName"]),
                                LoanAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanAmt"]),
                                BalAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }
        public async Task<List<DropDownListModel>> GetBranchEmpList(RequestModel request)
        {
            List<DropDownListModel> earnList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@Branch", request.strRequest)
                    };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getBranchEmpList", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < statusData.Tables[0].Rows.Count; i++)
                        {
                            earnList.Add(new DropDownListModel
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
            return earnList;
        }

        public async Task<ResponseModel> EmpPayCalDelete(RequestModel request)
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
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPaycalcMstDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                       if(responseModel.Status)
                        {
                            transaction.Commit();
                        }
                        else {  transaction.Rollback(); }
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
        public async Task<ResponseModel> EmpPayCalSave(EmpPayCalcModel empPayCalc)
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
                            new SqlParameter("@TransId",        empPayCalc.TransId),
                            new SqlParameter("@EmpId",          empPayCalc.EmpId),
                            new SqlParameter("@MonthYear",      empPayCalc.MonthYear),
                            new SqlParameter("@AffectYear",     empPayCalc.AffectYear),
                            new SqlParameter("@DaysOfMonth",    empPayCalc.DaysOfMonth),
                            new SqlParameter("@HolSun",         empPayCalc.HolSun),
                            new SqlParameter("@TotLeaves",      empPayCalc.TotLeaves),
                            new SqlParameter("@AdjLeaves",      empPayCalc.AdjLeaves),
                            new SqlParameter("@AbsentDays",     empPayCalc.AbsentDays),
                            new SqlParameter("@PayDays",        empPayCalc.PayDays),
                            new SqlParameter("@TotalEarnings",  empPayCalc.TotalEarnings),
                            new SqlParameter("@TotalDeductions",empPayCalc.TotalDeductions),
                            new SqlParameter("@NetPay",         empPayCalc.NetPay),
                            new SqlParameter("@Remarks",        empPayCalc.Remarks),
                            new SqlParameter("@BranchCode",     empPayCalc.BranchCode),
                            new SqlParameter("@LoggedInUser",   empPayCalc.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPaycalcMstSave", param);
                    string TransId = "0";

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0 )
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                        TransId = Convert.ToString(responseModel.Message);
                        if (!responseModel.Status)
                        {
                            transaction.Rollback();
                        }
                    }
                    else
                    {
                        transaction.Rollback();
                        responseModel.Status = false;
                    }
                    if (responseModel.Status)
                    {
                        for (int i = 0; i < empPayCalc.empSalaryDtlList.Count; i++)
                        {
                            empPayCalc.empSalaryDtlList[i].MasterId   = TransId.ToString();
                            empPayCalc.empSalaryDtlList[i].EmpId      = empPayCalc.EmpId;
                            empPayCalc.empSalaryDtlList[i].FromDate   = empPayCalc.MonthYear;
                            responseModel = await EmpPayDetailSave(transaction,empPayCalc.empSalaryDtlList[i]);
                            if (!responseModel.Status)
                            {
                                transaction.Rollback();
                                i = empPayCalc.empSalaryDtlList.Count;
                            }
                        }
                        if (responseModel.Status)
                        {
                            for (int i = 0; i < empPayCalc.empLeavesList.Count; i++)
                            {
                                empPayCalc.empLeavesList[i].TransId     = TransId.ToString();
                                empPayCalc.empLeavesList[i].EmpId       = empPayCalc.EmpId;
                                empPayCalc.empLeavesList[i].YearId      = empPayCalc.AffectYear;
                                empPayCalc.empLeavesList[i].MonthYear   = empPayCalc.MonthYear;
                                responseModel = await EmpLeaveDetailSave(transaction,empPayCalc.empLeavesList[i]);
                                if (!responseModel.Status)
                                {
                                    transaction.Rollback();
                                    i = empPayCalc.empLeavesList.Count;
                                }
                            }
                            if (responseModel.Status)
                            {
                                for (int i = 0; i < empPayCalc.empLoanDtlList.Count; i++)
                                {
                                    empPayCalc.empLoanDtlList[i].TransId    = TransId.ToString();
                                    empPayCalc.empLoanDtlList[i].EmpId      = empPayCalc.EmpId;
                                    empPayCalc.empLoanDtlList[i].MonthYear  = empPayCalc.MonthYear;
                                    responseModel = await EmpLoanDetailSave(transaction,empPayCalc.empLoanDtlList[i]);
                                    if (!responseModel.Status)
                                    {
                                        transaction.Rollback();
                                        i = empPayCalc.empLoanDtlList.Count;
                                    }
                                }
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
        public async Task<ResponseModel> EmpPayDetailSave(SqlTransaction transaction, EmpSalaryDtlModel empSalaryDtl)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransId",    empSalaryDtl.MasterId),
                            new SqlParameter("@EmpId",      empSalaryDtl.EmpId),
                            new SqlParameter("@MonthYear",  empSalaryDtl.FromDate),
                            new SqlParameter("@EdType",     empSalaryDtl.EdType),
                            new SqlParameter("@EdCode",     empSalaryDtl.EdCode),
                            new SqlParameter("@EdAmt",      empSalaryDtl.EdAmt),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPayDtlsSave", param);

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
            }
            return responseModel;
        }
        public async Task<ResponseModel> EmpLeaveDetailSave(SqlTransaction transaction, EmpLeaveModel empLeave)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransId",        empLeave.TransId),
                            new SqlParameter("@EmpId",          empLeave.EmpId),
                            new SqlParameter("@YearId",         empLeave.YearId),
                            new SqlParameter("@MonthYear",      empLeave.MonthYear),
                            new SqlParameter("@LeaveId",        empLeave.LeaveId),
                            new SqlParameter("@LeaveCode",      empLeave.LeaveCode),
                            new SqlParameter("@TotalLeaves",    empLeave.TotalLeaves),
                            new SqlParameter("@LeavesAdj",      empLeave.LeavesAdj),

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPayLeaveDtlsSave", param);

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
            }
            return responseModel;
        }
        public async Task<ResponseModel> EmpLoanDetailSave(SqlTransaction transaction, EmpLoanModel loanModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@TransId",    loanModel.TransId),
                            new SqlParameter("@EmpId",      loanModel.EmpId),
                            new SqlParameter("@MonthYear",  loanModel.MonthYear),
                            new SqlParameter("@LoanId",     loanModel.LoanId),
                            new SqlParameter("@LoanType",   loanModel.LoanType),
                            new SqlParameter("@LoanAdjAmt", loanModel.LoanAdjAmt),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(transaction, "usp_EmpPayLoanDtlSave", param);

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
            }
            return responseModel;
        }

        public async Task<EmpPayCalcModel> GetEmpPayEarnDetails(RequestModel request)
        {
            EmpPayCalcModel empSalary = new()
            {
                empSalaryDtlList  = new List<EmpSalaryDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@TransId",  request.strRequest),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPayEarnDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empSalaryDtlList.Add(new EmpSalaryDtlModel
                            {
                                MasterId = request.strRequest,
                                EdCode = Convert.ToString(dataSet.Tables[0].Rows[i]["EdCode"]),
                                EdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["EdAmt"]),
                                EdName =Convert.ToString(dataSet.Tables[0].Rows[i]["EdName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }
        public async Task<EmpPayCalcModel> GetEmpPayDedDetails(RequestModel request)
        {
            EmpPayCalcModel empSalary = new()
            {
                empSalaryDtlList  = new List<EmpSalaryDtlModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@TransId",  request.strRequest),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPayDedDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empSalaryDtlList.Add(new EmpSalaryDtlModel
                            {
                                MasterId = request.strRequest,
                                EdCode = Convert.ToString(dataSet.Tables[0].Rows[i]["EdCode"]),
                                EdAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["EdAmt"]),
                                EdName =Convert.ToString(dataSet.Tables[0].Rows[i]["EdName"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }
        public async Task<EmpPayCalcModel> GetEmpPayLeaveDetails(RequestModel request)
        {
            EmpPayCalcModel empSalary = new()
            {
                empLeavesList  = new List<EmpLeaveModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@TransId",  request.strRequest),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPayLeaveDetail", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empLeavesList.Add(new EmpLeaveModel
                            {
                                LeaveId = Convert.ToString(dataSet.Tables[0].Rows[i]["LeaveId"]),
                                LeaveCode = Convert.ToString(dataSet.Tables[0].Rows[i]["LeaveCode"]),
                                LeaveName =Convert.ToString(dataSet.Tables[0].Rows[i]["LeaveName"]),
                                TotalLeaves =Convert.ToString(dataSet.Tables[0].Rows[i]["TotalLeaves"]),
                                LeavesAdj = Convert.ToString(dataSet.Tables[0].Rows[i]["AdjLeaves"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;


        }
        public async Task<EmpPayCalcModel> GetEmpPayLoanDetails(RequestModel request)
        {
            EmpPayCalcModel empSalary = new()
            {
                empLoanDtlList  = new List<EmpLoanModel>(),
            };
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                    {
                        new SqlParameter("@TransId",  request.strRequest),
                    };

                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpPayLoanDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            empSalary.empLoanDtlList.Add(new EmpLoanModel
                            {
                                LoanId = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanId"]),
                                LoanNumber = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanNumber"]),
                                EmpId = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                LoanDate = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDate"]),
                                LoanType = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanType"]),
                                LoanDedId = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDedId"]),
                                DedName= Convert.ToString(dataSet.Tables[0].Rows[i]["DedName"]),
                                LoanAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanAmt"]),
                                BalAmt = Convert.ToString(dataSet.Tables[0].Rows[i]["BalAmt"]),
                                LoanAdjAmt =Convert.ToString(dataSet.Tables[0].Rows[i]["LoanAdjAmt"]),
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return empSalary;

        }

    }

   
}
