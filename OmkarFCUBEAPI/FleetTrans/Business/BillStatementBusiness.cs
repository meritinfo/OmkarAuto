using DocumentFormat.OpenXml.Office2016.Excel;
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
        public async Task<BillStatementList> GetBillStatementList(PageFromDtToDtRequest request)
        {
            return await billStatementRepository.GetBillStatementList(request);
        }
        public async Task<ResponseModel> BillsStatementDelete(RequestModel requestModel)
        {
            return await billStatementRepository.BillsStatementDelete(requestModel);
        }
        public async Task<BillStatementSearchListModel> GetBillStatementInnerGridList(RequestModel request)
        {
            return await billStatementRepository.GetBillStatementInnerGridList(request);
        }
        public async Task<List<DropDownListModel>> GetBillStmtCreditAcList()
        {
            return await billStatementRepository.GetBillStmtCreditAcList();
        }
    }
}
