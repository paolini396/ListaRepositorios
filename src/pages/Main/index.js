import React, { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaAngleDoubleRight, FaTimes  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

import api from '../../services/api';
 
export default function Main() {

  const [ newRepo, setNewRepo ] = useState('');
  const [ repositorios, setRepositorios ] = useState([]);
  const [ loading, setLoading ] = useState(false); //animação de loading
  const [alert, setAlert] = useState(null); 

  //Buscar.
  useEffect(()=> {
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);


  //Salvar alterações.
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);


   const handleSubmit = useCallback((event)=>{
    event.preventDefault();

    async function submit(){
      setLoading(true);
      setAlert(null);                        
      try{ 
        
        if(newRepo === ''){
          throw new Error('Você precisa indicar um repositório!');
        }
        
        const response = await api.get(`repos/${newRepo}`);

        //verificando se ja existe um repositório.
        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        if(hasRepo){
          throw new Error('Repositorio Duplicado');
        }
                                                                
        const data = {
          name: response.data.full_name,
        }
    
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      }catch(error){
        setAlert(true);
        console.log(error);
      }finally{
        setLoading(false);
      }
    }

    submit();

   }, [newRepo, repositorios]);

  function handleInputChange(event) {
    setNewRepo(event.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback((repo)=> {
    const find = repositorios.filter(r => r.name !== repo)
    setRepositorios(find);
  }, [repositorios]);
  

  return (
      <Container>
        <h1>
          <FaGithub size={25}/>
          Meus Repositórios
        </h1>

        <Form onSubmit={handleSubmit} error={alert} >
          <input 
            type="text" 
            placeholder="Adicionar Repositório" 
            value={newRepo}
            onChange={handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0} >
            {loading ? ( // animção ao carregar o botao enviando a informação
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>

        </Form>

        <List>
          {repositorios.map(repo => (
            <li key={repo.name}>
              <span>
                <DeleteButton onClick={()=> handleDelete(repo.name)}>
                  <FaTimes size={14} />
                </DeleteButton> 
                { repo.name} 
              </span>
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <FaAngleDoubleRight size={25} /> 
              </Link>
            </li>
          ))}
        </List>

      </Container>
  )
}
