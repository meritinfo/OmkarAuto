
namespace Consignment.Models
{
    public class DprDtlModel
    {
        public string? DprDtlId { get; set; }
        public string? DprId { get; set; }
        public string? FromPlace { get; set; }
        public string? ToPlace { get; set; }
        public string? FromStn { get; set; }
        public string? ToStn { get; set; }
        public string? GcNoteNo { get; set; }
        public string? MainGcYN { get; set; }
        public string? SpecialRemarks { get; set; }
    }
}