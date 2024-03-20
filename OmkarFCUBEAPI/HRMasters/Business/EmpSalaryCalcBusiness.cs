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
    public class EmpSalaryCalcBusiness : IEmpSalaryCalcBusiness
    {
        readonly IEmpSalaryCalcRepository empSalaryCalcRepository;
        public EmpSalaryCalcBusiness(IEmpSalaryCalcRepository _empSalaryCalcRepository)
        {
            empSalaryCalcRepository = _empSalaryCalcRepository;
        }        
        public async Task<EmpPayCalcList> GetEmpPayCalList(PageRequestDtBrVh request)
        {
            return await empSalaryCalcRepository.GetEmpPayCalList(request);
        }
        public async Task<EmpPayCalcModel> GetEmpSalEarnList(EmpSalaryMstModel empPayCalc)
        {
            return await empSalaryCalcRepository.GetEmpSalEarnList( empPayCalc);
        }
        public async Task<EmpPayCalcModel> GetEmpSalDedList(EmpSalaryMstModel empPayCalc)
        {
            return await empSalaryCalcRepository.GetEmpSalDedList(empPayCalc);
        }
        public async Task<EmpPayCalcModel> GetEmpLeaveDetails(EmpLeaveModel empleave)
        {
            return await empSalaryCalcRepository.GetEmpLeaveDetails(empleave);
        }
        public async Task<EmpPayCalcModel> GetEmpLoanDetails(RequestModel request)
        {
            return await empSalaryCalcRepository.GetEmpLoanDetails(request);
        }
        public async Task<List<DropDownListModel>> GetBranchEmpList(RequestModel request)
        {
            return await empSalaryCalcRepository.GetBranchEmpList(request);
        }
        public async Task<ResponseModel> EmpPayCalSave(EmpPayCalcModel empPayCalc)
        {
            return await empSalaryCalcRepository.EmpPayCalSave(empPayCalc);
        }
        //public async Task<ResponseModel> EmpSalaryMasterDelete(RequestModel request)
        //{
        //    return await empSalaryCalcRepository.EmpSalaryMasterDelete(request);
        //}

    }
}
