import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [postedBy, setPostedBy] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setloading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setPostedBy(response.data.postedBy);
        setTitle(response.data.title);
        setloading(false);
      }).catch((error) => {
        setloading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  },[]);


  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      postedBy
    };
    setloading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        setloading(false);
        enqueueSnackbar('Book Edited Successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setloading(false);
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/>: ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div>
          <label className='text-xl mr-4 text-gray-500'> Title</label>
          <input
            type = 'text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type = 'text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type = 'number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div>
          <label className='text-xl mr-4 text-gray-500'>Posted By</label>
          <input
            type = 'text'
            value={postedBy}
            onChange={(e) => setPostedBy(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>

      </div>
      
    </div>
  );
};

export default EditBook;
