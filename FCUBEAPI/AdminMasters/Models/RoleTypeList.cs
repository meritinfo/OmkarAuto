using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace AdminMasters.Models
{
    public class RoleTypeList
    {
        public List<RoleMasterModel> RoleList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
