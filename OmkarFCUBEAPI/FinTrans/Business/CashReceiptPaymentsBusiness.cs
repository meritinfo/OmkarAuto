using FinTrans.Models;
using FinTrans.Repository;

namespace FinTrans.Business
{
    /// <summary>
    /// Business methods
    /// </summary>
    public class CashReceiptPaymentsBusiness : ICashReceiptPaymentsBusiness
    {
        readonly ICashReceiptPaymentsRepository cashReceiptPaymentsRepository;
        public CashReceiptPaymentsBusiness(ICashReceiptPaymentsRepository _CashReceiptPaymentsRepository)
        {
            cashReceiptPaymentsRepository = _CashReceiptPaymentsRepository;
        }

        /// <summary>
        /// Business method for  details
        /// </summary>
        /// <param name="destinationMasterModel"></param>
        public async Task<ResponseModel> CashReceiptPaymentsSave(CashReceiptPaymentsModel cashReceiptPaymentsModel)
        {
            return await cashReceiptPaymentsRepository.CashReceiptPaymentsSave(cashReceiptPaymentsModel);
        }

        public async Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(CashReceiptPaymentsListRequest request)
        {
            return await cashReceiptPaymentsRepository.GetCashReceiptPaymentsList(request);
        }
       
    }
}