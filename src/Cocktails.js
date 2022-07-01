import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Coctails = () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a';
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('a');

  const fetchDrinks = useCallback(async () => {
    try {
      const { data } = await axios.get(url);
      const { drinks } = data;
      //   console.log(drinks);
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strDrink, strCategory, strDrinkThumb } = item;
          return {
            id: idDrink,
            name: strDrink,
            category: strCategory,
            image: strDrinkThumb,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
    } catch (error) {
      console.log(error.response);
    }
  });

  // console.log(cocktails);

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div className="main">
      <h1>Cocktails API Project</h1>

      <div className="drinksContainer">
        {cocktails.map((item) => {
          return (
            <div key={item.id} className="singleDrink">
              <img src={item.image} alt="drink-image" />
              <h3>{item.name}</h3>
              <p> {item.category} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Coctails;
