import { useState, useEffect } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import PostGrid from "@/components/organisms/PostGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import postService from "@/services/api/postService";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError("");
    
    try {
      let results = [];
      
      if (query.startsWith("#")) {
        // Hashtag search
        const hashtag = query.slice(1);
        results = await postService.searchByHashtag(hashtag);
      } else {
        // Caption search
        results = await postService.searchByCaption(query);
      }
      
      setSearchResults(results);
    } catch (err) {
      setError("Failed to search posts");
      console.error("Error searching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="space-y-6">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Search posts or #hashtags..."
        className="sticky top-0 z-10"
      />
      
      {loading && <Loading />}
      {error && <Error message={error} onRetry={handleRetry} />}
      
      {!loading && !error && searchResults.length === 0 && searchQuery && (
        <Empty 
          message="No results found" 
          action="Try a different search"
          actionTo="/search"
          icon="Search"
        />
      )}
      
      {!loading && !error && searchResults.length === 0 && !searchQuery && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Search for posts
          </h3>
          <p className="text-gray-600">
            Try searching for hashtags or keywords to discover amazing content
          </p>
        </div>
      )}
      
      {!loading && !error && searchResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Search Results ({searchResults.length})
          </h3>
          <PostGrid posts={searchResults} />
        </div>
      )}
    </div>
  );
};

export default Search;