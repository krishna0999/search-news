import "./App.css";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchQuery = (e) => {
    fetch(`http://hn.algolia.com/api/v1/search?query=${e.target.value}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.hits));
    console.log(searchResults);
  };

  const someFn = function (fn, delay) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        handleSearchQuery.apply(context, args);
      }, delay);
    };
  };
  const optimisedSearchFunction = someFn(handleSearchQuery, 300);

  const handleNavigateDetailPage = (e) => {
    console.log(e);
    window.open(`http://hn.algolia.com/api/v1/items/${e}`);
  };

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
          <div className="individual_result">
            <p onClick={() => handleNavigateDetailPage(result.objectID)}>
              {result.title || result.story_text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
