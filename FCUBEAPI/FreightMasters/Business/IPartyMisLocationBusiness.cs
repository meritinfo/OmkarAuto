using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IPartyMisLocationBusiness
    {
        Task<ResponseModel> PartyMisLocationSave(PartyMisLocationModel partyMisLocationModel);
        Task<PartyMisLocationModel> GetPartyMisLocationInnerGridList(RequestModel request);

        Task<ResponseModel> PartyMisLocationDelete(RequestModel requestModel);
        Task<PartyMisLocationsList> GetPartyMisLocationList(ReportRequestModel request);
        Task<ResponseModel> CheckDuplicateLocation(RequestModel requestModel);

    }
}
