import {} from 'dotenv/config'
import chai from 'chai'
import chaitHttp from 'chai-http'
describe('Projects API ENDPOINTS Tests',() => {
    const VIRTUAL_TOKEN = process.env.VIRTUAL_TOKEN
    const PROJECTS_PATH=process.env.PROJECTS_PATH 
  beforeEach(()=>{
      chai.use(chaitHttp)
      chai.should()
  })
it('Get ALL Projects', () => {
        chai.request(process.env.URL_BASE)
        .get(PROJECTS_PATH)
        .set('Authorization','Bearer '+VIRTUAL_TOKEN)
        .end((err,response) => {
            response.should.have.status(200)
            console.log(response.body[0].name)
            response.body[0].name.should.be.equal('Inbox')
            response.body[1].name.should.be.equal('Te damos la bienvenida 👋')
        })
    })

/*it('Create a New Project' , () => {
        chai.request(process.env.URL_BASE)
        .post(PROJECTS_PATH)
        .send({
            
            "name" : 'New Project 1',
            "order" : 2
        })
        .set('Authorization','Bearer '+VIRTUAL_TOKEN)
        .set('Content-Type','application/json')
        .end((err,response) => {
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
    .set('Authorization','Bearer '+VIRTUAL_TOKEN)
    .end((err,response) => {
        response.should.have.status(200)
        console.log(response.body[2].name)
        response.body[4].name.should.be.equal('New Project 1')
        })
    })
    */

it('Update The New Project' , () => {
    let projectId = getFirstProject()
    chai.request(process.env.URL_BASE)
    .post(PROJECTS_PATH + projectId)
    .send({
            
        "name" : 'New Project 3.7',
        "order" : 2
        })
        .set('Authorization','Bearer '+VIRTUAL_TOKEN)
        .set('Content-Type','application/json')
        .end((err,response) => {
            response.should.have.status(204)
            console.log(response.body.name)
            response.body.should.have.property('id')
            response.body.should.have.property('order')
            response.body.should.have.property('color')
            response.body.name.should.be.equal('New Project 3.7')
            response.body.should.have.property('comment_count')
            response.body.should.have.property('shared')
            
        })
    })
/*
    

    it('Delete The New Project', () => {
        let projectId = getFirstProject()
        chai.request(process.env.URL_BASE)
        .delete(PROJECTS_PATH + projectId)
        .set('Authorization','Bearer '+VIRTUAL_TOKEN)
        .end((err,response) => {
            response.should.have.status(204)
        })
    })
    */
    
})

function getFirstProject(){
    let projects
    chai.request(process.env.URL_BASE)
        .get(process.env.PROJECTS_PATH )
        .set('Authorization','Bearer '+process.env.VIRTUAL_TOKEN)
        .end((err,response) => {
            response.should.have.status(200)
            projects= response.body[0].id

        console.log('ID del proyecto :'+projects)
        })
        return projects
}
