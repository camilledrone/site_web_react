import { plantList } from '../datas/plantList'
import CareScale from './CareScale'
import PlantItem from './PlantItem';
import '../styles/ShoppingList.css'

function ShoppingList() {
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

    return (
        <div>
            <ul>
                {categories.map((category) => (
                    <li key={category}>{category}</li>
                ))}
            </ul>
            <ul className='lmj-plant-list'>
				{plantList.map(({id, name, cover, light, water}) => ( 
                    <PlantItem
                            id={id}
                            name = {name}
                            cover = {cover}
                            light = {light}
                            water = {water}
                    />
				))}
			</ul>
        </div>

        
    );
}

export default ShoppingList