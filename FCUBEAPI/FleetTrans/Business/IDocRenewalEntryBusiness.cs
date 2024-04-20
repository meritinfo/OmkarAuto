using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDocRenewalEntryBusiness
    {
        Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel);
        Task<ResponseModel> DocRenewalEntryDetailsDelete(RequestModel request);
        Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request);
        Task<List<DropDownListModel>> GetDocRenewalList();
        Task<List<DropDownListModel>> GetPaymentCreditAcList(RequestModel request);
        Task<ResponseModel> ChkDocrenewalValidity(DocRenewalEntryModel docRenewalEntryModel);
    }
}

