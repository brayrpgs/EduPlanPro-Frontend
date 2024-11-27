import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
import FacultyTable from './FacultyTable';

function Faculty() {
  
  return (
    <div className="App">
      <Header/>
      <Aside/>
      <FacultyTable/>
      <Footer/>
    </div>
  
  );
}

export default Faculty;