using HRMasters.Models;

namespace HRMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IHRMasterBusiness
    {
        Task<ResponseModel> HRMasterSave(HRMasterModel hrMasterModel);
    }
}
