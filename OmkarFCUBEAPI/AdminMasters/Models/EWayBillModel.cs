namespace AdminMasters.Models
{
    /// <summary>
    ///Eway Bill details parameter
    /// </summary>
    public class EWayBillModel
    {
        public Results result { get; set; }
    }

    public class ItemList
    {
        public int item_number { get; set; }
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string product_description { get; set; }
        public int hsn_code { get; set; }
        public int quantity { get; set; }
        public string unit_of_product { get; set; }
        public double cgst_rate { get; set; }
        public double sgst_rate { get; set; }
        public double igst_rate { get; set; }
        public int cess_rate { get; set; }
        public int cessNonAdvol { get; set; }
        public double taxable_amount { get; set; }
    }

    public class Message
    {
        public long eway_bill_number { get; set; }
        public string eway_bill_date { get; set; }
        public string eway_bill_valid_date { get; set; }
        public int number_of_valid_days { get; set; }
        public string eway_bill_status { get; set; }
        public string generate_mode { get; set; }
        public string userGstin { get; set; }
        public string supply_type { get; set; }
        public string sub_supply_type { get; set; }
        public string document_type { get; set; }
        public string document_number { get; set; }
        public string document_date { get; set; }
        public string gstin_of_consignor { get; set; }
        public string legal_name_of_consignor { get; set; }
        public string address1_of_consignor { get; set; }
        public string address2_of_consignor { get; set; }
        public string place_of_consignor { get; set; }
        public int pincode_of_consignor { get; set; }
        public string state_of_consignor { get; set; }
        public string actual_from_state_name { get; set; }
        public string gstin_of_consignee { get; set; }
        public string legal_name_of_consignee { get; set; }
        public string address1_of_consignee { get; set; }
        public string address2_of_consignee { get; set; }
        public string place_of_consignee { get; set; }
        public int pincode_of_consignee { get; set; }
        public string state_of_supply { get; set; }
        public string actual_to_state_name { get; set; }
        public decimal total_invoice_value { get; set; }
        public double taxable_amount { get; set; }
        public int cgst_amount { get; set; }
        public int sgst_amount { get; set; }
        public decimal igst_amount { get; set; }
        public int cess_amount { get; set; }
        public string transporter_id { get; set; }
        public string transporter_name { get; set; }
        public int transportation_distance { get; set; }
        public int extended_times { get; set; }
        public string reject_status { get; set; }
        public string vehicle_type { get; set; }
        public string transaction_type { get; set; }
        public int other_value { get; set; }
        public int cess_nonadvol_value { get; set; }
        public List<ItemList> itemList { get; set; }
        public List<VehiclListDetail> VehiclListDetails { get; set; }
    }

    public class Results
    {
        public Message message { get; set; }
        public string status { get; set; }
        public int code { get; set; }
    }

    public class Root
    {
        public Results results { get; set; }
    }

    public class VehiclListDetail
    {
        public string update_mode { get; set; }
        public string vehicle_number { get; set; }
        public string place_of_consignor { get; set; }
        public string state_of_consignor { get; set; }
        public int tripshtNo { get; set; }
        public string userGstin { get; set; }
        public string vehicle_number_update_date { get; set; }
        public string transportation_mode { get; set; }
        public string transporter_document_number { get; set; }
        public string transporter_document_date { get; set; }
        public string group_number { get; set; }
    }
}
