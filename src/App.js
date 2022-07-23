import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/search?query=`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.hits));
  }, []);

  // Make api calls matching the search query
  const handleSearchQuery = (e) => {
    fetch(`https://hn.algolia.com/api/v1/search?query=${e.target.value}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.hits));
  };

  // debouncing enabled for optimisation of number of api calls
  const someFn = function (fn, delay) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };
  const optimisedSearchFunction = someFn(handleSearchQuery, 300);

  return (
    <div className="app">
      <div className="app__search">
        <h1>Search across Hacker news</h1>
        <input
          type="text"
          onKeyUp={optimisedSearchFunction}
          placeholder="Search here..."
        />
      </div>
      <div className="app__searchResults">
        {searchResults?.map((result) => (
          <Link className="link" to={result.objectID}>
            <div className="individual_result">
              {result.title || result.story_text}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default App;
