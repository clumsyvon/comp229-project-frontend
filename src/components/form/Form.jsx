import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkDown from 'react-markdown';
const Form = () => {

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [details, setDetails] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;

    if (isLoading === true) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  const userMessages = [
    { role: 'user', content: `Create a cover letter for ${name} with ${company} as ${position} and ${details} 
    . You can use this format
    
    Dear Hiring Manager,
      
    
         ...details here
         
    closing signature` },
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    axios
      .post("http://localhost:8081/generate", { userMessages })
      .then((response) => {
        setCoverLetter(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  }

  return (
    <div className="max-w-[80%] w-full mx-auto p-4 bg-[#99a8c3] justify-center mt-20">
      <h1 className="text-3xl font-bold text-white flex justify-center mb-2">Cover Builder</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            for="name"
            className="block text-gray-700 text-sm font-bold mb-2 uppercase"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name here"
          />
        </div>
        <div className="mb-6">
          <label
            for="company"
            className="block text-gray-700 text-sm font-bold mb-2 uppercase"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder="Enter the company you want to apply"
          />
        </div>
        <div className="mb-6">
        <label
          for="position"
          className="block text-gray-700 text-sm font-bold mb-2 uppercase"
        >
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder='Enter the position you want to apply'
        />
        </div>
        <div className="mb-10">
        <label
          for="others"
          className="block text-gray-700 text-sm font-bold mb-2 uppercase"
        >
          Brief details about yourself
        </label>
        <textarea
          id="others"
          name="others"
          rows="3"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder='Enter any other information you want to add'
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
        </div>
        <div className="mb-6">
        <button
          type="submit"
          className="block  bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Cover Letter
        </button>
        </div>
      </form>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Generated Cover Letter</h2>
        <div className="mb-4 border-2 shadow rounded px-10 py-10 bg-white">
        {isLoading && <div className="p-4">Please wait while we generate your cover letter...{count}</div>}
        <ReactMarkDown className="text-[16px] text-gray-800">{coverLetter}</ReactMarkDown>
        </div>
      </div>
    </div>
  );
}

export default Form;
