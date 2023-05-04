
using FleetMasters.Models;

namespace FleetMasters.Repository
{
    public interface IDocRenewalMasterRepository
    {
        Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel docRenewalMasterModel);
    }
}
