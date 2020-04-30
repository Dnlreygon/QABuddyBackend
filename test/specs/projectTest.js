import {} from 'dotenv/config'
import chai from 'chai'
import chaitHttp from 'chai-http'
describe('Projects API ENDPOINTS Tests', () => {
  const VIRTUAL_TOKEN = process.env.VIRTUAL_TOKEN
  const PROJECTS_PATH = process.env.PROJECTS_PATH
  beforeEach(() => {
    chai.use(chaitHttp)
    chai.should()
  })

  it('Get ALL Projects', (done) => {
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((response) => {
        response.should.have.status(200)
        done()
      })
  })

  it('Create a New Project', () => {
    chai.request(process.env.URL_BASE)
      .post(PROJECTS_PATH)
      .send({
        name: 'New Project 1',
        order: 2
      })
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((response) => {
        response.should.have.status(200)
        console.log(response.body.name)
        response.body.should.have.property('id')
        response.body.should.have.property('order')
        response.body.should.have.property('color')
        response.body.name.should.be.equal('New Project 1')
        response.body.should.have.property('comment_count')
        response.body.should.have.property('shared')
      })
  })

  it('Get The New Project', () => {
    chai.request(process.env.URL_BASE)
      .get(PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((response) => {
        response.should.have.status(200)
      })
  })

  it('Update The New Project', (done) => {
    // codigo get
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((response) => {
        const projectId = response.body[2].id
        chai.request(process.env.URL_BASE)
          .post(PROJECTS_PATH + '/' + projectId)
          .send({
            name: 'New Project 3.7',
            order: 2
          })
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .set('Content-Type', 'application/json')
          .end((responsePost) => {
            responsePost.should.have.status(204)
            done()
          })
      })
  })

  it('Delete The New Project', () => {
    // codigo get
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((response) => {
        const projectId = response.body[2].id
        console.log('delete the project ' + response.body[2].name)
        chai.request(process.env.URL_BASE)
          .delete(PROJECTS_PATH + '/' + projectId)
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .end((response) => {
            response.should.have.status(204)
          })
      })
  })
})
