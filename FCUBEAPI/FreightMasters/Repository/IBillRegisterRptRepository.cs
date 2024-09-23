using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IBillRegisterRptRepository
    {
        Task<BillRegisterRptListModel> GetBillRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetBillRegisterRptExcel(ReportRequestModel request);
    }
}
