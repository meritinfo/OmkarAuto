using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FreightMasters.Models;

namespace FreightMasters.Repository
{
    public interface IProductGroupMasterRepository
    {
        Task<ResponseModel> ProductGroupMasterDetailsSave(ProductGroupMasterModel productGroupMasterModel);
    }
}
