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
    public class FleetLoadEntryBusiness: IFleetLoadEntryBusiness
    {
        readonly IFleetLoadEntryRepository fleetLoadEntryRepository;
        public FleetLoadEntryBusiness(IFleetLoadEntryRepository _fleetLoadEntryRepository)
        {
            fleetLoadEntryRepository = _fleetLoadEntryRepository;
        }
        public async Task<ResponseModel> FleetLoadEntrySave(FleetLoadEntryModel fleetLoadEntryModel)
        {
            return await fleetLoadEntryRepository.FleetLoadEntrySave(fleetLoadEntryModel);
        }
        public async Task<FleetLoadEntryList> GetFleetLoadEntryList(PageRequest request)
        {
            return await fleetLoadEntryRepository.GetFleetLoadEntryList(request);
        }

        public async Task<ResponseModel> FleetLoadEntryDelete(RequestModel requestModel)
        {
            return await fleetLoadEntryRepository.FleetLoadEntryDelete(requestModel);
        }

    }
}
