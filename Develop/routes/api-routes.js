const db = require("../models");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports = function(app) {
    app.get("/api/workouts", function(req, res) {
        db.Workout.find()
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.post("api/workouts", ({ body }, res) => {
        db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWourkout);
        })
        .catch(({ message }) => {
            console.log("Error in POST /api/workouts", message);
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { exercises: req.body } },
            function(err, result) {
                if (err) {
                    console.log("error", err);
                    res.send(err);
                } else {
                    res.send(result);
                }
            }
        );
    });
};