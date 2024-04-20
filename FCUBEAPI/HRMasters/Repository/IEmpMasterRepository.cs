using HRMasters.Models;
using Shared.Models;

namespace HRMasters.Repository
{
    /// <summary>
    /// Product group Master service interface methods
    /// </summary>
    public interface IEmpMasterRepository
    {
        Task<ResponseModel> EmpMasterSave(EmpMasterModel empMaster);
        Task<EmpMasterList> GetEmpMasterList(PageRequest request);
        Task<ResponseModel> EmpMasterDelete(RequestModel request);
        Task<List<DropDownListModel>> GetBankList();
        Task<List<DropDownListModel>> GetDepartmentList();
        Task<List<DropDownListModel>> GetDesignationList();
        Task<List<DropDownListModel>> GetMotherTongueList();
        Task<List<DropDownListModel>> GetEmployeeList();
        Task<ResponseModel> GetMaxEmpNo(RequestModel request);
    }
}
