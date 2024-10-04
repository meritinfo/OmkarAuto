using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Finance Account business interface methods
    /// </summary>
    public interface IMonthlyStatementsBusiness
    {
        Task<ResponseModel> GetMonthlyBookingRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyLorryHireRptExcel(ReportRequestModel requestModel);
        Task<ResponseModel> GetMonthlyAdminExpRptExcel(ReportRequestModel requestModel);
    }

}
