import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import AnimatedBackground from './AnimatedBackground';
import HighlightsCarousel from './HighlightsCarousel';
import FlippableCarousel from './FlippableCarousel';
import FlippableRoadmapCard from "./FlippableRoadmapCard"; // Import above
import VerticalRoadmap from "./VerticalRoadmap";
import Contact from "./Contact";
import Header from './Header';
import FloatingCertifications from './FloatingCertification';



// --- Data for the portfolio ---
const portfolioData = {
  header: {
    name: 'Narmatha Jayasankar',
    subtitle: 'MSc Business Analytics, University of Edinburgh',
    linkedin: 'https://www.linkedin.com/in/narmatha-jayashankar/',
  },
  highlights: [
    {
      title: "MSc Business Analytics, University of Edinburgh",
      subtitle: "Completed an MSc in Business Analytics at the University of Edinburgh, gaining expertise in data-driven decision-making, predictive modelling, and strategic analytics.",
      paragraph: "During my MSc, I explored the intersection of data, technology, and strategy to transform complex datasets into actionable insights. The program strengthened my proficiency in statistical analysis, machine learning, and data visualization while deepening my understanding of business intelligence and operational optimization. Through applied projects and collaborative research, I honed my ability to translate analytical outcomes into strategic recommendations that drive measurable business impact.",
      imageUrl: "images/L1.jpeg"
    },
    {
      title: "Decision Analytics Challenge",
      subtitle: "As a project coordinator I participated in the Decision Analytics Challenge hosted by Edinburgh Innovations at the University of Edinburgh Business School.",
      paragraph: "The Decision Analytics Challenge was an intense and rewarding 2.5-day experience that combined strategic thinking, teamwork, and rapid problem-solving. As the Project Coordinator, I managed project timelines, coordinated tasks, and ensured clear communication within a multidisciplinary team. The event deepened my understanding of decision analytics through targeted workshops and hands-on application, while also strengthening my ability to translate insights into actionable recommendations.",
      imageUrl: "images/L2.jpeg"
    },
    {
      title: "Winner - Most Compelling Pitch",
      subtitle: "Collaborated with a dynamic team to identify a real-world problem, design a scalable solution, and pitch our idea to investors, earning the Most Compelling Pitch award.",
      paragraph: "The Techstars Startup Weekend was a transformative experience that immersed me in the fast-paced world of entrepreneurship. Over three days, my team and I developed an innovative solution to a real-world challenge, guided by mentors and evaluated by investors. Beyond the competition, I gained hands-on exposure to startup ideation, lean validation, and investor engagement, while connecting with passionate peers and industry experts.",
      imageUrl: "images/L3.jpeg"
    },
    {
      title: "Edinburgh Award",
      subtitle: "Earned the Edinburgh Award in recognition of personal and professional growth across three focus areas: Enterprising Behaviour, Analytical Thinking, and Leadership.",
      paragraph: "The Edinburgh Award journey was a deeply transformative experience that reshaped how I think, lead, and take initiative. By focusing on Enterprising Behaviour, Analytical Thinking, and Leadership, I pushed myself to embrace challenges and learn from every opportunity—from pitching an award-winning idea at Techstars Startup Weekend to analyzing complex problems in the Decision Analytics Challenge. Through workshops, mentoring sessions, and team leadership experiences, I discovered the value of purposeful innovation, active listening, and empowering others.",
      imageUrl: "images/L4.jpeg"
    },
    {
      title: "Power BI",
      subtitle: "Successfully completed the Data Analyst in Power BI career track on DataCamp, encompassing 17 courses and over 50 hours of advanced, hands-on training.",
      paragraph: "Completing the Data Analyst in Power BI program on DataCamp marked a key milestone in my analytics journey. Over 50 hours of intensive learning across 17 courses honed my proficiency in data transformation, advanced DAX functions, and dashboard development while deepening my understanding of data storytelling and trend analysis. Through case studies in HR Analytics and Customer Churn, I gained practical experience translating analytical outcomes into business strategies.",
      imageUrl: "images/L5.jpeg"
    },
    {
      title: "Project Judge in Symposium",
      subtitle: "Honoured to return to my college, Easwari Engineering College, as a Project Judge for their annual symposium.",
      paragraph: "Interacting with bright young innovators and reviewing their projects reminded me of the creativity, drive, and curiosity that fuel engineering learning. Selecting winners among such passionate teams was both challenging and inspiring, as each idea demonstrated teamwork and problem-solving at its best. Beyond the event, the heartfelt welcome from faculty and students made it even more special—a proud moment to give back to the institution that laid the foundation for my journey.",
      imageUrl: "images/L6.jpeg"
    }

  ],
  
  projects: [
    {
      title: "Detecting Covid 19 from CT images using Autoencoders",
      subtitle: "Leveraged autoencoders for data augmentation and a CNN-based classifier to distinguish COVID-19 cases from other lung infections. Achieved an accuracy of 83.33, demonstrating the potential of feature extraction and regularization in improving diagnostic performance.",
      paragraph: "This research focused on enhancing the accuracy of COVID-19 detection from CT scan images through deep learning and autoencoder-based feature extraction. Recognizing the limitations of small datasets and overlapping image patterns between COVID-19 and other infections, we employed a 22 layer autoencoder architecture for data augmentation and dimensionality reduction. Three autoencoders were trained to extract high-level image features, which were then used as input to a CNN classifier with dropout and kernel regularization to prevent overfitting. The optimized model achieved an average accuracy of 83.33, precision of 77.77, recall of 90.0, and an F1-score of 83.44, proving effective in differentiating COVID-19 cases.",
      imageUrl: "images/P1.jpg"
    },
    {
      title: "Dissertation – Assessing the Validity of LLM Survey Simulations",
      subtitle: "Evaluated whether GPT-4.1 and GPT-4o can replicate human survey responses using advanced prompt engineering and statistical modeling.",
      paragraph: "Using GPT-4.1 and GPT-4o, I generated responses to an environmental attitudes survey with zero-shot, few-shot, and role-playing prompts. I benchmarked simulated data against a human dataset using ANOVA, regression, factor analysis, and distributional similarity metrics like cosine similarity and Jaccard index, while also assessing demographic patterns through chi-squared tests. Results highlighted that prompt design and respondent age significantly affect simulation accuracy, with role-playing and zero-shot prompts producing the most realistic outputs.",
      imageUrl: "images/p2.png"
    },
    {
      title: "Customer Churn Analysis Visualization using Python",
      subtitle: "Performed in-depth analysis to identify drivers of customer churn and generate actionable insights. Leveraged Python, EDA, and interactive visualizations to highlight trends, predict high-risk segments, and inform retention strategies.",
      paragraph: "I analyzed customer data to uncover key churn drivers such as tenure, usage frequency, and subscription type. Visualizations revealed high-risk segments and patterns, enabling targeted retention strategies that could reduce churn by identifying actionable intervention points. Using Python libraries like pandas, matplotlib, seaborn, and plotly, I transformed raw data into clear insights that support data-driven decision-making. This project illustrates how analytics and visualization combine to inform strategy, enhance customer engagement, and drive measurable business impact.",
      imageUrl: "images/P3.jpg"
    },
    {
      title: "Route Optimization for Flood Relief Measures",
      subtitle: "Developed mathematical programming solutions for optimizing relief distribution routes and warehouse placement in flood-affected regions. Implemented prescriptive models using GAMS to minimize delivery time and maximize resource efficiency in humanitarian logistics.",
      paragraph: "I developed mathematical programming models to determine efficient delivery routes and strategic warehouse locations, aiming to minimize transportation time and costs while maximizing coverage and responsiveness. The models incorporated constraints such as road accessibility, vehicle capacities, and priority of relief items. Results demonstrated how data-driven optimization can enhance disaster response, ensuring timely delivery of essential resources to affected communities.",
      imageUrl: "images/P4.png"
    },
    {
      title: "Cost Nutrient Optimization in Food Supplies",
      subtitle: "Applied prescriptive analytics and mathematical programming to optimize both cost and nutritional value in food supply planning. Developed models using GAMS to balance budget constraints with dietary requirements, ensuring efficient and nutritious food distribution.",
      paragraph: "This project focused on prescriptive analytics in food supply management, using mathematical programming in GAMS to optimize nutrient intake while minimizing costs. The models incorporated dietary constraints, nutritional targets, and budget limitations to generate optimal food supply plans. By evaluating trade-offs between cost and nutritional content, the approach provided data-driven recommendations for efficient and healthy food distribution.",
      imageUrl: "images/P5.jpg"
    },
    {
      title: "Business Strategy Development for Decision Analytics",
      subtitle: "Designed a comprehensive business strategy leveraging decision analytics to guide data-driven decision-making. Integrated data insights, predictive models, and scenario analysis to develop actionable strategies that align with organizational goals.",
      paragraph: "I conducted data analysis, scenario planning, and predictive modeling to identify opportunities, mitigate risks, and optimize resource allocation. Key deliverables included strategic recommendations, KPI frameworks, and actionable insights derived from analytical findings. The project demonstrates how decision analytics can drive business strategy, enabling organizations to align operational decisions with strategic objectives and achieve measurable performance improvements.",
      imageUrl: "images/P6.jpg"
    },
    {
      title: "Coffee Shop Simulation using Arena",
      subtitle: "Developed a discrete-event simulation of a coffee shop using Arena to optimize operations and improve customer service.",
      paragraph: "The simulation captured customer arrivals, service times, and resource allocation, enabling analysis of queue lengths, waiting times, and employee utilization. Scenario testing allowed assessment of strategies such as staff scheduling, equipment allocation, and process changes to improve efficiency and customer satisfaction. The project demonstrates how simulation analytics can support data-driven decision-making in service operations, translating operational data into actionable insights for better resource management and customer experience.",
      imageUrl: "images/P7.jpg"
    }
  ],
  
   competencies: [
    {
      title: "AI & Data-Driven Process Automation",
      icon: "🤖"
    },
    {
      title: "Business Intelligence Dashboards",
      icon: "📊"
    },
    {
      title: "Predictive Analytics & Machine Learning",
      icon: "🔍"
    },
    {
      title: "Data Storytelling & Communication",
      icon: "🗣️"
    },
    {
      title: "Optimization & Simulation Modelling",
      icon: "🛠️"
    },
    {
      title: "Project Leadership & Collaboration",
      icon: "🤝"
    },
    {
      title: "Stakeholder Engagement",
      icon: "🧑‍💼"
    },
    {
      title: "Strategic Decision Support",
      icon: "💡"
    },
    {
      title: "Business Process Modeling & Optimization",
      icon: "🏗️"
    }
  ],
  
   roadmap : [
    {
      period: "Apr 2025 – May 2025",
      title: "Prompt Engineer",
      company: "Moore Cooperative",
      icon: "💻",
      type: "work",
      front: [
        "Developed 4 GPT-based automation pipelines for salary extraction from unstructured PDFs (confidence: 84–97%)."
      ],
      back: [
        "Developed 4 automated pipelines utilizing LLMs (GPT Models) to extract, structure, and map salary information from unstructured PDF documents, including confidence scoring for AI-driven role matching. This resulted in a confidence score ranging from 84% to 97%.",
        "Extracted & structured salary data with LLMs and confidence scoring for role matching.",
        "Earned LinkedIn Prompt Engineering Certificate."
      ]
    },
    {
      period: "Feb 2025 – Aug 2025",
      title: "Student Ambassador",
      company: "Yugo",
      icon: "🏠",
      type: "work",
      front: [
        "Managed front desk operations & addressed student enquiries."
      ],
      back: [
        "Plan, coordinate, and execute community events that foster inclusive environments and enhance student well-being, directly supporting personal and professional development of diverse resident populations.",
        "Work closely with accommodation management to identify community needs and develop targeted interventions that promote engagement and belonging."
      ]
    },
    {
      period: "Sep 2024 – Aug 2025",
      title: "MSc Business Analytics",
      company: "University of Edinburgh",
      icon: "📚",
      type: "education",
      front: [
        "Specialized in analytics, predictive modeling, mathematical programming."
      ],
      back: [
        "Advanced Analytical Capabilities: Mastered predictive and prescriptive analytics, mathematical programming, and Python programming to effectively analyze complex organizational challenges and develop evidence-based solutions.",
        "Specialized Research Skills: Developed expertise in Web and Social Network Analytics, Humanitarian Logistics, and Business Simulation Modeling, providing strong foundation for understanding diverse research methodologies and academic disciplines."
      ]
    },
    {
      period: "Aug 2023 – Sept 2024",
      title: "Senior Software Analyst",
      company: "Bounteous",
      icon: "📈",
      type: "work",
      front: [
        "Client engagement, analytics strategy, end-to-end audits."
      ],
      back: [
        "Strategic Program Leadership: Led end-to-end client engagement lifecycle for multiple enterprise organizations, managing complex stakeholder relationships and delivering customized solutions that improved performance by 18% and retention by 20%.",
        "Cross-functional Collaboration: Partnered with diverse teams including technical developers, business leaders, and external stakeholders to identify requirements, prioritize initiatives, and implement solutions that enhanced organizational capabilities."
      ]
    },
    {
      period: "Feb 2022 – Jul 2023",
      title: "Software Analyst",
      company: "Bounteous",
      icon: "🖥️",
      type: "work",
      front: [
        "Google Analytics 4 implementations and business analysis."
      ],
      back: [
        "Business Analysis - Translated complex business requirements into technical specifications for Google Analytics 4 (GA4) implementation, designing and deploying custom tracking solutions to measure key performance indicators (KPIs).",
        "Auditing websites - Conducted comprehensive analyses of client websites and applications, identifying opportunities for business process improvement, user experience (UX) optimisation, and conversion rate enhancement."
      ]
    },
    
    {
      period: "Sep 2018 – May 2022",
      title: "B.E. Computer Science and Engineering",
      company: "Anna University",
      icon: "🏛️",
      type: "education",
      front: [
        "Strong technical foundation & research support."
      ],
      back: [
        "Foundation: DS&A, OOP(Java), OS, Networks, Software Engineering practices.",
        "Built research infrastructure & collaborated on technical disciplines.",
        "Data and apps: DBMS/SQL, Probability and statistics, data mining, ML basics, web technologies (JS, HTML/CSS, React).",
        "Research & Development: Gained proficiency in algorithms, data structures, and analytical methodologies, building foundation for supporting researchers in diverse technical disciplines."
      ]
    },{
      period: "Jul 2020 – Nov 2020",
      title: "Marketing Analyst",
      company: "Testpress",
      icon: "🔬",
      type: "work",
      front: [
        "Boosted sales by 10% through strategic research."
      ],
      back: [
        "Built press releases, collaborated with PR for major company updates.",
        "Researched and provided necessary insights to boost their sales by 10%,",
        "Partnered with the public relations team to develop press releases and promotional materials that effectively communicated company news and updates to external audiences."
      ]
    }
  
  ],
  skills: {
    "Analytics & BI": ["Looker Studio", "Power BI (Certified)", "Google Analytics 4 (Certified)", "Google Tag Manager", "Google Ads & GMP"],
    "Languages & Data": ["Python Data Analysis", "SQL", "React JS", "JavaScript", "HTML/CSS"],
    "AI & Collaboration": ["AI & Prompt Engineering", "Simulation Modelling", "Jira/Confluence", "Miro", "Notion"],
    "Business Analytics": ["Predictive Analytics", "Decriptive Analytics", "Simulation Modelling", "Prescriptive Analytics","Optimisation Techniques"]
  }
};

