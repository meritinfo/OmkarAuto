using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IDistanceDetailFrtRepository
    {
        Task<ResponseModel> DistanceDetailFrtSave(DistanceDetailFrtModel DistanceDetailFrtModel);

    }
}
