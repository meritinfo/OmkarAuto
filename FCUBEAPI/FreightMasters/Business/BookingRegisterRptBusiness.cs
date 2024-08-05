using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;

namespace FreightMasters.Business
{
    public class BookingRegisterRptBusiness : IBookingRegisterRptBusiness
    {
        readonly IBookingRegisterRptRepository bookingRegisterRptRepository;
        public BookingRegisterRptBusiness(IBookingRegisterRptRepository _bookingRegisterRptRepository)
        {
            bookingRegisterRptRepository = _bookingRegisterRptRepository;
        }
        public async Task<BookingRegisterRptListModel> GetBookingRegisterRptList(ReportRequestModel request)
        {
            return await bookingRegisterRptRepository.GetBookingRegisterRptList(request);
        }
        public async Task<ResponseModel> GetBookingRegisterRptExcel(ReportRequestModel request)
        {
            return await bookingRegisterRptRepository.GetBookingRegisterRptExcel(request);
        }

    }
}
