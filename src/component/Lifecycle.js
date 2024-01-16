import { useEffect, useState } from "react";

const Lifecycle = () => {
    const [makanan, setMakanan] = useState('Bakso');
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((data) => setData(data)); 
    }, []);
    return (
        <main className="mt-3">
            <h1>Lifecycle</h1>
            <p>{makanan}</p>
            {data && <p>{data.title}</p>}
            <button
            onClick={() => setMakanan("Nasi Goreng")}
            className="px-20 py-1 mr-2 bg-orange-500 rounded-md">
                Ubah makanan
            </button>
            <button
            onClick={() => setMakanan("Bakso")}
            className="px-20 py-1 bg-red-500 rounded-md">
                Reset
            </button>
        </main>
    );
};

export default Lifecycle;
