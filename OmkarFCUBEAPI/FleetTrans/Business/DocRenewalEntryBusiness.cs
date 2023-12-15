using FleetTrans.Business;
using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class DocRenewalEntryBusiness : IDocRenewalEntryBusiness
    {
        readonly IDocRenewalEntryRepository docRenewalEntryRepository;
        public DocRenewalEntryBusiness(IDocRenewalEntryRepository _docRenewalEntryRepository)
        {
            docRenewalEntryRepository = _docRenewalEntryRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel)
        {
            return await docRenewalEntryRepository.DocRenewalEntryDetailsSave(docRenewalEntryModel);
        }

        public async Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request)
        {
            return await docRenewalEntryRepository.GetDocRenewalEntryList(request);
        }


    }
}
