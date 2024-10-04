using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IPartyGroupMasterBusiness
    {

        Task<ResponseModel> PartyGroupMasterSave(PartyGroupMasterModel partyGroupMasterModel);
        Task<PartyGroupMasterList> GetPartyGroupMasterList(PageRequestDtBrVh request);
        Task<ResponseModel> PartyGroupMasterDelete(RequestModel requestModel);
        Task<PartyGroupMasterModel> GetPartyGroupDetailInnergrid(RequestModel request);
    }
}
