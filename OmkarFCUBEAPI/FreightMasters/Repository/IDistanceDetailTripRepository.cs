using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Repository
{
    public interface IDistanceDetailTripRepository
    {
        Task<ResponseModel> DistanceDetailTripSave(DistanceDetailTripModel distanceDetailTripModel);
    }
}
