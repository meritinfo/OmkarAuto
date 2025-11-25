using FinTrans.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinTrans.Repository
{
    public interface IPlTransferRepository
    {
        Task<PlTransferModel> PlTransferList(RequestModel request);
        Task<ResponseModel> PLTransferSave(PlTransferModel obj);
    }
}
