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
    public class TyreActivateMasterBusiness : ITyreActivateMasterBusiness
    {
        readonly ITyreActivateMasterRepository tyreActivateRepository;
        public TyreActivateMasterBusiness(ITyreActivateMasterRepository _tyreActivateRepository)
        {
            tyreActivateRepository = _tyreActivateRepository;
        }
        public async Task<TyreActivateMasterList> GetTyreActivateMasterList(PageFromDtToDtRequest request)
        {
            return await tyreActivateRepository.GetTyreActivateMasterList(request);
        }
        public async Task<TyreActivateMasterModel> GetTyreActivateMasterInnerGridList(RequestModel request)
        {
            return await tyreActivateRepository.GetTyreActivateMasterInnerGridList(request);
        }
        public async Task<ResponseModel> TyreActivateMasterSave(TyreActivateMasterModel tyreActivateMasterModel)
        {
            return await tyreActivateRepository.TyreActivateMasterSave(tyreActivateMasterModel);
        }
        public async Task<ResponseModel> TyreActivateMasterDelete(RequestModel req)
        {
            return await tyreActivateRepository.TyreActivateMasterDelete(req);
        }
        public async Task<List<DropDownListModel>> GetTyrePositionList()
        {
            return await tyreActivateRepository.GetTyrePositionList();
        }
        public async Task<List<DropDownListModel>> GetBrandTyreNoList(RequestModel request)
        {
            return await tyreActivateRepository.GetBrandTyreNoList(request);
        }
        public async Task<ResponseModel> GetTyreNoCostAmt(RequestModel request)
        {
            return await tyreActivateRepository.GetTyreNoCostAmt(request);
        }
    }


}
