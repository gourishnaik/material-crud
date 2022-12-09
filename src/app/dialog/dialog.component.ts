import { Component, OnInit,Inject} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  freshnessList =["Brand New",'Second Hand','Refublished']
  actionBtn: string='save'
  productForm!:FormGroup;

  constructor(private formBuilder : FormBuilder,
              private api:ApiService,
              @Inject(MAT_DIALOG_DATA) public editData:any,
              private dialogRef:MatDialogRef<DialogComponent>  ) { }

  ngOnInit(): void {
    this.productForm=this.formBuilder.group({
      productName : ['',Validators.required],
      categoty    : ['',Validators.required],
      date        : ['',Validators.required],
      freshness   : ['',Validators.required],
      price       : ['',Validators.required],
      comment     : ['',Validators.required],
    });

if(this.editData){
  this.actionBtn ='update';
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['categoty'].setValue(this.editData.categoty);
  this.productForm.controls['date'].setValue(this.editData.date);
  this.productForm.controls['freshness'].setValue(this.editData.freshness);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['comment'].setValue(this.editData.comment);
}



  }

  addProduct(){
if(!this.editData){                        // if not edit then only we should add if edit dont dp addproduct()
  if(this.productForm.valid){                     //if my form is valid
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert("product added sucessfully");
        this.productForm.reset();                 //reset after sucess
        this.dialogRef.close('save');                                       //close form
       // this.getAllProducts();
      },
        error:(err)=>{
        alert("error while adding product");
      }
    })
  }
  }else{
    this.updateProduct()
}
  }


updateProduct(){
this.api.putProduct(this.productForm.value,this.editData.id)
.subscribe({
  next:(res)=>{
    alert("product updated sucessfully")
    this.productForm.reset();                 //reset after sucess
    this.dialogRef.close('update');                     //close form
  },
  error:(err)=>{
  alert("error while updating product");

  }
})

}


}
