import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
import { MainSearch } from '../search/MainSearch';
import FacultyTable from './FacultyTable';

function Faculty() {
  //
  //<FacultyTable/>
  return (
    <div className="App">
      <Header/>
      <Aside/>
      
      <MainSearch></MainSearch>
      <Footer/>
    </div>
  
  );
}

export default Faculty;