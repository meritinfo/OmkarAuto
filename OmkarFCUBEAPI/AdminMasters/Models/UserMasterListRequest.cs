namespace AdminMasters.Models
{
    /// <summary>
    ///User Master for User list
    /// </summary>
    public class UserMasterListRequest
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public string Search { get; set; }
    }
}
