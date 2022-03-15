import { plantList } from '../datas/plantList'
import CareScale from './CareScale'
import PlantItem from './PlantItem';
import '../styles/ShoppingList.css'
import { useState } from 'react';
import Categories from './Categories';

function ShoppingList({cart, updateCart}) {

    const [activeCategory, setActiveCategory] = useState('')
    // fonction reduce : array1.reduce((previousValue, currentValue) => previousValue + currentValue,initialValue)
    const categories = plantList.reduce(
        //call back
        /* La méthode concat() est utilisée afin de fusionner deux ou plusieurs tableaux en les concaténant. 
        Cette méthode ne modifie pas les tableaux existants, 
        elle renvoie un nouveau tableau qui est le résultat de l'opération.
        */

        // ici en gros on a une liste (au début vide), on regarde si la catégorie de la plante est dedans
        // si oui, on ne change pas la liste,
        //si non on concatène la nouvelle catégorie
        (current, plant) => current.includes(plant.category) ? current : current.concat(plant.category),
        // initial value
        []); 
            
        function addToCart(name, price) {
            const currentPlantSaved = cart.find((plant) => plant.name === name)
            if (currentPlantSaved) {
                const cartFilteredCurrentPlant = cart.filter(
                    (plant) => plant.name !== name
                )
                updateCart([
                    ...cartFilteredCurrentPlant,
                    { name, price, amount: currentPlantSaved.amount + 1 }
                ])
            } else {
                updateCart([...cart, { name, price, amount: 1 }])
            }
        }

        return (
            <div className='lmj-shopping-list'>
                <Categories
				    categories={categories}
				    setActiveCategory={setActiveCategory}
				    activeCategory={activeCategory}
			    />

                <ul className='lmj-plant-list'>
                    {plantList.map(({ id, cover, name, water, light, price,category }) => 
                        !activeCategory || activeCategory === category ?
                        (
					        <div key={id}>
						        <PlantItem
							        cover={cover}
							        name={name}
							        water={water}
							        light={light}
							        price={price}
						        />
						        <button onClick={() => addToCart(name, price)}>Ajouter</button>
					        </div>
				    ) : null )}
                </ul>
            </div>
        );
}

export default ShoppingList