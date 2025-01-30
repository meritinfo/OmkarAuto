using FreightMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IGstPctValuesRepository
    {
        Task<ResponseModel> GstPctValuesSave(GstPctValuesModel gstPctValuesModel);
        Task<GstPctValuesList> GetGstPctValuesList(ReportRequestModel request);
        Task<ResponseModel> GetGstPctValuesDelete(RequestModel request);
    }
}
