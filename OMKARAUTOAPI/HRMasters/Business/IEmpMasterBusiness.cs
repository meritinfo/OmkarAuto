using HRMasters.Models;
using Shared.Models;

namespace HRMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IEmpMasterBusiness
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
        Task<List<DropDownListModel>> GetPrefixList();

    }
}
