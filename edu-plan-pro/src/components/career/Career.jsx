import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import CareerTable from './CareerTable.jsx';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs.jsx';

function Career() {
  

  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <CareerTable/>

      <Footer/>
    </div>
  
  );
}

export default Career;