using FinanceMaster.Models;
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public interface ICnorCneeGstRepository
    {
        Task<ResponseModel> CnorCneeGstDelete(RequestModel requestModel);
        Task<CnorCneeGstList> GetCnorCneeGstList(PageRequest request);
        Task<ResponseModel> CnorCneeGstSave(CnorCneeGstModel cnorCneeGstModel);

    }
}
