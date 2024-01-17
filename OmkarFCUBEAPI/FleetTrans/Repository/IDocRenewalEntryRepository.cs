using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Repository
{
    /// <summary>
    /// DocRenewalEntry service interface methods
    /// </summary>
    public interface IDocRenewalEntryRepository
    {
        Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel);
        Task<ResponseModel> DocRenewalEntryDetailsDelete(RequestModel request);
        Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request);
        Task<List<DropDownListModel>> GetDocRenewalList();
        Task<List<DropDownListModel>> GetPaymentCreditAcList(RequestModel request);
        Task<ResponseModel> ChkDocrenewalValidity(DocRenewalEntryModel docRenewalEntryModel);
    }
}
