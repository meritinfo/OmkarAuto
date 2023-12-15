using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

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
        public async Task<ResponseModel> BranchMasterDetailsDelete(Request requestModel)
        {
            return await freightMastersRepository.BranchMasterDetailsDelete(requestModel);
        }


        /// <summary>
        /// Business method for get brqanch list
        /// </summary>
        public async Task<List<DropDownListModel>> GetBranchList()
        {
            return await freightMastersRepository.GetBranchList();
        }
        public async Task<BranchMasterList> GetBranchMasterList(PageRequest request)
        {
            return await freightMastersRepository.GetBranchMasterList(request);
        }

        public async Task<ResponseModel> ChkCodeExits(Request req)
        {
            return await freightMastersRepository.ChkCodeExits(req);
        }

    }
}
