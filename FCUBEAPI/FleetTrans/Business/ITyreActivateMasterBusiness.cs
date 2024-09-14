using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public  interface ITyreActivateMasterBusiness
    {
        Task<TyreActivateMasterList> GetTyreActivateMasterList(PageFromDtToDtRequest request);
        Task<TyreActivateMasterModel> GetTyreActivateMasterInnerGridList(RequestModel request);
        Task<ResponseModel> TyreActivateMasterSave(TyreActivateMasterModel tyreActivateMasterModel);
        Task<ResponseModel> TyreActivateMasterDelete(RequestModel req);
        Task<List<DropDownListModel>> GetTyrePositionList();
        Task<List<DropDownListModel>> GetBrandTyreNoList(RequestModel request);
        Task<ResponseModel> GetTyreNoCostAmt(RequestModel request);
    }
}
