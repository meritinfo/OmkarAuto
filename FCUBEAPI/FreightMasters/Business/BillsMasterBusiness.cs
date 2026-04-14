using DocumentFormat.OpenXml.Drawing;
using DocumentFormat.OpenXml.Office2016.Excel;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public class BillsMasterBusiness: IBillsMasterBusiness
    {
        readonly IBillsMasterRepository billsRepository;
        public BillsMasterBusiness(IBillsMasterRepository _billsRepository)
        {
            billsRepository = _billsRepository;
        }
        public async Task<BillsMasterSearchListModel> GetBillsMasterSearchList(RequestModel request)
        {
            return await billsRepository.GetBillsMasterSearchList(request);
        }
        public async Task<BillsListModel> GetBillsMasterList(ReportRequestModel request)
        {
            return await billsRepository.GetBillsMasterList(request);
        }
        public async Task<BillsMasterSearchListModel> GetBillsInnerGridList(RequestModel request)
        {
            return await billsRepository.GetBillsInnerGridList(request);
        }
        public async Task<ResponseModel> BillsMasterSave(BillsMasterModel billsModel)
        {
            return await billsRepository.BillsMasterSave(billsModel);
        }
        public async Task<ResponseModel> BillsMasterDelete(RequestModel request)
        {
            return await billsRepository.BillsMasterDelete(request);
        }
        public async Task<ResponseModel> LrBillUpdate(RequestModel reqmodel)
        {
            return await billsRepository.LrBillUpdate(reqmodel);
        }
        public async Task<List<DropDownListModel>> GetBillPartyGstLocationList(RequestModel requestModel)
        {
            return await billsRepository.GetBillPartyGstLocationList(requestModel);
        }
        public async Task<ResponseModel> CheckDuplicateBillsNo(BillsMasterModel requestModel)
        {
            return await billsRepository.CheckDuplicateBillsNo(requestModel);
        }
        public async Task<ResponseModel> GetBillTypeSacHsn(RequestModel requestModel)
        {
            return await billsRepository.GetBillTypeSacHsn(requestModel);
        }
        public async Task<ResponseModel> GetBillPdf(ReportRequestModel request)
        {
            return await billsRepository.GetBillPdf(request);
        }
        public async Task<ResponseModel> GetBillGsrPdf(ReportRequestModel request) 
        {
            return await billsRepository.GetBillGsrPdf(request);
        }
        public async Task<BillsMasterModel> GetBillEnqDetails(RequestModel req)
        {
            return await billsRepository.GetBillEnqDetails(req);
        }
        public async Task<BillsMasterModel> GetBillEnqInnerGridList(RequestModel request)
          {
            return await billsRepository.GetBillEnqInnerGridList(request);
    }
}
}
