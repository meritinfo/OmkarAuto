
using Shared.Models;

namespace AdminMasters.Models
{ 
    public class UserMasterList
    {
        public List<UserMasterModel> UserList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
