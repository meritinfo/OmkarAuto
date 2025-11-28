using FleetMasters.Models;
using FleetMasters.Repository;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Business
{
    public class GodownStockBusiness: IGodownStockBusiness
    {

        readonly IGodownStockRepository godownStockRepository;

        public GodownStockBusiness(IGodownStockRepository _godownStockRepository)
        {
            godownStockRepository = _godownStockRepository;
        }
      public async  Task<ResponseModel> GodownStockSave(GodownStockModel godownStockModel)
      {
            return await godownStockRepository.GodownStockSave(godownStockModel);
      }

      public async Task<List<DropDownListModel>> GetFltGodownList()
      {
        return await godownStockRepository.GetFltGodownList();
      }
      public async Task<GodownStockModel> GetSparesLubesStockInnergrid(RequestModel request)
      {
        return await godownStockRepository.GetSparesLubesStockInnergrid(request);
      }
       
    }
}
