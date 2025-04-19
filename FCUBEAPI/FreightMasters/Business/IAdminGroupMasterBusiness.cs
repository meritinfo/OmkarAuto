using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IAdminGroupMasterBusiness
    {
        Task<ResponseModel> AdminGroupMasterSave(AdminGroupMasterModel adminGroupMasterModel);
        Task<ResponseModel> CheckDuplicateAdminGrpDesc(RequestModel requestModel);
        Task<ResponseModel> AdminGroupMasterDelete(RequestModel requestModel);
        Task<AdminGroupMasterList> GetAdminGroupMasterList(ReportRequestModel request);
        Task<ResponseModel> GetAdminSortSlNo(RequestModel requestModel);
    }
}
