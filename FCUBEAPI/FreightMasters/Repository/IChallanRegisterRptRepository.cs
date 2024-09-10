using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FreightMasters.Repository
{
    public interface IChallanRegisterRptRepository
    {
        Task<ChallanRegisterRptListModel> GetChallanRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetChallanRegisterRptExcel(ReportRequestModel request);
    }
}
