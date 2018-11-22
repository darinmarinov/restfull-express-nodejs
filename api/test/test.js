//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

 /*
  * Test the /GET route for Items
  */
  describe('/GET Last Item', () => {
	  it('it should GET Last Item', (done) => {
			chai.request(server)
		    .get('/items')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('string');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route for Items
  */
  describe('/POST item', () => {
	  it('it should  POST a new Item in Items array', (done) => {
	  	let item = {
	  		item: "Random"
	  	}
			chai.request(server)
		    .post('/items')
		    .send(item)
		    .end((err, res) => {
			  	res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Item successfully added!');
			  	res.body.item.should.have.property('item');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/names/:name route
  */
  describe('/GET/names/:name name', () => {
	  it('it should GET a Name by the given Name', (done) => {
        let name = {id:3, name:'darin', ttl:40}
	  	name.save((err, name) => {
	  		chai.request(server)
		    .get('/names/' + name)
		    .send(name)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('id');
			  	res.body.should.have.property('name');
			  	res.body.should.have.property('ttl');
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/names/:name route
  */
  describe('/PUT/names/:name name', () => {
	  it('it should UPDATE a Name given the Name', (done) => {
        let name = {id:3, name:'darin', ttl:40}
        	  	name.save((err, name) => {
				chai.request(server)
			    .put('/names/:' + name)
			    .send({id: 3, name: "RandomNew", ttl:40})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Name updated!');
				  	res.body.name.should.have.property('name').eql('RandomNew');
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/names/:id route
  */
  describe('/DELETE/names/:id name', () => {
	  it('it should DELETE a name by given id', (done) => {
        let name = {id:3, name:'darin', ttl:40}
	  	name.save((err, name) => {
				chai.request(server)
			    .delete('/names/' + name.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Name successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });

  