import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { AuthContext } from '../../context/auth-context';

export default function AppNavBar({ currentUser }) {
  const { isAuth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!!currentUser) {
      setAuth({ isAuth: !!currentUser, currentUser })
    } else {
      setAuth({ isAuth: false, currentUser: null })
    };
  }, [])

  const links = [
    !isAuth && { label: 'Sign In', href: '/auth/signin' },
    !isAuth && { label: 'Sign Up', href: '/auth/signup' },
    isAuth && { label: 'Sign Out', href: '/auth/signout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
}
