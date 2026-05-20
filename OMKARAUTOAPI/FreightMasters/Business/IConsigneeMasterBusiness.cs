using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FreightMasters.Business
{
    public interface IConsigneeMasterBusiness
    {
        Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel);
        Task<ConsigneeCnorList> GetConsigneeCnorList(ReportRequestModel request);
        Task<ResponseModel> ConsigneeCnorMasterDelete(RequestModel requestModel);
    }
}
