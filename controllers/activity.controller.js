const { ActivityModel } = require("../models");

const getAllActivity = async (_, res) => {
  const results = await ActivityModel.findAll({ nest: true });

  res.send({ status: "Success", message: "Success", data: results });
};

const getOneActivity = async (req, res) => {
  const result = await ActivityModel.findByPk(req.params.id);

  if (result) {
    res.send({ status: "Success", message: "Success", data: result });
  } else {
    res.status(404).send({ status: "Not Found", message: `Activity with ID ${req.params.id} Not Found`, data: {} });
  }
};

const createActivity = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ status: "Bad Request", message: "title cannot be null", data: {} });
  } else {
    const result = await ActivityModel.create({
      email: req.body.email ?? "",
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
        email: result.dataValues.email,
      } 
    });
  }
}

const updateActivity = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ status: "Bad Request", message: "title cannot be null", data: {} });
  } else {
    const activity = await ActivityModel.findByPk(req.params.id);

    if (activity) {
      activity.email = req.body.email ?? activity.email;
      activity.title = req.body.title ?? activity.title;
      activity.updated_at = new Date();
      
      activity.save();

      res.send({ status: "Success", message: "Success", data: activity });
    } else {
      res.status(404).send({ status: "Not Found", message: `Activity with ID ${req.params.id} Not Found`, data: {} });
    }
  }
}

const deleteActivity = async (req, res) => {
  const activity = await ActivityModel.findByPk(req.params.id);

  if (activity) {
    activity.destroy();

    res.send({ status: "Success", message: "Success", data: {} });
  } else {
    res.status(404).send({ status: "Not Found", message: `Activity with ID ${req.params.id} Not Found`, data: {} });
  }
}

module.exports = {
  getAllActivity,
  getOneActivity,
  createActivity,
  updateActivity,
  deleteActivity
};
