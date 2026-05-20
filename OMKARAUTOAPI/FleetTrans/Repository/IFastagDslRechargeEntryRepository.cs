using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public interface IFastagDslRechargeEntryRepository
    {
        Task<ResponseModel> FastagDslRechargeEntrySave(FastagDslRechargeEntryModel fastagDslRechargeEntryModel);
        Task<ResponseModel> FastagDslRechargeEntryDelete(RequestModel request);
        Task<FastagDslRechargeEntryList> FastagDslRechargeEntryList(ReportRequestModel request);
         Task<List<DropDownListModel>> GetRechargeTypeList();

    }
}
