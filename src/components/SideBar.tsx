import {memo, useState} from 'react'
import { Button } from "./Button";
import {useQuery} from "react-query";
import {api} from "../services/api";
import {GenreResponseProps} from "../App";

interface SideBarProps {
  selectedGenreId: number;
  buttonClickCallback: (args: any) => void;
}


export function SideBar({
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useQuery(['genres'],  () => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data)
    });
  })

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}

/*export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.genres, nextProps.genres);
})
 */