
import { Component,OnInit } from '@angular/core';
import { Unicorn } from './unicorn.model';
import { HttpClient } from '@angular/common/http';
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
  editableUnicorn!:Unicorn;
  editId!: string;

  constructor(private http:HttpClient){}

  gridData: Unicorn[]= [new Unicorn('LittleBrown',1,'brown','u2'),new Unicorn('Turmix',2,'white','u1')];

  ngOnInit(): void {
    this.http.get('https://crudcrud.com/api/23a2fc194dc84a358319a356fa54aaf8/unicorns') 
   .subscribe((unicorns:any) => {console.log(unicorns); this.gridData=unicorns})
  }

  onPostData(unicorn: Unicorn){
  
    this.gridData.push(unicorn);
    this.http.post('https://crudcrud.com/api/23a2fc194dc84a358319a356fa54aaf8/unicorns', unicorn)
    .subscribe((response:any) => {console.log(response)})
    this.show=false
   }

  


   onGridSelectionChange(event:SelectionEvent){
    console.log(event.selectedRows![0].dataItem)
    this.actualUnicorn= event.selectedRows![0].dataItem
   }

   onRemove(event:RemoveEvent){
    console.log(event)
    this.gridData= this.gridData.filter(item => {return item != event.dataItem})
    this.http.delete(`https://crudcrud.com/api/23a2fc194dc84a358319a356fa54aaf8/unicorns/${event.dataItem._id}`)
    .subscribe(response => {console.log(response)})
      //
   }

   onRemoveAll(){
    this.http.delete('https://crudcrud.com/api/23a2fc194dc84a358319a356fa54aaf8/unicorns') // not possible on api
    .subscribe(response => {console.log(response)})
    this.gridData= []
   }


   editClick(event:EditEvent){
    this.showEdit= !this.showEdit;
    this.show = false
   
    this.editableUnicorn= event.dataItem
    this.editId=event.dataItem._id
   }

   onToggle(): void {
    this.show = !this.show
    this.showEdit= false
 
  }

  onEditData(unicorn:Unicorn){
    if(this.editableUnicorn){
    this.http.put(`https://crudcrud.com/api/23a2fc194dc84a358319a356fa54aaf8/unicorns/${this.editId}`,
      new Unicorn(unicorn.name, unicorn.age, unicorn.colour))    // dont need id sent in object
    .subscribe(response => {console.log(response)})
    const id = this.gridData.indexOf(this.editableUnicorn)
    this.gridData[id]= unicorn
    this.showEdit=false
    }
   
   }

  }


  // new added unicorn can't be edited remotely until data is fetched again because of id is assigned at post


  // change link when testing requests

  // api calls not tested since refactor of id; CORS error still remains with delete requests (maybe put also)

  // ??? duplicate input field with same component; cell value transformation ; 