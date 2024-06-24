using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface ITyreModelRepository
    {
        Task<ResponseModel> TyreModelSave(TyreModelMasterModel tyreModelMasterModel);
        Task<TyreModelMasterList> GetTyreModelMasterList(ReportRequestModel request);
        Task<ResponseModel> TyreModelMasterDelete(RequestModel requestModel);
        Task<ResponseModel> CheckDuplicateTyre(RequestModel requestModel);
    }
}
