import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, feedback });
    
  };


  return (
    <div className="min-h-screen bg-linear-to-br w-100 flex items-center justify-center p-4 text-white ">
      <div className="w-full max-w-md  rounded-2xl shadow-blue-700 shadow-2xl overflow-hidden border-t-4 border-blue-500">
        <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white">Share Your Feedback</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a brief title..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block text-white text-sm font-semibold  mb-2">
              Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your detailed feedback..."
              rows="5"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{feedback.length} characters</p>
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Submit Feedback
          </button>
        </form>

      </div>

      <div onClick={()=>{navigate(-1)}} className='cursor-pointer flex gap-3 items-center absolute left-10 top-10'>
            <ArrowLeft size={32}/>
            <h3 className='text-2xl'>Back</h3>
        </div>
    </div>
  );
};

export default Card;