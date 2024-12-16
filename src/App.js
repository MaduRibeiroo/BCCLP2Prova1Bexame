import GradeProdutos from "./componentes/GradeProdutos";
import BarraBusca from "./templates/BarraBusca";
import Cabecalho from "./templates/Cabecalho";
import TelaLogin from "./componentes/telas/TelaLogin";
import store from "./redux/store";
import { useEffect, useState, createContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import TelaCadastroCliente from "./componentes/telas/telaCadastroCliente";
import TabelaCarrinho from "./componentes/telas/tabelas/tabelaCarrinho";

export const ContextoUsuario=createContext();

function App() {
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resposta) => resposta.json())
      .then((produtos) => {
        setProdutos(produtos);
      });  
  },[]);

  const [produtos, setProdutos] = useState([]);
  const [usuario,setUsuario]=useState({
    "usuario":"",
    "logado":false
  });

  if(!usuario.logado){
    return(
      <ContextoUsuario.Provider value={{usuario,setUsuario}}>
        <TelaLogin/>
      </ContextoUsuario.Provider>
    );
  }

  return (
    <div className="App">
      <Provider store={store}>
        <ContextoUsuario.Provider value ={{usuario,setUsuario}}>
          <BrowserRouter>
            { 
            }
            <Routes>
              <Route path="/carrinho" element={<TabelaCarrinho />} />
              <Route path="/cliente" element={<TelaCadastroCliente/>} />
            </Routes>
          </BrowserRouter>
        </ContextoUsuario.Provider>
        </Provider>
      <Cabecalho/>
      <BarraBusca/>
      <GradeProdutos listaProdutos={produtos}/>
    </div>
  );

}

export default App;
