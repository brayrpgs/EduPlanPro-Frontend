import Aside from '../aside/Aside';
import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
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