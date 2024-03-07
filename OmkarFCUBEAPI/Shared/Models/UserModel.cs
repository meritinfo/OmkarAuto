namespace Shared.Models
{
    /// <summary>
    /// User class model for user details
    /// </summary>
    public class UserModel
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
        public string Scope { get; set; }
        public string Token { get; set; }
    }
}
