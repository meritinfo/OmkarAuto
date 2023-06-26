using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public interface IConsigneeMasterRepository
    {
        Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel);
    }
}
