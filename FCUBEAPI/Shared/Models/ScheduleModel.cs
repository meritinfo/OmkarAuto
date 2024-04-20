using System;

namespace Shared.Models
{
    /// <summary>
    /// Login class model for login request
    /// </summary>
    public class ScheduleModel
    {
        public string WarningTimeStart { get; set; }
        public string PublishStart { get; set; }
        public string PublishEnd { get; set; }
        
    }
}
