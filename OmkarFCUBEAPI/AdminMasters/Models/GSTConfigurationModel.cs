namespace AdminMasters.Models
{
    /// <summary>
    ///GST COnfiguration details parameter
    /// </summary>
    public class GSTConfigurationModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string GrantType { get; set; }
        public string GSTNumber { get; set; }
    }
}
