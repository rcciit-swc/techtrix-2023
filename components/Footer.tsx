import Link from "next/dist/client/link";

const Footer = () => {
  return (
    <footer className="mt-6 w-full rounded-lg p-6 shadow md:flex md:items-center md:justify-between md:px-12 text-white">
      <span className="text-min-sm text-accent sm:text-center md:text-max-sm">
        © 2023
        <a href="#" className="neon">
          Techtrix™
        </a>
        . All Rights Reserved.
      </span>

      <main className="mt-3 md:mt-0">
        <p className="text-min-sm font-medium text-gray md:text-max-sm">
          Made with <span className="text-red-600">&hearts;</span> by Techtrix
          tech team
        </p>
      </main>

      <ul className="mt-3 flex flex-wrap items-center text-min-sm text-text md:mt-0 md:text-max-sm">
        <li>
          <a
            href="https://www.facebook.com/techtrix.rcciit"
            target="_blank"
            rel="noreferrer"
            className="mr-4 neon md:mr-6"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/techtrix.rcciit.official/"
            className="mr-4 neon md:mr-6"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </li>
        <li>
          <Link href="/#contact" className="neon">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
