import { Container, Form, Button } from "react-bootstrap";
import { useContext, useRef, useState } from "react";
import { ContextoUsuario } from "../../App";
import { buscarClientes } from "../../redux/clienteReducer";
import FormCadCliente from "./formularios/formCadCliente";

export default function TelaLogin(){
    const nomeUsuario = useRef();
    const { usuario, setUsuario } = useContext(ContextoUsuario); 
    const [mostrarCadastro, setMostrarCadastro] = useState(false);

    function manipularSubmissao(evento) {
        evento.preventDefault(); 
        const usuarioDigitado = nomeUsuario.current.value;
        const clienteEncontrado = buscarClientes(usuarioDigitado); 

        if (clienteEncontrado) {
            setUsuario({
                usuario: usuarioDigitado,
                logado: true
            });
        } else {
            
            setMostrarCadastro(true);
        }
    }

    if (mostrarCadastro) {
        return <FormCadCliente />; 
    }

    return (
        <Container className="w-25 border p-2">
            <Form onSubmit={manipularSubmissao}>
                <Form.Group className="mb-3" controlId="formBasicUsuario">
                    <Form.Label>Usuário</Form.Label>
                    <Form.Control
                        name="usuario"
                        type="text"
                        placeholder="Enter username"
                        ref={nomeUsuario}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
}