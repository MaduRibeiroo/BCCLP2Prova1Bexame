import { Alert } from "react-bootstrap";
import Pagina from "../layouts/Pagina";
import { useEffect, useState } from "react";
import { consultarCliente } from "../../servicos/servicoCliente";
import TabelaClientes from "./tabelas/tabelaCliente";
import FormCadCliente from "./formularios/formCadCliente";

export default function TelaCadastroCliente(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        cpf:"",
        nome:"",
        endereco:"",
        cidade:"",
        uf:""
    });
   
    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>
                        Cadastro de Clientes
                    </h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaClientes setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setClienteSelecionado={setClienteSelecionado} /> :
                        <FormCadCliente setExibirTabela={setExibirTabela}
                                         clienteSelecionado={clienteSelecionado}
                                         setClienteSelecionado={setClienteSelecionado}
                                         modoEdicao={modoEdicao}
                                         setModoEdicao={setModoEdicao}

                                         />
                }
            </Pagina>
        </div>
    );

}