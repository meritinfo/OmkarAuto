using FinanceMaster.Models;
using FinanceMasters.Models;
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
        public async Task<FinAccountsMasterList> GetFinAccountsMasterList(PageRequest request)
        {
            return await finAccountsMasterRepository.GetFinAccountsMasterList(request);
        }
        public async Task<List<DropDownListModel>> GetFinActLedgertype()
        {
            return await finAccountsMasterRepository.GetFinActLedgertype();
        }
        public async Task<List<DropDownListModel>> GetEmpList()
        {
            return await finAccountsMasterRepository.GetEmpList();
        }


    }
}
