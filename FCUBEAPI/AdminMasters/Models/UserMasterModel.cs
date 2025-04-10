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
        public string? RoleId { get; set; }
        public string? UserRoleType { get; set; }
        public string? CentreName { get; set; }
        public string? ActiveYN { get; set; }
        public string? BenApproveBlock { get; set; }
        public string? UpdateAdvancePaid { get; set; }
        public string? DprAdvanceUpdate { get; set; }
        public string? DprAddLr { get; set; }
        public string? UpdateAssignBy { get; set; }        
        public string? UpdateCnFreight { get; set; }
        public string? ShowFreightDtls { get; set; }        
        public string? BranchList { get; set; }
        public string? LoggedInUser { get; set; }
        public string? ImageName { get; set; }
        public string? Empbranch { get; set; }
        public string? OutOfOffReqOTP { get; set; }
    }

}
