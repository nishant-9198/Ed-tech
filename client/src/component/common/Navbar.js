import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  // state for handling mobile menu (open/close)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // fetch category links for catalog dropdown
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  // Catalog dropdown
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                      ? "text-yellow-25"
                      : "text-richblack-25"
                      }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    {/* Dropdown menu */}
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            <p className="text-sm text-richblack-400">
                              {Array.isArray(subLink.course) && subLink.course.length > 0
                                ? subLink.name
                                : `${subLink.name} (No Courses)`}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  // Normal links
                  <Link to={link.path}>
                    <p
                      className={`${matchRoute(link.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop: Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {/* cart icon for non-instructor */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {/* if not logged in → show login/signup */}
          {token === null && (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          )}
          {/* if logged in → show profile dropdown */}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Hamburger Icon (only visible on mobile) */}
        <button className="mr-4 md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* --------------------- Mobile Menu --------------------- */}
      {/* Slide-in full screen menu (with background blur) */}
      <div
        className={`fixed inset-0 z-[2000] flex flex-col bg-richblack-900/95 backdrop-blur-md transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Top bar inside mobile menu */}
        <div className="flex justify-between items-center p-6">
          <img src={logo} alt="Logo" width={140} />
          {/* Close button */}
          <button onClick={() => setMobileMenuOpen(false)}>
            <AiOutlineClose fontSize={28} className="text-richblack-100" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-6 text-lg text-richblack-25 px-6">
          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                // expandable catalog in mobile
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer">
                    {link.title}
                    <BsChevronDown className="group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    {loading ? (
                      <p>Loading...</p>
                    ) : subLinks.length ? (
                      subLinks.map((subLink, i) => (
                        <Link
                          key={i}
                          to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subLink.name}
                        </Link>
                      ))
                    ) : (
                      <p>No Courses Found</p>
                    )}
                  </div>
                </details>
              ) : (
                <Link to={link.path} onClick={() => setMobileMenuOpen(false)}>
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer actions inside mobile menu */}
        <div className="mt-auto flex flex-col gap-4 p-6">
          {/* cart link */}
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <AiOutlineShoppingCart className="text-xl" />
              Cart ({totalItems})
            </Link>
          )}
          {/* login / signup OR profile */}
          {token === null ? (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-2 text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
