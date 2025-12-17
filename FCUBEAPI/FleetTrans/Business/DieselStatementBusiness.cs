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
        public async Task<ResponseModel> DieselImportSave(DieselStatementModel dieselStmtModel)
        {
            return await dieselStatementRepository.DieselImportSave(dieselStmtModel);
        }
        public async Task<DieselStatementList> GetDieselImportList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetDieselImportList(request);
        }
        public async Task<DieselStatementModel> GetDieselImportInnerGridList(RequestModel request)
        {
            return await dieselStatementRepository.GetDieselImportInnerGridList(request);
        }

        public async Task<DieselStatementModel> GetBpclDetailsList(ReportRequestModel request)
        {
            return await dieselStatementRepository.GetBpclDetailsList(request);
        }

      
    }
}