// --- Helper Components ---
export const NavLink = ({ href, children }) => {
  // Scroll with offset to account for sticky header
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const yOffset = -96; // <-- update to match your header's height in px
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  return (
    <a href={href} onClick={handleClick}
      className="text-gray-300 hover:text-white transition duration-300 px-3 py-2 rounded-md text-sm font-medium">
      {children}
    </a>
  );
};

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-bold text-center text-white mb-0 relative">
      {children}
      <span className="block w-24 h-1 bg-indigo-500 mx-auto mt-4"></span>
  </h2>
);


// --- Main Components ---


// --- Header ---
// const Header = () => (
//   <header className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 z-50">
//     <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//       <div className="text-white">
//         <h1 className="text-xl font-bold">{portfolioData.header.name}</h1>
//         <p className="text-sm text-gray-400">{portfolioData.header.subtitle}</p>
//       </div>
//       <div className="hidden md:flex items-center space-x-1">
//         <NavLink href="#highlights">Highlights</NavLink>
//         <NavLink href="#featured-projects">Projects</NavLink>
//         <NavLink href="#about">About me</NavLink>
//         <NavLink href="#journey">Journey</NavLink>
//         <NavLink href="#skills">Skills</NavLink>
//         <NavLink href="#contact">Contact</NavLink>
//         <a href={portfolioData.header.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white ml-4">
//           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//             <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/>
//           </svg>
//         </a>
//       </div>
//     </nav>
//   </header>
// );


