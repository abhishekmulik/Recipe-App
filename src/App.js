import React, { useEffect,useState } from 'react';
import './App.css';
import Recipe from './Recipe';


const App=()=> {
  const APP_ID='ba06aa15'
  const APP_KEY='b4de5fb94f2d3139ba7b41178afbdd06'

  const [search,setSearch]=useState('')
  const [recipes,setRecipes]=useState([])
  const [query,setQuery]=useState('chicken')
  

  useEffect(()=>{
    getRecipes() 
  },[query]) 

  const getRecipes=async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data=await response.json();
    setRecipes(data.hits)
  }
  
const updateSearch=(e)=>{
  setSearch(e.target.value);
  
}
const getSearch=e=>{
  e.preventDefault()
  setQuery(search)
  setSearch(' ')

}
  return (
    <div className='App'>
      <form onSubmit={getSearch} className="search-bar" type='text'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}/>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='recipes'>      
      {recipes.map(recipe=>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={`Total Calories: ${Math.round(recipe.recipe.calories)} kcal`}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
