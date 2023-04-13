
using AdminMasters.Models;
using FinanceMasters.Model;

namespace FinanceMasters.Repository
{
    public interface IFinAccountsMasterRepository
    {
        Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel);
    }
}
