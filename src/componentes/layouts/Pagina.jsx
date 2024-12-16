import Cabecalho from "../../templates/Cabecalho";
import { Container } from "react-bootstrap";
import TabelaCarrinho from "../telas/tabelas/tabelaCarrinho";

export default function Pagina(props) {
    return (
        <>
            <Container>
                <Cabecalho titulo="Carrinho" />
                {
                    props.children
                }
                <TabelaCarrinho/>
            </Container>
        </>

    );
}