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

        /// <summary>
        /// Business method for save Fin Account Master  details
        /// </summary>
        /// <param name="consignmentModel"></param>
        public async Task<ResponseModel> ConsignmentSave(ConsignmentModel consignmentModel)
        {
            return await consignmentRepository.ConsignmentSave(consignmentModel);
        }
        public async Task<ResponseModel> ConsignmentDelete(RequestModel requestModel)
        {
            return await consignmentRepository.ConsignmentDelete(requestModel);
        }
        public async Task<ConsignmentList> GetConsignmentList(PageRequestDtBrVh request)
        {
            return await consignmentRepository.GetConsignmentList(request);
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
        public async Task<ResponseModel> GetKms(KmsModel request)
        {
            return await consignmentRepository.GetKms(request);
        }
        public async Task<ResponseModel> CheckEwaybillExits(RequestModel req)
        {
            return await consignmentRepository.CheckEwaybillExits(req);
        }
        public async Task<ResponseModel> GetTripKms(KmsModel request)
        {
            return await consignmentRepository.GetTripKms(request);
        }
        public async Task<TripKmsModel> GetTripKms2(KmsModel request)
        {
            return await consignmentRepository.GetTripKms2(request);
        }
        public async Task<ResponseModel> GetDslToBe(DslModel request)
        {
            return await consignmentRepository.GetDslToBe(request);
        }
        public async Task<ResponseModel> GetAdBlueToBe(AdBlueModel request)
        {
            return await consignmentRepository.GetAdBlueToBe(request);
        }
        public async Task<ResponseModel> CheckDuplicateLr(RequestModel request)
        {
            return await consignmentRepository.CheckDuplicateLr(request);
        }


        public async Task<List<DropDownListModel>> GetVehicleNoList()
        {
            return await consignmentRepository.GetVehicleNoList();
        }
        public async Task<List<DropDownListModel>> GetBillingPartyList()
        {
            return await consignmentRepository.GetBillingPartyList();
        }
        public async Task<List<DropDownListModel>> GetLRSeries(RequestModel req)
        {
            return await consignmentRepository.GetLRSeries(req);
        }
        public async Task<List<DropDownListModel>> GetLRSeriesForBill()
        {
            return await consignmentRepository.GetLRSeriesForBill();
        }
        public async Task<ResponseModel> GetGcSeries(RequestModel request)
        {
            return await consignmentRepository.GetGcSeries(request);
        }
        public async Task<ResponseModel> GetBillSeries(RequestModel request)
        {
            return await consignmentRepository.GetBillSeries(request);
        }
    }
}
