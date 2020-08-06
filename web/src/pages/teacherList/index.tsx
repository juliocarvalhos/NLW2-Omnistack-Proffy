import React, { useState, FormEvent } from 'react';

import TeacherItem, {Teacher} from '../../components/teacherItem';
import PageHeader from '../../components/pageheader';
import Input from '../../components/input';
import Select from '../../components/select';

import api from '../../services/api';

import "./styles.css"


function TeacherList(){
    const[teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [time, setTime] = useState('')

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })
        
       setTeachers(response.data) 
    }

    return(
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os Proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                         name="subject" 
                         label="Matéria"
                         value={subject}
                         onChange={(e) => { setSubject(e.target.value)}}
                         options={[
                             {value: 'Artes', label: 'Artes' },
                             {value: 'Biologia', label: 'Biologia' },
                             {value: 'Matematica', label: 'Matematica' },
                             {value: 'Portugues', label: 'Portugues' },
                             {value: 'História', label: 'História' },
                             {value: 'Física', label: 'Física' },
                             {value: 'Química', label: 'Química' },
                             {value: 'Educação física', label: 'Educação física' },
                         ]}
                    />
                    <Select
                         name="week_day" 
                         label="Dia da semana"
                         value={week_day}
                         onChange={(e) => { setWeek_day(e.target.value)}}
                         options={[
                             {value: '0', label: 'Domingo' },
                             {value: '1', label: 'Segunda' },
                             {value: '2', label: 'Terça' },
                             {value: '3', label: 'Quarta' },
                             {value: '4', label: 'Quinta' },
                             {value: '5', label: 'Sexta' },
                             {value: '6', label: 'Sábado' },
                         ]}
                    />

                
                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e) => { 
                            setTime(e.target.value)}}
                    />

                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher)=> {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList;