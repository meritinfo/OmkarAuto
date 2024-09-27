using FinanceMaster.Models;
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Business
{
    public interface ICnorCneeGstBusiness
    {
        Task<ResponseModel> CnorCneeGstDelete(RequestModel requestModel);
        Task<CnorCneeGstList> GetCnorCneeGstList(PageRequest request);
        Task<ResponseModel> CnorCneeGstSave(CnorCneeGstModel cnorCneeGstModel);
    }
}
