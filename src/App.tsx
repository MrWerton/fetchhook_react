import { useCallback, useEffect, useState } from 'react'
import './App.css'
import axios, { AxiosError } from 'axios'
interface HeaderProps {
  title: string
}

interface IPost {
  userId: number,
  id: number,
  title: string,
  completed: boolean

}


interface UseFetchProps {
  url: string
}
function useFetch<T>({ url }: UseFetchProps) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const fetch = useCallback(async () => {

    try {
      const response = await axios.get(url)
      setData(response.data)

    } catch (err) {
      const error = err as AxiosError;
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetch()
  }, [fetch])



  return { data, loading, error }




}
function Header({ title }: HeaderProps) {


  return <header>{title}</header>
}
function App() {

  const { data, error, loading } = useFetch<IPost[]>({ url: 'https://jsonplaceholder.typicode.com/todos/' });

  if (loading) return <h1>loading...</h1>
  if (error) return <h1>{error}</h1>
  return (

    <div>
      <Header title='Hello' />

      {data?.map(item => <p key={item.id}>{item.title}</p>)}
    </div>)
}

export default App
