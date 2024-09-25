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
    public class MRRegisterRptBusiness: IMRRegisterRptBusiness
    {
        readonly IMRRegisterRptRepository mRRegisterRptRepository;
        public MRRegisterRptBusiness(IMRRegisterRptRepository _mRRegisterRptRepository)
        {
            mRRegisterRptRepository = _mRRegisterRptRepository;
        }
        public async Task<MRRegisterRptListModel> GetMRRegisterRptList(ReportRequestModel request)
        {
            return await mRRegisterRptRepository.GetMRRegisterRptList(request);
        }
        public async Task<ResponseModel> GetMRRegisterRptExcel(ReportRequestModel request)
        {
            return await mRRegisterRptRepository.GetMRRegisterRptExcel(request);
        }
    }
}
