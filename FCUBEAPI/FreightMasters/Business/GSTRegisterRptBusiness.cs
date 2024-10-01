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
    public class GSTRegisterRptBusiness: IGSTRegisterRptBusiness
    {
        readonly IGSTRegisterRptRepository gSTRegisterRptRepository;
        public GSTRegisterRptBusiness(IGSTRegisterRptRepository _gSTRegisterRptRepository)
        {
            gSTRegisterRptRepository = _gSTRegisterRptRepository;
        }
        public async Task<GSTRegisterRptListModel> GetGSTRegisterRptList(ReportRequestModel request)
        {
            return await gSTRegisterRptRepository.GetGSTRegisterRptList(request);
        }
        public async Task<ResponseModel> GetGSTRegisterRptExcel(ReportRequestModel request)
        {
            return await gSTRegisterRptRepository.GetGSTRegisterRptExcel(request);
        }
    }
}
