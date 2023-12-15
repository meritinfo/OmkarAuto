using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;

namespace FleetMasters.Business
{
    public class DocRenewalMasterBusiness : IDocRenewalMasterBusiness
    {
        readonly IDocRenewalMasterRepository docRenewalMasterRepository;
        public DocRenewalMasterBusiness(IDocRenewalMasterRepository _docRenewalMasterRepository)
        {
            docRenewalMasterRepository = _docRenewalMasterRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="docRenewalMasterModel"></param>
        public async Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel docRenewalMasterModel)
        {
            return await docRenewalMasterRepository.DocRenewalMasterSave(docRenewalMasterModel);
        }
        public async Task<DocRenewalMasterList> GetDocRenewalMasterList(PageRequest request)
        {
            return await docRenewalMasterRepository.GetDocRenewalMasterList(request);
        }
    }
}
