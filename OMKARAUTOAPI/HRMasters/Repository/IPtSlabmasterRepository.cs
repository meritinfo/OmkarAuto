using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Repository
{
    public interface IPtSlabmasterRepository
    {
        Task<ResponseModel> PtSlabMasterSave(PtSlabMasterModel ptSlabMasterModel);
        Task<PtSlabList> GetPtSlabMasterList(PageRequest request);
        Task<ResponseModel> PtSlabMasterDelete(RequestModel requestModel);
    }
}
