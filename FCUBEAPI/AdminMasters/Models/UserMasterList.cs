namespace AdminMasters.Models
{
    /// <summary>
    ///User List class
    /// </summary>
    public class UserMasterList
    {
        public List<UserMasterModel> UserList { get; set; }
        public PaginationMetaData PageMetaData { get; set; }
    }
}
