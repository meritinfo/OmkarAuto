export class LoggedinUsermodel {
    userId: string = ""; 
    userName: string = "";
    status: boolean = false;
    message: string = "";
    scope: string = "";
    token: string = "";
    companyName: string = "";
}

export class Menumodel {
    menuName: string = "";
    menuCode: string = "";
    menuType: string = "";
}

export class Menulistmodel {
    moduleName: string = "";
    menuList: Menumodel[] = [];
}
