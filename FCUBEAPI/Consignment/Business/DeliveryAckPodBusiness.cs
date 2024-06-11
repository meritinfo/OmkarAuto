using Consignment.Models;
using Consignment.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Business
{
    public class DeliveryAckPodBusiness : IDeliveryAckPodBusiness
    {

        readonly IDeliveryAckPodRepository deliveryAckPodRepository;
        public DeliveryAckPodBusiness(IDeliveryAckPodRepository _deliveryAckPodRepository)
        {
            deliveryAckPodRepository = _deliveryAckPodRepository;
        }

        /// <summary>
        /// Business method for save vehicle type group master details
        /// </summary>
        /// <param name="brandMasterModel"></param>
        public async Task<ResponseModel> DeliveryAckPodSave(DeliveryAckPodModel deliveryAckPodModel)
        {
            return await deliveryAckPodRepository.DeliveryAckPodSave(deliveryAckPodModel);
        }
        public async Task<DeliveryAckListModel> GetDeliveryAckPodList(PageRequest request)
        {
            return await deliveryAckPodRepository.GetDeliveryAckPodList(request);
        }
        public async Task<ResponseModel> DeliveryAckPodDelete(RequestModel request)
        {
            return await deliveryAckPodRepository.DeliveryAckPodDelete(request);
        }


    }
}
