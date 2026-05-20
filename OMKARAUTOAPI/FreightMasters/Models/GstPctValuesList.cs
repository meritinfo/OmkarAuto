using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Shared.Models;

namespace FreightMasters.Models
{
    public class GstPctValuesList
    {
        public List<GstPctValuesModel> PctList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }

}
