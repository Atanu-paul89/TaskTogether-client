
// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaFilePdf } from 'react-icons/fa';

// const About = () => {
//     const developerInfo = {
//         name: 'Shatadru Paul',
//         title: 'Web Developer & UI Designer',
//         bio: "I'm Shatadru Paul, a passionate and detail-oriented Full-Stack Web Developer with a strong foundation in modern web technologies. I specialize in building robust, scalable, and user-friendly applications from concept to deployment. My expertise spans both front-end and back-end development, allowing me to craft seamless digital experiences.",
//         address: 'Chattogram-4000, Bangladesh',
//         email: 'shatadru5689@gmail.com',
//         social: {
//             github: 'https://github.com/Atanu-paul89', 

//             linkedin: 'https://www.linkedin.com/in/shatadru-paul-42222a193/', 
//             facebook: 'https://www.facebook.com/Atanu5689/', 
//         },
//         cvLink: 'https://drive.google.com/drive/folders/1hAP4urg0JyCxvBpP6lh5emOLxN-CADQO?usp=sharing', // Replace with a link to your actual CV
//         education: [
//             { degree: 'Bachelor of Science in Computer Science & Engineering', course: 'Full-Stack Web Development', platform:'Programming Hero', institution: 'Vellore Institute of Technology', Location: 'Vellore, India', loc: 'Dhaka, Bangladesh',  year: '2023', duration:'7 months', },
//             // Add more education if applicable
//         ],
//         experience: [
//             { title: 'Software Developer', company: 'Tech Solutions Inc.', duration: 'Jan 2023 - Present', description: 'Developed and maintained full-stack web applications using React, Node.js, and MongoDB. Implemented RESTful APIs and integrated third-party services.' },
//             { title: 'Junior Web Developer', company: 'Web Innovations Ltd.', duration: 'Jun 2022 - Dec 2022', description: 'Assisted in front-end development, bug fixing, and testing of web platforms.' },
//             // Add more experience if applicable
//         ],
//         skills: {
//             frontend: ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'],
//             backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'APIs', 'Firebase'],
//             tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Netlify', 'Vercel',],
//             concepts: ['Responsive Design', 'Authentication', 'API Integration', 'State Management'],
//         }
//     };

//     const sectionVariants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, x: -20 },
//         visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
//     };

//     return (
//         <div className="container mx-auto p-4 py-8">
//             <motion.h1
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-5xl font-extrabold text-center text-primary mb-12 sm:text-6xl lg:text-7xl"
//             >
//                 Developer of This Site
//             </motion.h1>

//             <div className="max-w-4xl mx-auto space-y-12">
//                 {/* Introduction Section */}
//                 <motion.section
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700 text-center"
//                 >
//                     <h2 className="text-3xl font-bold text-secondary mb-4 sm:text-4xl">
//                         Hello, I'm {developerInfo.name}!
//                     </h2>
//                     <p className="text-lg text-base-content leading-relaxed mb-6 sm:text-xl">
//                         {developerInfo.bio}
//                     </p>
//                     <a
//                         href={developerInfo.cvLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="btn btn-primary btn-lg gap-2 text-white"
//                     >
//                         <FaFilePdf className="text-xl" /> Download My CV
//                     </a>
//                 </motion.section>

//                 {/* Details and Contact Section */}
//                 <motion.section
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
//                 >
//                     <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Details & Connect</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base-content">
//                         <div>
//                             <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {developerInfo.name}</p>
//                             <p className="text-lg mb-2"><span className="font-semibold">Title:</span> {developerInfo.title}</p>
//                             <p className="text-lg mb-2"><span className="font-semibold">Location:</span> {developerInfo.address}</p>
//                             <p className="text-lg mb-2">
//                                 <span className="font-semibold">Email:</span>{' '}
//                                 <a href={`mailto:${developerInfo.email}`} className="link link-primary">
//                                     {developerInfo.email}
//                                 </a>
//                             </p>
//                         </div>
//                         <div>
//                             <h3 className="text-2xl font-semibold text-accent mb-4">Let's Connect!</h3>
//                             <div className="flex gap-4 justify-center md:justify-start">
//                                 <motion.a
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     href={developerInfo.social.github}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="btn btn-circle btn-lg btn-ghost text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
//                                     title="GitHub"
//                                 >
//                                     <FaGithub className="text-3xl" />
//                                 </motion.a>
//                                 <motion.a
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     href={developerInfo.social.linkedin}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="btn btn-circle btn-lg btn-ghost text-blue-700 hover:text-blue-500 transition-colors"
//                                     title="LinkedIn"
//                                 >
//                                     <FaLinkedin className="text-3xl" />
//                                 </motion.a>
//                                 <motion.a
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     href={developerInfo.social.facebook}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="btn btn-circle btn-lg btn-ghost text-blue-600 hover:text-blue-400 transition-colors"
//                                     title="Facebook"
//                                 >
//                                     <FaFacebook className="text-3xl" />
//                                 </motion.a>
//                                 <motion.a
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                     href={`mailto:${developerInfo.email}`}
                                    
