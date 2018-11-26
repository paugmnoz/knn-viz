import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { store } from '../../store/DataStore';
import './Genericplan.css'
class Genericplan extends Component {
 
    
 constructor(props){
    super(props);
 
 }
    render(){
        const back = {
            backgroundColor: this.props.color
          };
    return (
        <div className='genericplandiv' >
            <div class='gdheader' style={back}>
                <h1 className='h1White'>{this.props.title}</h1>
            </div>
            <div className='gdcontent'>
                <p>Las personas más similares a {store.person1} en {this.props.description}</p>
                <div className='neighs'>
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
        </div>
    )}
}

export default   Genericplan

