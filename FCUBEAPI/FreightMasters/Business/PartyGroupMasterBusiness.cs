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
    public class PartyGroupMasterBusiness : IPartyGroupMasterBusiness
    {
        readonly IPartyGroupMasterRepository partyGroupMasterRepository;
        public PartyGroupMasterBusiness(IPartyGroupMasterRepository _partyGroupMasterRepository)
        {
            partyGroupMasterRepository = _partyGroupMasterRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>

        public async Task<ResponseModel> PartyGroupMasterSave(PartyGroupMasterModel partyGroupMasterModel)
        {
            return await partyGroupMasterRepository.PartyGroupMasterSave(partyGroupMasterModel);
        }

        public async Task<PartyGroupMasterList> GetPartyGroupMasterList(PageRequestDtBrVh request)
        {
            return await partyGroupMasterRepository.GetPartyGroupMasterList(request);
        }
        public async Task<ResponseModel> PartyGroupMasterDelete(RequestModel requestModel)
        {
            return await partyGroupMasterRepository.PartyGroupMasterDelete(requestModel);
        }
        public async Task<PartyGroupMasterModel> GetPartyGroupDetailInnergrid(RequestModel request)
        {
            return await partyGroupMasterRepository.GetPartyGroupDetailInnergrid(request);
        }


    }
}
