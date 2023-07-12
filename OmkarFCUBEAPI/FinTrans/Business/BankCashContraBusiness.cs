using FinTrans.Models;
using FinTrans.Repository;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BankCashContraBusiness : IBankCashContraBusiness
    {
        readonly IBankCashContraRepository bankCashContraRepository;
        public BankCashContraBusiness(IBankCashContraRepository _bankCashContraRepository)
        {
            bankCashContraRepository = _bankCashContraRepository;
        }

        /// <summary>
        /// Business method for save  details
        /// </summary>
        /// <param name="FinTransModel"></param>
        public async Task<ResponseModel> BankCashContraSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            return await bankCashContraRepository.BankCashContraSave(cashReceiptPaymentsModel);
        }

        public async Task<BankCashContraList> GetBankCashContraList(BankCashContraListRequest request)
        {
            return await bankCashContraRepository.GetBankCashContraList(request);
        }
    }
}