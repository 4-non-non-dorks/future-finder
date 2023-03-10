const router = require('express').Router();
const { Op } = require('sequelize');
const { Job, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jobData = await Job.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'company_name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const jobs = jobData.map((job) => job.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      jobs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/jobs/search/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const jobData = await Job.findAll({
      where: {
        name: { [Op.like]: `%${req.query.job}%` },
      },
      include: [
        {
          model: User,
          attributes: ['name', 'company_name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const jobs = jobData.map((job) => job.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', {
      jobs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/jobs/:id', withAuth, async (req, res) => {
  try {
    const jobData = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'company_name'],
        },
      ],
    });
    const job = jobData.get({ plain: true });
    console.log(job);
    res.render('jobs', {
      ...job,
      company_name: req.session.company_name,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Job }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/createjob', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Job }],
    });

    const user = userData.get({ plain: true });

    res.render('createjob', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
