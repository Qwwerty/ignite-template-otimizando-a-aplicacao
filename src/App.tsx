import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {useCallback, useEffect, useState} from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

const queryClient = new QueryClient()

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id)
  }, [])

  return (
      <QueryClientProvider client={queryClient}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SideBar
            selectedGenreId={selectedGenreId}
            buttonClickCallback={handleClickButton}
          />

          <Content
            selectedGenre={selectedGenre}
            movies={movies}
          />
        </div>
        <ReactQueryDevtools />
      </QueryClientProvider>
  )
}