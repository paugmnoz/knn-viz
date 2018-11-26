/* <div>
<h1>Plan Hablar sobre novelas gráficas tema fantastico de noche con cafe frio</h1>
<select    onChange={this.handleChange1} >
<option value=" ">none</option>
{
    store.data.map( e => {
        return <option value={e.nombre}>{e.nombre}</option> 
    })
}
        </select>


<button id="startapp" type="submit" onClick={(e) => { store.pollOne(5)}}>
vecinos</button>
{
    
    store.pollOneN.map( e => {
       
            return <p >{e.nombre}  {store.pollOneScores[e.nombre]}</p> 
    
       
    })
}
</div>

  <div>
<h1>Plan ir a museo</h1>
<select    onChange={this.handleChange1} >
<option value=" ">none</option>
{
    store.data.map( e => {
        return <option value={e.nombre}>{e.nombre}</option> 
    })
}
        </select>


<button id="startapp" type="submit" onClick={(e) => { store.pollTwo(5)}}>
vecinos</button>
{
    
    store.pollTwoN.map( e => {
       
            return <p >{e.nombre}  {store.pollTwoScores[e.nombre]}</p> 
    
       
    })
}
</div>
<div>
<h1>Plan peli independiente en casa si le gustan novela graficas por tema</h1>
<select    onChange={this.handleChange1} >
<option value=" ">none</option>
{
    store.data.map( e => {
        return <option value={e.nombre}>{e.nombre}</option> 
    })
}
        </select>


<button id="startapp" type="submit" onClick={(e) => { store.pollThree(5)}}>
vecinos</button>
{
    
    store.pollThreeN.map( e => {
       
            return <p >{e.nombre}  {store.pollThreeScores[e.nombre]}</p> 
    
       
    })
}
</div>

  <div>
<h1>cita</h1>
<select    onChange={this.handleChange1} >
<option value=" ">none</option>
{
    store.data.map( e => {
        return <option value={e.nombre}>{e.nombre}</option> 
    })
}
        </select>


<button id="startapp" type="submit" onClick={(e) => { store.pollFour(5)}}>
vecinos</button>
{
    
    store.pollFourN.map( e => {
       
            return <p >{e.nombre}  {store.pollFourScores[e.nombre]}</p> 
    
       
    })
}
</div>

   <div>
        <h1>PLan recomendado</h1>
         <select onChange={this.handleSquad} >
            <option value=" ">none</option>
            {
                store.data.map( e => {
                    return <option value={e.nombre}>{e.nombre}</option> 
                })
            }
        </select>
        <select onChange={this.handleSquad} >
            <option value=" ">none</option>
            {
                store.data.map( e => {
                    return <option value={e.nombre}>{e.nombre}</option> 
                })
            }
        </select>
        <select onChange={this.handleSquad} >
            <option value=" ">none</option>
            {
                store.data.map( e => {
                    return <option value={e.nombre}>{e.nombre}</option> 
                })
            }
        </select>
        <select onChange={this.handleSquad} >
            <option value=" ">none</option>
            {
                store.data.map( e => {
                    return <option value={e.nombre}>{e.nombre}</option> 
                })
            }
        </select>

        
        </div>

*/
