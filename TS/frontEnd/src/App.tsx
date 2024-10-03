import { useEffect, useState, useRef, FormEvent } from "react"
import { FiTrash } from "react-icons/fi"
import { api } from "./services/api"
import { all } from "axios";

interface customerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

export default function App() {
  const [customers, setCustomers] = useState<customerProps[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers()
  }, [])

  async function loadCustomers() {
    const response = await api.get("/customers")
    setCustomers(response.data)
  }

async function handleSubmit(e : FormEvent){
    e.preventDefault()

    if(!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current.value,
      email: emailRef.current.value
    })

    setCustomers(allCustomers => [...allCustomers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  async function handleDelete(id: string) {

    try {
      await api.delete("/customer",{
        params: {
          id: id
        }
      })
      alert('Cliente Excluido')
      const allCustomers = customers.filter((customers)=> customers.id !== id)
      setCustomers(allCustomers)
    } catch (error) {
      console.log(error)
    }



  }

  return (
    <div className="w-full min-h-screen bg-green-950 flex justify-center px-4">
      <main className="my-4 w-full md:max-w-2xl">

        <h1 className="text-xl font-medium text-white"> Clientes </h1>

        <form className="flex flex-col my-4" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input className="w-full mb-4 p-2 rounded" type="text" ref={nameRef} placeholder="Digite seu Nome" />

          <label className="font-medium text-white">Email:</label>
          <input className="w-full mb-4 p-2 rounded" type="email" ref={emailRef} placeholder="Digite seu Email" />

          <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-800 rounded font-medium hover:scale-105 duration-200" />
        </form>

        <section className="flex flex-col gap-4">
          {customers.map((customer) => (
            <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200" key={customer.id}>
              
              <p><span className="font-medium"> Nome :</span> {customer.name} </p>
              <p><span className="font-medium"> Email :</span> {customer.email}</p>
              <p><span className="font-medium"> Status :</span> {customer.status ? "Ativo" : "Inativo"}</p>

              <button className="bg-red-700 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
              onClick={ ()=>handleDelete(customer.id) }> <FiTrash size={18} color="#fff" /> </button>
            </article>))
          }
        </section>

      </main>
    </div>
  )
}