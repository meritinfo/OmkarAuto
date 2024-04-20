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
    public class EmpSalaryBusiness : IEmpSalaryBusiness
    {
        readonly IEmpSalaryRepository empSalaryRepository;
        public EmpSalaryBusiness(IEmpSalaryRepository _empSalaryRepository)
        {
            empSalaryRepository = _empSalaryRepository;
        }

        public async Task<EmpSalaryMstList> GetEmpSalaryMstList(PageRequest request)
        {
            return await empSalaryRepository.GetEmpSalaryMstList(request);
        }
        public async Task<EmpSalaryMstModel> GetEmpSalaryEarnList(RequestModel request)
        {
            return await empSalaryRepository.GetEmpSalaryEarnList(request);
        }
        public async Task<EmpSalaryMstModel> GetEmpSalaryDedList(RequestModel request)
        {
            return await empSalaryRepository.GetEmpSalaryDedList(request);
        }
        public async Task<List<DropDownListModel>> GetSalaryEarningList()
        {
            return await empSalaryRepository.GetSalaryEarningList();
        }
        public async Task<List<DropDownListModel>> GetSalaryDeductionList()
        {
            return await empSalaryRepository.GetSalaryDeductionList();
        }
        public async Task<ResponseModel> EmpSalaryMasterSave(EmpSalaryMstModel empSalaryMst)
        {
            return await empSalaryRepository.EmpSalaryMasterSave(empSalaryMst);
        }
        public async Task<ResponseModel> EmpSalaryMasterDelete(RequestModel request)
        {
            return await empSalaryRepository.EmpSalaryMasterDelete(request);
        }

    }
}
