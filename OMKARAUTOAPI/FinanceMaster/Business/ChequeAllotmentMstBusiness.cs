
using FinanceMasters.Models;
using FinanceMasters.Repository;
using Shared.Models;

namespace FinanceMasters.Business
{
    public class ChequeAllotmentMstBusiness : IChequeAllotmentMstBusiness
    {
        readonly IChequeAllotmentMstRepository ChequeAllotmentMstRepository;
        public ChequeAllotmentMstBusiness(IChequeAllotmentMstRepository _ChequeAllotmentMstRepository)
        {
            ChequeAllotmentMstRepository = _ChequeAllotmentMstRepository;
        }

        /// <summary>
        /// Business method for save fin schedule master details
        /// </summary>
        /// <param name="ChequeAllotmentMstModel"></param>
        public async Task<ResponseModel> ChequeAllotmentMstSave(ChequeAllotmentMstModel chequeAllotmentMstModel)
        {
            return await ChequeAllotmentMstRepository.ChequeAllotmentMstSave(chequeAllotmentMstModel);
        }
    }
}
