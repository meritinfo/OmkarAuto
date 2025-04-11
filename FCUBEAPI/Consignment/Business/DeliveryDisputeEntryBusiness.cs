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
    public class DeliveryDisputeEntryBusiness: IDeliveryDisputeEntryBusiness
    {
        readonly IDeliveryDisputeEntryRepository deliveryDisputeEntryRepository;
        public DeliveryDisputeEntryBusiness(IDeliveryDisputeEntryRepository _deliveryDisputeEntryRepository)
        {
            deliveryDisputeEntryRepository = _deliveryDisputeEntryRepository;
        }

        public async Task<ResponseModel> DeliveryDisputeEntrySave(DeliveryDisputeEntryModel deliveryDisputeEntryModel)
        {
            return await deliveryDisputeEntryRepository.DeliveryDisputeEntrySave(deliveryDisputeEntryModel);
        }
        public async Task<DeliveryDisputeEntryList> GetDeliveryDisputeEntryList(ReportRequestModel request)
        { 
            return await deliveryDisputeEntryRepository.GetDeliveryDisputeEntryList(request);
        }
        public async Task<DeliveryDisputeEntryModel> GetDeliveryCnDetailsForDispute(RequestModel request)
        {
            return await deliveryDisputeEntryRepository.GetDeliveryCnDetailsForDispute(request);
        }
        public async Task<ResponseModel> CheckDuplicateLRForDispute(RequestModel requestModel)
        {
            return await deliveryDisputeEntryRepository.CheckDuplicateLRForDispute(requestModel);
        }
        public async Task<ResponseModel> DeliveryDisputeEntryDelete(RequestModel requestModel)
        {
            return await deliveryDisputeEntryRepository.DeliveryDisputeEntryDelete(requestModel);
        }
        public async Task<ResponseModel> GetDispSlNo(RequestModel requestModel)
        {
            return await deliveryDisputeEntryRepository.GetDispSlNo(requestModel);
        }
    }
}
