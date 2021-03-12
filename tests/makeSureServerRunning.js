const chai = require('chai');
const chaiHttp = require('chai-http');
chai app = require("../index");

//configure chai
chai.use(chaiHttp);
chai.should();

describe("Make sure that status is 200", ()=> {
    it("should return 200", (done)=> {
        chai.request(server)
            .get('/book')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            }
        );         
    });
});
