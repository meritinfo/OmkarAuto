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
    public class TyreMgntRptBusiness : ITyreMgntRptBusiness
    {
        readonly ITyreMgntRptRepository tyreMgntRptRepository;
        public TyreMgntRptBusiness(ITyreMgntRptRepository _tyreMgntRptRepository)
        {
            tyreMgntRptRepository = _tyreMgntRptRepository;
        }
        public async Task<TyrePurchaseMasterList> GetTyrePurchaseRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyrePurchaseRptList(request);
        }
        public async Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyrePurchaseRptExcel(request);
        }
        public async Task<TyreMasterList> GetTyreStockRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreStockRptList(request);
        }
        public async Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreStockRptExcel(request);
        }
        public async Task<TyreMasterList> GetTyreHistoryRptList(RequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreHistoryRptList(request);
        }
        public async Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreHistoryRptExcel(request);
        }
        public async Task<TyreMasterList> GetActiveTyreRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetActiveTyreRptList(request);
        }
        public async Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetActiveTyreRptExcel(request);
        }
    }
}
