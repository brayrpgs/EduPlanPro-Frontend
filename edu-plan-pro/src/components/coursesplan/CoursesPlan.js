import Aside from '../aside/Aside'; 
import CoursesPlanTable from '../coursesplan/CoursesPlanTable';

function CoursesPlan() {
  return (
    <div className="flex flex-col">
      <a href="/faculty" id="myLink">Facultades</a>
      <a href="/school" id="myLink">Escuelas</a>
      <a href="/user" id="myLink">Usuarios</a>
      <a href="/teacher" id="myLink">Profesores</a>
    </div>
  
  );
}

export default CoursesPlan;
