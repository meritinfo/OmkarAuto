using HRMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Repository
{
    public interface IPayGenerationRepository
    {
        Task<ResponseModel> EmpPayGenerationSave(EmpPayGenList payGenModel);
        Task<EmpPayGenList> GetEmpPayGenerationList(PageFromDtToDtRequest request);
        Task<ResponseModel> EmpPayGenerationDelete(PageFromDtToDtRequest request);
    }
}
