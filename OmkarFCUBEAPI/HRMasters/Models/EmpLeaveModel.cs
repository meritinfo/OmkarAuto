using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMasters.Models
{
    public class EmpLeaveModel
    {
        public string? TransId { get; set; }
        public string? EmpId { get; set; }
        public string? YearId { get; set; }
        public string? LeaveId { get; set; }
        public string? LeaveCode { get; set; }
        public string? LeaveName { get; set; }
        public string? TotalLeaves { get; set; }
        public string? LeavesAdj { get; set; }
      
    }
}
