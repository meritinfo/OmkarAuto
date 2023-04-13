using AdminMasters.Models;
using FinanceMasters.Model;
namespace FinanceMasters.Business
{
    public interface IFinScheduleMasterBusiness
    {
        Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finScheduleMasterModel);
    }

}
