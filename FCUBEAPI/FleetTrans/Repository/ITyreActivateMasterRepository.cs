using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface ITyreActivateMasterRepository
    {
        Task<ResponseModel> TyreActivateMasterSave(TyreActivateMasterModel tyreActivateMasterModel);
        Task<ResponseModel> TyreActivateMasterDelete(RequestModel req);
        Task<TyreActivateMasterList> GetTyreActivateMasterList(PageRequest request);
        Task<TyreActivateMasterInnerGridModel> GetTyreActivateMasterInnerGridList(RequestModel request);
    }
}
