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
PUBLISH:
restaurants/<restaurant_id>/ingredients/<ingredient_name>/update

```
Restaurants publish their ingredients to this topic.


```
SUBSCRIBE:
restaurants/${restaurantId}/ingredients/${ingredientName}/update

```
Kitchens subscribe to these restaurants. Kitchens select which restaurants that they'd like to subscribe to.











