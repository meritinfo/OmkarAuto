
using FinanceMasters.Models;
namespace FinanceMasters.Business
{
    public interface IFinScheduleMasterBusiness
    {
        Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finScheduleMasterModel);
    }

}
