
using FinanceMasters.Models;
using Shared.Models;

namespace FinanceMasters.Business
{
    public interface IFinScheduleMasterBusiness
    {
        Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finScheduleMasterModel);
    }

}