const Hero = () => (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center">
        <div className="container mx-auto px-6">
            {/* The Highlights section serves as the main content now */}
        </div>
    </section>
);




const Competencies = () => (
  <section id="competencies" className="pt-24 pb-20">
    <h2 className="text-4xl font-bold text-center text-white mb-8">Core Competencies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {portfolioData.competencies.map((item, idx) => (
    <div key={idx} className="section-card glow-card rounded-lg p-8 text-center">
      <div className="text-5xl mb-4">{item.icon}</div>
      <h3 className="text-lg text-white">{item.title}</h3>
      {/* Optional: For subtitles, add below */}
      {/* item.subtitle && <p className="text-gray-300 text-sm mt-2">{item.subtitle}</p> */}
    </div>
  ))}
</div>

    </section>
);




const Roadmap = () => {
    const itemsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        itemsRef.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => {
            itemsRef.current.forEach((item) => {
                if (item) observer.unobserve(item);
            });
        };
    }, []);

    return (
        <section id="journey" className="py-20">
            <div className="container mx-auto px-6">
                <SectionTitle>Journey & Background</SectionTitle>
                <div className="relative">
                    {/* The central line */}
                    <div className="absolute left-1/2 h-full w-1 bg-gray-700 transform -translate-x-1/2"></div>
                    
                    <div className="space-y-12">
                        {portfolioData.roadmap.map((item, index) => (
                            <div 
                                ref={el => itemsRef.current[index] = el}
                                key={index} 
                                className={`roadmap-scroll-item opacity-0 transition-all duration-700 ease-in-out flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                                    <div className={`roadmap-scroll-content section-card p-6 rounded-xl shadow-lg relative ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        {/* Dot on the timeline */}
                                        <div className={`absolute top-1/2 w-5 h-5 bg-indigo-500 rounded-full border-4 border-gray-900 transform -translate-y-1/2 ${index % 2 === 0 ? 'right-0 translate-x-[calc(50%+10px)]' : 'left-0 -translate-x-[calc(50%+10px)]'}`}></div>

                                        <p className="text-indigo-400 text-sm font-semibold">{item.period}</p>
                                        <h3 className="text-white text-xl font-bold mt-1">{item.title}</h3>
                                        <p className="text-gray-300 text-md">{item.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
const JourneyRoadmap = () => (
  <section id="journey" className="py-20 bg-transparent">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Journey & Timeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {portfolioData.roadmap.map((entry, idx) => (
          <FlippableRoadmapCard key={idx} entry={entry} />
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
    <section id="skills" className="pt-24 pb-20">
        <div className="container mx-auto px-6">
            <SectionTitle>Technical Skillset</SectionTitle>
            <div className="section-card rounded-lg p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {Object.entries(portfolioData.skills).map(([category, skillsList]) => (
                        <div key={category}>
                            <h3 className="text-xl font-bold text-indigo-400 mb-4 border-b-2 border-gray-700 pb-2">{category}</h3>
                            <ul className="space-y-2">
                                {skillsList.map((skill, index) => (
                                    <li key={index} className="text-gray-300">
                                        <span className="text-indigo-500 mr-2">&#10148;</span>{skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);




const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hi there! I'm Narmatha's AI assistant. Ask me anything about her skills, projects, or experience." }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if(!input.trim()) return;

        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Basic AI response logic
        setTimeout(() => {
            const botResponse = getBotResponse(input.toLowerCase());
            setMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
        }, 1000);
    };

    const getBotResponse = (query) => {
        if (query.includes('skill') || query.includes('technical')) {
            return "Narmatha is proficient in various areas including Analytics & BI (Looker, Power BI), Languages (Python, SQL), and AI tools. You can see a full list in the 'Technical Skillset' section!";
        }
        if (query.includes('project') || query.includes('highlight')) {
            return "She has worked on several impactful projects, including AI-driven data extraction and creating BI dashboards. Check out the 'Projects' section for an interactive carousel of her work.";
        }
        if (query.includes('experience') || query.includes('journey')) {
            return "Her journey includes roles like Senior Software Analyst and Prompt Engineer, complemented by her MSc in Business Analytics. The 'Journey & Background' section has a cool interactive roadmap of her career!";
        }
        if (query.includes('contact') || query.includes('email')) {
            return "The best way to get in touch is through the contact form at the bottom of the page or by connecting with her on LinkedIn. I can't share her email directly!";
        }
         if (query.includes('hello') || query.includes('hi')) {
            return "Hello! How can I help you learn more about Narmatha today?";
        }
        return "That's a great question. You can likely find more details on this page, or feel free to reach out to Narmatha directly through the contact form for more specific information.";
    };
    
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div>
            <div className={`fixed bottom-8 right-8 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button onClick={() => setIsOpen(true)} className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transform hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
            </div>

            <div className={`fixed bottom-8 right-8 w-80 md:w-96 h-[500px] section-card rounded-xl shadow-2xl flex flex-col transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                 <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-white font-bold">AI Assistant</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-xs rounded-lg px-3 py-2 ${msg.from === 'bot' ? 'bg-gray-700 text-white' : 'bg-indigo-600 text-white'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
                    <div className="flex items-center">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me a question..."
                            className="flex-1 bg-gray-800 border-gray-700 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button type="submit" className="ml-3 text-indigo-500 hover:text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// --- App Container ---
function App() {
  return (
    <div className="text-gray-200 font-sans relative min-h-screen">
      <AnimatedBackground />
      <Header portfolioData={portfolioData} />

      <main>
        {/* Start each anchor section with enough top padding */}
       {/* Highlights */}
       <section id="highlights" className="pt-32 pb-20 flex flex-col items-center justify-center">
  <SectionTitle>Highlights</SectionTitle>
  <FlippableCarousel items={portfolioData.highlights} badgeKey="title" />
</section>

<section id="featured-projects" className="pt-16 pb-20 flex flex-col items-center justify-center">
  <SectionTitle>Featured Projects</SectionTitle>
  <FlippableCarousel items={portfolioData.projects} badgeKey="title"/>
</section>
<section id="about" className="py-24 px-5 md:px-0 flex justify-center items-center bg-transparent">
  <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Left: Image */}
    <div className="flex justify-center">
      {/* Replace 'your_photo.jpg' as needed */}
      <div className="border-2 border-gray-400 rounded mx-auto overflow-hidden w-[320px] h-[400px] bg-gray-100 flex items-center">
        <img
          src= "images/Profile.jpeg"
          alt="About Me"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
    {/* Right: About Info */}
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About Me</h2>
      <p className="text-gray-200 text-lg mb-4 text-justify">
        Hi, I'm Narmatha Jayasankar, a data and analytics enthusiast with a passion for extracting actionable insights from complex data. My journey blends business, technology, and creative problem-solving—whether developing AI-powered solutions, optimizing processes, or designing visual stories with data.
      </p>
      <p className="text-gray-400 text-md text-justify">
        I thrive at the intersection of analytics, strategy, and innovation. From academic research and hackathons to industry projects, I'm driven by curiosity, teamwork, and a deep commitment to making data meaningful for people and organizations. Outside work, you’ll find me mentoring students, exploring new tools, and enjoying the energy of collaborative communities.
      </p>
      {/* Add more about you here! */}
    </div>
  </div>
</section>



        <Competencies />
        <VerticalRoadmap entries={portfolioData.roadmap} />
        <FloatingCertifications />
        <Skills />
        <Contact />
      </main>
      <Chatbot />
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Narmatha Jayasankar. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
export default App;