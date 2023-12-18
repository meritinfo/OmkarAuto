using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDocRenewalEntryBusiness
    {
        Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel);
        Task<ResponseModel> DocRenewalEntryDetailsDelete(Request request);
        Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request);
        Task<List<DropDownListModel>> GetDocRenewalList();
        Task<List<DropDownListModel>> GetPaymentCreditAcList(Request request);
    }
}

