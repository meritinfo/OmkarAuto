using FleetTrans.Models;
using FleetTrans.Repository;

namespace FleetTrans.Business
{
    public class BillStatementBusiness : IBillStatementBusiness
    {
        readonly IBillStatementRepository billStatementRepository;
        public BillStatementBusiness(IBillStatementRepository _billStatementRepository)
        {
            billStatementRepository = _billStatementRepository;
        }

        /// <summary>
        /// Business method for Get Bill Statement Search List
        /// </summary>
        /// <param name="BillStatementSearchListRequest"></param>
        public async Task<BillStatementSearchListModel> GetBillStatementSearchList(BillStatementSearchListRequest request)
        {
            return await billStatementRepository.GetBillStatementSearchList(request);
        }
    }
}
