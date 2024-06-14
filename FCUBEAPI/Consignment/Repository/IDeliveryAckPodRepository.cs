using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public interface IDeliveryAckPodRepository
    {
        Task<ResponseModel> DeliveryAckPodSave(DeliveryAckPodModel deliveryAckPodModel);
        Task<DeliveryAckListModel> GetDeliveryAckPodList(ReportRequestModel request);
        Task<ResponseModel> DeliveryAckPodDelete(RequestModel requestModel);
        Task<DeliveryAckPodModel> GetDeliveryCnDetails(RequestModel request);
    }
}
