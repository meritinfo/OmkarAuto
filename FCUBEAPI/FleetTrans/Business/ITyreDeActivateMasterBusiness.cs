using FleetTrans.Models;
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public interface ITyreDeActivateMasterBusiness
    {
        Task<ResponseModel> TyreDeActivateMasterSave(TyreDeActivateMasterModel tyreDeActivateMasterModel);
        Task<ResponseModel> TyreDeActivateMasterDelete(RequestModel req);
        Task<TyreDeActivateMasterList> GetTyreDeActivateMasterList(PageRequest request);
        Task<TyreDeActivateMasterInnerGridModel> GetTyreDeActivateMasterInnerGridList(RequestModel request);

    }
}
