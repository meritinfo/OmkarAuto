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

        public async Task<ResponseModel> DocRenewalEntryDetailsDelete(RequestModel request)
        {
            return await docRenewalEntryRepository.DocRenewalEntryDetailsDelete(request);
        }

        public async Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request)
        {
            return await docRenewalEntryRepository.GetDocRenewalEntryList(request);
        }
        public async Task<List<DropDownListModel>> GetDocRenewalList()
        {
            return await docRenewalEntryRepository.GetDocRenewalList();
        }
        public async Task<List<DropDownListModel>> GetPaymentCreditAcList(RequestModel request) 
        { 
            return await docRenewalEntryRepository.GetPaymentCreditAcList(request);
        }        
        public async Task<ResponseModel> ChkDocrenewalValidity(DocRenewalEntryModel docRenewalEntryModel)
        {
            return await docRenewalEntryRepository.ChkDocrenewalValidity(docRenewalEntryModel);
        }

    }
}
