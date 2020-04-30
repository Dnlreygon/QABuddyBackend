/* eslint handle-callback-err: "off" */
import {} from 'dotenv/config'
import chai from 'chai'
import chaitHttp from 'chai-http'
describe('Tasks API ENDPOINTS Tests', () => {
  const VIRTUAL_TOKEN = process.env.VIRTUAL_TOKEN
  const TASK_PATH = process.env.TASK_PATH

  beforeEach(() => {
    chai.use(chaitHttp)
    chai.should()
  })

  it('Get All Tasks', (done) => {
    chai.request(process.env.URL_BASE)
      .get(process.env.TASK_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
  })

  it('Create a New Task', () => {
    chai.request(process.env.URL_BASE)
      .post(TASK_PATH)
      .send({
        content: 'New Task 1',
        order: 33
      })
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        response.should.have.status(200)
        console.log(response.body.content)
        response.body.should.have.property('id')
        response.body.should.have.property('order')
        response.body.content.should.be.equal('New Task 1')
        response.body.should.have.property('comment_count')
      })
  })

  it('Get The New Task', (done) => {
    chai.request(process.env.URL_BASE)
      .get(TASK_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
  })

  it('Update The New Task', (done) => {
    // codigo get
    chai.request(process.env.URL_BASE)
      .get(process.env.TASK_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        const projectId = response.body[response.body.length - 1].id
        chai.request(process.env.URL_BASE)
          .post(TASK_PATH + '/' + projectId)
          .send({
            content: 'New Task 1.5',
            order: 33
          })
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .set('Content-Type', 'application/json')
          .end((err, responsePost) => {
            responsePost.should.have.status(204)
            done()
          })
      })
  })

  it('Close The New Task', (done) => {
    // codigo get
    chai.request(process.env.URL_BASE)
      .get(process.env.TASK_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        const projectId = response.body[response.body.length - 1].id
        console.log('close the task ' + response.body[response.body.length - 1].id)
        chai.request(process.env.URL_BASE)
          .post(TASK_PATH + '/' + projectId + '/close')
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .end((err, responsePost) => {
            responsePost.should.have.status(204)
            done()
          })
      })
  })

  it('Reopen The New Task', (done) => {
    // codigo get
    chai.request(process.env.URL_BASE)
      .get(process.env.TASK_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        // codigo close
        const projectId = response.body[response.body.length - 1].id
        chai.request(process.env.URL_BASE)
          .post(TASK_PATH + '/' + projectId + '/close')
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .end((err, responsePost) => {
            responsePost.should.have.status(204)
            // codigo re-open
            console.log('Reopen the task ' + projectId)
            chai.request(process.env.URL_BASE)
              .post(TASK_PATH + '/' + projectId + '/reopen')
              .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
              .end((err, responsePost) => {
                responsePost.should.have.status(204)
                done()
              })
          })
      })
  })

  it('Delete The New Task', (done) => {
    // codigo get
    chai.request(process.env.URL_BASE)
      .get(process.env.TASK_PATH)
      .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
      .set('Content-Type', 'application/json')
      .end((err, response) => {
        const projectId = response.body[response.body.length - 1].id
        console.log('delete the Task: ' + response.body[response.body.length - 1].content)
        chai.request(process.env.URL_BASE)
          .delete(TASK_PATH + '/' + projectId)
          .set('Authorization', 'Bearer ' + VIRTUAL_TOKEN)
          .end((err, response) => {
            response.should.have.status(204)
            done()
          })
      })
  })
})
