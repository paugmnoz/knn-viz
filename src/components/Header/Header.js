import React, { Component } from 'react';
import './Header.css'
import { store } from '../../store/DataStore';

class Header extends Component {
             
                
constructor(props){
    super(props);
  }
 render(){
 const back = {
     backgroundImage: `url(${this.props.image})`

 };

 const overcolor = {
    backgroundColor: this.props.color,
    opacity: '0.6'


}
 return (
      <div className='header' >
      
            <div class="parentImg">
                <div class="childImg" style={back}></div>
            </div >
            <div  class="overlay" style={overcolor} ></div>
            <div class="t3">
            <h1 href="#">{this.props.title} {store.person1} ? </h1>
            <p >{this.props.p}  {store.person1} en estos 4 casos </p>
            </div>
           
        </div>
                )}
            }
            
export default   Header
            
            