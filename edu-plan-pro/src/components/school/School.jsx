import Aside from '../aside/Aside';
import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import SchoolTable from './SchoolTable';

function School() {
  return (
    <div className="App">
      <Header/>
      <Aside/>
      <SchoolTable></SchoolTable>
      <Footer/>
    </div>
  
  );
}

export default School;