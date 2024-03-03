# API Docs


### Schema for Restaurant / Kitchens
```
{
  name: "My Soup Kitchen",

  location: {
    type: "Point",
    coordinates: [-73.856077, 40.848447] // Example coordinates: [longitude, latitude]
  },

  ingredients: {

    dairy:{
        milk: 1
    },
    meats:{
        chickenBreast: 4
    },

    // ...
  }
  
}

```


### Restaurant / Kitchen Pubsub Model:

```
PUT:
ex.
http://localhost:5000/restaurants/<tournamentId>
http://localhost:5000/restaurants/65e3fdaeeff6e7686c994087
{
    "ingredients": {
        "dairy": {
            "milk": 3
        },
        "meats":{
            "chickenBreasts": 4,
            "groundBeef": 2
        }
    }
}
```

```
PUBLISH:
restaurants/<restaurant_id>/ingredients/<ingredient_name>/update

```
Restaurants publish their ingredients to this topic.


```
SUBSCRIBE:
restaurants/${restaurantId}/ingredients/${ingredientName}/update

```
Kitchens subscribe to these restaurants. Kitchens select which restaurants that they'd like to subscribe to.


### Make Delivery:

```
POST
{
    "accepted" : true,
    "driverId" : "65e446ca5e19f81b8da07328",
    "restaurantId" : "65e3fdaeeff6e7686c994087",
    "kitchenId" : "65e44134b1424a03c597d68f",
    "item" : "milk",
    "itemQuantity" : 3

}
```

```
PUBLISH
`delivery/${restaurantId}/${kitchenId}/${item}`
```










