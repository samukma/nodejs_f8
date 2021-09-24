const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose'); //vi day chi la 1 course

class CourseController {
  // GET /courses/slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render('courses/show', { course: mongooseToObject(course) }),
      )
      .catch(next);
  }

  // GET /courses/store
  create(req, res, next) {
    res.render('courses/create');
  }

  // POST /courses/create
  store(req, res, next) {
    // res.json(req.body);

    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect(`/`))
      .catch((error) => {});
  }
}

module.exports = new CourseController(); //Tạo ra 1 NewsController rồi export ra