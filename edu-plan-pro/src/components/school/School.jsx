import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import SchoolTable from './SchoolTable';

function School() {
  return (
    <div className="App">
      <Header/>
      <SchoolTable></SchoolTable>
      <Footer/>
    </div>
  
  );
}

export default School;