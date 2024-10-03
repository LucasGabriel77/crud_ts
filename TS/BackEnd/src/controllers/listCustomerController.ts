import {FastifyRequest, FastifyReply} from 'fastify'
import { listCustomersService } from '../services/listCustomersService'


class listCustomersController{
    async handle(req: FastifyRequest, res: FastifyReply){
        const listCustomerService = new listCustomersService()

        const customers = await listCustomerService.execute()

        res.send(customers)
    }
}

export {listCustomersController}