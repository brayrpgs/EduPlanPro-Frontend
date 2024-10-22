import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
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