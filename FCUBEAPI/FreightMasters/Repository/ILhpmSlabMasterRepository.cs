using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface ILhpmSlabMasterRepository
    {
        Task<LhpmSlabMasterList> GetLhpmSlabMasterList(PageRequest request);
        Task<ResponseModel> LhpmSlabMasterSave(LhpmSlabMasterModel lhpmSlabMasterModel);
        Task<ResponseModel> LhpmSlabMasterDelete(RequestModel requestModel);
        Task<List<DropDownListModel>> GetVehicleList();

    }
}
