using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IDocRenewalMasterBusiness
    {
        Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel DocRenewalMasterModel);
        Task<DocRenewalMasterList> GetDocRenewalMasterList(PageRequest request);

    }
}
