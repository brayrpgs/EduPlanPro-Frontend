
import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import TeacherTable from './TeacherTable';

function Teachear() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <TeacherTable/>
      <Footer/>
    </div>
  
  );
}

export default Teachear;