using FleetMasters.Models;
namespace FleetMasters.Business
{
    public interface IDocRenewalMasterBusiness
    {
        Task<ResponseModel> DocRenewalMasterSave(DocRenewalMasterModel DocRenewalMasterModel);
    }
}
