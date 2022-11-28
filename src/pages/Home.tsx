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

  // let baseURL = "https://page-two.herokuapp.com/api";
  let baseURL = "https://page-two-server.onrender.com/api"

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let queryUrl = baseURL + "/bestsellers/" + selectedCategory;
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
        list: selectedCategory,
      };
      let postURL = baseURL + "/create";
      axios.post(postURL, newObj).then((response) => {});
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="h-full min-h-screen bg-amber-100 rounded-sm">
      <div className="my-3">
        <br />
        <div className="bg-slate-200 my-1 rounded-md mx-2">
          <br />
          <p className="mx-3">
            Find new books to read with this convenient tool, which will allow
            you to find current NYT bestsellers by category. Then, you can save
            books that you would like to read later. To see all saved
            bestsellers, navigate to the{" "}
            <span className="font-bold">Saved Books</span> page. This page will
            display all books that users have saved over time.
          </p>
          <br />
        </div>

        <div className="bg-slate-200 rounded-md mx-2">
          <div className="mx-3">
            <p className="">Select a category to find bestsellers: </p>
            <form onSubmit={handleSubmit}>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
              >
                {bookCategories.map((category) => (
                  <option value={category} key={category} className="">
                    {category}
                  </option>
                ))}
              </select>
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded cursor-pointer">
                Submit
              </button>
            </form>

            {isLoading && <p>Loading...</p>}
            <br />
            {nytData[0] && <p>Selected Category: {selectedCategory}</p>}
            <div className="flex flex-wrap justify-center">
              {nytData &&
                nytData.map((book) => {
                  return (
                    <div>
                      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-100 m-3">
                        <div className="px-6 py-4">
                          <div className="font-bold mb-2 content-center">
                            {book.title}
                          </div>
                          <p className="text-gray-700 text-base content-center">
                            Author: {book.author}
                            <br />
                            List: {selectedCategory}
                          </p>
                        </div>
                          <div className="px-6 pt-2 pb-2">
                            <button
                              onClick={() => {
                                handleSaveBook(book);
                              }}
                              className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded cursor-pointer active:bg-teal-700"
                            >
                              Save
                            </button>
                          </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
