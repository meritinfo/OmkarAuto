using AdminMasters.Models;
using AdminMasters.Repository;

namespace AdminMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class MenuFormTypesBusiness : IMenuFormTypesBusiness
    {
        readonly IMenuFormTypesRepository menuFormTypesRepository;
        public MenuFormTypesBusiness(IMenuFormTypesRepository _menuFormTypesRepository)
        {
            menuFormTypesRepository = _menuFormTypesRepository;
        }

        /// <summary>
        /// Business method for save role master details
        /// </summary>
        /// <param name="menuFormTypesModel"></param>
        public async Task<ResponseModel> MenuFormTypesSave(MenuFormTypesModel menuFormTypesModel)
        {
            return await menuFormTypesRepository.MenuFormTypesSave(menuFormTypesModel);
        }
    }
}