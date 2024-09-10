using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class ChallanRegisterRptBusiness : IChallanRegisterRptBusiness
    {
        readonly IChallanRegisterRptRepository challanRegisterRptRepository;
        public ChallanRegisterRptBusiness(IChallanRegisterRptRepository _challanRegisterRptRepository)
        {
            challanRegisterRptRepository = _challanRegisterRptRepository;
        }
        public async Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request)
        {
            return await challanRegisterRptRepository.GetChallanRegisterRptList(request);
        }
        public async Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request)
        {
            return await challanRegisterRptRepository.GetChallanRegisterRptExcel(request);
        }

    }
}
