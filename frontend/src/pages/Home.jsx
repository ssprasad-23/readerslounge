import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import { backend_URL } from "../config";

const Home = () => {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backend_URL}/books`)
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Error loading books, please try again");
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-black dark:text-black-500 tracking-wide border-b-2 border-red-600 pb-2">
          Readers&apos; Top Picks
        </h1>
      </div>
      <div className="text-1xl my-4 flex justify-center">
        <h1>
        *If you&apos;ve made it to this page, we&apos;d love for you to share your favorite book with us! 😊
        </h1>
      </div>
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}>Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}>Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-2">Books List</h1>
        <Link to="books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={Books} />
      ) : (
        <BooksCard books={Books} />
      )}
    </div>
  );
};

export default Home;
