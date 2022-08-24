import React, { FormEvent, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const bookCategories = [
    "select",
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
    "young-adult-paperback-monthly",
  ];

  interface categoryQueryInt {
    results: {
      list_name: string;
      books: bookInt[];
    };
  }

  interface bookInt {
    title: string;
    author: string;
  }

  const [selectedCategory, setSelectedCategory] = useState("");
  const [nytData, setNytData] = useState<bookInt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let baseURL = "https://page-two.herokuapp.com/api";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let queryUrl = baseURL + "/bestsellers/" + selectedCategory;
    console.log("queryUrl: ", queryUrl);
    await axios.get(queryUrl).then((res) => {
      let resObj: categoryQueryInt = res.data;
      let booksArray: bookInt[] = resObj.results.books;
      setNytData(booksArray);
      setIsLoading(false); 
    });
  };

  const handleSaveBook = async (book: bookInt) => {
  try {
    let newObj = {
      title: book.title,
      author: book.author, 
      list: selectedCategory
    }
    let postURL = baseURL + '/create'
    axios.post(postURL, newObj)
      .then((response) => {
        console.log(response);
      })
  } catch (error){
    console.log('error: ', error)
  }
  }
 
  return (
    <div>
      <p className="text-3xl font-bold underline">Home page here</p>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
        >
          {bookCategories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      {isLoading && <p>Loading...</p>}
      <p>{nytData[0] && selectedCategory}</p>
      <div>
        {nytData &&
          nytData.map((book) => {
            return (
              <>
                <p key={book.title}>
                  {book.title} {book.author}
                </p>
                {/* <button onClick={() => {console.log('saved book: ', book)} }>Save</button> */}
                <button onClick={() => {handleSaveBook(book)} }>Save</button>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
