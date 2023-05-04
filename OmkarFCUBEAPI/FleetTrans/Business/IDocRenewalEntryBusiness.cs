using FleetTrans.Models;

namespace FleetTrans.Business
{
    public interface IDocRenewalEntryBusiness
    {
        Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel);
    }
}

