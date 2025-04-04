import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`readerslounge-production.up.railway.app/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error fetching book details', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`readerslounge-production.up.railway.app/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting the book', { variant: 'error' });
        console.log(error);
      });
  };

  const verifyPin = () => {
    if (enteredPin === book.bookPin) {
      setIsVerified(true);
      enqueueSnackbar('PIN verified successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Incorrect PIN', { variant: 'error' });
    }
  };

  if (loading) return <Spinner />;

  if (!book) return null;

  return (
    <div className='p-4 '>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>

      {!isVerified ? (
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className='text-2xl mb-4'>Enter PIN to Delete this Book</h3>
          <input
            type='password'
            maxLength='4'
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full mb-4'
            placeholder='4-digit PIN'
          />
          <button
            className='p-4 bg-blue-600 text-white w-full'
            onClick={verifyPin}
            disabled={enteredPin.length !== 4}
          >
            Verify PIN
          </button>
        </div>
      ) : (
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
          <button
            className='p-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
