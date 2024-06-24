import { Component , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Productmasterlistmodel  } from 'src/app/models/productmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Productmastermodel } from 'src/app/models/productmastermodel';
import { ProductMasterService } from 'src/app/services/productmaster.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-productmasterlist',
  templateUrl: './productmasterlist.component.html',
  styleUrls: ['./productmasterlist.component.css']
})

export class ProductmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allProductMaster: Productmasterlistmodel = new Productmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'productname',
    sortOrder: 'asc',
    search: ''
  }

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private productmasterService: ProductMasterService, private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
          .find(((aa: { menuName: string; }) => aa.menuName === "Product/Item Master"));
        if (privilegeStatus) {
          this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
          this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
          this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
          this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
        }
      }
    this.productmasterService.clearProductMasterDetails();
    this.productlist();
  }
    productlist(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.productmasterService.getProductMasterList(this.filter)
          .subscribe(resp => {
          this.allProductMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      // Set column title and data field
      columns: [ 
        {
          title: 'Product Name',
          data: 'productName',
        },
        {
          title: 'IsActive',
          data: 'isActive',
        },
        {
          title: 'Action',
          data: 'productId',
        },
      ],
    };
  }

  //Open new destination add screen
  addProductmaster(): void {
    this.route.navigate(['/addproductmaster']);
  }

  //Open user details screen
  getproductMasterDetails(ProductMaster: Productmastermodel): void {
    this.productmasterService.setProductMasterDetails(ProductMaster);
    this.route.navigate(['/productmasteredit']);
  }

}

