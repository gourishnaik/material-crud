import { Component,OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'material-crud';
  displayedColumns: string[] = ['ProductName', 'Category', 'date', 'freshness','price','comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private api:ApiService) {}

  ngOnInit(): void {
  this.getAllProducts();
  }
  

  openDialog() {
   //panelClass:"full-width-dialog"
    this.dialog.open(DialogComponent, {
   // width:'30%',
     //height: '80%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }


getAllProducts(){
this.api.getProduct()
.subscribe({
  next:(res)=>{
this.dataSource = new MatTableDataSource(res);
this.dataSource.paginator=this.paginator;
this.dataSource.sort=this.sort;


  },
  error:(err)=>{
alert("error while fetching records!!")
  }
})
}

editProduct(row:any){
 // panelClass:"full-width-dialog"
  this.dialog.open(DialogComponent, {
  //width:'29%',   
  width: '400px',   
data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllProducts();
    }
  })
}

deleteProduct(id:number){
  
this.api.deleteProduct(id)
.subscribe({
  next:(res)=>{
    alert("product deleted sucessfully")
    this.getAllProducts();
  },
  error:()=>{
    alert("error while deleting product")
  }
  
})
}


applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
}
}

}

