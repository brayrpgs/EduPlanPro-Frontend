import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import ReportTable from './ReportTable.jsx';

function Report() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <ReportTable></ReportTable>
      <Footer/>
    </div>
  
  );
}

export default Report;