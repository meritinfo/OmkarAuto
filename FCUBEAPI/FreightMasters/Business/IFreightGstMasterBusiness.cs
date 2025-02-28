using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IFreightGstMasterBusiness
    {
        Task<ResponseModel> FreightGstMasterSave(FreightGstMasterModel freightGstMasterModel);
        Task<ResponseModel> CheckDuplicateFreightDesc(RequestModel requestModel);
        Task<FreightGstMasterList> GetFreightGstMasterList(ReportRequestModel request);
        Task<ResponseModel> FreightGstMasterDelete(RequestModel requestModel);

    }
}
