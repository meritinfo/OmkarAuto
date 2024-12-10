using DocumentFormat.OpenXml.Office2016.Excel;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Business
{
    public class FastagDslRechargeEntryBusiness: IFastagDslRechargeEntryBusiness
    {
        readonly IFastagDslRechargeEntryRepository fastagDslRechargeEntryRepository;
        public FastagDslRechargeEntryBusiness(IFastagDslRechargeEntryRepository _fastagDslRechargeEntryRepository)
        {
            fastagDslRechargeEntryRepository = _fastagDslRechargeEntryRepository;
        }
      

        public async Task<ResponseModel> FastagDslRechargeEntrySave(FastagDslRechargeEntryModel fastagDslRechargeEntryModel)
        {
            return await fastagDslRechargeEntryRepository.FastagDslRechargeEntrySave(fastagDslRechargeEntryModel);
        }
        public async Task<FastagDslRechargeEntryList> FastagDslRechargeEntryList(ReportRequestModel request)
         {
            return await fastagDslRechargeEntryRepository.FastagDslRechargeEntryList(request);
        }
        public async Task<ResponseModel> FastagDslRechargeEntryDelete(RequestModel request)
        {
            return await fastagDslRechargeEntryRepository.FastagDslRechargeEntryDelete(request);
        }
        public async Task<List<DropDownListModel>> GetRechargeTypeList()
        {
            return await fastagDslRechargeEntryRepository.GetRechargeTypeList();
        }


    }
}
