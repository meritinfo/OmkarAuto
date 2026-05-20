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
    public class TyrePurchaseMasterBusiness: ITyrePurchaseMasterBusiness
    {
        readonly ITyrePurchaseMasterRepository tyrePurchaseRepository;
        public TyrePurchaseMasterBusiness(ITyrePurchaseMasterRepository _tyrePurchaseRepository)
        {
            tyrePurchaseRepository = _tyrePurchaseRepository;
        }
        public async Task<ResponseModel> TyrePurchaseMasterSave(TyrePurchaseMasterModel tyrePurchaseMasterModel)
        {
            return await tyrePurchaseRepository.TyrePurchaseMasterSave(tyrePurchaseMasterModel);
        }
        public async Task<ResponseModel> TyrePurchaseMasterDelete(RequestModel req)
        {
            return await tyrePurchaseRepository.TyrePurchaseMasterDelete(req);
        }
        public async Task<ResponseModel> ChkTyreNoDuplicate(RequestModel req)
        {
            return await tyrePurchaseRepository.ChkTyreNoDuplicate(req);
        }
        public async Task<TyrePurchaseMasterList> GetTyrePurchaseMasterList(PageFromDtToDtRequest request)
        {
            return await tyrePurchaseRepository.GetTyrePurchaseMasterList(request);
        }
        public async Task<TyrePurchaseMasterModel> GetTyrePurchaseMasterInnerGridList(RequestModel request)
        {
            return await tyrePurchaseRepository.GetTyrePurchaseMasterInnerGridList(request);
        }
        public async Task<List<DropDownListModel>> GetTyreBrandList()
        {
            return await tyrePurchaseRepository.GetTyreBrandList();
        }
        public async Task<List<DropDownListModel>> GetModelList()
        {
            return await tyrePurchaseRepository.GetModelList();
        }
        public async Task<List<DropDownListModel>> GetVendorList()
        {
            return await tyrePurchaseRepository.GetVendorList();
        }
        public async Task<RequestModel> GetVendorDetails(RequestModel request)
        {
            return await tyrePurchaseRepository.GetVendorDetails(request);
        }

    }
}
