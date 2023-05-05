using FleetTrans.Models;

namespace FleetTrans.Repository
{
    /// <summary>
    /// DocRenewalEntry service interface methods
    /// </summary>
    public interface IDocRenewalEntryRepository
    {
        Task<ResponseModel> DocRenewalEntryDetailsSave(DocRenewalEntryModel docRenewalEntryModel);
    }
}
