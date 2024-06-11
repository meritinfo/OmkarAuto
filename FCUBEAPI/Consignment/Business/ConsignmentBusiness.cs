using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
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
        public async Task<ResponseModel> CheckEwaybillExits(RequestModel req)
        {
            return await consignmentRepository.CheckEwaybillExits(req);
        }
        public async Task<ResponseModel> CheckDuplicateLr(RequestModel request)
        {
            return await consignmentRepository.CheckDuplicateLr(request);
        }
        public async Task<ResponseModel> CheckVehicleNo(RequestModel request)
        {
            return await consignmentRepository.CheckVehicleNo(request);
        }
       
        public async Task<ResponseModel> GetKms(KmsModel request)
        {
            return await consignmentRepository.GetKms(request);
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
        //public async Task<List<DropDownListModel>> GetVehicleTypeGroupList()
        //{
        //    return await consignmentRepository.GetVehicleTypeGroupList();
        //}
        public async Task<ResponseModel> GetBillSeries(RequestModel request)
        {
            return await consignmentRepository.GetBillSeries(request);
        }

    }
}
