const { TodoModel, ActivityModel } = require("../models");

const getAllTodo = async (req, res) => {
  let results = await TodoModel.findAll({ nest: true });

  if (req.query.activity_group_id) {
    results = await TodoModel.findAll({ 
      where: { activity_group_id: req.query.activity_group_id } 
    });
  }

  res.send({ status: "Success", message: "Success", data: results });
};

const getOneTodo = async (req, res) => {
  const result = await TodoModel.findByPk(req.params.id);

  if (result) {
    res.send({ status: "Success", message: "Success", data: result });
  } else {
    res.status(404).send({ status: "Not Found", message: `Todo with ID ${req.params.id} Not Found`, data: {} });
  }
};

const createTodo = async (req, res) => {
  if (!req.body.title || !req.body.activity_group_id) {
    res.status(400).send({ 
      status: "Bad Request", 
      message: `${!req.body.title ? 'title' : 'activity_group_id'} cannot be null`, 
      data: {} 
    });
  } else {
    const checkActivity = await ActivityModel.findByPk(req.body.activity_group_id);

    if (!checkActivity) {
      res.status(404).send({ 
        status: "Not Found", 
        message: `Activity with activity_group_id ${req.params.id} Not Found`, 
        data: {} 
      });
    } else {
      const result = await TodoModel.create({
        activity_group_id: req.body.activity_group_id,
        title: req.body.title,
        created_at: new Date()
      });

      res.status(201).send({ 
        status: "Success", message: "Success", 
        data: {
          created_at: result.dataValues.created_at,
          updated_at: result.dataValues.updated_at,
          id: result.dataValues.id,
          title: result.dataValues.title,
          activity_group_id: result.dataValues.activity_group_id,
          is_active: true,
          priority: "very-high"
        } 
      });
    }
  }
}

const updateTodo = async (req, res) => {
  const todo = await TodoModel.findByPk(req.params.id);

  if (todo) {
    todo.title = req.body.title ?? todo.title;
    todo.is_active = req.body.is_active != null ? req.body.is_active ? "1" : "0" : todo.is_active;
    todo.updated_at = new Date();
  
    todo.save();

    res.send({ status: "Success", message: "Success", data: todo });
  } else {
    res.status(404).send({ status: "Not Found", message: `Todo with ID ${req.params.id} Not Found`, data: {} });
  }
}

const deleteTodo =  async (req, res) => {
  const todo = await TodoModel.findByPk(req.params.id);

  if (todo) {
    todo.destroy();

    res.send({ status: "Success", message: "Success", data: {} });
  } else {
    res.status(404).send({ status: "Not Found", message: `Todo with ID ${req.params.id} Not Found`, data: {} });
  }
}

module.exports = {
  getAllTodo,
  getOneTodo,
  createTodo,
  updateTodo,
  deleteTodo
};
