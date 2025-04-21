import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import FacultyTable from './FacultyTable';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs.jsx';

function Faculty() {
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <FacultyTable/>
      <Footer/>
    </div>
  
  );
}

export default Faculty;