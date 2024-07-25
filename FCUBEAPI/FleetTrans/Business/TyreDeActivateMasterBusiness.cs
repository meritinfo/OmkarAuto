using DocumentFormat.OpenXml.Drawing;
using FleetTrans.Models;
using FleetTrans.Repository;
using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class TyreDeActivateMasterBusiness: ITyreDeActivateMasterBusiness
    {
        readonly ITyreDeActivateMasterRepository tyreDeActivateRepository;
        public TyreDeActivateMasterBusiness(ITyreDeActivateMasterRepository _tyreDeActivateRepository)
        {
            tyreDeActivateRepository = _tyreDeActivateRepository;
        }
        public async Task<TyreDeActivateMasterList> GetTyreDeActivateMasterList(PageFromDtToDtRequest request)
        {
            return await tyreDeActivateRepository.GetTyreDeActivateMasterList(request);
        }
        public async Task<TyreDeActivateMasterModel> GetTyreDeActivateMasterInnerGridList(RequestModel request)
        {
            return await tyreDeActivateRepository.GetTyreDeActivateMasterInnerGridList(request);
        }
        public async Task<ResponseModel> TyreDeActivateMasterSave(TyreDeActivateMasterModel tyreDeActivateMasterModel)
        {
            return await tyreDeActivateRepository.TyreDeActivateMasterSave(tyreDeActivateMasterModel);
        }
        public async Task<ResponseModel> TyreDeActivateMasterDelete(RequestModel req)
        {
            return await tyreDeActivateRepository.TyreDeActivateMasterDelete(req);
        }

    }
}
