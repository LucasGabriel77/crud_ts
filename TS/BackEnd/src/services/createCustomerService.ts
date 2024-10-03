import { error } from "console";
import prismaClient from "../prisma";

interface createCustomerProps{
    name : string,
    email: string
}

class createCustomerService{
    async execute({name, email}: createCustomerProps){
        if(!email || !name){
            throw new Error('preencha todos os campos')
        }

        const costumer = await prismaClient.customer.create({data:{
            name,
            email,
            status: true
        }
    })

        return costumer
    }
}

export {createCustomerService}