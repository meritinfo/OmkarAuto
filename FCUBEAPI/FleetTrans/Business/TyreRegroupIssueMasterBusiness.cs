using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class TyreRegroupIssueMasterBusiness: ITyreRegroupIssueMasterBusiness
    {
        readonly ITyreRegroupIssueMasterRepository tyreRegroupIssueMasterRepository;
        public TyreRegroupIssueMasterBusiness(ITyreRegroupIssueMasterRepository _tyreRegroupIssueMasterRepository)
        {
            tyreRegroupIssueMasterRepository = _tyreRegroupIssueMasterRepository;
        }
        public async Task<ResponseModel> TyreRegroupIssueMasterSave(TyreRegroupIssueMasterModel tyreRegroupIssueMasterModel)
        {
            return await tyreRegroupIssueMasterRepository.TyreRegroupIssueMasterSave(tyreRegroupIssueMasterModel);
        }
       
        public async Task<TyreRegroupIssueMasterList> GetTyreRegroupIssueMasterList(PageRequest request)
        {
            return await tyreRegroupIssueMasterRepository.GetTyreRegroupIssueMasterList(request);
        }
        public async Task<TyreRegroupIssueMasterInnerGridModel> GetTyreRegroupIssueMasterInnerGridList(RequestModel request)
        {
            
                return await tyreRegroupIssueMasterRepository.GetTyreRegroupIssueMasterInnerGridList(request);
            

        }
        public async Task<ResponseModel> TyreRegroupIssueMasterDelete(RequestModel req)
        {

            return await tyreRegroupIssueMasterRepository.TyreRegroupIssueMasterDelete(req);


        }
    }
}
