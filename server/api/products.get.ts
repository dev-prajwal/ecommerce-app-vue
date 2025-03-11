import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { search, category, skip = 0, limit = 16 } = query;

  const cacheKey = JSON.stringify(query);
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  let apiUrl = 'https://dummyjson.com/products?';

  if (search) {
    apiUrl = `https://dummyjson.com/products/search?q=${search}&`;
  } else if (category) {
    apiUrl = `https://dummyjson.com/products/category/${category}?`;
  }

  apiUrl += `limit=${limit}&skip=${skip}`;

  try {
    const response = await axios.get(apiUrl);

    const cacheDuration = category || !search ? 3600 : 60; // 1 hour for categories and main listings, 1 minute for search
    cache.set(cacheKey, response.data, cacheDuration);

    return response.data;
  } catch (error) {
    return { error: 'Failed to fetch products' };
  }
});