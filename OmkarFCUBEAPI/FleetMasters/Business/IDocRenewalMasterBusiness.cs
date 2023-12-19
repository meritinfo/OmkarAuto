using FleetMasters.Models;
using Shared.Models;

namespace FleetMasters.Business
{
    public interface IDocRenewalMasterBusiness
    {
        Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel DocRenewalMasterModel);
        Task<DocRenewalMasterList> GetDocRenewalMasterList(PageRequest request);
        Task<ResponseModel> DocRenewalMasterDetailsDelete(Request request);
        Task<List<DropDownListModel>> GetDebitAcList();

    }
}
