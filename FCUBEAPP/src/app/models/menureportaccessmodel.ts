export class Menureportaccessrightsmodel {
accountID: string = "";
  accountName: string = "";
  approveYn: string = "";
  level: string = "";
  parentAccountID?: string | null = null;
  children: Menureportaccessrightsmodel[] = [];
  checked: boolean = false;
  isExpanded: boolean = false;
}