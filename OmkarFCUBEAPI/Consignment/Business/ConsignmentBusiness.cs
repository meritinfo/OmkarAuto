using Consignment.Models;
using Consignment.Repository;

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
        public async Task<ConsignmentList> GetConsignmentList(ConsignmentListRequest request)
        {
            return await consignmentRepository.GetConsignmentList(request);
        }
        public async Task<List<RateListModel>> GetRateList()
        {
            return await consignmentRepository.GetRateList();
        }
        public async Task<List<BranchListModel>> GetContentList()
        {
            return await consignmentRepository.GetContentList();
        }
        public async Task<List<BranchListModel>> GetLocationList()
        {
            return await consignmentRepository.GetLocationList();
        }
        public async Task<ResponseModel> GetKms(KmsModel request)
        {
            return await consignmentRepository.GetKms(request);
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
        public async Task<ResponseModel> CheckDuplicateLr(GcModel request)
        {
            return await consignmentRepository.CheckDuplicateLr(request);
        }


        public async Task<List<BranchListModel>> GetVehicleNoList()
        {
            return await consignmentRepository.GetVehicleNoList();
        }
        public async Task<List<BranchListModel>> GetBillingPartyList()
        {
            return await consignmentRepository.GetBillingPartyList();
        }
        public async Task<List<LrSeriesListModel>> GetLRSeries()
        {
            return await consignmentRepository.GetLRSeries();
        }
        public async Task<ResponseModel> GetGcSeries()
        {
            return await consignmentRepository.GetGcSeries();
        }
    }
}
