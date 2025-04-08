import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import PropTypes from "prop-types";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="border-2 border-gray-700 rounded-lg px-2 py-2 relative hover:shadow-xl"
        >
          <div className="absolute right-1 px-2 py-1 bg-red-300 rounded-3xl mt-1 mr-1">
            {book.publishYear}
          </div>

          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.title}</h2>
          </div>

          <div className="flex justify-start items-center gap-x-2">
            <BiUserCircle className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>

          <div className="flex justify-start gap-x-2 mt-2">
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

BooksCard.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      publishYear: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BooksCard;