//                                     className="btn btn-circle btn-lg btn-ghost text-red-500 hover:text-red-300 transition-colors"
//                                     title="Email Me"
//                                 >
//                                     <FaEnvelope className="text-3xl" />
//                                 </motion.a>
//                             </div>
//                         </div>
//                     </div>
//                 </motion.section>

//                 {/* Education Section */}
//                 <motion.section
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
//                 >
//                     <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Education</h2>
//                     <ul className="list-disc pl-5 space-y-3 text-base-content">
//                         {developerInfo.education.map((edu, index) => (
//                             <motion.li key={index} variants={itemVariants} className="text-lg">
//                                 <span className="font-semibold">{edu.degree}</span> from {edu.institution}, {edu.Location} ({edu.year})
//                             </motion.li>
//                         ))}
//                     </ul>
//                     <ul className="list-disc pl-5 space-y-3 text-base-content">
//                         {developerInfo.education.map((edu, index) => (
//                             <motion.li key={index} variants={itemVariants} className="text-lg">
//                                 <span className="font-semibold">{edu.course} course</span> from {edu.platform}, {edu.loc} ({edu.duration})
//                             </motion.li>
//                         ))}
//                     </ul>
//                 </motion.section>

//                 {/* Experience Section */}
//                 <motion.section
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
//                 >
//                     <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Experience</h2>
//                     <div className="space-y-6">
//                         {developerInfo.experience.map((exp, index) => (
//                             <motion.div key={index} variants={itemVariants} className="border-l-4 border-primary pl-4">
//                                 <h3 className="text-xl font-semibold text-accent">{exp.title}</h3>
//                                 <p className="text-lg text-base-content-secondary">{exp.company} <span className="text-sm text-gray-500">({exp.duration})</span></p>
//                                 <p className="text-base text-base-content mt-1">{exp.description}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </motion.section>

//                 {/* Skills Section */}
//                 <motion.section
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
//                 >
//                     <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Skills</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-base-content">
//                         <div>
//                             <h3 className="text-xl font-semibold text-accent mb-3">Frontend</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {developerInfo.skills.frontend.map((skill, index) => (
//                                     <span key={index} className="badge badge-lg badge-primary text-white p-3">
//                                         {skill}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-semibold text-accent mb-3">Backend</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {developerInfo.skills.backend.map((skill, index) => (
//                                     <span key={index} className="badge badge-lg badge-secondary text-white p-3">
//                                         {skill}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                         <div>
//                             <h3 className="text-xl font-semibold text-accent mb-3">Tools & Concepts</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {developerInfo.skills.tools.map((skill, index) => (
//                                     <span key={index} className="badge badge-lg badge-info text-white p-3">
//                                         {skill}
//                                     </span>
//                                 ))}
//                                 {developerInfo.skills.concepts.map((skill, index) => (
//                                     <span key={index} className="badge badge-lg badge-success text-white p-3">
//                                         {skill}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </motion.section>

