using AdminMasters.Models;
using FinanceMasters.Model;
namespace FinanceMasters.Business
{
    public interface IFinAccountsMasterBusiness
    {
        Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel);
    }

}
