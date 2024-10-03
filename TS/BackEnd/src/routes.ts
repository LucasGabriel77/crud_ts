import fastify, { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { createCustomerController } from './controllers/createCustomerController'
import { listCustomersController } from "./controllers/listCustomerController";
import { deleteCustomerController } from "./controllers/deleteCustomerController";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async(req : FastifyRequest, res: FastifyReply )=>{
        return {ok : true}
    })

    fastify.post('/customer', async(req: FastifyRequest, res: FastifyReply)=>{
        return new createCustomerController().handle(req,res)
    })

    fastify.get('/customers', async(req: FastifyRequest, res: FastifyReply)=>{
        return new listCustomersController().handle(req,res)
    })
    fastify.delete('/customer', async(req: FastifyRequest, res: FastifyReply)=>{
        return new deleteCustomerController().handle(req,res)
    })
}