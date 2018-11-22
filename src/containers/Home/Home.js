import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { store } from '../../store/DataStore';
import * as d3 from "d3";

@observer class Home extends Component {

    constructor(props) {
        super(props);
        this.data();
        
    }
    data() {
       // console.log('Loading json with d3 from React Component not working');
       d3.json("./pizza.json",
       (error,data) => {
           console.log(data);
         });
    }
   
      render(){
        return <div>  
            Home
            {store.dataload()}
        <select>
            <option value=" ">none</option>
                    </select>

        </div>
    }
}
export default Home;