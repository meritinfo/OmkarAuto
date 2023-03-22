using FreightMasters.Models;
using FreightMasters.Repository;

namespace FreightMasters.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class FreightMastersBusiness : IFreightMastersBusiness
    {
        readonly IFreightMastersRepository freightMastersRepository;
        public FreightMastersBusiness(IFreightMastersRepository _freightMastersRepository)
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
    }
}
