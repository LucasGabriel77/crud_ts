import {FastifyRequest, FastifyReply} from 'fastify'
import { deleteCustomerService } from '../services/deleteCustomerService'

class deleteCustomerController{
    async handle(req: FastifyRequest, res: FastifyReply){
        const { id } = req.query as {id :string}
        const customerService = new deleteCustomerService()

        const customer = await customerService.execute({ id })

        res.send(customer)
    }
}

export {deleteCustomerController}