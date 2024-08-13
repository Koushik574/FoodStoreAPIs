const express = require("express");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const api = require("./router/index.js");

app.use(express.json());


//API base URL or base Route
// GET: http://localhost:3000/v1/restaurants
// GET: http://localhost:3000/v1/restaurant-details
// app.use("/v1", api);

app.get("/restaurants", async (req, res) => {

    try{

        //Data from Frontend[optional]

        //DB Logic
        const restaurants = await prisma.restaurant.findMany();

        //Data to Frontend
        res.json({message: "All Restaurants", data: restaurants})

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Internal Server Error"})
    }

})

app.get("/restaurant/:id", async (req, res) => {

    try{

        //Data from Frontend
        const restaurantId = req.params;
        console.log(restaurantId.id);

        //DB Logic
        const restaurantDetails = await prisma.restaurantDetails.findUnique({
            where:{
                restaurant_id: restaurantId.id
            },
            include:{

                food_list:true,
                similar_product:true,
                    
            }
        })

        //Data to Frontend
        res.json({message: "Restaurant Details", data: restaurantDetails})

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Internal Server Error"})
    
    }

});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
