using Consignment.Models;
using Shared.Models;

namespace Consignment.Repository
{
    public  interface IDeliveryDisputeEntryRepository
    {
        Task<ResponseModel> DeliveryDisputeEntrySave(DeliveryDisputeEntryModel deliveryDisputeEntryModel);

        Task<DeliveryDisputeEntryList> GetDeliveryDisputeEntryList(ReportRequestModel request);
        Task<ResponseModel> DeliveryDisputeEntryDelete(RequestModel requestModel);
        Task<DeliveryDisputeEntryModel> GetDeliveryCnDetailsForDispute(RequestModel request);
        Task<ResponseModel> CheckDuplicateLRForDispute(RequestModel requestModel);
        Task<ResponseModel> GetDispSlNo(RequestModel requestModel);
    }
}
