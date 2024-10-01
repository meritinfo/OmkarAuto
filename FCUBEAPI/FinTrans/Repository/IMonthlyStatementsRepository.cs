using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// Finance Account Master service interface methods
    /// </summary>
    public interface IMonthlyStatementsRepository
    {
        Task<ResponseModel> GetMonthlyBookingRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyLorryHireRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyAdminExpRptExcel(ReportRequestModel requestModel);

    }
}
