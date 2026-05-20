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
    public class BillsMasterLlpBusiness: IBillsMasterLlpBusiness
    {
        readonly IBillsMasterLlpRepository billsRepository;
        public BillsMasterLlpBusiness(IBillsMasterLlpRepository _billsRepository)
        {
            billsRepository = _billsRepository;
        }
        public async Task<BillsMasterSearchListModelLLP> GetBillsMasterSearchList(RequestModel request)
        {
            return await billsRepository.GetBillsMasterSearchList(request);
        }
        public async Task<BillsListModelLLP> GetBillsMasterList(ReportRequestModel request)
        {
            return await billsRepository.GetBillsMasterList(request);
        }
        public async Task<BillsMasterSearchListModelLLP> GetBillsInnerGridList(RequestModel request)
        {
            return await billsRepository.GetBillsInnerGridList(request);
        }
        public async Task<ResponseModel> BillsMasterSaveLLP(BillsMasterModelLLP billsModel)
        {
            return await billsRepository.BillsMasterSaveLLP(billsModel);
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
        public async Task<ResponseModel> CheckDuplicateBillsNo(ReportRequestModel request)
        {
            return await billsRepository.CheckDuplicateBillsNo(request);
        }
        public async Task<ResponseModel> GetBillTypeSacHsn(RequestModel requestModel)
        {
            return await billsRepository.GetBillTypeSacHsn(requestModel);
        }
        public async Task<ResponseModel> GetBillPdfLlp(RepReqModel request)
        {
            return await billsRepository.GetBillPdfLlp(request);
        }
        public async Task<BillsMasterModelLLP> GetBillEnqDetails(RequestModel req)
        {
            return await billsRepository.GetBillEnqDetails(req);
        }
        public async Task<BillsMasterModelLLP> GetBillEnqInnerGridList(RequestModel request)
        {
            return await billsRepository.GetBillEnqInnerGridList(request);
        }
        public async Task<ResponseModel> GetBillNoLLP(RequestModel req)
        {
            return await billsRepository.GetBillNoLLP(req);
        }
        public async Task<ResponseModel> BillsMasterVehDtlUpdateLLP(BillsMasterModelLLP billsModel)
        {
            return await billsRepository.BillsMasterVehDtlUpdateLLP(billsModel);
        }
        public async Task<BillsMasterModelLLP> GetBillsVehDetailInnerGridList(RequestModel request)
        {
            return await billsRepository.GetBillsVehDetailInnerGridList(request);
        }

    }
}
