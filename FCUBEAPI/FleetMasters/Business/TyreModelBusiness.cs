using DocumentFormat.OpenXml.Office2016.Excel;
using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class TyreModelBusiness : ITyreModelBusiness
    {
        readonly ITyreModelRepository tyreModelRepository;
        public TyreModelBusiness(ITyreModelRepository _tyreModelRepository)
        {
            tyreModelRepository = _tyreModelRepository;
        }
        public async Task<ResponseModel> TyreModelSave(TyreModelMasterModel tyreModelMasterModel)
        {
            return await tyreModelRepository.TyreModelSave(tyreModelMasterModel);
        }

        public async Task<TyreModelMasterList> GetTyreModelMasterList(ReportRequestModel request)
        {
            return await tyreModelRepository.GetTyreModelMasterList(request);
        }
        public async Task<ResponseModel> TyreModelMasterDelete(RequestModel requestModel)
        {
            return await tyreModelRepository.TyreModelMasterDelete(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateTyre(RequestModel requestModel)
        {
            return await tyreModelRepository.CheckDuplicateTyre(requestModel);
        }

    }
}


