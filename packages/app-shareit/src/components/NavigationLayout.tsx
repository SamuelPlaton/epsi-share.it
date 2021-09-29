import {FunctionComponent} from "react";
import { useHistory } from "react-router-dom";

export interface Props {
  title?: string;
}

const NavigationLayout: FunctionComponent<Props> = ({ children, title }) => {
  const history = useHistory();
  const isUserActive = localStorage.getItem('auth');

  const handleLogout = () => {
    localStorage.removeItem('auth');
    history.replace('/');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="h-16 shadow-md w-full mb-4 flex items-center bg-white">
        <button className="m-4" onClick={() => history.goBack()}>
          <img src="back.png" alt="back button" className="relative h-8 w-8" />
        </button>
        <p className="text-lg font-semibold flex-grow text-center">{title}</p>
        {isUserActive && (
          <button className="m-4" onClick={handleLogout}>
            <img src="logout.png" alt="back button" className="relative h-8 w-8" />
          </button>
        )}
      </header>
      { children }
    </div>
  );
}

export default NavigationLayout;
