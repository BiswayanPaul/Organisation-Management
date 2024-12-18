import { Link } from "react-router-dom";

interface MenuProps {
  darkMode: boolean;
}

const Menu = ({ darkMode }: MenuProps) => {
  const menuItems = [
    { name: "My Tasks", path: "/tasks", emoji: "📝" },
    { name: "Inbox", path: "/inbox", emoji: "📥" },
    { name: "Projects", path: "/projects", emoji: "📁" },
    { name: "Organisations", path: "/organisations", emoji: "🏢" },
    { name: "Meetings", path: "/meetings", emoji: "📅" },
  ];

  return (
    <div className="p-4">
      <h1 className={`font-bold text-lg mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
        Menu
      </h1>
      <ul className="space-y-3">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-md transition duration-200 ${
                darkMode
                  ? "hover:bg-gray-600 text-gray-200"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span>{item.emoji}</span> 
              <span>{item.name}</span> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
