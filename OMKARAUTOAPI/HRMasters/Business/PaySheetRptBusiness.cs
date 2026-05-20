using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Business
{
    public class PaySheetRptBusiness : IPaySheetRptBusiness
    {
        readonly IPaySheetRptRepository payGenerationRepository;
        public PaySheetRptBusiness(IPaySheetRptRepository _payGenerationRepository)
        {
            payGenerationRepository = _payGenerationRepository;
        }

        public async Task<EmpPayGenList> GetPaySheetRptList(ReportRequestModel request)
        {
            return await payGenerationRepository.GetPaySheetRptList(request);
        }
        public async Task<ResponseModel> GetPaySheetRptExcel(RequestModel request)
        {
            return await payGenerationRepository.GetPaySheetRptExcel(request);
        }
        public async Task<ResponseModel> GetPfECRExcel(RequestModel request)
        {
            return await payGenerationRepository.GetPfECRExcel(request);
        }
        public async Task<ResponseModel> GetPfECRText(RequestModel request)
        {
            return await payGenerationRepository.GetPfECRText(request);
        }

    }
}
