import {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { backend_URL } from '../config';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [bookPin, setBookPin] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      postedBy,
      bookPin,
    };
    setloading(true);
    axios
      .post(`${backend_URL}/books`, data)
      .then(() => {
        setloading(false);
        enqueueSnackbar('Book Created Successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setloading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner/>: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div>
          <label className='text-xl mr-4 text-black'> Title</label>
          <input
            type = 'text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-black'>Author</label>
          <input
            type = 'text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-black'>Publish Year</label>
          <input
            type = 'number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-black'>Posted By</label>
          <input
            type = 'text'
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-black'>bookPin (4 digit pin for editing and deleting) </label>
          <input
            type = 'number'
            value={bookPin}
            onChange={(e) => setBookPin(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
