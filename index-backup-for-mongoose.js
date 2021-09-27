const express = require("express");
const mongoose = require("mongoose");
const app = express();

// configuration - enable express to parse incoming json data
app.use(express.json());
const port = 3055;

// establish connection to database
mongoose
  .connect("mongodb://localhost:27017/feb2020")
  .then(() => {
    console.log("connected to db");
  })
  .catch(error => {
    console.log("error : ", error);
  });

// create a task schema
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required']
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date
  },
  completed: {
    type: Boolean,
  },
  createdAt: {
      type: Date,
      default : Date.now
  },
});

const Task = mongoose.model('Task', taskSchema);

app.get("/", (req, res) => {
  res.send("Welcome");
});

// tasks api
app.get('/api/tasks', (req, res) => {
    Task.find()
        .then((tasks) => {
            res.json(tasks);
        })
        .catch((error) => {
            res.json(error);
        });
});

app.get('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.findById(id)
        .then((task) => {
            res.json(task);
        }).catch((error) => {
            res.json(error);
        });
}); 

app.post('/api/tasks', (req, res) => {
    const body = req.body;
    const task = new Task(body);

    task.save().then((task) => {
        res.json(task);
    }).catch((error) => {
        res.json(error);
    });
});

app.put('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Task.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then((task) => { 
            res.json(task);
        })
        .catch((error) => {
            res.json(error);
        });
})

app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then(task => {
            res.json(task);
        }).catch(error => {
            res.json(error);
        });
});

app.listen(port, () => {
  console.log("server running on port : ", port);
});
