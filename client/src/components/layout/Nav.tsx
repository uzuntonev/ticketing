import React from 'react';
import Link from 'next/link';
export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Ticketing.dev</a>
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link href="/">
              <a className="nav-link">
                Home <span className="sr-only">(current)</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/auth/signin">
              <a className="nav-link">Sign in</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/auth/signup">
              <a className="nav-link">Sign up</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
