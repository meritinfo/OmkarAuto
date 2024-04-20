using FreightMasters.Models;
using Shared.Models;

namespace FreightMasters.Repository
{
    public interface IConsigneeMasterRepository
    {
        Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel);
    }
}
