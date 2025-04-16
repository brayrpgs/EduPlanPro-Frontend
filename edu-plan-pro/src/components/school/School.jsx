import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import SchoolTable from './SchoolTable.jsx';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs.jsx';

function School() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <Breadcrumbs/>
      <SchoolTable></SchoolTable>
      <Footer/>
    </div>
  
  );
}

export default School;