import { Paginationmodel } from "./paginationmodel";
import { BankCashContraModel } from "./bankcashcontramodel";

export class Bankcashcontralistmodel {
  bankCashContraList: BankCashContraModel[] = [];
    pageMetaData: Paginationmodel = new Paginationmodel;
}
