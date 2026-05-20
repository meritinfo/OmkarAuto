using HRMasters.Models;
using HRMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Business
{
    public class PayGenerationBusiness : IPayGenerationBusiness
    {
        readonly IPayGenerationRepository payGenerationRepository;
        public PayGenerationBusiness(IPayGenerationRepository _payGenerationRepository)
        {
            payGenerationRepository = _payGenerationRepository;
        }

        public async Task<ResponseModel> EmpPayGenerationSave(EmpPayGenList payGenModel)
        {
            return await payGenerationRepository.EmpPayGenerationSave(payGenModel);
        }
        public async Task<EmpPayGenList> GetEmpPayGenerationList(PageFromDtToDtRequest request)
        {
            return await payGenerationRepository.GetEmpPayGenerationList(request);
        }
        public async Task<ResponseModel> EmpPayGenerationDelete(PageFromDtToDtRequest request)
        {
            return await payGenerationRepository.EmpPayGenerationDelete(request);
        }
        
    }
}
