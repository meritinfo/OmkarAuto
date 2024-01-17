using AdminMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminMasters.Business
{
    public interface IPtSlabMasterBusiness
    {
        Task<ResponseModel> PtSlabMasterSave(PtSlabMasterModel ptSlabMasterModel);
        Task<PtSlabList> GetPtSlabMasterList(PageRequest request);

    }
}
