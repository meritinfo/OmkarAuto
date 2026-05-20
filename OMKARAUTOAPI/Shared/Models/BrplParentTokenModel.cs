
using System.Collections.Generic;

namespace Shared.Models
{
    public class BrplParentTokenModel
    {
        public string type { get; set; }
        public bool forceUpdate { get; set; }
        public bool isEkycDone { get; set; }
        public bool isMaintenance { get; set; }
        public bool approvalRequested { get; set; }
        public bool completed { get; set; }
        public int statusCode { get; set; }
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string refresh_token { get; set; }
        public List<Scope> scope { get; set; }
        public int timeLeft { get; set; }
        public string token_type { get; set; }
    }
    public class Scope
    {
        public string type { get; set; }
        public string value { get; set; } 
    }
}
