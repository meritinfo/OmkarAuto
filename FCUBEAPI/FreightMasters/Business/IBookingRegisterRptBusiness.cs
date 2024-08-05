using Shared.Models;
using FreightMasters.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IBookingRegisterRptBusiness
    {
        Task<BookingRegisterRptListModel> GetBookingRegisterRptList(ReportRequestModel request);
        Task<ResponseModel> GetBookingRegisterRptExcel(ReportRequestModel request);

    }

}
