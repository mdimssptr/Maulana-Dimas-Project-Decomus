import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Crud = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [idBook, setIdBook] = useState(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newBuyer = {
      id: idBook + 1,
      nama: event.target.nama.value,
      author: event.target.author.value,
      deskripsi: event.target.deskripsi.value,
      harga: event.target.harga.value,
    };
    setData([...data, newBuyer]);
    event.target.reset();
    localStorage.setItem("data", JSON.stringify([...data, newBuyer]));
    localStorage.setItem("idBook", idBook + 1);
    setIdBook(idBook + 1);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    const index = data.findIndex((item) => item.id === id);
    setEditIndex(index);
    document.getElementById('nama').value = data[index].nama;
    document.getElementById('author').value = data[index].author;
    document.getElementById('deskripsi').value = data[index].deskripsi;
    document.getElementById('harga').value = data[index].harga;
  };

  const editSubmit = (event) => {
    event.preventDefault();

    const editedData = {
      id: data[editIndex].id,
      nama: event.target.nama.value,
      author: event.target.author.value,
      deskripsi: event.target.deskripsi.value,
      harga: event.target.harga.value,
    };

    const newData = [...data];
    newData[editIndex] = editedData;

    setData(newData);
    event.target.reset();
    setIsEdit(false);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  useEffect(() => {
    localStorage.getItem("data") &&
      setData(JSON.parse(localStorage.getItem("data")));
    localStorage.getItem("idBook") && setIdBook(localStorage.getItem("idBook"));
  }, []);

  return (
    <section className="mt-5 mb-5">
      <h1 className="mb-2 text-xl font-bold">List Book</h1>
      <section>
        <div className="overflow-x-auto border-2 border-gray-100 rounded-lg shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.nama}</td>
                    <td>{item.author}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.harga}</td>
                    <td>
                      <button
                        className="mr-1 text-white btn btn-warning"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-white btn btn-error"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Data Not Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-5">
        <h1 className="mb-2 text-xl font-bold">
          {isEdit ? "Edit Book" : "Data Book"}
        </h1>
        <form
          action=""
          onSubmit={isEdit ? editSubmit : handleSubmit}
          className="grid w-full grid-cols-2 px-4 py-3 border-2 border-gray-100 rounded-lg shadow-sm gap-y-1 gap-x-3"
        >
          <section>
            <label htmlFor="nama">Book Title</label>
            <br />
            <input
              type="text"
              id="nama"
              className="w-full mt-1 input input-bordered"
            required/>
          </section>
          <section>
            <label htmlFor="author">Author</label>
            <br />
            <input
              type="text"
              id="author"
              className="w-full mt-1 input input-bordered"
            required/>
          </section>
          <section>
            <label htmlFor="deskripsi">Description</label>
            <br />
            <input
              type="text"
              id="deskripsi"
              className="w-full mt-1 input input-bordered"
            required/>
          </section>
          <section>
            <label htmlFor="harga">Price Book</label>
            <br />
            <input
              type="number"
              id="harga"
              className="w-full mt-1 input input-bordered"
            />
          </section>
          <section>
            <button className="mt-2 mr-2 text-white btn btn-success">
              Submit
            </button>
            <button className="mt-2 text-white btn btn-error" type="reset">
              Cancel
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default Crud;