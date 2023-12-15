using FinTrans.Models;
using FinTrans.Repository;
using Shared.Models;

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

        public async Task<CashReceiptPaymentsList> GetCashReceiptPaymentsList(BankCashListFilterModel request)
        {
            return await cashReceiptPaymentsRepository.GetCashReceiptPaymentsList(request);
        }
        public async Task<ResponseModel> GetNextDocNo(DocNoFilterModel docNoFilter)
        {
            return await cashReceiptPaymentsRepository.GetNextDocNo(docNoFilter);
        }
        public async Task<ResponseModel> CashReceiptPaymentsDelete(Request req)
        {
            return await cashReceiptPaymentsRepository.CashReceiptPaymentsDelete(req);
        }
        public async Task <CashReceiptPaymentsModel> GetCashReceiptPaymentInnerGridList(Request req)
        {
            return await cashReceiptPaymentsRepository.GetCashReceiptPaymentInnerGridList(req);
        }

    }
}