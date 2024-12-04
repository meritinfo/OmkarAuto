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
    public class BillOutstandingRptBusiness : IBillOutstandingRptBusiness
    {
        readonly IBillOutstandingRptRepository billOutstandingRptRepository;
        public BillOutstandingRptBusiness(IBillOutstandingRptRepository _billOutstandingRptRepository)
        {
            billOutstandingRptRepository = _billOutstandingRptRepository;
        }
        public async Task<ResponseModel> GetAgeingSummRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetAgeingSummRptExcel(request);
        }
        public async Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetAgeingSummBranchRptExcel(request);
        }
        public async Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetAgeingSummPartyRptExcel(request);
        }
        public async Task<ResponseModel> GetAgeingDetailRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetAgeingDetailRptExcel(request);
        }

        public async Task<ResponseModel> GetOutstandingSummRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetOutstandingSummRptExcel(request);
        }
        public async Task<ResponseModel> GetOutstandingDetailRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetOutstandingDetailRptExcel(request);
        }
        public async Task<ResponseModel> GetOutstandingAnalysisRptExcel(ReportRequestModel request)
        {
            return await billOutstandingRptRepository.GetOutstandingAnalysisRptExcel(request);
        }
    }
}
