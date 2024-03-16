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
        public async Task<DieselStatementModel> GetDieselStatementSearchList(PageFromDtToDtRequest request)
        {
            return await dieselStatementRepository.GetDieselStatementSearchList(request);
        }
        public async Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel request)
        {
            return await dieselStatementRepository.SaveDieselStatementDetails(request);
        }
        public async Task<DieselStatementModel> GetDieselStatementInnerGridList(RequestModel request)
        {
            return await dieselStatementRepository.GetDieselStatementInnerGridList(request);
        }
        public async Task<DieselStatementList> GetDieselStatementList(PageFromDtToDtRequest request)
        {
            return await dieselStatementRepository.GetDieselStatementList(request);
        }
        public async Task<ResponseModel> DieselStatementDetailsDelete(RequestModel request)
        {
            return await dieselStatementRepository.DieselStatementDetailsDelete(request);
        }
        public async Task<DieselStatementList> GetHappayDieselList(PageFromDtToDtRequest request)
        {
            return await dieselStatementRepository.GetHappayDieselList(request);
        }
        public async Task<DieselStatementModel> GetHappayDieselSearchList(PageFromDtToDtRequest request)
        {
            return await dieselStatementRepository.GetHappayDieselSearchList(request);
        }

    }
}
