using FinTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public interface IPlTransferBusiness
    {
        Task<PlTransferModel> PlTransferList(RequestModel request);
        Task<ResponseModel> PLTransferSave(PlTransferModel plTransfer);
    }
}
