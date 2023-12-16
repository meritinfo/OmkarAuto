using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

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
        /// <summary>
        /// Business method for Save Bill Statement Details
        /// </summary>
        /// <param name="BillStatementSaveRequest"></param>
        public async Task<ResponseModel> SaveBillStatementDetails(BillStatementModel request)
        {
            return await billStatementRepository.SaveBillStatementDetails(request);
        }
        public async Task<BillStatementList> GetBillStatementList(PageRequest request)
        {
            return await billStatementRepository.GetBillStatementList(request);
        }
        public async Task<BillStatementSearchListModel> GetBillStatementInnerGridList(BillStatementInnerGridRequest request)
        {
            return await billStatementRepository.GetBillStatementInnerGridList(request);
        }
    }
}
