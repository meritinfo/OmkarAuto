import { Filtermodel } from "./filtermodel";

export class Cashbankfiltermodel  extends Filtermodel {
    fromDate: string = "";
    toDate: string = "";
    branch: string = "";
    receiptOrPayment: string = "";
    refType: string = "";
    yearId: string = "";
}
