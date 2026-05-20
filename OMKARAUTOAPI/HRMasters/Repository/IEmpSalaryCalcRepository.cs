using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Repository
{
    public interface IEmpSalaryCalcRepository
    {
        Task<EmpPayCalcList> GetEmpPayCalList(PageFromDtToDtRequest request);
        Task<EmpPayCalcModel> GetSelectedEmpDetails(ReportRequestModel request);
        Task<EmpPayCalcModel> GetEmpSalEarnList(EmpSalaryMstModel empPayCalc);
        Task<EmpPayCalcModel> GetEmpSalDedList(EmpSalaryMstModel empPayCalc);
        Task<EmpPayCalcModel> GetEmpLeaveDetails(EmpLeaveModel empLeave);
        Task<EmpPayCalcModel> GetEmpLoanDetails(RequestModel request);
        Task<List<DropDownListModel>> GetBranchEmpList(RequestModel request);
        Task<ResponseModel> EmpPayCalSave(EmpPayCalcModel empPayCalc);
        Task<ResponseModel> EmpPayCalDelete(RequestModel request);
        Task<EmpPayCalcModel> GetEmpPayEarnDetails(RequestModel request);
        Task<EmpPayCalcModel> GetEmpPayDedDetails(RequestModel request);
        Task<EmpPayCalcModel> GetEmpPayLeaveDetails(RequestModel request);
        Task<EmpPayCalcModel> GetEmpPayLoanDetails(RequestModel request);
    }
}
