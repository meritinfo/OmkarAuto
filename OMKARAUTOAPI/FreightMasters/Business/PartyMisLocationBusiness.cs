using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class PartyMisLocationBusiness: IPartyMisLocationBusiness
    {
        readonly IPartyMisLocationRepository partyMisLocationRepository;
        public PartyMisLocationBusiness(IPartyMisLocationRepository _partyMisLocationRepository)
        {
            partyMisLocationRepository = _partyMisLocationRepository;
        }
        public async Task<ResponseModel> PartyMisLocationSave(PartyMisLocationModel partyMisLocationModel)
        {
            return await partyMisLocationRepository.PartyMisLocationSave(partyMisLocationModel);
        }
        public async Task<PartyMisLocationModel> GetPartyMisLocationInnerGridList(RequestModel request)
        {
            return await partyMisLocationRepository.GetPartyMisLocationInnerGridList(request);
        }
        public async Task<ResponseModel> PartyMisLocationDelete(RequestModel requestModel)
        {
            return await partyMisLocationRepository.PartyMisLocationDelete(requestModel);
        }
        public async Task<PartyMisLocationsList> GetPartyMisLocationList(ReportRequestModel request)
           {
            return await partyMisLocationRepository.GetPartyMisLocationList(request);
    }
        public async Task<ResponseModel> CheckDuplicateLocation(RequestModel requestModel)
        {
            return await partyMisLocationRepository.CheckDuplicateLocation(requestModel);
        }

    }
}