//                 {/* Call to Action for Business Partnership */}
//                 <motion.section
//                     variants={sectionVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="bg-base-200 shadow-lg rounded-lg p-8 border border-base-300 dark:border-gray-700 text-center"
//                 >
//                     <h2 className="text-3xl font-bold text-accent mb-4 sm:text-4xl">
//                         Looking for a Development Partner?
//                     </h2>
//                     <p className="text-lg text-base-content leading-relaxed mb-6 sm:text-xl">
//                         I am open to new opportunities and collaborations. If you have a project idea,
//                         a business proposal, or just want to discuss web development, feel free to reach out!
//                     </p>
//                     <a
//                         href={`mailto:${developerInfo.email}?subject=Business Partnership Inquiry`}
//                         className="btn btn-accent btn-lg gap-2 text-white"
//                     >
//                         <FaEnvelope className="text-xl" /> Contact Me for Business
//                     </a>
//                 </motion.section>
//             </div>
//         </div>
//     );
// };

// export default About;


// new // 
// src/components/ShareComponents/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope, FaFilePdf } from 'react-icons/fa';

const About = () => {
    const developerInfo = {
        name: 'Shatadru Paul',
        title: 'Web Developer & UI Designer',
        bio: "I'm Shatadru Paul, a passionate and detail-oriented Full-Stack Web Developer with a strong foundation in modern web technologies. I specialize in building robust, scalable, and user-friendly applications from concept to deployment. My expertise spans both front-end and back-end development, allowing me to craft seamless digital experiences.",
        address: 'Chattogram-4000, Bangladesh',
        email: 'shatadru5689@gmail.com',
        social: {
            github: 'https://github.com/Atanu-paul89',
            linkedin: 'https://www.linkedin.com/in/shatadru-paul-42222a193/',
            facebook: 'https://www.facebook.com/Atanu5689/',
        },
        cvLink: 'https://drive.google.com/drive/folders/1hAP4urg0JyCxvBpP6lh5emOLxN-CADQO?usp=sharing', // Replace with a link to your actual CV
        education: [
            { degree: 'Bachelor of Science in Computer Science & Engineering', course: 'Full-Stack Web Development', platform:'Programming Hero', institution: 'Vellore Institute of Technology', Location: 'Vellore, India', loc: 'Dhaka, Bangladesh', year: '2023', duration:'7 months', },
            // Add more education if applicable
        ],
        experience: [
            { title: 'Software Developer', company: 'Tech Solutions Inc.', duration: 'Jan 2023 - Present', description: 'Developed and maintained full-stack web applications using React, Node.js, and MongoDB. Implemented RESTful APIs and integrated third-party services.' },
            { title: 'Junior Web Developer', company: 'Web Innovations Ltd.', duration: 'Jun 2022 - Dec 2022', description: 'Assisted in front-end development, bug fixing, and testing of web platforms.' },
            // Add more experience if applicable
        ],
        skills: {
            frontend: ['React', 'Next.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion'],
            backend: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'APIs', 'Firebase'],
            tools: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Netlify', 'Vercel',],
            concepts: ['Responsive Design', 'Authentication', 'API Integration', 'State Management'],
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="container mx-auto p-4 py-8">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-center text-primary mb-12 sm:text-6xl lg:text-7xl"
            >
                Developer of This Site
            </motion.h1>

            <div className="max-w-4xl mx-auto space-y-12">
                {/* Introduction Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700 text-center"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-4 sm:text-4xl">
                        Hello, I'm {developerInfo.name}!
                    </h2>
                    <p className="text-lg text-base-content leading-relaxed mb-6 sm:text-xl">
                        {developerInfo.bio}
                    </p>
                    <a
                        href={developerInfo.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-lg gap-2 text-white"
                    >
                        <FaFilePdf className="text-xl" /> Download My CV
                    </a>
                </motion.section>

                {/* Details and Contact Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Details & Connect</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base-content">
                        <div>
                            <p className="text-lg mb-2"><span className="font-semibold">Name:</span> {developerInfo.name}</p>
                            <p className="text-lg mb-2"><span className="font-semibold">Title:</span> {developerInfo.title}</p>
                            <p className="text-lg mb-2"><span className="font-semibold">Location:</span> {developerInfo.address}</p>
                            <p className="text-lg mb-2">
                                <span className="font-semibold">Email:</span>{' '}
                                <a href={`mailto:${developerInfo.email}`} className="link link-primary">
                                    {developerInfo.email}
                                </a>
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-accent mb-4">Let's Connect!</h3>
                            <div className="flex gap-4 justify-center md:justify-start">
                                <motion.a
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={developerInfo.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-circle btn-lg btn-ghost text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                                    title="GitHub"
                                >
                                    <FaGithub className="text-3xl" />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={developerInfo.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-circle btn-lg btn-ghost text-blue-700 hover:text-blue-500 transition-colors"
                                    title="LinkedIn"
                                >
                                    <FaLinkedin className="text-3xl" />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={developerInfo.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-circle btn-lg btn-ghost text-blue-600 hover:text-blue-400 transition-colors"
                                    title="Facebook"
                                >
                                    <FaFacebook className="text-3xl" />
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    href={`mailto:${developerInfo.email}`}
                                    // ADD THESE ATTRIBUTES HERE:
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-circle btn-lg btn-ghost text-red-500 hover:text-red-300 transition-colors"
                                    title="Email Me"
                                >
                                    <FaEnvelope className="text-3xl" />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Education Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Education</h2>
                    <ul className="list-disc pl-5 space-y-3 text-base-content">
                        {/* Modified the map to display degree, institution, and location */}
                        {developerInfo.education.map((edu, index) => (
                            <motion.li key={index} variants={itemVariants} className="text-lg">
                                <span className="font-semibold">{edu.degree}</span> from {edu.institution}, {edu.Location} ({edu.year})
                            </motion.li>
                        ))}
                    </ul>
                    {/* Added a separate list for course, platform, and duration */}
                    <ul className="list-disc pl-5 space-y-3 text-base-content mt-4">
                         {developerInfo.education.map((edu, index) => (
                            <motion.li key={index} variants={itemVariants} className="text-lg">
                                <span className="font-semibold">{edu.course} course</span> from {edu.platform}, {edu.loc} ({edu.duration})
                            </motion.li>
                        ))}
                    </ul>
                </motion.section>

                {/* Experience Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Experience</h2>
                    <div className="space-y-6">
                        {developerInfo.experience.map((exp, index) => (
                            <motion.div key={index} variants={itemVariants} className="border-l-4 border-primary pl-4">
                                <h3 className="text-xl font-semibold text-accent">{exp.title}</h3>
                                <p className="text-lg text-base-content-secondary">{exp.company} <span className="text-sm text-gray-500">({exp.duration})</span></p>
                                <p className="text-base text-base-content mt-1">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Skills Section */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-base-100 shadow-xl rounded-lg p-8 border border-base-300 dark:border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-secondary mb-6 sm:text-4xl">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-base-content">
                        <div>
                            <h3 className="text-xl font-semibold text-accent mb-3">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {developerInfo.skills.frontend.map((skill, index) => (
                                    <span key={index} className="badge badge-lg badge-primary text-white p-3">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-accent mb-3">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {developerInfo.skills.backend.map((skill, index) => (
                                    <span key={index} className="badge badge-lg badge-secondary text-white p-3">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-accent mb-3">Tools & Concepts</h3>
                            <div className="flex flex-wrap gap-2">
                                {developerInfo.skills.tools.map((skill, index) => (
                                    <span key={index} className="badge badge-lg badge-info text-white p-3">
                                        {skill}
                                    </span>
                                ))}
                                {developerInfo.skills.concepts.map((skill, index) => (
                                    <span key={index} className="badge badge-lg badge-success text-white p-3">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Call to Action for Business Partnership */}
                <motion.section
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-base-200 shadow-lg rounded-lg p-8 border border-base-300 dark:border-gray-700 text-center"
                >
                    <h2 className="text-3xl font-bold text-accent mb-4 sm:text-4xl">
                        Looking for a Development Partner?
                    </h2>
                    <p className="text-lg text-base-content leading-relaxed mb-6 sm:text-xl">
                        I am open to new opportunities and collaborations. If you have a project idea,
                        a business proposal, or just want to discuss web development, feel free to reach out!
                    </p>
                    <a
                        href={`mailto:${developerInfo.email}?subject=Business Partnership Inquiry`}
                        // ADD THESE ATTRIBUTES HERE:
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-accent btn-lg gap-2 text-white"
                    >
                        <FaEnvelope className="text-xl" /> Contact Me for Business
                    </a>
                </motion.section>
            </div>
        </div>
    );
};

export default About;