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
        public async Task<TyreMgntReportList> GetTyrePurchaseRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyrePurchaseRptList(request);
        }
        public async Task<ResponseModel> GetTyrePurchaseRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyrePurchaseRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreStockRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreStockRptList(request);
        }
        public async Task<ResponseModel> GetTyreStockRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreStockRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreHistoryRptList(RequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreHistoryRptList(request);
        }
        public async Task<ResponseModel> GetTyreHistoryRptExcel(RequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreHistoryRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetActiveTyreRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetActiveTyreRptList(request);
        }
        public async Task<ResponseModel> GetActiveTyreRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetActiveTyreRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreActivatedRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreActivatedRptList(request);
        }
        public async Task<ResponseModel> GetTyreActivatedRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreActivatedRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreDeActivatedRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreDeActivatedRptList(request);
        }
        public async Task<ResponseModel> GetTyreDeActivatedRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreDeActivatedRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreReGroupIssRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreReGroupIssRptList(request);
        }
        public async Task<ResponseModel> GetTyreReGroupIssRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreReGroupIssRptExcel(request);
        }
        public async Task<TyreMgntReportList> GetTyreReGroupRcvdRptList(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreReGroupRcvdRptList(request);
        }
        public async Task<ResponseModel> GetTyreReGroupRcvdRptExcel(ReportRequestModel request)
        {
            return await tyreMgntRptRepository.GetTyreReGroupRcvdRptExcel(request);
        }

    }
}
