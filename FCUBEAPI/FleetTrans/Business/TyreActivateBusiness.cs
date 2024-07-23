using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using FleetMasters.Models;
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
    public class TyreActivateBusiness : ITyreActivateBusiness
    {
        readonly ITyreActivateRepository tyreActivateRepository;
        public TyreActivateBusiness(ITyreActivateRepository _tyreActivateRepository)
        {
            tyreActivateRepository = _tyreActivateRepository;
        }
        public async Task<ResponseModel> TyrePurchaseMasterSave(TyrePurchaseMasterModel tyrePurchaseMasterModel)
        {
            return await tyreActivateRepository.TyrePurchaseMasterSave(tyrePurchaseMasterModel);
        }
        public async Task<ResponseModel> TyrePurchaseMasterDelete(RequestModel req)
        {
            return await tyreActivateRepository.TyrePurchaseMasterDelete(req);
        }
        public async Task<ResponseModel> ChkTyreNoDuplicate(RequestModel req)
        {
            return await tyreActivateRepository.ChkTyreNoDuplicate(req);
        }
        public async Task<TyrePurchaseMasterList> GetTyrePurchaseMasterList(PageRequest request)
        {
            return await tyreActivateRepository.GetTyrePurchaseMasterList(request);
        }
        public async Task<TyrePurchaseMasterInnerGridModel> GetTyrePurchaseMasterInnerGridList(RequestModel request)
        {
            return await tyreActivateRepository.GetTyrePurchaseMasterInnerGridList(request);
        }
        public async Task<List<DropDownListModel>> GetBrandList()
        {
            return await tyreActivateRepository.GetBrandList();
        }
        public async Task<List<DropDownListModel>> GetModelList()
        {
            return await tyreActivateRepository.GetModelList();
        }
        public async Task<List<DropDownListModel>> GetVendorList()
        {
            return await tyreActivateRepository.GetVendorList();
        }

    }
}
