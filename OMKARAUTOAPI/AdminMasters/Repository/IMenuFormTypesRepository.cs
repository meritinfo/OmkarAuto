using AdminMasters.Models;
using Shared.Models;

namespace AdminMasters.Repository
{
    /// <summary>
    /// User Master service interface methods
    /// </summary>
    public interface IMenuFormTypesRepository
    {
        Task<ResponseModel> MenuFormTypesSave(MenuFormTypesModel menuFormTypesModel);
    }
}
