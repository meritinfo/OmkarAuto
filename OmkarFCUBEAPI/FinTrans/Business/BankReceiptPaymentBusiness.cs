using FinTrans.Models;
using FinTrans.Repository;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class BankReceiptPaymentsBusiness : IBankReceiptPaymentsBusiness
    {
        readonly IBankReceiptPaymentsRepository bankReceiptPaymentsRepository;
        public BankReceiptPaymentsBusiness(IBankReceiptPaymentsRepository _bankReceiptPaymentsRepository)
        {
            bankReceiptPaymentsRepository = _bankReceiptPaymentsRepository;
        }

        /// <summary>
        /// Business method for save  details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        public async Task<ResponseModel> BankReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            return await bankReceiptPaymentsRepository.BankReceiptPaymentsSave(cashReceiptPaymentsModel);
        }

        public async Task<BankReceiptpaymentsList> GetBankReceiptpaymentsList(BankReceiptpaymentsListRequest request)
        {
            return await bankReceiptPaymentsRepository.GetBankReceiptpaymentsList(request);
        }
    }
}