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
    public class GstPctValuesBusiness: IGstPctValuesBusiness
    {
        readonly IGstPctValuesRepository gstPctValuesRepository;
        public GstPctValuesBusiness(IGstPctValuesRepository _gstPctValuesRepository)
        {
            gstPctValuesRepository = _gstPctValuesRepository;
        }
        public async Task<ResponseModel> GstPctValuesSave(GstPctValuesModel gstPctValuesModel)
        {
            return await gstPctValuesRepository.GstPctValuesSave(gstPctValuesModel);
        }
        public async Task<GstPctValuesList> GetGstPctValuesList(ReportRequestModel request)
        {
            return await gstPctValuesRepository.GetGstPctValuesList(request);
        }
        public async Task<ResponseModel> GetGstPctValuesDelete(RequestModel request)
          {
            return await gstPctValuesRepository.GetGstPctValuesDelete(request);
    }
}
}
