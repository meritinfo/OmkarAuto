using FinTrans.Models;
using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinTrans.Business
{
    public interface IBalanceBusiness
    {
        Task<ResponseModel> GetOpeningBalanceExcel(ReportRequestModel request);
        Task<ResponseModel> GetAsOnDateExcel(ReportRequestModel request);
        Task<ResponseModel> GetAsOnDateDetailsExcel(ReportRequestModel request);
        Task<ResponseModel> GetAsOnDateDetailsGroupExcel(ReportRequestModel request);
        Task<ResponseModel> GetGivenPeriodExcel(ReportRequestModel request);
    }
}
