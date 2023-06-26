using FreightMasters.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreightMasters.Business
{
    public interface IConsigneeMasterBusiness
    {
        Task<ResponseModel> ConsigneeMasterSave(ConsigneeMasterModel consigneeMasterModel);
    }
}
