using FinTrans.Models;
using FinTrans.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class PlTransferBusiness:IPlTransferBusiness
    {

        readonly IPlTransferRepository plTransferRepository;
        public PlTransferBusiness(IPlTransferRepository _plTransferRepository)
        {
            plTransferRepository = _plTransferRepository;
        }
        public async Task<PlTransferModel> PlTransferList(RequestModel request)
        {
            return await plTransferRepository.PlTransferList(request);
        }

        public async Task<ResponseModel> PLTransferSave(PlTransferModel plTransfer)
        {
            return await plTransferRepository.PLTransferSave(plTransfer);
        }
    }
}
