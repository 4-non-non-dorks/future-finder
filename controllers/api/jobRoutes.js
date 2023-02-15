const router = require('express').Router();
const { Job, User, Application } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

// route api/jobs

router.post('/', async (req, res) => {
  try {
    const newJob = await Job.create({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      salary: req.body.salary,
      benefits: req.body.benefits,
      user_id: req.session.user_id,
    });
    res.status(200).json(newJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const newJob = await Job.findAll();
    res.status(200).json(newJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/applications', async (req, res) => {
  try {
    const newApplication = await Application.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      street_address: req.body.street_address,
      phone_number: req.body.phone_number,
      user_id: req.session.user_id,
      job_id: req.body.job_id,
    });
    res.status(200).json(newApplication);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/bookmarks', async (req, res) => {
  try {
    console.log('body', req.body);
    const newJob = await Job.findAll({
      where: {
        id: { [Op.in]: req.body.bookmarks },
      },
      include: [
        {
          model: User,
          attributes: ['company_name'],
        },
      ],
    });
    res.status(200).json(newJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const jobData = await Job.findByPk(req.params.id, {});
    res.status(200).json(jobData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const jobData = await Job.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!jobData) {
      res.status(404).json({ message: 'No job found with this id!' });
      return;
    }

    res.status(200).json(jobData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const newJob = await Job.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(newJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
