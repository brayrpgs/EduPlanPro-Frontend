import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
import TeacherTable from './TeacherTable';

function Teachear() {
  return (
    <div className="App">
      <Header/>
      <Aside/>
      <TeacherTable/>
      <Footer/>
    </div>
  
  );
}

export default Teachear;