using AdminMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Repository
{
    public interface IHrMasterRepository
    {
        Task<ResponseModel> HrMasterSave(HrMasterModel hrMasterModel);
        Task<HrMasterList> GetHrMasterList(PageRequest request);
    }
}
