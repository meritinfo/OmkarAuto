using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public interface IDeliveryAckPodBusiness
    {
        Task<ResponseModel> DeliveryAckPodSave(DeliveryAckPodModel deliveryAckPodModel);
        Task<DeliveryAckListModel> GetDeliveryAckPodList(PageRequest request);
        Task<ResponseModel> DeliveryAckPodDelete(RequestModel requestModel);
    }
}
