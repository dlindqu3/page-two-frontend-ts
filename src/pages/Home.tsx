import React, { FormEvent, useState} from 'react';
import axios from 'axios'; 

const Home: React.FC = () => {

  const bookCategories = [
    'select',
    "combined-print-and-e-book-fiction",
    "combined-print-and-e-book-nonfiction",
    "hardcover-fiction",
    "hardcover-nonfiction",
    "trade-fiction-paperback",
    "paperback-nonfiction", 
    "advice-how-to-and-miscellaneous",
    "childrens-middle-grade-hardcover",
    "picture-books", 
    "series-books",
    "young-adult-hardcover",
    "audio-fiction",
    "audio-nonfiction",
    "business-books",
    "graphic-books-and-manga",
    "mass-market-monthly",
    "middle-grade-paperback-monthly",
    "young-adult-paperback-monthly"
  ]
  
  interface categoryQueryInt {
    results: {
      books: { title: string; author: string }[]
    }
  }

  interface bookInt {
    title: string; 
    author: string 
  }

  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [nytData, setNytData] = useState<bookInt[]>([]); 

  let baseURL = 'https://page-two.herokuapp.com/api'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let queryUrl = baseURL + '/bestsellers/' + selectedCategory; 
    console.log('queryUrl: ', queryUrl);  
    await axios.get(queryUrl)
      .then((res) => {
        let resObj: categoryQueryInt = res.data;  
        let booksArray: bookInt[] = resObj.results.books; 
        setNytData(booksArray); 
      })
  }

  return (
    <div>
      <p>Home page here</p>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value)}}>
        {bookCategories.map((category) => (
              <option value={category} key={category}>{category}</option>
            ))}
        </select>
        <button>Submit</button>
      </form>
      {/* <p>{selectedCategory && selectedCategory}</p> */}
      <div>{nytData && nytData.map((book) => {
        return <p key={book.title}>{book.title}</p>
      })}</div>
    </div>
  )
}

export default Home
