using AdminMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Business
{
    public interface IHrMasterBusiness
    {
        Task<ResponseModel> HrMasterSave(HrMasterModel HrMasterModel);
        Task<HrMasterList> GetHrMasterList(PageRequest request);
    }
}
