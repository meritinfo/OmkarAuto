using DocumentFormat.OpenXml.Drawing;
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
    public class SparesPurchaseMasterBusiness: ISparesPurchaseMasterBusiness
    {
        readonly ISparesPurchaseMasterRepository sparesPurchaseRepository;
        public SparesPurchaseMasterBusiness(ISparesPurchaseMasterRepository _sparesPurchaseRepository)
        {
            sparesPurchaseRepository = _sparesPurchaseRepository;
        }
        public async Task<ResponseModel> SparesPurchaseMasterSave(SparesPurchaseMasterModel sparesPurchaseMasterModel)
        {
            return await sparesPurchaseRepository.SparesPurchaseMasterSave(sparesPurchaseMasterModel);
        }
        public async Task<SparesPurchaseMasterModel> GetSparesPurchaseMasterInnerGridList(RequestModel request)
        {
            return await sparesPurchaseRepository.GetSparesPurchaseMasterInnerGridList(request);
        }
        public async Task<ResponseModel> SparesPurchaseMasterDelete(RequestModel req)
         {
            return await sparesPurchaseRepository.SparesPurchaseMasterDelete(req);
         }
        public async Task<SparesPurchaseMasterList> GetSparesPurchaseMasterList(PageFromDtToDtRequest request)
        {   
            return await sparesPurchaseRepository.GetSparesPurchaseMasterList(request);
        }
        public async Task<List<DropDownListModel>> GetSparesList()
        {
            return await sparesPurchaseRepository.GetSparesList();
        }
        public async Task<List<DropDownListModel>> GetSparesBrandList()
        {
            return await sparesPurchaseRepository.GetSparesBrandList();

        }


    }
}
