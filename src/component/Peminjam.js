import { useEffect, useState } from "react";

const Peminjam = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [idPeminjam, setIdPeminjam] = useState(0);
  const [dataBuku, setDataBuku] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPeminjam = {
      id: idPeminjam + 1,
      nama_peminjam: event.target.nama_peminjam.value,
      nama_buku: event.target.nama_buku.value,
      tanggal_pinjam: event.target.tanggal_pinjam.value,
      tanggal_pengembalian: event.target.tanggal_pengembalian.value,
    };
    setData([...data, newPeminjam]);
    event.target.reset();
    localStorage.setItem(
      "data_peminjam",
      JSON.stringify([...data, newPeminjam])
    );
    localStorage.setItem("idPeminjam", idPeminjam + 1);
    setIdPeminjam(idPeminjam + 1);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    localStorage.setItem("data_peminjam", JSON.stringify(newData));
  };

  const handleEdit = (id) => {
    setIsEdit(true);
    const index = data.findIndex((item) => item.id === id);
    setEditIndex(index);
    document.getElementById('nama_peminjam').value = data[index].nama_peminjam;
    document.getElementById('nama_buku').value = data[index].nama_buku;
    document.getElementById('tanggal_pinjam').value = data[index].tanggal_pinjam;
    document.getElementById('tanggal_pengembalian').value = data[index].tanggal_pengembalian;
  };

  const editSubmit = (event) => {
    event.preventDefault();

    const editedData = {
      id: data[editIndex].id,
      nama_peminjam: event.target.nama_peminjam.value,
      nama_buku: event.target.nama_buku.value,
      tanggal_pinjam: event.target.tanggal_pinjam.value,
      tanggal_pengembalian: event.target.tanggal_pengembalian.value,
    };

    const newData = [...data];
    newData[editIndex] = editedData;

    setData(newData);
    event.target.reset();
    setIsEdit(false);
    localStorage.setItem("data_peminjam", JSON.stringify(newData));
  };

  useEffect(() => {
    localStorage.getItem("data_peminjam") &&
      setData(JSON.parse(localStorage.getItem("data_peminjam")));
    localStorage.getItem("idPeminjam") &&
      setIdPeminjam(localStorage.getItem("idPeminjam"));
    localStorage.getItem("data") &&
      setDataBuku(JSON.parse(localStorage.getItem("data")));
  }, []);

  return (
    <section className="mt-5 mb-5">
      <h1 className="mb-2 text-xl font-bold">Loan List</h1>
      <section>
        <div className="overflow-x-auto border-2 border-gray-100 rounded-lg shadow-sm">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Title Book</th>
                <th>Loan</th>
                <th>Return</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.nama_peminjam}</td>
                    <td>{item.nama_buku}</td>
                    <td>{item.tanggal_pinjam}</td>
                    <td>{item.tanggal_pengembalian}</td>
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
          {isEdit ? "Edit Data" : "Loan Data"}
        </h1>
        <form
          action=""
          onSubmit={isEdit ? editSubmit : handleSubmit}
          className="grid w-full grid-cols-2 px-4 py-3 border-2 border-gray-100 rounded-lg shadow-sm gap-y-1 gap-x-3"
        >
          <section>
            <label htmlFor="nama_peminjam">Name</label>
            <br />
            <input
              type="text"
              id="nama_peminjam"
              className="w-full mt-1 input input-bordered"
            required/>
          </section>
          <section>
            <label htmlFor="nama_buku">Book Title</label>
            <br />
            <select
              name="nama_buku"
              id="nama_buku"
              className="w-full px-2 py-3 mt-1 rounded-lg input input-bordered"
            >
              {dataBuku.map((item) => (
                <option key={item.id} value={item.nama}>
                  {item.nama}
                </option>
              ))}
            </select>
          </section>
          <section>
            <label htmlFor="tanggal_pinjam">Loan Date</label>
            <br />
            <input
              type="date"
              name="tanggal_pinjam"
              id="tanggal_pinjam"
              className="w-full p-1 mt-2 input input-bordered"
            />
          </section>
          <section>
            <label htmlFor="tanggal_pengembalian">Return Date</label>
            <br />
            <input
              type="date"
              name="tanggal_pengembalian"
              id="tanggal_pengembalian"
              className="w-full p-1 mt-2 border input input-bordered"
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

export default Peminjam;