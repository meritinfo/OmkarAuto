using FinTrans.Models;
using FinTrans.Repository;
using Shared.Models;

namespace FinTrans.Business
{
    public class MonthlyStatementsBusiness : IMonthlyStatementsBusiness
    {
        readonly IMonthlyStatementsRepository monthlyStatementsRepository;
        public MonthlyStatementsBusiness(IMonthlyStatementsRepository _monthlyStatementsRepository)
        {
            monthlyStatementsRepository = _monthlyStatementsRepository;
        }
        public async Task<ResponseModel> GetMonthlyBookingRptExcel(ReportRequestModel request)
        {
            return await monthlyStatementsRepository.GetMonthlyBookingRptExcel(request);
        }
        public async Task<ResponseModel> GetMonthlyLorryHireRptExcel(ReportRequestModel request)
        {
            return await monthlyStatementsRepository.GetMonthlyLorryHireRptExcel(request);
        }
        public async Task<ResponseModel> GetMonthlyAdminExpRptExcel(ReportRequestModel request)
        {
            return await monthlyStatementsRepository.GetMonthlyAdminExpRptExcel(request);
        }
    }
}
