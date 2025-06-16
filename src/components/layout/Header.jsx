import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

import { apiClient } from "@/utils/apiClient";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('accessToken');

  const handleLogout = async () => {
          await apiClient.post('/api/user/logout');
          localStorage.removeItem('accessToken');
          alert('로그아웃이 완료되었습니다.');
          navigate('/');
  };

  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container px-5">
          <Link className="navbar-brand" to="/">The Movie</Link>

          <div className="search-box">
            <form action="/movie/search">
              <button className="btn-search"><i className="fas fa-search"></i></button>
              <input
                type="text"
                className="input-search"
                name="query"
                placeholder="영화 검색"
              />
            </form>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">Index</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li> */}

              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              ) : (
                <>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={() => {/* logout 함수 */}}>
                    사용자명
                  </a>
                </li>
                 <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none' }}>
                          로그아웃
                      </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;