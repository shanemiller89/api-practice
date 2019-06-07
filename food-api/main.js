// //1. ask for the  data from DB

// fetch("http://localhost:8088/food")
// //2.wait, using a Promise
// //3.Receive the Data

//   .then(function(data) {
// //4. convert the data to  JS (an array of objects)
//     return data.json(); // <-- json converts data
//   })
//   .then(function(food) {
// // 5. Loop over array of objects
// //6. do stuff to the data
//     let foodContainer = document.querySelector("#food-list");
//     console.table(food);
//     food.forEach(function(item) {
// // 7. Didplay data in DOM as HTML
//       foodContainer.innerHTML += `<h2> I like to eat ${item.name}</h2>`;
//     });
//   });

// -- For fetching original food database -- //
fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food_item => {    //Why this work?//
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food_item.barcode}.json`)
            .then(response => response.json())
            .then(productInfo => {
                food_item.ingredients = productInfo.product.ingredients_text;

                if(food_item.ingredients === undefined) {
                    food_item.ingredients = "No ingredients listed";
                }

                if(food_item.ingredients === "") {
                    food_item.ingredients = "No ingredients listed";
                }

                insertFood(food_item);
                

            })
        });
    });

// -- For fetching from openfoodfact database -- //

// --For creating HTML component and inserting into DOM -- //
let grabFood = document.querySelector(".foodList");

function foodComponent(obj) {
    return `
    <div class="foodItem">
        <div><h3>${obj.name}</h3></div>
        <p></p>
        <div><strong>Food Type:</strong> ${obj.category}</div>
        <div><strong>Ethnicity:</strong> ${obj.ethnicity}</div>
        <div><strong>Ingredients:</strong> ${obj.ingredients}</div>
    </div>
    `
};

function insertFood(obj) {
        grabFood.innerHTML += foodComponent(obj);
    }

// function checkUndefined(key) {
    // if(`${food_item[key]}` === undefined) {
    //     `${food_item[key]}` = "No ingredients listed"
//     }
// }



// function insertFood(array) {
//     for (let i = 0; i < array.length; i++) {
//         grabFood.innerHTML += foodComponent(array[i]);
//     } 
// }





// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         insertFood(parsedFoods)
//         console.table(parsedFoods)

//         fetch(`https://world.openfoodfacts.org/api/v0/product/${parsedFoods.barcode}.json`)
//             .then(response => response.json())
//             .then(productInfo => {
//                 console.log(productInfo)
//             })
//     });