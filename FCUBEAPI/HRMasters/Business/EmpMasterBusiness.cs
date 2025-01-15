using DocumentFormat.OpenXml.Office2016.Excel;
using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;

namespace HRMasters.Business
{
    public class EmpMasterBusiness : IEmpMasterBusiness
    {
        readonly IEmpMasterRepository empMasterRepository;
        public EmpMasterBusiness(IEmpMasterRepository _empMasterRepository)
        {
            empMasterRepository = _empMasterRepository;
        }

        public async Task<ResponseModel> EmpMasterSave(EmpMasterModel empMaster)
        {
            return await empMasterRepository.EmpMasterSave(empMaster);
        }
        public async Task<EmpMasterList> GetEmpMasterList(PageRequest request)
        {
            return await empMasterRepository.GetEmpMasterList(request);
        }
        public async Task<ResponseModel> EmpMasterDelete(RequestModel request)
        {
            return await empMasterRepository.EmpMasterDelete(request);
        }
        public async Task<List<DropDownListModel>> GetBankList()
        {
            return await empMasterRepository.GetBankList();
        }
        public async Task<List<DropDownListModel>> GetDepartmentList()
        {
            return await empMasterRepository.GetDepartmentList();
        }
        public async Task<List<DropDownListModel>> GetDesignationList()
        {
            return await empMasterRepository.GetDesignationList();
        }
        public async Task<List<DropDownListModel>> GetMotherTongueList()
        {
            return await empMasterRepository.GetMotherTongueList();
        }
        public async Task<List<DropDownListModel>> GetEmployeeList()
        {
            return await empMasterRepository.GetEmployeeList();
        }
        public async Task<ResponseModel> GetMaxEmpNo(RequestModel request)
        {
            return await empMasterRepository.GetMaxEmpNo(request);
        }
        public async Task<List<DropDownListModel>> GetPrefixList()
        {
            return await empMasterRepository.GetPrefixList();
        }

    }
}
