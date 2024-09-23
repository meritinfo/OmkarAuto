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
    public class BillRegisterRptBusiness: IBillRegisterRptBusiness
    {
        readonly IBillRegisterRptRepository billRegisterRptRepository;
        public BillRegisterRptBusiness(IBillRegisterRptRepository _billRegisterRptRepository)
        {
            billRegisterRptRepository = _billRegisterRptRepository;
        }
        public async Task<BillRegisterRptListModel> GetBillRegisterRptList(ReportRequestModel request)
        {
            return await billRegisterRptRepository.GetBillRegisterRptList(request);
        }
        public async Task<ResponseModel> GetBillRegisterRptExcel(ReportRequestModel request)
        {
            return await billRegisterRptRepository.GetBillRegisterRptExcel(request);
        }
    }
}
