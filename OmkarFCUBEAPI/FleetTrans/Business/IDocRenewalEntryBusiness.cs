using FleetTrans.Models;
using Shared.Models;

namespace FleetTrans.Business
{
    public interface IDocRenewalEntryBusiness
    {
        Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel);
        Task<DocRenewalEntryList> GetDocRenewalEntryList(PageRequest request);
    }
}

