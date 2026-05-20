using DocumentFormat.OpenXml.Office2016.Excel;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class AdminGroupMasterBusiness: IAdminGroupMasterBusiness
    {
        readonly IAdminGroupMasterRepository adminGroupMasterRepository;
        public AdminGroupMasterBusiness(IAdminGroupMasterRepository _adminGroupMasterRepository)
        {
            adminGroupMasterRepository = _adminGroupMasterRepository;
        }
        public async Task<ResponseModel> AdminGroupMasterSave(AdminGroupMasterModel billsTypeModel)
        {
            return await adminGroupMasterRepository.AdminGroupMasterSave(billsTypeModel);
        }
        public async Task<ResponseModel> CheckDuplicateAdminGrpDesc(RequestModel requestModel)
        {
            return await adminGroupMasterRepository.CheckDuplicateAdminGrpDesc(requestModel);
        }
        public async Task<AdminGroupMasterList> GetAdminGroupMasterList(ReportRequestModel request)
        {
            return await adminGroupMasterRepository.GetAdminGroupMasterList(request);
        }
        public async Task<ResponseModel> AdminGroupMasterDelete(RequestModel requestModel)
        {
            return await adminGroupMasterRepository.AdminGroupMasterDelete(requestModel);
        }
        public async Task<ResponseModel> GetAdminSortSlNo(RequestModel requestModel)
        {
            return await adminGroupMasterRepository.GetAdminSortSlNo(requestModel);
        }


    }
}
