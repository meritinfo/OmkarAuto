namespace Shared.Models
{
    /// <summary>
    /// Login class model for login request
    /// </summary>
    public class MailHostDtlsModel
    {
        public string EmailId { get; set; }
        public string EmailPwd { get; set; }
        public string EmailServer { get; set; }
        public string EmailPort { get; set; }
        public string EmailDisplayName { get; set; }

    }
}
