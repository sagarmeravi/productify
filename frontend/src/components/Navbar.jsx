import { Link } from "react-router";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import {
  ShoppingBagIcon,
  PlusIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import ThemeSelector from "./ThemeSelector";

function Navbar() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-2 z-50 mt-2 px-2">
      <div className="bg-white/10 backdrop-blur shadow-sm rounded-2xl md:rounded-full">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5 text-primary" />
            <span className="text-lg font-bold font-mono uppercase tracking-wider">
              Productify
            </span>
          </Link>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeSelector />
            {isSignedIn ? (
              <>
                <Link to="/create" className="btn btn-primary btn-sm gap-1">
                  <PlusIcon className="size-4" />
                  New Product
                </Link>
                <Link to="/profile" className="btn btn-ghost btn-sm gap-1">
                  <UserIcon className="size-4" />
                  Profile
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary btn-sm">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden btn btn-ghost btn-sm"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {open && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
            <ThemeSelector />

            {isSignedIn ? (
              <>
                <Link
                  to="/create"
                  className="btn btn-primary btn-sm gap-1"
                  onClick={() => setOpen(false)}
                >
                  <PlusIcon className="size-4" />
                  New Product
                </Link>

                <Link
                  to="/profile"
                  className="btn btn-ghost btn-sm gap-1"
                  onClick={() => setOpen(false)}
                >
                  <UserIcon className="size-4" />
                  Profile
                </Link>

                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="btn btn-ghost btn-sm w-full">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="btn btn-primary btn-sm w-full">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
