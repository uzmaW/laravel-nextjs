import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useZiggyQuery = (routeName, params = {}, options = {}) => {
  const route = ziggy(routeName, params); // Here's where the magic happens!

  const fetcher = () => axios.get(route).then((res) => res.data);

  return useQuery(routeName, fetcher, options);
};

export default useZiggyQuery;
