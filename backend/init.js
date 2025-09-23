require("dotenv").config();
const mongoose = require("mongoose");
const Alumni = require("./models/alumni");

const alumniData = [
  {
    name: "Y. Krishna Kumar",
    email: "Krishna.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=1",
    batch: "2020",
    department: "Computer Science",
    currentCompany: "Google",
    role: "Senior Software Engineer",
    location: "Mumbai, India",
    linkedIn: "https://linkedin.com/in/KrishnaKumar",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Python",
      "TensorFlow",
    ],
    experience: [
      {
        company: "Google",
        role: "Senior Software Engineer",
        duration: "2022 - Present",
        description:
          "Leading frontend development for Google Cloud Console, integrating AI-based analytics dashboards",
      },
      {
        company: "Microsoft",
        role: "Software Engineer",
        duration: "2020 - 2022",
        description:
          "Developed features for Microsoft Teams with a focus on backend integration and AI-assisted productivity tools",
      },
    ],
    achievements: [
      {
        title: "Best Project Award",
        description:
          "Won best project award for AI-powered healthcare solution combining backend ML with interactive frontend",
        year: "2020",
      },
      {
        title: "Dean's List",
        description: "Maintained 9.5+ GPA throughout college",
        year: "2019",
      },
    ],
    projects: [
      {
        title: "AI Healthcare Assistant",
        description:
          "Developed a full-stack AI-powered healthcare assistant with React frontend and Python/TensorFlow backend for remote diagnosis",
        technologies: ["React", "Node.js", "Python", "TensorFlow"],
        link: "https://github.com/Krishnakumar/ai-healthcare",
      },
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: true,
  },
  {
    name: "Rahul Sharma",
    email: "rahulsharma.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=2",
    batch: "2019",
    department: "Mechanical Engineering",
    currentCompany: "TATA Motors",
    role: "Mechanical Engineer",
    location: "Jamshedpur, Jharkhand, India",
    linkedIn: "https://linkedin.com/in/rahulsharma",
    skills: ["CAD", "3D Modeling", "Simulation", "CFD"],
    experience: [
      {
        company: "TATA Motors",
        role: "Mechanical Engineer",
        duration: "2020 - Present",
        description:
          "Design and optimize automotive components for passenger and electric vehicles",
      },
    ],
    achievements: [
      {
        title: "Innovation Award",
        description: "Created patented cooling system for battery packs",
        year: "2021",
      },
    ],
    projects: [
      {
        title: "EV Battery Cooling System",
        description:
          "Developed enhanced cooling design improving battery life and efficiency in EVs",
        technologies: ["CAD", "CFD", "3D Modeling"],
        link: "https://github.com/rahulsharma/ev-cooling",
      },
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: false,
  },
  {
    name: "Anitha Reddy",
    email: "anitha.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=3",
    batch: "2018",
    department: "Business Administration",
    currentCompany: "Infosys",
    role: "Marketing Manager",
    location: "Delhi, India",
    linkedIn: "https://linkedin.com/in/anithareddy",
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    experience: [
      {
        company: "Infosys",
        role: "Marketing Manager",
        duration: "2019 - Present",
        description: "Lead digital campaigns globally",
      },
    ],
    achievements: [
      {
        title: "Best Campaign Award",
        description: "Awarded for successful global product launch campaign",
        year: "2020",
      },
    ],
    projects: [
      {
        title: "Global Product Launch",
        description: "Managed marketing campaign reaching 10M+ audience",
        technologies: ["Google Analytics", "SEO Tools"],
        link: "https://linkedin.com/campaign/launch",
      },
    ],
    isAvailableForMentorship: false,
    isAvailableForReferral: true,
  },
  {
    name: "Vikram Vasudev",
    email: "vikram.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=4",
    batch: "2021",
    department: "Electrical Engineering",
    currentCompany: "Intel",
    role: "Hardware Engineer",
    location: "Bengaluru, Karnataka, India",
    linkedIn: "https://linkedin.com/in/vikramvasudev",
    skills: ["Embedded Systems", "Circuit Design", "C++"],
    experience: [
      {
        company: "Intel",
        role: "Hardware Engineer",
        duration: "2021 - Present",
        description: "Working on next-gen processor design",
      },
    ],
    achievements: [
      {
        title: "Employee of the Year",
        description: "Recognized for excellence in design innovation",
        year: "2023",
      },
    ],
    projects: [
      {
        title: "Processor Architecture",
        description: "Designed core modules for new CPU architecture",
        technologies: ["Verilog", "Vivado"],
        link: "https://github.com/vikramvasudev/cpu-design",
      },
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: false,
  },
  {
    name: "Muntaz Begum",
    email: "muntaz.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=5",
    batch: "2017",
    department: "Civil Engineering",
    currentCompany: "L&T Construction",
    role: "Project Manager",
    location: "Hyderabad, India",
    linkedIn: "https://linkedin.com/in/muntaz",
    skills: ["Project Management", "AutoCAD", "Structural Design"],
    experience: [
      {
        company: "L&T Construction",
        role: "Project Manager",
        duration: "2018 - Present",
        description: "Managing high-rise building projects",
      },
    ],
    achievements: [
      {
        title: "Safety Excellence Award",
        description: "Recognized for outstanding safety record on site",
        year: "2022",
      },
    ],
    projects: [
      {
        title: "High-Rise Wing",
        description: "Managed construction of 25-floor residential tower",
        technologies: ["AutoCAD", "Primavera"],
        link: "https://linkedin.com/projects/muntazbegum",
      },
    ],
    isAvailableForMentorship: false,
    isAvailableForReferral: true,
  },
  {
    name: "Kota Venkat",
    email: "Venkat.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=6",
    batch: "2019",
    department: "Computer Science",
    currentCompany: "Facebook",
    role: "Data Scientist",
    location: "Menlo Park, CA, USA",
    linkedIn: "https://linkedin.com/in/kotavenkat",
    skills: ["Python", "R", "Machine Learning", "Data Analysis"],
    experience: [
      {
        company: "Facebook",
        role: "Data Scientist",
        duration: "2019 - Present",
        description:
          "Analyzing user behavior and improving recommendation algorithms",
      },
    ],
    achievements: [
      {
        title: "Publication in Data Science Journal",
        description: "Published paper on social network analysis",
        year: "2022",
      },
    ],
    projects: [
      {
        title: "Social Network Analysis",
        description: "Analyzed social graphs to optimize ad targeting",
        technologies: ["Python", "NetworkX", "Pandas"],
        link: "https://github.com/kotavenkat/social-network-analysis",
      },
    ],
    isAvailableForMentorship: true,
    isAvailableForReferral: true,
  },
  {
    name: "Puja Dikshith",
    email: "puja.alumni@email.com",
    profileImage: "https://i.pravatar.cc/150?img=7",
    batch: "2018",
    department: "Electrical Engineering",
    currentCompany: "Siemens",
    role: "Electrical Engineer",
    location: "Hyderabad, Telangana, India",
    linkedIn: "https://linkedin.com/in/pujadikshith",
    skills: ["Circuit Design", "Power Systems", "MATLAB"],
    experience: [
      {
        company: "Siemens",
        role: "Electrical Engineer",
        duration: "2018 - Present",
        description: "Working on power distribution automation",
      },
    ],
    achievements: [
      {
        title: "Innovation in Power Automation",
        description:
          "Introduced automation techniques reducing downtime by 30%",
        year: "2021",
      },
    ],
    projects: [
      {
        title: "Power Distribution Automation",
        description: "Automated control systems for power grids",
        technologies: ["MATLAB", "Simulink"],
        link: "https://github.com/pujadikshith/powerautomation",
      },
    ],
    isAvailableForMentorship: false,
    isAvailableForReferral: false,
  },
];

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(async () => {
    console.log("✅ Connected to DB");

    // Clear existing alumni data
    await Alumni.deleteMany({});
    console.log("🗑️ Cleared existing alumni");

    // Insert mock alumni
    await Alumni.insertMany(alumniData);
    console.log("✅ Mock alumni data inserted");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
