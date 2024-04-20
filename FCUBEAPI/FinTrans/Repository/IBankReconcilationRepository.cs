using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// CashReceiptPayments service interface methods
    /// </summary>
    public interface IBankReconcilationRepository
    {
        Task<ResponseModel> BankReconcilationSave(BankReconcilationListModel bankRecListModel);
        Task<BankReconcilationListModel> GetBankReconcileGridList(BankRecFilterModel req);
        Task<List<DropDownListModel>> GetBankacList();
    }
}