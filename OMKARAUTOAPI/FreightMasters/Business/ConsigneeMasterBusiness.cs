using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class ConsigneeMasterBusiness : IConsigneeMasterBusiness
    {
        readonly IConsigneeMasterRepository consigneeMasterRepository;
        public ConsigneeMasterBusiness(IConsigneeMasterRepository _ConsigneeMasterRepository)
        {
            consigneeMasterRepository = _ConsigneeMasterRepository;
        }

        /// <summary>
        /// Business method for save product group master details
        /// </summary>
        /// <param name="consigneeMasterModel"></param>
        public async Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel)
        {
            return await consigneeMasterRepository.ConsigneeMasterSave(consigneeMasterModel);
        }
        public async Task<ResponseModel> ConsigneeCnorMasterDelete(RequestModel requestModel)
        {
            return await consigneeMasterRepository.ConsigneeCnorMasterDelete(requestModel);
        }
        public async Task<ConsigneeCnorList> GetConsigneeCnorList(ReportRequestModel request)
        {
            return await consigneeMasterRepository.GetConsigneeCnorList(request);
        }
    }
}
