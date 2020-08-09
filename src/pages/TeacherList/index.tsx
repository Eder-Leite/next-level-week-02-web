import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

import './styles.css';

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

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => { window.scrollTo(0, 0) }, []);

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    })

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            options={materias}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Select
            options={dias}
            name="week_day"
            value={week_day}
            label="Dia da semana"
            onChange={(e) => setWeek_day(e.target.value)}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher, index) => {
          return <TeacherItem key={index} teacher={teacher} />
        })}
      </main>

    </div>
  );
}

export default TeacherList;