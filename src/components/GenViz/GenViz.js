import React, { Component } from 'react';
import { observer } from 'mobx-react';
import * as d3 from "d3";
import GenVizStore from "../../store/GenVizStore"
import { store } from '../../store/DataStore';
import './GenViz.css';

class GenViz extends Component {
/**
 *       <defs>
                        <pattern id="image" x="0" patternUnits="userSpaceOnUse" y="-100" height="100%" width="100%">
                        <image x="0" y="0" height="100%" width="100%" xlinkHref={d.foto}></image>
                        </pattern>
                    </defs>
 */

 
 constructor(props){
    super(props);
    this.onHover = this.onHover.bind(this);
 }

 
    onHover(obj) {
   /*     console.log(d3.select(this));
        d3.select(this).attr( {r: 5})

        this.props.data.map((d,i) => {
        })*/
        obj.attr({r: (d, i) =>25
        })
    }
    componentDidMount(){
        let config = {
            "avatar_size" : 150
        }
        this.creatcircle(config);

    }
    
    creatcircle(config){
          // Extract the width and height that was computed by CSS
          var parentDiv = document.getElementById("cat-viz");
  
        let svg = d3.select("#cat-viz")    
        .append("svg")
        .attr("width",'700px')
        .attr("height", '500px')
        .classed("cat-svg-container", true)
   
        var defs = svg.append('svg:defs');
        var g = svg.append("g")
        .classed("catviz", true)
        store.datasvg.map(( d, i) => {
/*
            defs.append("svg:pattern")
            .attr("id", "grump_avatar" + i)
            .attr("width", config.avatar_size) 
            .attr("height", config.avatar_size)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", '../../../public/photos' + d.foto)
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size)
            .attr("x", 0)
            .attr("y", 0);*/

                g.append("circle")
                .classed("cat-circles", true)
                .classed("cat-highlighted", true)
                .attr("cx",  this.props.coor[i][0])
                .attr("cy",  this.props.coor[i][1])
                .attr("r",5)
                .style("fill", "#E29561")
               // .style("fill", "url(#grump_avatar" + i + ")")
                .attr("id",i)

                d3.select("#value")
                .text('Escoge un usuario');
                d3.select('#profilephoto')
                .attr('src', require('./photos/luke.jpg'))
                 d3.select("#value2")
                .text('ID');
                 d3.select(".colorheader")
                .style(
                    "background-color", "#FFC300"
                )

                let selected = false;

                if(!selected) {
                    d3.selectAll('circle').on("mouseover", handleMouserOver)
                    d3.selectAll('circle').on("mouseout", handleMouseOut)
                    d3.selectAll('circle').on("click", handleclick)
                }
                
                d3.select('.catviz').style('transform', 'translate(5%, 3%)')
                d3.select('#btnOther').on("click", (e) => {
                    selected = false;
                    store.clean(store.genneigbhors, store.genneigbhorsScores);
                    store.clean(store.comicNeighs, store.comicNeighsScores);

                    d3.select("#value")
                    .transition()
                    .duration(500)
                    .delay(200) 
                    .text('Escoge un usuario');
                    d3.select('#profilephoto')
                  
                    .attr('src', require('./photos/luke.jpg'))
                     d3.select("#value2")
                     .transition()
                    .duration(500)
                    .delay(200) 
                    .text('ID');
                     d3.select(".colorheader")
                     .transition()
                    .duration(500)
                    .delay(200) 
                    .style(
                        "background-color", "#FFC300"
                    )
     
                    d3.selectAll('circle')
                    .transition()
                    .duration(500)
                    .delay(200)    
                    .style("fill", '#E29561')

                    
                });
                    function handleMouserOver() { 

                        if(!selected) {
                        let foto = 0;
                        let index = 0;
                        if( d3.select(this).attr('id') > 72){
                             foto =  store.data[d3.select(this).attr('id') - 73].foto; 
                             index = d3.select(this).attr('id') - 73
                        } else {
                            foto =  store.data[d3.select(this).attr('id')].foto; 
                            index = d3.select(this).attr('id')
                        }
                        d3.select(this).attr("r", 50)
        
                        
                               //Update the tooltip position and value
                   
                         d3.select("#value")
                         .text(store.data[index].nombre);
                         d3.select('#profilephoto')
                         .attr('src', require('./photos/' + foto))
                     d3.select("#value2")
                         .text('ID: ' + store.data[index].ID);
                     d3.select(".colorheader")
                         .style(
                             "background-color", "#FFC300"
                         )
        
                     //Show the tooltip
                d3.select("#tooltip").classed("hidden", false).style('transform', 'translate(0%, 0%)');
                       
                         }
                    }
                    function handleclick() { 
                        if(!selected) {
                        console.log('CLICK')
                        selected = true;
                        let foto = 0;
                        let index = 0;
                        if( d3.select(this).attr('id') > 72){
                             foto =  store.data[d3.select(this).attr('id') - 73].foto; 
                             index = d3.select(this).attr('id') - 73
                        } else {
                            foto =  store.data[d3.select(this).attr('id')].foto; 
                            index = d3.select(this).attr('id')
                        }
                        store.person1 = store.data[index].nombre;
                        store.generalNeighbourhood(5);
                        store.comicNeighbours(5);

                        if(d3.selectAll('circle') !==  d3.select(this)) {
                            d3.selectAll('circle')
                            .transition()
                            .duration(500)
                            .delay(200)  
                            .style("fill", 'gray')
                            
                            d3.select(this)
                            .attr("r", 5)
                            .transition()
                            .duration(500)
                            .delay(200)  
                            .style("fill", '#E29561')
                           

                        }
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .delay(200)  
                        .attr("r", 50)
                    
        
                         d3.select("#value")
                         .text(store.data[index].nombre);
                         d3.select('#profilephoto')
                         .attr('src', require('./photos/' + foto))
                     d3.select("#value2")
                         .text('ID:' + store.data[index].ID);
                     d3.select(".colorheader")
                         .style(
                             "background-color", "#FFC300"
                         )
                         window.location.href='#genresults'
                        }
                        
                    }
                    function handleMouseOut() {
                        d3.select(this).attr("r",5)
                        
                        if(!selected){
                        //Show the tooltip
                       // d3.select("#tooltip").classed("hidden", false).style('transform', 'translate(220%, -950%)');
                       d3.select("#value")
                       .text('Escoge un usuario');
                       d3.select('#profilephoto')
                       .attr('src', require('./photos/luke.jpg'))
                        d3.select("#value2")
                       .text('ID');
                        d3.select(".colorheader")
                       .style(
                           "background-color", "#FFC300"
                       )
        
                        } else {

                        }
                        
                     
                    }

            })
    
       
    }

    render(){
        
    return (
        <div className='container flex-child' >
        <div id='cat-viz'>
        </div>

        <div id="tooltip" class="hidden">
            <div class="colorheader">
            </div>
            <div class="content">
            <img id='profilephoto' src='' width= 'auto' height='150px'></img>
                <p>
                    <strong>
                     <span id="value"></span>
                    </strong>
                </p>
                <p>
                 <span id="value2"></span>
                </p>
                <button id='btnOther' className='defaultbtn' onClick={(e) => {
             store.person1 = ''
         }}>Seleccionar otra persona</button>
            </div>
        </div>

        </div>
    )}
}

export default   GenViz



    /**
     *      <svg width ={500} height={500}>
        
            {
                   
                this.props.data.map(( d, i) => {
                    console.log(d.foto)
                   return  <g>
                 
                    <circle id='tooltip' onMouseOver={(e) => e.target.setStyle({fillColor: 'green'})}
                        cx = { this.props.coor[i][0]}
                        cy = { this.props.coor[i][1]}
                        r = {5}
                        fill='red'
                        />     
                       </g>
                         }
                )


            }
            </svg>
     */