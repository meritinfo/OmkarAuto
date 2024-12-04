using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBillOutstandingRptBusiness
    {
        Task<ResponseModel> GetAgeingSummRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingDetailRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingSummRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingDetailRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingAnalysisRptExcel(ReportRequestModel request);
    }
}
