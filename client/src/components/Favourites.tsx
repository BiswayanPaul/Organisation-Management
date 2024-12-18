interface FavouritesProps {
  darkMode: boolean;
}

const Favourites = ({ darkMode }: FavouritesProps) => {
  const favorites = ["Redwhale Design", "Mobile App Mockup", "UI Design Review"];

  return (
      <div className="p-4">
          <h2 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              Favourites
          </h2>
          <ul className="space-y-2">
              {favorites.map((fav, idx) => (
                  <li
                      key={idx}
                      className={`text-sm hover:text-gray-400 ${
                          darkMode ? "text-gray-300" : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                      {fav}
                  </li>
              ))}
          </ul>
      </div>
  );
};

export default Favourites;
