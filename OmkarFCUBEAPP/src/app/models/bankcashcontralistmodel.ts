import { Paginationmodel } from "./paginationmodel";
import { BankCashContraModel } from "./bankcashcontramodel";

export class Bankcashcontralistmodel {
  bankCashList: BankCashContraModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
