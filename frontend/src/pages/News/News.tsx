import { Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

interface Article {
  url: string;
  title: string;
  description: string;
  urlToImage: string;
}

const News: React.FC = () => {

  const apiKey = "03e065701faa43308146bc3b978c41fa";
  const [error, setError] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Define API URLs
  const api1 = `https://newsapi.org/v2/everything?q=tesla&from=2024-10-05&sortBy=publishedAt&apiKey=${apiKey}`;
  const api2 = `https://newsapi.org/v2/everything?q=apple&from=2024-11-04&to=2024-11-04&sortBy=popularity&apiKey=${apiKey}`;
  const api3 = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

  // Fetch Tesla news
  const tesla = async () => {
    try {
      console.log("Fetching Tesla news..."); // Debugging
      const response = await fetch(api1);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Tesla news:", result); // Debugging
        setArticles(result.articles);
      } else {
        setError("Something went wrong with the Tesla news request.");
      }
    } catch (err) {
      console.log("Error fetching Tesla news:", err); // Debugging
      setError("There was an issue fetching Tesla news.");
    }
  };

  // Fetch Apple news
  const apple = async () => {
    try {
      console.log("Fetching Apple news..."); // Debugging
      const response = await fetch(api2);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Apple news:", result); // Debugging
        setArticles(result.articles);
      } else {
        setError("Something went wrong with the Apple news request.");
      }
    } catch (err) {
      console.log("Error fetching Apple news:", err); // Debugging
      setError("There was an issue fetching Apple news.");
    }
  };

  // Fetch Tech news
  const tech = async () => {
    try {
      console.log("Fetching Tech news..."); // Debugging
      const response = await fetch(api3);
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Tech news:", result); // Debugging
        setArticles(result.articles);
      } else {
        setError("Something went wrong with the Tech news request.");
      }
    } catch (err) {
      console.log("Error fetching Tech news:", err); // Debugging
      setError("There was an issue fetching Tech news.");
    }
  };

  useEffect(() => {
    // Automatically load Tesla news when component is mounted (for example)
    tesla(); // You can replace this with the API you want to load initially
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white min-h-screen">
      <div className="w-full max-w-4xl">
        {/* Navigation bar at the top */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-6">
            <NavLink
              to="#"
              className="tesla p-4 bg-gray-700 hover:bg-red-500 rounded-md"
              onClick={tesla}
            >
              <b>Tesla News</b>
            </NavLink>
            <NavLink
              to="#"
              className="apple p-4 bg-gray-700 hover:bg-red-500 rounded-md"
              onClick={apple}
            >
              <b>Apple News</b>
            </NavLink>
            <NavLink
              to="#"
              className="tech p-4 bg-gray-700 hover:bg-red-500 rounded-md"
              onClick={tech}
            >
              <b>Tech News</b>
            </NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="body flex gap-6">
          {/* Right-side Content */}
          <div className="right-side flex-grow overflow-y-auto p-4">
            <div className="news">
              <div className="bura mb-4">
                <h1 className="text-3xl font-bold">Headline News</h1>
              </div>

              {error && <div className="error text-red-500 text-xl mb-4">{error}</div>}
              
              {loading && <div>Loading...</div>} {/* Show loading state */}

              {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((article) => (
                    <div key={article.url} className="card bg-gray-800 rounded-lg shadow-lg p-4">
                      {article.urlToImage && (
                        <img
                          className="card-image h-48 w-full object-cover rounded-lg mb-4"
                          src={article.urlToImage}
                          alt={article.title}
                        />
                      )}
                      <div className="card-content">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          <h2 className="card-title text-lg font-bold text-white truncate">{article.title}</h2>
                        </a>
                        <p className="card-text text-gray-400 text-sm">{article.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xl text-gray-400">No articles available</div>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="constant mt-8 text-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white p-4 rounded-lg">
          <Link to="/">
            <b>Back</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default News;
