import { observable, computed, action } from "mobx";
import * as d3 from "d3";
import {json, csv} from 'd3-request';
import * as topojson from 'topojson'
import dataset from './pizza.json';

class DataStore {

    constructor () {
        console.log('Json load functions on constructor');
        console.log( dataset.data[0].Nombre); 
       //'loading json with d3 on constructor'
        d3.json("hola.json").then( (response) => {
            console.log(response)
         });
   
    }

    @action
    dataload() {
   //'Mobx action, json load with d3 not working ERROR: JSON.parse: unexpected character at line 1 column 1 of the JSON data'
     d3.json("pizza.json").then( (response) => {
         console.log( 'JSON D3' , response)
      });

     // console.log('MObx action, csv load with d3 printing html array size of 39' 
     d3.csv("pizzahood.csv").then( (response) => {
          console.log( 'CSV D3' , response)
       });
    }

}

export const store = new DataStore();