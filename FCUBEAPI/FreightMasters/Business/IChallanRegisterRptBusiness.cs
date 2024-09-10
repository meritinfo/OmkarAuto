using Shared.Models;
using FreightMasters.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IChallanRegisterRptBusiness
    {
        Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request);

    }

}
