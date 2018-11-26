import React, { Component } from 'react';
import './FilterResult.css'
import { store } from '../../store/DataStore';

class FilterResult extends Component {
             
constructor(props){
    super(props);
  }

 render(){
 const back = {
     backgroundImage: `url(${this.props.image})`
 };

 const overcolor = {
    backgroundColor: '#F49672',
    opacity: '0.6'
    }

 return (
      <div className='filterResult' >
            <div className='frneighs'>
                    {
                        this.props.neighs.map(e => {
                            return <div className='divneighs'> 
                            <img className='neighImg' src= {require('../GenViz/photos/' + e.foto)}></img>
                            <h5 className='tcenter'>{e.nombre}</h5>
                            <p className='tcenter'>{this.props.scores[e.nombre]} %</p>
                            </div>
                        })
                    }
                </div>
        </div>
      )}
 }
            
export default   FilterResult
            
            