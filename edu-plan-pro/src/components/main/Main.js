import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 
import MainTable from '../maintable/MainTable';

function Main() {
  return (
    <div className="App">
      <Header/>
      <Aside/>
      <MainTable/>
      <Footer/>
    </div>
  
  );
}

export default Main;
