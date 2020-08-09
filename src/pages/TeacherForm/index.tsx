import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

const materias = [
  { value: 'Artes', label: 'Artes' },
  { value: 'Biologia', label: 'Biologia' },
  { value: 'Ciências', label: 'Ciências' },
  { value: 'Educação Física', label: 'Educação Física' },
  { value: 'Fisica', label: 'Fisica' },
  { value: 'Geografia', label: 'Geografia' },
  { value: 'História', label: 'História' },
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Português', label: 'Português' },
  { value: 'Química', label: 'Química' }
];

const dias = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Segunda-feira' },
  { value: '2', label: 'Terça-feira' },
  { value: '3', label: 'Quarta-feira' },
  { value: '4', label: 'Quinta-feira' },
  { value: '5', label: 'Sexta-feira' },
  { value: '6', label: 'Sábado' }
];

interface ScheduleProps {
  week_day?: string;
  from?: string;
  to?: string;
}

const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: '', from: '', to: '' }
  ]);

  useEffect(() => { window.scrollTo(0, 0) }, []);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: '', from: '', to: '' }]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {

      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    })
      .then(() => {
        alert('Cadastro realizado com sucesso!');

        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro!');
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              value={name}
              label="Nome completo"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="avatar"
              value={avatar}
              label="Avatar"
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              name="whatsapp"
              value={whatsapp}
              label="WhatsApp"
              onChange={(e) => setWatsapp(e.target.value)}
            />
            <TextArea
              name="bio"
              value={bio}
              label="Biografia"
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              options={materias}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Input
              name="cost"
              value={cost}
              label="Custo da sua hora por aula"
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
          <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
          </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    options={dias}
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;