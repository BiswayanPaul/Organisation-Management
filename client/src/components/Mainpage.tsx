import { IOrganisation } from "@/types/organisation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface MainpageProps {
    darkMode: boolean;
    id: string;
}

// Task List Data
const tasks = [
    {
        title: "R&D for Banking Mobile App",
        color: "bg-red-200",
        textColor: "text-red-600",
        link: "/tasks/banking-rd",
    },
    {
        title: "Create Signup Page",
        color: "bg-purple-200",
        textColor: "text-purple-600",
        link: "/tasks/signup",
    },
    {
        title: "Design Dashboard UI",
        color: "bg-blue-200",
        textColor: "text-blue-600",
        link: "/tasks/dashboard-ui",
    },
    {
        title: "Fix Login Bug",
        color: "bg-green-200",
        textColor: "text-green-600",
        link: "/tasks/login-bug",
    },
    {
        title: "Optimize Database Queries",
        color: "bg-yellow-200",
        textColor: "text-yellow-600",
        link: "/tasks/database-optimize",
    },
    {
        title: "Add User Analytics Feature",
        color: "bg-pink-200",
        textColor: "text-pink-600",
        link: "/tasks/analytics",
    },
];

// Dummy Organization Data


const Mainpage = ({ darkMode,id }: MainpageProps) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
    const [newOrgName, setNewOrgName] = useState<string>('');
    const [newOrgDescription, setNewOrgDescription] = useState<string>('');
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);  // Step 1: State for popup visibility
    const [organizations, setOrganizations] = useState<IOrganisation[]>([]);
    const navigate = useNavigate()
    // Duplicate slides for seamless looping
    const slides = [
        tasks[tasks.length - 1], // Last slide duplicated at the start
        ...tasks,
        tasks[0], // First slide duplicated at the end
    ];

    // Move to the next slide
    const nextSlide = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    // Move to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prev) => prev - 1);
    };

    // Reset index when reaching the duplicated slides
    useEffect(() => {
        if (currentIndex === slides.length - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }, 50);
        } else if (currentIndex === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(slides.length - 2);
            }, 50);
        }

        const resetTransition = setTimeout(() => setIsTransitioning(true), 100);
        return () => clearTimeout(resetTransition);
    }, [currentIndex, slides.length]);

    useEffect(()=>{
        const fetchOrg = async () => {
            try {
                const response = await fetch(`http://localhost:3000/organisation/getOrganisations/${id}`,{
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json",
                        'authorization': `Bearer ${Cookies.get("token")}`,
                    }
                });
                const data = await response.json();
                if(response.ok){
                    setOrganizations(data);
                }else{
                    console.error('Failed to fetch organizations:', data.message);
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchOrg();
    },[id])

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleOrgClick = (org: string) => {
        setSelectedOrganization((prevOrg) => (prevOrg === org ? null : org));
    };

    const handleCreateOrganization = async () => {
        const orgData = {
            name: newOrgName,
            description: newOrgDescription,
            
        };

        try {
            const response = await fetch('http://localhost:3000/organisation/createOrganisation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${Cookies.get("token")}`, // Include token if required
                },
                body: JSON.stringify(orgData),
            });

            const data = await response.json();
            if (response.ok) {
                // Handle successful organization creation
                toast.success('Organization created successfully!');
                setTimeout(() => {
                    navigate(0)
                }, 100);
                setNewOrgName('');
                setNewOrgDescription('');
            } else {
                // Handle error response from the server
                alert(data.message || 'Failed to create organization');
            }
        } catch (error) {
            console.error('Error creating organization:', error);
            alert('Error creating organization');
        }
    };

    return (
        <div
            className={`w-full flex-1 ${darkMode ? "bg-gray-900" : "bg-white"
                } px-20 py-5 overflow-hidden transition duration-300`}
        >
            <h1
                className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"
                    }`}
            >
                Monthly Tasks
            </h1>

            {/* Carousel Container */}
            <div className="relative w-full max-w-2xl mx-auto mb-8">
                {/* Task Card Container */}
                <div
                    className={`flex transition-transform ${isTransitioning ? "duration-500 ease-in-out" : ""
                        }`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((task, index) => (
                        <Link
                            key={index}
                            to={task.link}
                            className={`min-w-full p-6 rounded-lg shadow-lg flex items-center justify-center 
                  hover:scale-105 transition duration-300 ease-in-out 
                  ${task.color} ${task.textColor}`}
                        >
                            <span className="font-semibold text-xl">{task.title}</span>
                        </Link>
                    ))}
                </div>

                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-3 rounded-full hover:bg-gray-700 transition"
                >
                    &#8592;
                </button>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-3 rounded-full hover:bg-gray-700 transition"
                >
                    &#8594;
                </button>
            </div>

            {/* Add Organization Button */}
            <div className="flex justify-center mb-6">
                <button
                    className={`px-6 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600`}
                    onClick={() => setIsPopupVisible(true)} // Step 2: Show popup on button click
                >
                    Add Organization
                </button>
            </div>

            {/* Organizations Section */}
            <div>
                <h2
                    className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"
                        }`}
                >
                    Your Organizations
                </h2>
                <SimpleBar style={{ maxHeight: 250 }}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {organizations.map((org, index) => (
                            <div
                                key={index}
                                className={`p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center
            transition-transform transform hover:scale-105 duration-300 ease-in-out
            ${selectedOrganization === org.name ? "bg-blue-600 text-white" : "bg-white text-gray-800"}
        `}
                            >
                                {/* Icon Section */}
                                <div className="w-12 h-12 mb-3 flex items-center justify-center bg-gray-100 rounded-full shadow-md">
                                    {/* Organization Initial (First Letter) */}
                                    <span className="text-2xl font-bold text-blue-500">
                                        {org.name.charAt(0)}
                                    </span>
                                </div>

                                {/* Organization Name */}
                                <h3 className="font-semibold text-lg mb-2 text-center">
                                    {org.name}
                                </h3>

                                {/* Buttons Section */}
                                <div className="w-full flex justify-between mt-2">
                                    {/* Select Button */}
                                    <button
                                        onClick={() => handleOrgClick(org.name)}
                                        className={`px-4 py-2 rounded-md font-medium 
                    ${selectedOrganization === org.name
                                                ? "bg-blue-800 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"}
                    transition duration-300 ease-in-out
                `}
                                    >
                                        {selectedOrganization === org.name ? "Selected" : "Select"}
                                    </button>

                                    {/* Visit Organization Button */}
                                    <Link
                                        to={`/${org.name}`}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 
                font-medium transition duration-300 ease-in-out"
                                    >
                                        Visit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </SimpleBar>
            </div>

            {/* Popup Form */}
            {isPopupVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Create New Organization</h2>
                        <div className="mb-4">
                            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">Organization Name</label>
                            <input
                                type="text"
                                id="orgName"
                                value={newOrgName}
                                onChange={(e) => setNewOrgName(e.target.value)}
                                className="w-full p-2 border border-gray-300 text-black rounded-md"
                                placeholder="Enter organization name"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="orgDescription" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="orgDescription"
                                value={newOrgDescription}
                                onChange={(e) => setNewOrgDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 text-black rounded-md"
                                placeholder="Enter organization description"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsPopupVisible(false)}  // Step 3: Close popup without saving
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateOrganization}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mainpage;
