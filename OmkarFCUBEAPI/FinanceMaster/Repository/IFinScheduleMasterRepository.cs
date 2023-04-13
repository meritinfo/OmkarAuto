
using AdminMasters.Models;
using FinanceMasters.Model;

namespace FinanceMasters.Repository
{
    public interface IFinScheduleMasterRepository
    {
        Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finSheduleMasterModel);
    }
}
