using FinTrans.Models;

namespace FinTrans.Repository
{
    /// <summary>
    /// CashReceiptPayments service interface methods
    /// </summary>
    public interface IBankCashContraRepository
    {
        Task<ResponseModel> BankCashContraSave(CashReceiptPaymentsModel cashReceiptPaymentsSave);
        Task<BankCashContraList> GetBankCashContraList(BankCashContraListRequest request);
    }
}