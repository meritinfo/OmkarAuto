using FinanceMaster.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinanceMaster.Repository
{
    public interface ISubLedgerMasterRepository
    {
        Task<SubLedgerMasterList> GetSubLedgerMasterList(PageFromDtToDtRequest request);
        Task<ResponseModel> SubLedgerMasterSave(SubLedgerMasterModel subLedgerMasterModel);
        Task<SubLedgerMasterModel> GetSubLedgerMasterInnerGridList(RequestModel request);
        Task<ResponseModel> SubLedgerMasterDelete(RequestModel req);

    }
}
