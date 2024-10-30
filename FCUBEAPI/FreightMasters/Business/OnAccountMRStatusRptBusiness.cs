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
    public class OnAccountMRStatusRptBusiness : IOnAccountMRStatusRptBusiness
    {
        readonly IOnAccountMRStatusRptRepository onAccountMRStatusRptRepository;
        public OnAccountMRStatusRptBusiness(IOnAccountMRStatusRptRepository _onAccountMRStatusRptRepository)
        {
            onAccountMRStatusRptRepository = _onAccountMRStatusRptRepository;
        }
        public async Task<OnAccountMRStatusRptListModel> GetOnAccountMRStatusRptList(ReportRequestModel request)
        {
            return await onAccountMRStatusRptRepository.GetOnAccountMRStatusRptList(request);
        }
        public async Task<ResponseModel> GetOnAccountMRStatusRptExcel(ReportRequestModel request)
        {
            return await onAccountMRStatusRptRepository.GetOnAccountMRStatusRptExcel(request);
        }
    }
}
