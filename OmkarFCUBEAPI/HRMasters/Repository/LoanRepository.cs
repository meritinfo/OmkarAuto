using Microsoft.Extensions.Options;
using SqlHelper.Models;
using System.Data.SqlClient;
using HRMasters.Models;
using Shared.Models;
using DocumentFormat.OpenXml.Drawing;

namespace HRMasters.Repository
{
    public class LoanRepository : ILoanRepository
    {
        private readonly IOptions<DBModel> dbconnection;

        public LoanRepository(IOptions<DBModel> _dbconnection)
        {
            dbconnection = _dbconnection;
        }
        
        public async Task<LoanMstList> GetEmpLoanList(PageRequest request)
        {
            LoanMstList emploanList = new();
            List<LoanModel> loanList = new();
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
                            new SqlParameter("@Search",     request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpLoanList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            loanList.Add(new LoanModel
                            {
                                LoanId          = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanId"]),
                                EmpId           = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                EmpCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpName         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                LoanDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanDate"]),
                                LoanType        = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanType"]),
                                LoanTp          = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanTp"]),
                                LoanAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanAmt"]),
                                AmountCleared   = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountCleared"]),
                                RepaymentMonths = Convert.ToString(dataSet.Tables[0].Rows[i]["RepaymentMonths"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["Remarks"]),
                            });
                        }

                        emploanList.LoanList = loanList;

                        emploanList.PageMetaData = new PaginationMetaData
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
            return emploanList;
        }
          
        public async Task<ResponseModel> EmpLoanSave(LoanModel loanModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoanId",             loanModel.LoanId),
                            new SqlParameter("@EmpId",              loanModel.EmpId),
                            new SqlParameter("@BranchCode",         loanModel.BranchCode),
                            new SqlParameter("@LoanDate",           loanModel.LoanDate),
                            new SqlParameter("@LoanType",           loanModel.LoanType),
                            new SqlParameter("@LoanAmt",            loanModel.LoanAmt),
                            new SqlParameter("@RepaymentMonths",    loanModel.RepaymentMonths),
                            new SqlParameter("@Remarks",            loanModel.Remarks),
                            new SqlParameter("@YearId",             loanModel.YearId),
                            new SqlParameter("@LoggedInUser",       loanModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpLoanSave", param);
                   
                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }                    
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }       

        public async Task<ResponseModel> EmpLoanDelete(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoanId", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpLoanDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {
                
            }
            return responseModel;
        }

        public async Task<LoanMstList> GetEmpLoanRepayList(PageRequest request)
        {
            LoanMstList emploanList = new();
            List<LoanModel> loanList = new();
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
                            new SqlParameter("@Search",     request.Search)
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getEmpLoanRepayList", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        int totalRecords = Convert.ToInt32(dataSet.Tables[0].Rows[0]["TotalRows"]);
                        for (int i = 0; i < dataSet.Tables[0].Rows.Count; i++)
                        {
                            loanList.Add(new LoanModel
                            {
                                LoanRepayId     = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanRepayId"]),
                                LoanId          = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanId"]),
                                LoanNumber      = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanNumber"]),
                                EmpId           = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpId"]),
                                EmpCode         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpCode"]),
                                EmpName         = Convert.ToString(dataSet.Tables[0].Rows[i]["EmpName"]),
                                LoanDate        = Convert.ToString(dataSet.Tables[0].Rows[i]["RepayDate"]),
                                LoanAmt         = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanAmt"]),
                                AmountCleared   = Convert.ToString(dataSet.Tables[0].Rows[i]["AmountCleared"]),
                                LoanPayAmt      = Convert.ToString(dataSet.Tables[0].Rows[i]["LoanPayAmt"]),
                                Remarks         = Convert.ToString(dataSet.Tables[0].Rows[i]["PayDetails"]),
                            });
                        }

                        emploanList.LoanList = loanList;

                        emploanList.PageMetaData = new PaginationMetaData
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
            return emploanList;
        }

        public async Task<ResponseModel> EmpLoanRepaySave(LoanModel loanModel)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoanRepayId",    loanModel.LoanRepayId),
                            new SqlParameter("@EmpId",          loanModel.EmpId),
                            new SqlParameter("@LoanId",         loanModel.LoanId),
                            new SqlParameter("@RepayDate",      loanModel.LoanDate),
                            new SqlParameter("@LoanPayAmt",     loanModel.LoanAmt),
                            new SqlParameter("@PayDetails",     loanModel.Remarks),
                            new SqlParameter("@YearId",         loanModel.YearId),
                            new SqlParameter("@LoggedInUser",   loanModel.LoggedInUser)

                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpLoanRepaySave", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel;
        }
       
        public async Task<ResponseModel> EmpLoanRepayDelete(RequestModel request)
        {
            ResponseModel responseModel = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoanRepayId", request.strRequest),
                        };
                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_EmpLoanRepayDelete", param);

                    if (statusData != null && statusData.Tables[0].Rows.Count > 0)
                    {
                        responseModel.Status = Convert.ToBoolean(statusData.Tables[0].Rows[0]["Status"]);
                        responseModel.Message = Convert.ToString(statusData.Tables[0].Rows[0]["Message"]);
                    }
                    else
                    {
                        responseModel.Status = false;
                        responseModel.Message = "Unable to process";
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return responseModel; 
        }

        public async Task<List<DropDownListModel>> GetLoanList(RequestModel request)
        {
            List<DropDownListModel> earnList = new();

            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@EmpId", request.strRequest),
                        };

                    var statusData = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLoanList", param);

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
        public async Task<DropDownListModel> GetLoanAmountDetails(RequestModel request)
        {
            DropDownListModel emploan = new();
            try
            {
                if (dbconnection != null)
                {
                    SqlParameter[] param =
                        {
                            new SqlParameter("@LoanId", request.strRequest),
                        };
                    var dataSet = await SqlHelper.SqlHelper.ExecuteDatasetAsync(dbconnection.Value.DBConnection, "usp_getLoanAmountDetails", param);

                    if (dataSet != null && dataSet.Tables[0].Rows.Count > 0)
                    {
                        emploan.DataId      = Convert.ToString(dataSet.Tables[0].Rows[0]["LoanAmt"]);
                        emploan.DataName    = Convert.ToString(dataSet.Tables[0].Rows[0]["AmountCleared"]);                           
                    }                       
                }
            }
            catch (Exception ex)
            {

            }
            return emploan;
        }


    }

}
