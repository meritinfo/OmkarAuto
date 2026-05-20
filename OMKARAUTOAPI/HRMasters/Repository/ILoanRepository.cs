using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Repository
{
    public interface ILoanRepository
    {
        Task<LoanMstList> GetEmpLoanList(PageRequest request);
        Task<ResponseModel> EmpLoanSave(LoanModel loanModel);
        Task<ResponseModel> EmpLoanDelete(RequestModel request);
        Task<LoanMstList> GetEmpLoanRepayList(PageRequest request);
        Task<ResponseModel> EmpLoanRepaySave(LoanModel loanModel);
        Task<ResponseModel> EmpLoanRepayDelete(RequestModel request);
        Task<List<DropDownListModel>> GetLoanList(RequestModel request);
        Task<DropDownListModel> GetLoanAmountDetails(RequestModel request);
    }
}
