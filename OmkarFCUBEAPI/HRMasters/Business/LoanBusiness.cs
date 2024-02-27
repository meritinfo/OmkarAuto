using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Business
{
    public class LoanBusiness : ILoanBusiness
    {
        readonly ILoanRepository loanRepository;
        public LoanBusiness(ILoanRepository _loanRepository)
        {
            loanRepository = _loanRepository;
        }

        public async Task<LoanMstList> GetEmpLoanList(PageRequest request)
        {
            return await loanRepository.GetEmpLoanList(request);
        }
        public async Task<ResponseModel> EmpLoanSave(LoanModel loanModel)
        {
            return await loanRepository.EmpLoanSave(loanModel);
        }
        public async Task<ResponseModel> EmpLoanDelete(RequestModel request)
        {
            return await loanRepository.EmpLoanDelete(request);
        }
        public async Task<LoanMstList> GetEmpLoanRepayList(PageRequest request)
        {
            return await loanRepository.GetEmpLoanRepayList(request);
        }
        public async Task<ResponseModel> EmpLoanRepaySave(LoanModel loanModel)
        {
            return await loanRepository.EmpLoanRepaySave(loanModel);
        }
        public async Task<ResponseModel> EmpLoanRepayDelete(RequestModel request)
        {
            return await loanRepository.EmpLoanRepayDelete(request);
        }
        public async Task<List<DropDownListModel>> GetLoanList(RequestModel request)
        {
            return await loanRepository.GetLoanList(request);
        }
        public async Task<DropDownListModel> GetLoanAmountDetails(RequestModel request)
        {
            return await loanRepository.GetLoanAmountDetails(request);
        }

    }
}
