using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class DestinationMasterBusiness : IDestinationMasterBusiness
    {
        readonly IDestinationMasterRepository freightMastersRepository;
        public DestinationMasterBusiness(IDestinationMasterRepository _freightMastersRepository)
        {
            freightMastersRepository = _freightMastersRepository;
        }

        /// <summary>
        /// Business method for save destination master details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        public async Task<ResponseModel> DestinationMasterDetailsSave(DestinationMasterModel destinationMasterModel)
        {
            return await freightMastersRepository.DestinationMasterDetailsSave(destinationMasterModel);
        }
        public async Task<ResponseModel> DestinationDetailsDelete(RequestModel requestModel)
        {
            return await freightMastersRepository.DestinationDetailsDelete(requestModel);
        }
        
        public async Task<List<DropDownListModel>> GetStateList()
        {
            return await freightMastersRepository.GetStateList();

        }
        public async Task<DestinationMasterList> GetDestinationMasterList(PageRequest request)
        {
            return await freightMastersRepository.GetDestinationMasterList(request);
        }
    }
}
