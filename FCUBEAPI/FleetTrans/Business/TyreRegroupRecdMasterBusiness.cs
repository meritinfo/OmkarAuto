using DocumentFormat.OpenXml.Drawing;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class TyreRegroupRecdMasterBusiness: ITyreRegroupRecdMasterBusiness
    {
        readonly ITyreRegroupRecdMasterRepository tyreRegroupRecdMasterRepository;
        public TyreRegroupRecdMasterBusiness(ITyreRegroupRecdMasterRepository _tyreRegroupRecdMasterRepository)
        {
            tyreRegroupRecdMasterRepository = _tyreRegroupRecdMasterRepository;
        }
        public async Task<ResponseModel> TyreRegroupRecdMasterSave(TyreRegroupRecdMasterModel tyreRegroupRecdMasterModel)
        {
            return await tyreRegroupRecdMasterRepository.TyreRegroupRecdMasterSave(tyreRegroupRecdMasterModel);
        }
        public async Task<TyreRegroupRecdMasterInnerGridModel> GetTyreRegroupRecdMasterInnerGridList(RequestModel request)
        {
            return await tyreRegroupRecdMasterRepository.GetTyreRegroupRecdMasterInnerGridList(request);
        }
        public async Task<ResponseModel> TyreRegroupRecdMasterDelete(RequestModel req)
        {
            return await tyreRegroupRecdMasterRepository.TyreRegroupRecdMasterDelete(req);
        }
        public async Task<TyreRegroupRecdList> GetTyreRegroupRecdMasterList(PageRequest request)
        {
            return await tyreRegroupRecdMasterRepository.GetTyreRegroupRecdMasterList(request);
        }
    }
}
