using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IDeliveryDisputeEntryBusiness
    {
        Task<ResponseModel> DeliveryDisputeEntrySave(DeliveryDisputeEntryModel deliveryDisputeEntryModel);

        Task<DeliveryDisputeEntryList> GetDeliveryDisputeEntryList(ReportRequestModel request);
        Task<ResponseModel> DeliveryDisputeEntryDelete(RequestModel requestModel);
        Task<DeliveryDisputeEntryModel> GetDeliveryCnDetailsForDispute(RequestModel request);
        Task<ResponseModel> CheckDuplicateLRForDispute(RequestModel requestModel);
        Task<ResponseModel> GetDispSlNo(RequestModel requestModel);
    }
}
