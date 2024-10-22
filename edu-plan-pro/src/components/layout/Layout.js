
import Aside from '../aside/Aside';
import Footer from '../footer/Footer';
import Header from '../header/Header'; 

const Layout = ({children}) => {
  return (
    <div className=''>
        <Header />
        <Aside />

      {/* el layaut es una base para inportar todo lo que se utilice en la vista */}
        {/* contenido inyectable */}
        <div className=''>
            {children}
        </div>
  
        <Footer /> 
    </div>
  )
}

export default Layout