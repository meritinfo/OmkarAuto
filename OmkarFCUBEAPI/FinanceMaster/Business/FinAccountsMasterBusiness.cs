using AdminMasters.Models;
using FinanceMasters.Model;
using FinanceMasters.Repository;

namespace FinanceMasters.Business
{
    public class FinAccountsMasterBusiness : IFinAccountsMasterBusiness
    {
        readonly IFinAccountsMasterRepository finAccountsMasterRepository;
        public FinAccountsMasterBusiness(IFinAccountsMasterRepository _finAccountsMasterRepository)
        {
            finAccountsMasterRepository = _finAccountsMasterRepository;
        }

        /// <summary>
        /// Business method for save Fin Account Master  details
        /// </summary>
        /// <param name="finAccountsMasterModel"></param>
        public async Task<ResponseModel> FinAccountsMasterSave(FinAccountsMasterModel finAccountsMasterModel)
        {
            return await finAccountsMasterRepository.FinAccountsMasterSave(finAccountsMasterModel);
        }
    }
}
