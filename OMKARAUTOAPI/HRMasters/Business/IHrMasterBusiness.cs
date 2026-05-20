using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Business
{
    public interface IHrMasterBusiness
    {
        Task<ResponseModel> HrMasterSave(HrMasterModel HrMasterModel);
        Task<HrMasterList> GetHrMasterList(PageRequest request);
        Task<ResponseModel> HrMasterDelete(RequestModel request);
        Task<ResponseModel> CheckHrcode(RequestModel request);
    }
}
