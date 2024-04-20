using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Business
{
    public interface IEmpSalaryBusiness
    {
        Task<EmpSalaryMstList> GetEmpSalaryMstList(PageRequest request);
        Task<EmpSalaryMstModel> GetEmpSalaryEarnList(RequestModel request);
        Task<EmpSalaryMstModel> GetEmpSalaryDedList(RequestModel request);
        Task<List<DropDownListModel>> GetSalaryEarningList();
        Task<List<DropDownListModel>> GetSalaryDeductionList();
        Task<ResponseModel> EmpSalaryMasterSave(EmpSalaryMstModel empSalaryMst);
        Task<ResponseModel> EmpSalaryMasterDelete(RequestModel request);
    }
}
