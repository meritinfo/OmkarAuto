using FleetTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetTrans.Repository
{
    public  interface IFleetLoadEntryRepository
    {
        Task<FleetLoadEntryList> GetFleetLoadEntryList(ReportRequestModel request);
        Task<ResponseModel> FleetLoadEntryDelete(RequestModel requestModel);
        Task<ResponseModel> FleetLoadEntrySave(FleetLoadEntryModel fleetLoadEntryModel);

    }
}
