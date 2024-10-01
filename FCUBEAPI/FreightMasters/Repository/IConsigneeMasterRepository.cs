using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IConsigneeMasterRepository
    {
        Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel);
        Task<ConsigneeCnorList> GetConsigneeCnorList(PageRequest request);
        Task<ResponseModel> ConsigneeCnorMasterDelete(RequestModel requestModel);
    }
}
