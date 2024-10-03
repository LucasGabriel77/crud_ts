import prismaClient from "../prisma";

interface DeleteProps{
    id: string
}

class deleteCustomerService{
    async execute({ id }: DeleteProps){
        if (!id){
            throw new Error("solitação invalida")
        }

        const findCustomer = await prismaClient.customer.findFirst({
            where:{
                id: id
            }
        })

        if(!findCustomer){
            throw new Error("cliente nao existe")
        }

        await prismaClient.customer.delete({
            where:{
                id: findCustomer.id
            }
        })

        return {message : 'customer excluido'}

    }
}

export { deleteCustomerService}