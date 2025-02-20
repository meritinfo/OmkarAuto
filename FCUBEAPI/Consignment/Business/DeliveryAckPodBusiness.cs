using Consignment.Models;
using Consignment.Repository;
using DocumentFormat.OpenXml.Office2016.Excel;
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

        public async Task<ResponseModel> DeliveryAckPodSave(DeliveryAckPodModel deliveryAckPodModel)
        {
            return await deliveryAckPodRepository.DeliveryAckPodSave(deliveryAckPodModel);
        }
        public async Task<DeliveryAckListModel> GetDeliveryAckPodList(ReportRequestModel request)
        {
            return await deliveryAckPodRepository.GetDeliveryAckPodList(request);
        }
        public async Task<ResponseModel> DeliveryAckPodDelete(RequestModel request)
        {
            return await deliveryAckPodRepository.DeliveryAckPodDelete(request);
        }
        public async Task<DeliveryAckPodModel> GetDeliveryCnDetails(RequestModel request)
        {
            return await deliveryAckPodRepository.GetDeliveryCnDetails(request);
        }
        public async Task<ResponseModel> GetAckSlNo(RequestModel requestModel)
        {
            return await deliveryAckPodRepository.GetAckSlNo(requestModel);
        }
        public async Task<ResponseModel> CheckDeliveryAckDoneForLrNo(RequestModel requestModel)
        {
            return await deliveryAckPodRepository.CheckDeliveryAckDoneForLrNo(requestModel);
        }
        public async Task<ResponseModel> GetDelvAckPodPrintPdf(RequestModel request)
        {
            return await deliveryAckPodRepository.GetDelvAckPodPrintPdf(request);
        }

    }
}
