using FleetTrans.Models;
using FleetTrans.Repository;

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
    }
}
