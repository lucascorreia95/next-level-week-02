import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import api from "../../services/api";

function TeacherForm() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [bio, setBio] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems((prev) => [...prev, { week_day: 0, from: "", to: "" }]);
  }

  function handleCreateNewClass(event: FormEvent) {
    event.preventDefault();
    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        history.push("/");
      })
      .catch(() => {
        alert("Erro no cadastro!");
      });
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que voce quer dar aulas."
        description="O primeiro passo e preencher esse formulario de inscricao"
      />

      <main>
        <form onSubmit={handleCreateNewClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => {
                setAvatar(event.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(event) => {
                setWhatsapp(event.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(event) => {
                setBio(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Materia"
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Ciencias", label: "Ciencias" },
                { value: "Fisica", label: "Fisica" },
                { value: "Matematica", label: "Matematica" },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(event) => {
                setCost(event.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horarios disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horario
              </button>
            </legend>
            {scheduleItems.map((schedule, index) => {
              return (
                <div key={schedule.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={schedule.week_day}
                    onChange={(event) =>
                      setScheduleItemValue(
                        index,
                        "week_day",
                        event.target.value
                      )
                    }
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terca-feira" },
                      { value: "3", label: "Quarta-feira" },
                      { value: "4", label: "Quinta-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sabado" },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={schedule.from}
                    onChange={(event) =>
                      setScheduleItemValue(index, "from", event.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Ate"
                    type="time"
                    value={schedule.to}
                    onChange={(event) =>
                      setScheduleItemValue(index, "to", event.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso" />
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
