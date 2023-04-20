using AdminMasters.Models;
using FinanceMasters.Model;
using FinanceMasters.Repository;

namespace FinanceMasters.Business
{
    public class FinScheduleMasterBusiness : IFinScheduleMasterBusiness
    {
        readonly IFinScheduleMasterRepository finScheduleMasterRepository;
        public FinScheduleMasterBusiness(IFinScheduleMasterRepository _finScheduleMasterRepository)
        {
            finScheduleMasterRepository = _finScheduleMasterRepository;
        }

        /// <summary>
        /// Business method for save fin schedule master details
        /// </summary>
        /// <param name="finScheduleMasterModel"></param>
        public async Task<ResponseModel> FinScheduleMasterSave(FinScheduleMasterModel finScheduleMasterModel)
        {
            return await finScheduleMasterRepository.FinScheduleMasterSave(finScheduleMasterModel);
        }
    }
}
