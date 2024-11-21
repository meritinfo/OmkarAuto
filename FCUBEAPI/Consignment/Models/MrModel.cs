namespace Consignment.Models
{
    public class MrModel
    {      					
        public string? MrMasterId { get; set; }
        public string? MrStation { get; set; }
        public string? MrStn { get; set; }
        public string? MrNo { get; set; }
        public string? MrDate { get; set; }
        public string? MrStatus { get; set; }
        public string? MrReceiptType { get; set; }
        public string? MrType { get; set; }
        public string? BillLrOthType { get; set; }
        public string? GroupMrYN { get; set; }
        public string? PartyGroupId { get; set; }
        public string? PartyCode { get; set; }
        public string? PartyName { get; set; }
        public string? CheqCashAmt { get; set; }
        public string? OnAcAdjAmt { get; set; }
        public string? TotalAmt { get; set; }
        public string? OnAcNewAmt { get; set; }
        public string? OnAcAdjusted { get; set; }
        public string? OnAcStatus { get; set; }
        public string? OnAcAdjMrYn { get; set; }       					
        public string? TotalRecdAmt { get; set; }
        public string? TotalFreightDed { get; set; }
        public string? TotalClaimsDed { get; set; }
        public string? TotalOldFrtDed { get; set; }
        public string? TotalOldClaims { get; set; }       
        public string? TotalOthersDed { get; set; }
        public string? TotalBankChrgDed { get; set; }
        public string? TotalOthersDed1 { get; set; }
        public string? TotalOthersDed2 { get; set; }
        public string? TotalOthersDed3 { get; set; }   
        public string? TotalRecoverable { get; set; }
        public string? TotalDed { get; set; }
        public string? TotalTDSDed { get; set; }
        public string? TotalSdEmdDed { get; set; }
        public string? TotalExcess { get; set; }
        public string? TotalOthers1 { get; set; }
        public string? TotalOthers2 { get; set; }
        public string? MrRemarks { get; set; }
        public string? CrAdviceNo { get; set; }
        public string? ChequeReturn { get; set; }
        public string? ChequeReturnDt { get; set; }
        public string? ChequeReturnRemarks { get; set; }
        public string? Ftmid { get; set; }
        public string? FtmidJv { get; set; }
        public string? NeftYN { get; set; }
        public string? MrDebitAc { get; set; }
        public string? MrSdEmdAc { get; set; }
        public string? SdEmdRefNo { get; set; }
        public string? PartyBankDet { get; set; }
        public string? ChequeNo { get; set; }
        public string? ChequeDt { get; set; }
        public string? ModifyRemarks { get; set; }
        public string? YearId { get; set; }
        public string? LoggedInUser { get; set; }
        public List<MrDtlsModel> MrDtlsList { get; set; }
        public List<MrOnAcModel> MrOnAcList { get; set; }
        public List<MrOnAcModel> MrAdjList { get; set; }

    }
}
