import {FastifyRequest, FastifyReply} from 'fastify'
import {createCustomerService} from '../services/createCustomerService' 

class createCustomerController{
    async handle(req : FastifyRequest, res:FastifyReply){
        const {name, email} = req.body as {name: string, email: string}
        console.log(name),
        console.log(email)

        const costumeService = new createCustomerService()
        const customer = await costumeService.execute({name, email});

        res.send(customer)
    }
}

export {createCustomerController}