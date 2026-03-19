import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import "./style.css";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const signOut = useAuthStore((state) => state.signOut);

  function toggleNav() {
    animateSlider();
    const burgerButton = document.getElementById("burger");
    burgerButton.classList.toggle("is-active");
  }

  function animateSlider() {
    const slider = document.getElementsByClassName("slider")[0];
    document.getElementById("root").style.overflow = "hidden";
    slider.classList.toggle("active");

    const list = document.getElementsByClassName("list")[0];
    list.childNodes.forEach((e, index) => {
      if (e.style.animation) e.style.animation = "";
      else
        e.style.animation = `listItemFade 0.5s ease forwards ${
          index / 5 + 0.3
        }s`;
    });
  }

  return (
    <nav className="nav-wrapper">
      <div id="burger" className="ico-btn" onClick={toggleNav}>
        <span className="ico-btn__burger"></span>
      </div>

      <div id="slider" className="slider">
        <ul className="list">
          <Link onClick={toggleNav} to="/movies">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link onClick={toggleNav} to="/login">
                Login
              </Link>

              <Link onClick={toggleNav} to="/register">
                Register
              </Link>
            </>
          ) : (
            <Link
              onClick={() => {
                toggleNav();
                signOut();
              }}
              to="/movies"
            >
              Log out
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
