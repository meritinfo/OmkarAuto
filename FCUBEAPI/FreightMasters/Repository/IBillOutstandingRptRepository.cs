using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBillOutstandingRptRepository
    {
        Task<ResponseModel> GetAgeingSummRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingSummBranchRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingSummPartyRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetAgeingDetailRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingSummRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingDetailRptExcel(ReportRequestModel request);
        Task<ResponseModel> GetOutstandingAnalysisRptExcel(ReportRequestModel request);
        Task<OutstandingAnalRptListModel> GetOutstandingAnalysisRptList(ReportRequestModel request);
    }
}
