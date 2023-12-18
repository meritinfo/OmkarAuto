
using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Repository
{
    public interface IDocRenewalMasterRepository
    {
        Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel docRenewalMasterModel);
        Task<DocRenewalMasterList> GetDocRenewalMasterList(PageRequest request);
        Task<ResponseModel> DocRenewalMasterDetailsDelete(Request request);
        Task<List<DropDownListModel>> GetDebitAcList();

    }
}
