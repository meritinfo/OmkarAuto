using Consignment.Models;
using Consignment.Repository;
using Shared.Models;

namespace Consignment.Business
{
    public class ConsignmentBusiness : IConsignmentBusiness
    {
        readonly IConsignmentRepository consignmentRepository;
        public ConsignmentBusiness(IConsignmentRepository _consignmentRepository)
        {
           consignmentRepository = _consignmentRepository;
        }
        public async Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel)
        {
            return await consignmentRepository.ConsignmentSave(consignmentModel);
        }
        public async Task<ResponseModel> ConsignmentDelete(RequestModel requestModel)
        {
            return await consignmentRepository.ConsignmentDelete(requestModel);
        }
        public async Task<ConsignmentList> GetConsignmentList(ReportRequestModel request)
        {
            return await consignmentRepository.GetConsignmentList(request);
        }
        public async Task<ConsignmentModel> GetLrInnerGridList(RequestModel request)
        {
            return await consignmentRepository.GetLrInnerGridList(request);
        }
        public async Task<ResponseModel> GetLrNo(RequestModel req)
        {
            return await consignmentRepository.GetLrNo(req);
        }
        public async Task<ResponseModel> GetCnNoLength()
        {
            return await consignmentRepository.GetCnNoLength();
        }
        public async Task<ResponseModel> CheckEwaybillExits(RequestModel req)
        {
            return await consignmentRepository.CheckEwaybillExits(req);
        }
        public async Task<ResponseModel> CheckDuplicateLr(RequestModel request)
        {
            return await consignmentRepository.CheckDuplicateLr(request);
        }
        public async Task<ResponseModel> GenerateLrNo(RequestModel request)
        {
            return await consignmentRepository.GenerateLrNo(request);
        }
        public async Task<ResponseModel> ChkMandatoryRequired(RequestModel request)
        {
            return await consignmentRepository.ChkMandatoryRequired(request);
        }
        public async Task<ResponseModel> CheckVehicleNo(RequestModel request)
        {
            return await consignmentRepository.CheckVehicleNo(request);
        }
        public async Task<List<DropDownListModel>> GetRateList()
        {
            return await consignmentRepository.GetRateList();
        }
        public async Task<List<DropDownListModel>> GetContentList()
        {
            return await consignmentRepository.GetContentList();
        }
        public async Task<List<DropDownListModel>> GetLocationList()
        {
            return await consignmentRepository.GetLocationList();
        }
        public async Task<List<DropDownListModel>> GetClassList()
        {
            return await consignmentRepository.GetClassList();
        }
        public async Task<List<DropDownListModel>> GetVehicleNoList()
        {
            return await consignmentRepository.GetVehicleNoList();
        }
        public async Task<List<DropDownListModel>> GetVehicleIdList()
        {
            return await consignmentRepository.GetVehicleIdList();
        }
        //public async Task<List<DropDownListModel>> GetVehicleTypeGroupList()
        //{
        //    return await consignmentRepository.GetVehicleTypeGroupList();
        //}
        public async Task<ResponseModel> GetBillSeries(RequestModel request)
        {
            return await consignmentRepository.GetBillSeries(request);
        }
        public async Task<ConsignmentModel> GetConsignmentUpdateDetails(RequestModel req)
        {
            return await consignmentRepository.GetConsignmentUpdateDetails(req);
        }
        public async Task<ResponseModel> ConsignmentUpdate(ConsignmentUpdateModel ConsignmentModel)
        {
            return await consignmentRepository.ConsignmentUpdate(ConsignmentModel);
        }
        public async Task<ConsignmentModel> GetCnEnqDetails(RequestModel req)
        {
            return await consignmentRepository.GetCnEnqDetails(req);
        }
        public async Task<CnEnqDocModel> GetCnEnqDoc(RequestModel req)
        {
            return await consignmentRepository.GetCnEnqDoc(req);
        }
        public async Task<ConsignmentModel> GetCnEnqInnerGridList(RequestModel request)
        {
            return await consignmentRepository.GetCnEnqInnerGridList(request);
        }
        public async Task<ResponseModel> GetBillSubmitSeries(RequestModel request)
        {
            return await consignmentRepository.GetBillSubmitSeries(request);
        }
        public async Task<List<DropDownListModel>> GetGstByList()
        {
            return await consignmentRepository.GetGstByList();
        }
        public async Task<ResponseModel> GetLRPrint(ReportRequestModel request)
        {
            return await consignmentRepository.GetLRPrint(request);
        }
        public async Task<List<DropDownListModel>> GetFreightList()
        {
            return await consignmentRepository.GetFreightList();
        }
        public async Task<ConsignmentGstModel> GetFreightGstDetails(RequestModel request)
        {
            return await consignmentRepository.GetFreightGstDetails(request);
        }
        public async Task<ResponseModel> GetLrNoLLP(RequestModel req)
        {
            return await consignmentRepository.GetLrNoLLP(req);
        }
        public async Task<ResponseModel> CheckDuplicateLrLLP(ReportRequestModel request)
        {
            return await consignmentRepository.CheckDuplicateLrLLP(request);
        }
        public async Task<ResponseModel> CheckLrExits(RequestModel request)
        {
            return await consignmentRepository.CheckLrExits(request);
        }
        public async Task<ResponseModel> GetFcmRcmConfig()
        {
            return await consignmentRepository.GetFcmRcmConfig();
        }
        public async Task<List<DropDownListModel>> GetTransTypeList()
        {
            return await consignmentRepository.GetTransTypeList();
        }
        public async Task<ResponseModel> ConsignmentLocalFrtUpdate(ConsignmentUpdateModel ConsignmentModel)
        {
            return await consignmentRepository.ConsignmentLocalFrtUpdate(ConsignmentModel);
        }
        public async Task<ResponseModel> GetDocAutoGenNo(RequestModel req)
        {
            return await consignmentRepository.GetDocAutoGenNo(req);
        }
        public async Task<ResponseModel> CheckDuplicateDocNo(RequestModel req)
        {
            return await consignmentRepository.CheckDuplicateDocNo(req);
        }


        public async Task<ResponseModel> CheckTruckNo(RequestModel request)
        {
            return await consignmentRepository.CheckTruckNo(request);
        }
         public async Task<ResponseModel> GetTruckMasterMandatoryYN()
        {
            return await consignmentRepository.GetTruckMasterMandatoryYN();

        }

        public async Task<ResponseModel> GetVehicleApiDataYN()
        {
            return await consignmentRepository.GetVehicleApiDataYN();

        }
    }
}
