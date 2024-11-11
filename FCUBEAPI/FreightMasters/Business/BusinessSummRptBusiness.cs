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
    public class BusinessSummRptBusiness : IBusinessSummRptBusiness
    {
        readonly IBusinessSummRptRepository businessSummRptRepository;
        public BusinessSummRptBusiness(IBusinessSummRptRepository _businessSummRptRepository)
        {
            businessSummRptRepository = _businessSummRptRepository;
        }
        public async Task<BusinessSummRptListModel> GetBusinessSummRptList(ReportRequestModel request)
        {
            return await businessSummRptRepository.GetBusinessSummRptList(request);
        }
        public async Task<ResponseModel> GetBusinessSummRptExcel(ReportRequestModel request)
        {
            return await businessSummRptRepository.GetBusinessSummRptExcel(request);
        }
    }
}
