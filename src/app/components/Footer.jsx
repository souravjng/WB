import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#012d66] text-white py-8 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      <div>
        <h3 className="font-bold text-lg mb-2">Filters</h3>
        <ul>
          <li className="mb-1 cursor-pointer hover:underline">All</li>
          <li className="mb-1 cursor-pointer hover:underline">Electronics</li>
        </ul>
        <p className="text-xs mt-4">© 2024 American</p>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-2">About Us</h3>
        <ul>
          <li className="mb-1 cursor-pointer hover:underline">About Us</li>
          <li className="mb-1 cursor-pointer hover:underline">Contact</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-400 hover:text-white">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-blue-400 hover:text-white">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-blue-400 hover:text-white">
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
