using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IMenuFormTypesBusiness
    {
        Task<ResponseModel> MenuFormTypesSave(MenuFormTypesModel menuFormTypesModel);
    }
}
