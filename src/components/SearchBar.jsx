import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-10 mb-8">
      <div className="relative">

        <Search
          size={20}
          className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pesquisar produtos..."
          className="
            w-full
            border
            border-gray-300
            rounded-full
            py-4
            pl-14
            pr-6
            text-lg
            outline-none
            focus:border-black
            transition
          "
        />

      </div>
    </section>
  );
}