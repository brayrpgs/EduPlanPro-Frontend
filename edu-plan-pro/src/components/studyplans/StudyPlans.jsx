import Footer from '../footer/Footer.jsx';
import Header from '../header/Header.jsx'; 
import StudyPlansTable from "../studyplans/StudyPlansTable.jsx"

function StudyPlans() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
      <Header/>
      <StudyPlansTable/>
      <Footer/>
    </div>
  
  );
}

export default StudyPlans;