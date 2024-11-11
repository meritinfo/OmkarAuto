using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBusinessSummRptBusiness
    {
        Task<BusinessSummRptListModel> GetBusinessSummRptList(ReportRequestModel request);
        Task<ResponseModel> GetBusinessSummRptExcel(ReportRequestModel request);
    }
}
