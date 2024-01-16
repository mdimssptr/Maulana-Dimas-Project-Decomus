import './App.css';
import Navbar from './component/Navbar';
import Carousel from './component/Carousel';
import Card from './component/Card';
import Lifecycle from './component/Lifecycle';
import Crud from './component/Crud';
import Peminjam from './component/Peminjam';
<link href="/output.css" rel="stylesheet"></link>


function App() {
  return (
    <main>
    <section className='fixed top-0 w-full px-14'>
    <Navbar/>
    </section>
    {/* <section className='mt-16 px-20'>
    <Carousel/>
    </section>
    <section className='flex justify-between px-20'>
    <Card/>
    <Card/>
    <Card/>
    </section>
    <section className='px-20'>
    <Lifecycle/>
    </section> */}
    <section className='mt-16 px-20'>
    <Crud/>
    </section>
    <section className='px-20'>
    <Peminjam/>
    </section>
    </main>
  );
}

export default App;
