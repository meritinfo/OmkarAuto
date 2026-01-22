using Consignment.Models;
using Shared.Models;

namespace Consignment.Business
{
    public interface IDeliveryAckPodBusiness
    {
        Task<ResponseModel> DeliveryAckPodSave(DeliveryAckPodModel deliveryAckPodModel);
        Task<DeliveryAckListModel> GetDeliveryAckPodList(ReportRequestModel request);
        Task<ResponseModel> DeliveryAckPodDelete(RequestModel requestModel);
        Task<DeliveryAckPodModel> GetDeliveryCnDetails(RequestModel request);
        Task<ResponseModel> GetAckSlNo(RequestModel requestModel);
        Task<ResponseModel> CheckDeliveryAckDoneForLrNo(RequestModel requestModel);
        Task<ResponseModel> GetDelvAckPodPrintPdf(RequestModel request);
    }
}
