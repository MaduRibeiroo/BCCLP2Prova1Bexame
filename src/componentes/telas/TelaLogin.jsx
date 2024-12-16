import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef } from "react";
import { ContextoUsuario } from "../../App";
import { buscarClientes } from "../../redux/clienteReducer";
import FormCadCliente from "./formularios/formCadCliente";

export default function TelaLogin(){

    const nomeUsuario=useRef();

    const {usuario,setUsuario}=useContext(ContextoUsuario); //valor fornecido

    function manipularSubmissao(evento){
        const usuarioDigitado=nomeUsuario.current.value;
        usuario = buscarClientes();
        if(usuarioDigitado != usuario){
            <FormCadCliente/>
        }
        else{
            setUsuario({
                "usuario":usuarioDigitado,
                "logado":true
            });
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    return(
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
            <Form.Group className="mb-3" controlId="formBasicUsuario"
                        >
                <Form.Label>Usuario</Form.Label>
                <Form.Control 
                            name="usuario" 
                            type="text" 
                            placeholder="Enter username" 
                            ref={nomeUsuario}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>
        </Container>
    )
}