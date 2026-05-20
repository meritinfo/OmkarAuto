
using FinanceMasters.Models;
using FinanceMasters.Repository;
using Shared.Models;

namespace FinanceMasters.Business
{
    public class ChequeAllotmentDtlBusiness : IChequeAllotmentDtlBusiness
    {
        readonly IChequeAllotmentDtlRepository ChequeAllotmentDtlRepository;
        public ChequeAllotmentDtlBusiness(IChequeAllotmentDtlRepository _ChequeAllotmentDtlRepository)
        {
            ChequeAllotmentDtlRepository = _ChequeAllotmentDtlRepository;
        }

        /// <summary>
        /// Business method for save fin schedule master details
        /// </summary>
        /// <param name="finScheduleMasterModel"></param>
        public async Task<ResponseModel> ChequeAllotmentDtlSave(ChequeAllotmentDtlModel chequeAllotmentDtlModel)
        {
            return await ChequeAllotmentDtlRepository.ChequeAllotmentDtlSave(chequeAllotmentDtlModel);
        }
    }
}
