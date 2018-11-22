module.exports = function(app) {
    var firstPart = require('../controllers/first_part/firstPart');
    var secondPart = require('../controllers/second_part/secondPart');
  
    // Import routes
    
    // Items Routes
    app.route('/items')
      .get(firstPart.get_last_item) 
      .post(firstPart.create_item);

    // Names Routes
    app.route('/names/:name')
      .get(secondPart.get_name)
      .put(secondPart.update_names);
    app.route('/names/:id')
      .delete(secondPart.delete_name)

    // Return empty string when access this route
    app.route('/names/:age')
      .get(function (req, res) { res.end(' ')
    })
};

      
