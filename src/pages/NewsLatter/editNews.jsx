import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showNews, updateNews } from "../../services/newslatters-services";
import { Input } from "../../styles/views/Login";


const StyledForm = styled.form`
  flex-direction: column;
  gap: 2rem;
  min-width: 258px;
`;

const Container = styled.div`
  width: 300px;
  margin: 6rem 2rem;
  justify-content: space-between;
  align-content: center;
  float: inline-start;
`;

export default function EditNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const id = new URLSearchParams(window.location.search).get("id");
  useEffect(() => {
    showNews(id).then((news)=>
      setForm({
        title: news.title,
        body: news.body,
      })
    )
  }, [id])

  function handleSubmit(event) {
    event.preventDefault();
    updateNews(form, id).then(navigate("/news"))
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <>
    {form ? (
      <StyledForm onSubmit={e=>handleSubmit(e)}>
      <Container>
      <Input
          id="title"
          label="Titulo"
          type="text"
          placeholder="Nuevos servicios..."
          value={form.title}
          onChange={handleFormChange}
        />

      <Input
        id="body"
        label="Descripción"
        type="text"
        placeholder="Se añadió nuevo servicio de..."
        value={form.body}
        onChange={handleFormChange}
      />

      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center' type="submit">
        Crear Newslatter
      </button>
     </Container> 
    </StyledForm>) : (<div>Cargando....</div>)}
    
    </>
  );
}
