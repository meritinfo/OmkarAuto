using FinTrans.Models;
using FinTrans.Repository;
using Microsoft.Extensions.Configuration;
using Shared.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BalanceBusiness : IBalanceBusiness
    {
        IConfiguration _configuration;
        readonly IBalanceRepository balanceRepository;
       
        public BalanceBusiness(IConfiguration configuration, IBalanceRepository _balanceRepository)
        {
            _configuration = configuration;
            balanceRepository = _balanceRepository;
        }
       
        public async Task<ResponseModel> GetOpeningBalanceExcel(ReportRequestModel request)
        {
            return await balanceRepository.GetOpeningBalanceExcel(request);
        }
        public async Task<ResponseModel> GetAsOnDateExcel(ReportRequestModel request)
        {
            return await balanceRepository.GetAsOnDateExcel(request);
        }
        public async Task<ResponseModel> GetAsOnDateDetailsExcel(ReportRequestModel request)
        {
            return await balanceRepository.GetAsOnDateDetailsExcel(request);
        }
        public async Task<ResponseModel> GetAsOnDateDetailsGroupExcel(ReportRequestModel request)
        {
            return await balanceRepository.GetAsOnDateDetailsGroupExcel(request);
        }
        public async Task<ResponseModel> GetGivenPeriodExcel(ReportRequestModel request)
        {
            return await balanceRepository.GetGivenPeriodExcel(request);
        }

    }
}
