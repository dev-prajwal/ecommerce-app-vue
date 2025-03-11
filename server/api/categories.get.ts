import { defineEventHandler } from 'h3';
import axios from 'axios';
import NodeCache from 'node-cache';

// Create a cache instance with a TTL of 1 day (86400 seconds)
const cache = new NodeCache({ stdTTL: 86400 });

export default defineEventHandler(async () => {
  const cacheKey = 'categories'; 

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Returning cached categories');
    return cachedData; 
  }

  try {
    const response = await axios.get('https://dummyjson.com/products/categories');
    const categories = response.data;

    cache.set(cacheKey, categories);
    console.log('Fetched and cached categories');

    return categories; 
  } catch (error) {
    return { error: 'Failed to fetch categories' };
  }
});