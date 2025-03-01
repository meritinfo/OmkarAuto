using DocumentFormat.OpenXml.Office2016.Excel;
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
    public class FreightGstMasterBusiness: IFreightGstMasterBusiness
    {
        readonly IFreightGstMasterRepository freightGstMasterRepository;
        public FreightGstMasterBusiness(IFreightGstMasterRepository _freightGstMasterRepository)
        {
            freightGstMasterRepository = _freightGstMasterRepository;
        }
        public async Task<ResponseModel> FreightGstMasterSave(FreightGstMasterModel freightGstMasterModel)
        {
            return await freightGstMasterRepository.FreightGstMasterSave(freightGstMasterModel);
        }
        public async Task<FreightGstMasterList> GetFreightGstMasterList(ReportRequestModel request)
        {
            return await freightGstMasterRepository.GetFreightGstMasterList(request);
        }
        public async Task<ResponseModel> CheckDuplicateFreightDesc(RequestModel requestModel)
            {
            return await freightGstMasterRepository.CheckDuplicateFreightDesc(requestModel);
    }
        public async Task<ResponseModel> FreightGstMasterDelete(RequestModel requestModel)
        {
            return await freightGstMasterRepository.FreightGstMasterDelete(requestModel);
        }

    }
}
