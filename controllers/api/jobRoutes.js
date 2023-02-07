const router = require('express').Router();
const { Job } = require('../../models');
const withAuth = require('../../utils/auth');

// route api/jobs

router.post('/', async (req, res) => {
  try {
    const newJob = await Job.create({
      name: req.body.name,
      description: req.body.description,
      salary: req.body.salary,
      benefits: req.body.benefits,
      user_id: req.body.user_id,
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

module.exports = router;
