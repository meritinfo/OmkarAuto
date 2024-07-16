using FinTrans.Models;
using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinTrans.Repository
{
    /// <summary>
    /// Service interface methods
    /// </summary>
    public interface IBalanceRepository
    {
        Task<ResponseModel> GetOpeningBalanceExcel(ReportRequestModel request);
        Task<ResponseModel> GetAsOnDateExcel(ReportRequestModel request);
        Task<ResponseModel> GetAsOnDateDetailsExcel(ReportRequestModel request);
        Task<ResponseModel> GetAsOnDateDetailsGroupExcel(ReportRequestModel request);
        Task<ResponseModel> GetGivenPeriodExcel(ReportRequestModel request);
    }
}
