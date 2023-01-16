
import { Component,OnInit } from '@angular/core';
import { Unicorn } from './unicorn.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EditEvent, RemoveEvent, SelectableSettings,SelectionEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kendo-test';

  showEdit:boolean = false;
  show:boolean = false;
  selectable: SelectableSettings = {enabled: true, mode: "single"};
  


  actualUnicorn!: Unicorn ;

  constructor(private http:HttpClient){}

  gridData: Unicorn[]= [new Unicorn('LittleBrown',1,'brown','u2'),new Unicorn('Turmix',2,'white','u1')];

  ngOnInit(): void {
   // this.http.get('https://crudcrud.com/api/6b399697e7e24116a68829bb2ea8ee30/unicorns') no free request left
   //.subscribe((unicorns:any) => {console.log(unicorns); this.gridData=unicorns})
  }

  onPostData(unicorn: Unicorn){
  
    this.gridData.push(unicorn);
   /*  this.http.post('https://crudcrud.com/api/6b399697e7e24116a68829bb2ea8ee30/unicorns', unicorn)
    .subscribe((response:any) => {console.log(response)}) */
    this.show=false
   }

   onDelete(){
    const id = this.actualUnicorn['id']
    this.http.delete(`https://crudcrud.com/api/6b399697e7e24116a68829bb2ea8ee30/unicorns/${id}`)
    .subscribe((response:any) => {console.log(response)})

   }

   testDelete(){
    const id = '63c133e2dba13103e8f11542'
    this.http.delete(`https://crudcrud.com/api/f6e21aeadcf04fd2b6d2a1e13a2fb73b/unicorns/${id}`,
     {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })})  // not working CORS error remains
    .subscribe((response:any) => {console.log(response)})

   // this.gridData.splice(1,1)  // to test it

   }

   onGridSelectionChange(event:SelectionEvent){
    console.log(event.selectedRows![0].dataItem)
    this.actualUnicorn= event.selectedRows![0].dataItem
   }

   onRemove(event:RemoveEvent){
    console.log(event)
    this.gridData= this.gridData.filter(item => {return item != event.dataItem})
      //
   }

   onRemoveAll(){
    this.http.delete('https://crudcrud.com/api/f6e21aeadcf04fd2b6d2a1e13a2fb73b')
    .subscribe(response => {console.log(response)})
    this.gridData= []
   }


   editClick(event:EditEvent){
    this.showEdit= !this.showEdit;
    this.show = false
    console.log(event)
    this.actualUnicorn= event.dataItem
    
   }

   onToggle(): void {
    this.show = !this.show
    this.showEdit= false
 
  }

  onEditData(unicorn:Unicorn){
   
    console.log(unicorn.name + unicorn.getId)
    const editableUnicorn= this.gridData.find(item => item.getId === unicorn.getId)
    if(editableUnicorn){
    this.http.put(`https://crudcrud.com/api/f6e21aeadcf04fd2b6d2a1e13a2fb73b/unicorn/${editableUnicorn.getId}`,editableUnicorn)
    .subscribe(response => {console.log(response)})
    const id = this.gridData.indexOf(editableUnicorn)
    this.gridData[id]= unicorn
    this.showEdit=false
    }
   
   }

  }




  // change link when testing requests

  // api calls not tested since refactor of id; CORS error still remains with delete requests (maybe put also)

  // ??? duplicate input field with same component; cell value transformation ; 