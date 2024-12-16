import React, { useState } from 'react';
import Carrinho from '../../../templates/Carrinho.jsx';  
import { Button, Container, Table, Spinner, Alert} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { buscarProdutos, apagarProduto } from "../../../redux/produtoReducer.js";
import { useEffect } from "react";

import ESTADO from "../../../redux/estado.js";
export default function TabelaCarrinho(props) {
    const {estado, mensagem, listaDeProdutos} = useSelector(state => state.produto);
    const despachante = useDispatch(); 

    useEffect(()=>{
        despachante(buscarProdutos());
    },[despachante]);
    
    const [qtdCarrinho, setQtdCarrinho] = useState(0);

    const adicionarAoCarrinho = () => {
        setQtdCarrinho(prevQtd => prevQtd + 1);
    };

    function comprarProduto(produto){
        qtdCarrinho = qtdCarrinho - 1;
        if(qtdCarrinho === 0){
            if(window.confirm("Deseja retirar o produto do carrinho " + produto.descricao)){
                despachante(apagarProduto(produto)); 
            }
        }
        props.setExibirTabela(false);
    }
    

    if (estado === ESTADO.PENDENTE){
        return (
            <div>
                <Spinner animation="border" role="status"></Spinner>
                <Alert variant="primary">{ mensagem }</Alert>
            </div>
        );
    }
    else if (estado === ESTADO.ERRO){
        return(
            <div>
                <Alert variant="danger">{ mensagem }</Alert>
            </div>
        );
    }
    else if (estado===ESTADO.OCIOSO){

        return (
            <>
                <Container>
                    <Button className="mb-3" variant="primary"
                        onClick={() => {
                            props.setExibirTabela(false);
                        }}>
                        Adicionar
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descrição</th>
                                <th>Quantidade</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaDeProdutos?.map((produto) => {
                                    return (
                                        <div>
                                            
                                                <Carrinho 
                                                    qtdCarrinho={qtdCarrinho} 
                                                    adicionarAoCarrinho={adicionarAoCarrinho}  
                                                />
                                                <tr> 
                                                    <td>{produto.codigo}</td>
                                                    <td>{produto.descricao}</td>
                                                    <td>
                                                        <Button onClick={()=>{
                                                            comprarProduto(produto);
                                                        }}variant="warning">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                            </svg>
                                                        </Button> 
                                                    </td>
                                                </tr>
                                            
                                                
                                        </div>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </>
        );

    }
}
  
