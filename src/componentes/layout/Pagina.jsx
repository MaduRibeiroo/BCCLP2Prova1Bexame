import Cabecalho from "../../templates/Cabecalho";
import { Container } from "react-bootstrap";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Carrinho" />
                <Menu />
                {
                    props.children
                }
            </Container>
        </>

    );
}