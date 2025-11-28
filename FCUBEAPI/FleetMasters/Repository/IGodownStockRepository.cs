using FleetMasters.Models;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetMasters.Repository
{
    public interface IGodownStockRepository
    {
        Task<ResponseModel> GodownStockSave(GodownStockModel godownStockModel);
        Task<List<DropDownListModel>> GetFltGodownList();
        Task<GodownStockModel> GetSparesLubesStockInnergrid(RequestModel request);
    }
}
