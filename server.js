import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./Car.js";
import User from "./User.js";


dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB")
    } catch (error) {
        console.log("Erro: ", error);
    }
}

connectDB();


app.post("/Car", async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.json(newCar);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/Car", async (req, res) => {
    try {
        const carro = await Car.find();
        res.json(carro)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.put("/Car/:id", async (req, res) => {
    try {
        const CarUpdated = await Car.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(CarUpdated)
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.delete("/Car/:id", async (req,res) => {
    try {
        const CarDeleted = await Car.findByIdAndDelete(req.params.id);
        res.json(CarDeleted); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/Car/:brand", async (req,res) => {
    try {
        const CarFound = await Car.findById(req.params.id);
        res.json(CarFound); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/Car/:available", async (req,res) => {
    try {
        const CarFound = await Car.findByAvailable(req.params.available);
        res.json(CarFound); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.patch("/Car/:id/availability", async (req,res) => {
    try {
        const availableUpdate = await Car.findByIdAndUpdate(
            req.params.id,
            { available: req.body.available },
            {new: true}
        );
        res.json(availableUpdate); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/Car/price/:min/:max", async (req,res) => {
    try {
        const minMaxPrice = await Car.find({price:{ $gte: Number(req.params.min), $lte: Number(req.params.max)}
    });
        res.json(minMaxPrice); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/Car/plate/:plate", async (req,res) => {
    try {
        const CarPlate = await Car.find({plate: req.params.plate});
        res.json(CarPlate); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/Car-count", async (req, res) => {
    try {
      const total = await Car.countDocuments();
      res.json({ total });
    } catch (error) {
      res.json({ error: error.message });
    }
});

//users

app.post("/users", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.json({ error: error.message });
    }
})


app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.json({ error: error.message})
    }
})


app.put("/users/:id", async (req, res) => {
    try {
        const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.json(updateduser);
    } catch (error) {
        res.json({ error: error.message})
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const userdeleted = await User.findByIdAndDelete(req.params.id);
        res.json(userdeleted);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.get("/users/email/:email", async (req,res) => {
    try {
        const userEmail = await User.findOne(req.params.email);
        res.json(userEmail); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.patch("/users/:id/:name", async (req,res) => {
    try {
        const nameUpdate = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true}
        );
        res.json(nameUpdate); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/users/exists/:email", async (req,res) => {
    try {
        const userEmail = await User.findOneAndExists(req.params.email);
        res.json(userEmail);
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.get("/users/search", async (req,res) => {
    try {
        const userFound = await User.findByname(req.params.name);
        res.json(userFound); 
    } catch (error) {
        res.json({ error:error.message });
    }
})

app.delete("/users/", async (req, res) => {
    try {
        const userdeleted = await User.findByIdAndDelete();
        res.json(userdeleted);
    } catch (error) {
        res.json({ error: error.message });
    }
})

app.listen(PORT, () =>
console.log("O servidor está rodando na porta: ", PORT)
);