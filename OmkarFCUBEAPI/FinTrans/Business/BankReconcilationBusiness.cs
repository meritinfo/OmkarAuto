using FinTrans.Models;
using FinTrans.Repository;
using Shared.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BankReconcilationBusiness : IBankReconcilationBusiness
    {
        readonly IBankReconcilationRepository bankReconcilationRepository;
        public BankReconcilationBusiness(IBankReconcilationRepository _BankReconcilationRepository)
        {
            bankReconcilationRepository = _BankReconcilationRepository;
        }
        public async Task<ResponseModel> BankReconcilationSave(BankReconcilationListModel bankRecListModel)
        {
            return await bankReconcilationRepository.BankReconcilationSave(bankRecListModel);
        }
        public async Task<BankReconcilationListModel> GetBankReconcileGridList(BankRecFilterModel req)
        {
            return await bankReconcilationRepository.GetBankReconcileGridList(req);
        }
        public async Task<List<DropDownListModel>> GetBankacList()
        {
            return await bankReconcilationRepository.GetBankacList();
        }
    }
}