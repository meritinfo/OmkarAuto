using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace FreightMasters.Repository
{
    public interface IBookingRegisterRptRepository
    {
        Task<BookingRegisterRptListModel> GetBookingRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetBookingRegisterRptExcel(ReportRequestModel request);
    }
}
