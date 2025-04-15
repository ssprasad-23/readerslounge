import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { backend_URL } from '../config';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookPin, setBookPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backend_URL}/books/${id}`)
      .then((response) => {
        const data = response.data;
        setAuthor(data.author);
        setPublishYear(data.publishYear);
        setPostedBy(data.postedBy);
        setTitle(data.title);
        setBookPin(data.bookPin); // Store the book's PIN
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred while fetching the book details', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      postedBy,
      bookPin,
    };
    setLoading(true);
    axios
      .put(`${backend_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error editing the book', { variant: 'error' });
        console.log(error);
      });
  };

  const verifyPin = () => {
    if (enteredPin === bookPin) {
      setIsVerified(true);
      enqueueSnackbar('PIN verified successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('Incorrect PIN', { variant: 'error' });
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>

      {!isVerified ? (
        <div className='flex flex-col items-center rounded-xl w-[500px] p-8 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h3 className='text-2xl mb-4'>Enter PIN to Edit this Book</h3>
          <input
            type='password'
            maxLength='4'
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full mb-4 text-center rounded-full'
            placeholder='4-digit PIN'
          />
          <button
            className='p-4 bg-blue-600 text-white rounded-full w-40'
            onClick={verifyPin}
            disabled={enteredPin.length !== 4}
          >
            Verify PIN
          </button>
        </div>
      ) : (
        <div className='flex flex-col rounded-xl w-[500px] p-8 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div>
            <label className='text-xl mr-4 text-black'> Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div>
            <label className='text-xl mr-4 text-black'>Author</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div>
            <label className='text-xl mr-4 text--black'>Publish Year</label>
            <input
              type='number'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div>
            <label className='text-xl mr-4 text-black'>Posted By</label>
            <input
              type='text'
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
          </div>
          <div className='flex justify-center'>
            <button className='p-4 bg-blue-600 m-3 rounded-full w-28 text-white' onClick={handleEditBook}>
              Save
            </button>
          </div>  
        </div>
      )}
    </div>
  );
};

// p-4 bg-blue-600 text-white rounded-full w-40

export default EditBook;
