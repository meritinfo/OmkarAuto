using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BranchMasterBusiness : IBranchMasterBusiness
    {
        readonly IBranchMasterRepository freightMastersRepository;
        public BranchMasterBusiness(IBranchMasterRepository _freightMastersRepository)
        {
            freightMastersRepository = _freightMastersRepository;
        }

        /// <summary>
        /// Business method for save Branch master details
        /// </summary>
        /// <param name="BranchMasterModel"></param>
        public async Task<ResponseModel> BranchMasterDetailsSave(BranchMasterModel branchMasterModel)
        {
            return await freightMastersRepository.BranchMasterDetailsSave(branchMasterModel);
        }
    }
}
