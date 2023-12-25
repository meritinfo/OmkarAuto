using FleetTrans.Models;
using FleetTrans.Repository;
using Shared.Models;

namespace FleetTrans.Business
{
    public class DieselStatementBusiness : IDieselStatementBusiness
    {
        readonly IDieselStatementRepository dieselStatementRepository;
        public DieselStatementBusiness(IDieselStatementRepository _dieselStatementRepository)
        {
            dieselStatementRepository = _dieselStatementRepository;
        }
        /// <summary>
        /// Business method for Get Diesel Statement Search List
        /// </summary>
        /// <param name="DieselStatementSearchListRequest"></param>
        public async Task<DieselStatementSearchListModel> GetDieselStatementSearchList(DieselStatementSearchListRequest request)
        {
            return await dieselStatementRepository.GetDieselStatementSearchList(request);
        }
        /// <summary>
        /// Business method for Save Diesel Statement Details
        /// </summary>
        /// <param name="DieselStatementSearchListRequest"></param>
        public async Task<ResponseModel> SaveDieselStatementDetails(DieselStatementSaveRequest request)
        {
            return await dieselStatementRepository.SaveDieselStatementDetails(request);
        }
        public async Task<DieselStatementList> GetDieselStatementList(PageFromDtToDtRequest request)
        {
            return await dieselStatementRepository.GetDieselStatementList(request);
        }

    }
}
