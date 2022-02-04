import { Component, OnInit } from '@angular/core';
import { VideoGamesService } from 'src/app/services/video-games.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  //----------------------Parameters----------------------
  //Pagination
  public page: number = 1;

  //To be uesd to store the JOSN imported from the API
  listCharacters: any= [];
  listPlanets: any= [];
  massCharacter: any= [];
  heightCharacter: any= [];
  nameCharacter: any= [];
  nextPage: any;
  prevPage: any;
  
  //To select the DOM to watch
  toWatch: any = "characters"; 

  singleCharacter: any = {
    "name":"temp","height":"temp","mass":"temp","hair_color":"temp", "skin_color": "temp", "birth_year": "temp", "gender": "temp" ,"homeworld": "temp", "created": "temp"};
  
  constructor(private videoGamesSvc:VideoGamesService){}
    
  ngOnInit(): void {   
    this.getCharacters();
  }
  //--------------------Fetch data from API--------------------//
  //Fetch the data from the Data Base to the component
  getPlanets(){
    this.videoGamesSvc.getPlanets(this.page).subscribe((Planets) => {  
      this.listPlanets = Planets.results;
      console.log(Planets);
      this.toWatch = "planets"
      console.log(this.toWatch);
    }, error =>{
      console.log(error);
    })
  }
  getCharacters(){
    this.videoGamesSvc.getPeople(this.page).subscribe((Characters) => {  
      this.listCharacters = Characters.results;
      this.nextPage = Characters.next;
      this.prevPage = Characters.previous;
      console.log(Characters);
      this.toWatch = "characters"
      console.log(this.toWatch);
    }, error =>{
      console.log(error);
    })
  }
  getCharacterSortMass(){
      this.videoGamesSvc.getPeople(this.page).subscribe((Characters) => {  
      this.massCharacter = Characters.results.sort(
        function (a: any, b: any) {
          if (a.mass > b.mass) {
            return 1;
          }
          if (a.mass < b.mass) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      );
      console.log(Characters);
      this.toWatch = "sortMAss"

      console.log(this.toWatch);
    }, error =>{
      console.log(error);
    })
  }
  getCharacterSortHeight(){
      this.videoGamesSvc.getPeople(this.page).subscribe((Characters) => {  
      this.heightCharacter = Characters.results.sort(
        function (a: any, b: any) {
          if (a.height > b.height) {
            return 1;
          }
          if (a.height < b.height) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      );
      console.log(Characters);
      this.toWatch = "sortHeight"

      console.log(this.toWatch);
    }, error =>{
      console.log(error);
    })
  }
  getCharacterSortName(){
      this.videoGamesSvc.getPeople(this.page).subscribe((Characters) => {  
      this.nameCharacter = Characters.results.sort(
        function (a: any, b: any) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      );
      console.log(Characters);
      this.toWatch = "sortName"

      console.log(this.toWatch);
    }, error =>{
      console.log(error);
    })
  }
    getCharacter(id: any){
    this.videoGamesSvc.getCharacter(id).subscribe((Characters) => {  
      this.singleCharacter = Characters.results;
      console.log(this.singleCharacter);
      this.toWatch = "character"
      console.log(this.toWatch);
      
    }, error =>{
      console.log(error);
    })
  }
}