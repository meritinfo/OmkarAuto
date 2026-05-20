using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Repository
{
    public interface IPaySheetRptRepository
    {
        Task<EmpPayGenList> GetPaySheetRptList(ReportRequestModel request);
        Task<ResponseModel> GetPaySheetRptExcel(RequestModel request);
        Task<ResponseModel> GetPfECRExcel(RequestModel request);
        Task<ResponseModel> GetPfECRText(RequestModel request);
    }
}
