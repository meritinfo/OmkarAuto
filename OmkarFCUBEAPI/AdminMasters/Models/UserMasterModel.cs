namespace AdminMasters.Models
{
    /// <summary>
    /// Response class model for User Master
    /// </summary>
    public class UserMasterModel
    {
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserPassword { get; set; }
        public string? UserDescription { get; set; }
        public string? UserMobile { get; set; }
        public string? UserEmail { get; set; }
        public string? UserScope { get; set; }
        public byte[]? UserImage { get; set; }
        public string? RoleId { get; set; }
        public string? Remarks { get; set; }
        public string? Employeeid { get; set; }
        public string? Empbranch { get; set; }
        public string? ActiveYN { get; set; }
        public DateTime? LastLoginDateTime_Success { get; set; }
        public string? LastLoginIP_Success { get; set; }
        public DateTime? LastLoginDateTime_Fail { get; set; }
        public string? LastLoginIP_Fail { get; set; }
        public string? LoggedInUser { get; set; }
        public string? BranchList { get; set; }
        public string? ModuleList { get; set; }
        public string? CreatedDate { get; set; }
    }
}
