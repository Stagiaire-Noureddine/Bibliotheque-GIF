import './Header.scss';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Header = () => {
  return (
    <header className="Header">
        <h1>Pick my GIFs</h1>
        <h2>Un outil te permettant de chercher tes GIF favoris et de les sauvegarder pour plus tard !</h2>
        <SignInForm/>
        <SignUpForm/>
    </header>
  );
}

export default Header;
