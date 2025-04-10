using Consignment.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consignment.Repository
{
    public  interface IDeliveryDisputeEntryRepository
    {
        Task<ResponseModel> DeliveryDisputeEntrySave(DeliveryDisputeEntryModel deliveryDisputeEntryModel);

        Task<DeliveryDisputeEntryList> GetDeliveryDisputeEntryList(ReportRequestModel request);
        Task<ResponseModel> DeliveryDisputeEntryDelete(RequestModel requestModel);
        Task<DeliveryAckPodModel> GetDeliveryCnDetailsForDispute(RequestModel request);
        Task<ResponseModel> CheckDuplicateLRForDispute(RequestModel requestModel);
        Task<ResponseModel> GetDispSlNo(RequestModel requestModel);
    }
}
