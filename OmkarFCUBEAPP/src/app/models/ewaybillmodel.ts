export class Ewaybillmodel {
    result: Results = new Results()
}

class ItemList {
    item_number: string = "";
    product_id: string = "";
    product_name: string = "";
    product_description: string = "";
    hsn_code: string = "";
    quantity: string = "";
    unit_of_product: string = "";
    cgst_rate: string = "";
    sgst_rate: string = "";
    igst_rate: string = "";
    cess_rate: string = "";
    cessNonAdvol: string = "";
    taxable_amount: string = "";
}

class Message {
    eway_bill_number: string = "";
    eway_bill_date: string = "";
    eway_bill_valid_date: string = "";
    number_of_valid_days: string = "";
    eway_bill_status: string = "";
    generate_mode: string = "";
    userGstin: string = "";
    supply_type: string = "";
    sub_supply_type: string = "";
    document_type: string = "";
    document_number: string = "";
    document_date: string = "";
    gstin_of_consignor: string = "";
    legal_name_of_consignor: string = "";
    address1_of_consignor: string = "";
    address2_of_consignor: string = "";
    place_of_consignor: string = "";
    pincode_of_consignor: string = "";
    state_of_consignor: string = "";
    actual_from_state_name: string = "";
    gstin_of_consignee: string = "";
    legal_name_of_consignee: string = "";
    address1_of_consignee: string = "";
    address2_of_consignee: string = "";
    place_of_consignee: string = "";
    pincode_of_consignee: string = "";
    state_of_supply: string = "";
    actual_to_state_name: string = "";
    total_invoice_value: string = "";
    taxable_amount: string = "";
    cgst_amount: string = "";
    sgst_amount: string = "";
    igst_amount: string = "";
    cess_amount: string = "";
    transporter_id: string = "";
    transporter_name: string = "";
    transportation_distance: string = "";
    extended_times: string = "";
    reject_status: string = "";
    vehicle_type: string = "";
  
    transaction_type: string = "";
    other_value: string = "";
    cess_nonadvol_value: string = "";
    itemList: ItemList[] = [];
    vehiclListDetails: VehiclListDetail[] = [];
}

class Results {
    message: Message = new Message();
    status: string = "";
    code: string = "";
   
}

class Root {
    results: Results = new Results();
}

class VehiclListDetail {
    update_mode: string = "";
    vehicle_number: string = "";
    place_of_consignor: string = "";
    state_of_consignor: string = "";
    tripshtNo: string = "";
    userGstin: string = "";
    vehicle_number_update_date: string = "";
    transportation_mode: string = "";
    transporter_document_number: string = "";
    transporter_document_date: string = "";
    group_number: string = "";
}