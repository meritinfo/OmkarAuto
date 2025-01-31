using DocumentFormat.OpenXml.Office2016.Excel;
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
        public async Task<DieselStatementModel> GetDieselStatementSearchList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetDieselStatementSearchList(request);
        }
        public async Task<ResponseModel> SaveDieselStatementDetails(DieselStatementModel request)
        {
            if (request.StatementFlag=="D")
            {
                return await dieselStatementRepository.SaveDieselStatementDetails(request);
            }
            else
            {
                return await dieselStatementRepository.SaveHappayStatementDetails(request);
            }
        }
        public async Task<DieselStatementModel> GetDieselStatementInnerGridList(RequestModel request)
        {
            return await dieselStatementRepository.GetDieselStatementInnerGridList(request);
        }
        public async Task<DieselStatementList> GetDieselStatementList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetDieselStatementList(request);
        }
        public async Task<ResponseModel> DieselStatementDetailsDelete(RequestModel request)
        {
            return await dieselStatementRepository.DieselStatementDetailsDelete(request);
        }
        public async Task<DieselStatementList> GetHappayDieselList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetHappayDieselList(request);
        }
        public async Task<DieselStatementModel> GetHappayDieselSearchList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetHappayDieselSearchList(request);
        }
        public async Task<ResponseModel> DieselStatementSave(DieselStmtModel dieselStmtModel)
        {
            return await dieselStatementRepository.DieselStatementSave(dieselStmtModel);
        }
        public async Task<DieselStmtListModel> GetDieselStmtList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetDieselStmtList(request);
        }
        public async Task<DieselStmtModel> GetDieselStmtInnerGridList(RequestModel request)
        {
            return await dieselStatementRepository.GetDieselStmtInnerGridList(request);
        }
        public async Task<ResponseModel> DieselStatementDelete(RequestModel request)
        {
            return await dieselStatementRepository.DieselStatementDelete(request);
        }
    }
}
