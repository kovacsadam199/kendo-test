import { Unicorn } from './../unicorn.model';
import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-detail',
  templateUrl: './popup-detail.component.html',
  styleUrls: ['./popup-detail.component.css']
})
export class PopupDetailComponent implements OnInit {

@Output()  addEvent : EventEmitter<Unicorn> = new EventEmitter<Unicorn>()

@Input() unicorn!:Unicorn;

  ngOnInit(): void {
    if(this.unicorn){
      this.name=this.unicorn.name
      this.age=this.unicorn.age
      this.colour=this.unicorn.colour
      this.id = this.unicorn.getId ? this.unicorn.getId : ''
    }
  }

  name:string=''
  age:number=0;
  colour:string= ''
  id:string =''

  onAdd(){
    if(this.id === ''){
      this.id = 'u99'
    }
    this.addEvent.emit(new Unicorn(this.name,this.age,this.colour,this.id))
  }

}
