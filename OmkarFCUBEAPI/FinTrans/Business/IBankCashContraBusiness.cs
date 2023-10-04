using FinTrans.Models;

namespace FinTrans.Business
{
    /// <summary>
    /// Business interface methods
    /// </summary>
    public interface IBankCashContraBusiness
    {
        Task<ResponseModel> BankCashContraSave(BankCashContraModel bankCashContraModel);
        Task<BankCashContraList> GetBankCashContraList(BankCashContraListRequest request);
    }
}