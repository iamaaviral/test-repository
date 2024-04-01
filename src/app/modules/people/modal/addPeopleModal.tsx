import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../../components/Modal/modal";
import { Person } from "../model";
import { useAddPeopleQuery } from "../query/addPeople.query";
import "./addPeople.css";

interface AddPeopleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sortedPeople: Person[];
  setSortedPeople: Dispatch<SetStateAction<Person[]>>;
}
interface Movie {
  title: string;
  released: string;
}

interface FormData {
  name: string;
  show: string;
  actor: string;
  dob: string;
  movies: Movie[];
}

export const AddPeopleModal: React.FC<AddPeopleModalProps> = ({
  isOpen,
  setIsOpen,
  sortedPeople,
  setSortedPeople,
}) => {
  const { addPerson, loading, error } = useAddPeopleQuery();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    show: "",
    actor: "",
    dob: "",
    movies: [{ title: "", released: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMovieChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const movies = [...formData.movies];
    movies[index] = { ...movies[index], [name]: value };
    setFormData({ ...formData, movies });
  };

  const handleAddMovie = () => {
    setFormData({
      ...formData,
      movies: [...formData.movies, { title: "", released: "" }],
    });
  };

  const addPeople = async () => {
    const newPersonData = {
      ...formData,
      id: "63b5d67944d6dc30c633234",
      updatedAt: String(Date.now()),
    };
    try {
      addPerson && (await addPerson(newPersonData));
      setIsOpen(false);
      const updatedSortedPeople = [...sortedPeople, newPersonData];
      setSortedPeople(updatedSortedPeople);
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2>Add a new Person</h2>
      <div className="form-container">
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="show">Show:</label>
            <input
              type="text"
              id="show"
              name="show"
              value={formData.show}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="actor">Actor/Actress:</label>
            <input
              type="text"
              id="actor"
              name="actor"
              value={formData.actor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="movie-header-wrapper">
                <label htmlFor="movies">Movies:</label>
                <button type="button" onClick={handleAddMovie}>Add Movie</button>
            </div>
            {formData.movies.map((movie, index) => (
              <div key={index} className="movie-field-wrapper">
                <input
                  type="text"
                  name="title"
                  value={movie.title}
                  onChange={(e) => handleMovieChange(index, e)}
                  required
                />
                <input
                  type="date"
                  name="released"
                  value={movie.released}
                  onChange={(e) => handleMovieChange(index, e)}
                  required
                />
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="footer-wrapper">
        <button disabled={loading} onClick={addPeople}>
          {loading ? "Adding..." : "Add"}
        </button>
        <button onClick={() => setIsOpen(false)}>Close</button>
        {error && <p>Error: {error.message}</p>}
      </div>
    </Modal>
  );
};
