import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { backend_URL } from '../config';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${backend_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  },[id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-blue-400 rounded-xl w-fit p-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='my-3'>
            <span className='text-xl mr-4 text-gray-600'>ID:</span>
            <span>{book._id}</span>
          </div>
          <div className='my-3'>
            <span className='text-xl mr-4 text-gray-600'>Title:</span>
            <span>{book.title}</span>
          </div>
          <div className='my-3'>
            <span className='text-xl mr-4 text-gray-600'>Author:</span>
            <span>{book.author}</span>
          </div>
          <div className='my-3'>
            <span className='text-xl mr-4 text-gray-600'>Publish Year:</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-3'>
            <span className='text-xl mr-4 text-gray-600'>Posted By:</span>
            <span>{book.postedBy}</span>
          </div>
          <div className='my-3'>
            <span className='text-xl mr-4 text-gray-600'>Last Update:</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
