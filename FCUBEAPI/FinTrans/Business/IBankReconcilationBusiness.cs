using FinTrans.Models;
using Shared.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IBankReconcilationBusiness
    {
        Task<ResponseModel> BankReconcilationSave(BankReconcilationListModel bankRecListModel);
        Task<BankReconcilationListModel> GetBankReconcileGridList(BankRecFilterModel req);
        Task<List<DropDownListModel>> GetBankacList();

    }
}