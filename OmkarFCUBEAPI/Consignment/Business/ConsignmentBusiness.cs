using Consignment.Models;
using Consignment.Repository;

namespace Consignment.Business
{
    public class ConsignmentBusiness : IConsignmentBusiness
    {
        readonly IConsignmentRepository consignmentRepository;
        public ConsignmentBusiness(IConsignmentRepository _consignmentRepository)
        {
           consignmentRepository = _consignmentRepository;
        }

        /// <summary>
        /// Business method for save Fin Account Master  details
        /// </summary>
        /// <param name="consignmentModel"></param>
        public async Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel)
        {
            return await consignmentRepository.ConsignmentSave(consignmentModel);
        }
    }
}
