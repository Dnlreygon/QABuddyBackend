/* eslint handle-callback-err: "off" */
import {} from 'dotenv/config'
import chai from 'chai'
import chaitHttp from 'chai-http'
describe('Projects API ENDPOINTS Tests', () => {
  const VIRTUAL_TOKEN = process.env.VIRTUAL_TOKEN
  const PROJECTS_PATH = process.env.PROJECTS_PATH
  const PRJ = 'Project'
  beforeEach(() => {
    chai.use(chaitHttp)
    chai.should()
  })

  it('Get ALL Projects', (done) => {
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
  })

  it('Authotization Header Not Sent', (done) => {
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .end((err, response) => {
        response.should.have.status(400)
        done()
      })
  })

  it('Token Not Sent', (done) => {
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN + 'blabla')
      .end((err, response) => {
        response.should.have.status(403)
        done()
      })
  })

  it('Service Not Found', (done) => {
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH + 'blabla')
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
  })

  it('Create a New Project', () => {
    const nameProject = PRJ + '_' + Math.floor(Date.now() / 10000)
    chai.request(process.env.URL_BASE)
      .post(PROJECTS_PATH)
      .send({
        name: nameProject,
        order: 2
      })
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.have.property('id')
        response.body.should.have.property('order')
        response.body.should.have.property('color')
        response.body.should.have.property('comment_count')
        response.body.should.have.property('shared')
      })
  })

  it('Get The New Project', () => {
    chai.request(process.env.URL_BASE)
      .get(PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((err, response) => {
        response.should.have.status(200)
      })
  })

  it('Update The New Project', (done) => {
    // codigo get
    const nameProject = PRJ + '_' + Math.floor(Date.now() / 10000)
    chai.request(process.env.URL_BASE)
      .get(process.env.PROJECTS_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        const projectId = response.body[response.body.length - 1].id
        chai.request(process.env.URL_BASE)
          .post(PROJECTS_PATH + '/' + projectId)
          .send({
            name: nameProject,
            order: 2
          })
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .set('Content-Type', 'application/json')
          .end((err, responsePost) => {
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
      .end((err, response) => {
        const projectId = response.body[2].id
        chai.request(process.env.URL_BASE)
          .delete(PROJECTS_PATH + '/' + projectId)
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .end((err, response) => {
            response.should.have.status(204)
          })
      })
  })
})
