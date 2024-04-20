using FreightMasters.Models;
using FreightMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{

        public class DistanceMasterTripRptBusiness : IDistanceMasterTripRptBusiness
        {
            readonly IDistanceMasterTripRptRepository distanceMasterTripRptRepository;
            public DistanceMasterTripRptBusiness(IDistanceMasterTripRptRepository _distanceMasterTripRptRepository)
            {
                distanceMasterTripRptRepository = _distanceMasterTripRptRepository;
            }
            public async Task<DistanceMasterTripRptListModel> GetDistanceMasterTripRptList(ReportRequestModel request)
            {
                return await distanceMasterTripRptRepository.GetDistanceMasterTripRptList(request);
            }
            public async Task<ResponseModel> ExcelDistanceMasterTripRptList(ReportRequestModel request)
            {
                return await distanceMasterTripRptRepository.ExcelDistanceMasterTripRptList(request);
            }

        }
    
}
