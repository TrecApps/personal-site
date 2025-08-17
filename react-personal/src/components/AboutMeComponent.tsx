import React from "react";
import { Container } from "react-bootstrap";


import styles from "./component.module.css";

import { StylesService } from "@tc/tc-rc-general";



// TypeDeclatations

type Education = {school: string, gradYear: string};
type Work = { job: {school: string, gradYear: string}, details: string[]};


export default function AboutMeComponent() {

    const pProjectRefImg = React.createRef<HTMLImageElement>();
    const pProjectRefDiv = React.createRef<HTMLUListElement>();

    const wProjectRefImg = React.createRef<HTMLImageElement>();
    const wProjectRefDiv = React.createRef<HTMLUListElement>();

    const sProjectRefImg = React.createRef<HTMLImageElement>();
    const sProjectRefDiv = React.createRef<HTMLUListElement>();

    const oProjectRefImg = React.createRef<HTMLImageElement>();
    const oProjectRefDiv = React.createRef<HTMLUListElement>();

    const wpProjectRefImg = React.createRef<HTMLImageElement>();
    const wpProjectRefDiv = React.createRef<HTMLUListElement>();

    const ss: StylesService = StylesService.getInstance();


    function toggleRef(
        imgRef: React.RefObject<HTMLImageElement | null>, 
        divRef: React.RefObject<HTMLUListElement | null>) {
        if(imgRef.current && divRef.current){
            // if(divRef.current.getAttribute("height") == "0"){
            //     divRef.current.setAttribute("height", "auto");
            // } else {
            //     divRef.current.setAttribute("height", "0");
            // }

            imgRef.current.classList.toggle(styles.expandedImg);
            divRef.current.classList.toggle(styles.expandedList);
        }
    }

    const contactInfo: string[] = [
        "Phone: (304) 671-9032", "Email: jljacko@outlook.com", "Longmont CO 80504 (temporary)", "Owner of trecapps.com"
    ]
    const contactInfoTsx = contactInfo.map((detail: string) => (<li>{detail}</li>))

    const education: Education[] = [
        {school: "West Virginia University - 3.4 GPA - Bachelors of Arts: Biology", gradYear: "2012-2016"},
        {school: "West Virginia University - 4.0 GPA - Masters of Science: Computer Science", gradYear: "2016-2018"}
    ]
    const educationTsx = education.map((edu: Education) => (
        <tr>
            <th>{edu.school}</th>
            <th style={{margin: "10px"}}>{edu.gradYear}</th>
        </tr>
    ));

    const certifications: string[] = [
        "Azure Fundamentals (July 2021)", 
      "Azure Developer Associate (Aug 2021)",
      "AWS Cloud Practitioner (Sept 2023)",
      "Azure Solutions Architect Expert (Nov 2021)", 
      "Oracle, Java SE 8 Programmer (Oct 2018)",
      "CompTIA A+ Certified (Sept 2024)"
    ]

    const certificationsTsx = certifications.map((cert: string) => (
        <li className={styles.resumeList}>{cert}</li>
    ))

    const personalProjects: Work[] = [
        {job: {school: "TrecAuth", gradYear: "Spring Security Library"},
            details: [
                "Java/Spring Security library that utilizes two relational databases and Azure Storage for User Data",
                "Uses Tokens for authentication, and the SMS Email",
                "Supports Brute-Force protection, Session Management, and BCrypt-password hashing",
                "Uses Second Relational Database to store individualized Salts that are updated every time a password is updated",
                "Added support for using Azure Key Vault to manage encryption and JWT token processing",
                "Uses Java Annotations to utilize AES Field-level Encryption before storing objects in DB or Storage Solution",
                "Support extended for AWS (S3, Secrets Manager) and GCP (Google Cloud Storage, Secret Manager)",
                "Supports Spring Webflux Applications in addition to Spring Web",
                "Now supports Multi-Factor Authentication (MFA) - (Tested via Microsoft Authenticator and email)"
            ]
        },
        {job: {school: "Trec Apps Network", gradYear: "App Ecosystem built on Microsoft Azure"},
            details: [
                "Series of Apps and their resources that utilize Azure resources to run and provide their services",
                "Backends utilize Java 17, Spring Boot, MySql, Azure Storage Blob, Application Insights, and Azure App Service",
                "Backends protected behind a Private Endpoint, Azure Monitor Private Link Scope, and TrecAuth/Spring Security",
                "Frontends utilize Angular 17 (HTML/TypeScript), Bootstrap/CSS, and a personal Node library stored on Azure DevOps",
                "Service Access enabled via Azure Front Door, Azure DNS, and a Spring Cloud Gateway Service",
                "Image Service (no dedicated Frontend) utilizes Azure Function (JavaScript/NodeJS) and Azure AI to process newly uploaded images"
            ]
        },
        {job: {school: "Trec Apps Suite", gradYear: "Suite of web apps supported by the Trec Apps Network"},
            details: [
                "Coffee-Shop (Facebook alternative) utilizes Azure Service Bus to push content to users' home page",
                "Posts, Comments, Reactions, and Messaging supported on Coffeeshop",
                "Coffeeshop pictures available in the Art Gallery (Search 'Coffeeshop')",
                "User Management service provides support for managing Login Sessions, User details (email, phone, etc.), and Multi-Factor Authentication options",
                "Both apps provide an image panel that supports image selection, image cropping, etc.",
                "Falsehood and Brand (wiki) services utilize markdown content with a custom MD Editor",
                "Spring Gateway service now provides a core web-page via Thymeleaf (not Angular)"
            ]
        }
    ]

    function convertProject(project: Work) {
        const imgRef = React.createRef<HTMLImageElement>();
        const divRef = React.createRef<HTMLUListElement>();

        return (
            <li style={{ listStyleType: "none", position: "relative"}} >
                    <p onClick={() => toggleRef(imgRef, divRef)}>
                        <b>
                            <img ref={imgRef} height="20px" width="20px"
                                className={[styles.expand_icon, styles.expand_i_small, styles.basicImg].join(' ')} src="assets/Less_than.png" /> ({project.job.gradYear}) {project.job.school}</b>
                    </p>
                    <ul style={{listStyleType: "disc", marginBottom: "15px"}} ref={divRef} className={styles.basicList}>
                        { project.details.map((value: string) => ( <li>{value}</li> )) }
                    </ul>
                </li>
        )
    }

    const personalProjectsTsx = personalProjects.map(convertProject);

    const oldProjects: Work[] = [
        {job: {school: "Anagame (Deprecated in favor of TcAnagame)", gradYear: "Windows Desktop"},
            details: [
                "Developed with Visual C++, Visual Studio, DirectX 11",
                "Contains a basic JavaScript Interpreter, Basic HTML Renderer, and a custom-made UI Engine",
                "Innovates the TML file format used in many of it's UIs",
                "https://github.com/TrecApps/AnaGame"
            ]
        },
        {job: {school: "TcAnagame (Cross-platform version of Anagame)", gradYear: "Cross-platform Desktop"},
            details: [
                "Developed with Visual C++, GLFW, FreeType, and FFMPEG",
                "Currently uses OpenGL for graphics but is being migrated over to Vulkan",
                "Uses 'TcRunners' to accomplish multi-threading",
                "https://github.com/TrecApps/TcAnagame"
            ]
        },
        {job: {school: "Color Shooter", gradYear: "Godot (previously Unity Mobile)"},
            details: [
                "Mobile app written in C# (when using Unity) that is currently able to run on an iPhone",
                "Player has to adjust the ship color based off of the enemy being targeted",
                "Reduces Framerate when the battery gets below 20%",
                "Migrated to Godot and GDScript"
            ]
        },
        {job: {school: "Personal Chip's Challenge", gradYear: "Godot Desktop Game"},
            details: [
                "Godot recreation of tile-based game known as Chip's Challenge",
                "Implemented first 12 levels from the original game, including most of the game play elements and timer support"
            ]
        }
    ];

    const oldProjectsTsx = oldProjects.map(convertProject);

    const workList: string[] = [
        "BestBuy - Developed Jenkins pipelines that incorporate Gradle, Checkmarx, and Sonarqube",
      "BestBuy - Developing applications that Use Spring Boot, Spring WebFlux, and JWTs",
      "BestBuy - gained experience using Openshift and writing Dockerfiles",
      "Walmart - helped develop NodeJs Server software using HAPI and tested it using Wreck and Mocha"
    ];

    const workListTsx = workList.map((work: string) => (
        <li>{work}</li>
    ))

    const schoolList: string[] = [
        "Wrote Rust Application that reads a FAT File System image",
      "Implemented the DES Algorithm using C++ and the standard library",
      "Wrote Linux Socket program that emulates FTP connections, and can manage two sockets",
      "Modified a Game written in Java to look like an old Computer Game called Chip’s Challenge",
      "Developed Prototype of an online election system using PHP",
      "Simple Operating System in C and Assembly - would later use C++ in place of C when becoming a Teacher's Assistant"
    ]

    const schoolListTsx = schoolList.map((work: string) => (
        <li>{work}</li>
    ))

    const workProjectList: Work[] = [
        {job: {school: "Accenture Flex/Best Buy; Richfield, MN", gradYear: "March 2021-April 2023"},
            details: [
                "Developed RESTful APIs with Spring Web-Flux and Router Functions",
                "Developed Apps that connected to Kafka and wrote integration tests featuring Kafka Streams",
                "Maintaining Jenkins pipelines and continuing to develop Spring Boot Applications",
                "Contributed to the migration of Spring Boot apps from Java 11 to Java 17",
                "Set up and utilize monitoring dashboards and alert mechanisms on Kibana, Grafana, and Splunk"
        ]},
        {job: {school: "Revature LLC; Reston, VA", gradYear: "August 2018 - February 2021"},
            details: [
                "Underwent a coding bootcamp before working for a Revature Client for around 2 years",
                "Bootcamp: Collaborated on an Angular Project and wrote tests and documentation", 
                "Bootcamp: Gained Hands-on experience with Spring (boot, MVC, JPA, Web-Flux), hibernate, JDBC, Tomcat/Servlets, and AWS",
                "Walmart (Bentonville, AR): Helped develop Server software using NodeJS and wrote tests using Mocha",
                "Walmart (Bentonville, AR): Aided development of NodeJS tool that sent base64 images in JSON format over RabbitMQ",
                "Bestbuy (Richfield, MN): Collaborated on a Spring Boot/Web-Flux application and aided in the use of JWT test tokens",
                "Bestbuy (Richfield, MN):	Developed a Build pipeline that utilizes Jenkins, Gradle, Jacoco, Sonarqube, and Openshift"
        ]},
        {job: {school: "WVU LCSEE Department; Morgantown, WV", gradYear: "2017"},
            details: [
                "Taught the lab sections of Intro to Computer Science and Intro to Operating Systems",
                "Aided students in various components of projects and graded software submissions",
                "Innovated the use of C++ in the University OS and introduced the Memory map and CPUID as Extra Credit"]},
        {job: {school: "Lonza Walkersville, Inc; Walkersville, MD", gradYear: "2016 (Summer)"},
            details: [
                "Ran Assays in Lab to observe how changes to a chemical reaction affects its rate",
                "Documented assay results and laboratory procedures in Company notebook",
                "Mixed lysates in a Biological Safety Cabinet and altered proportions to observe effect on assay time"]},
        {job: {school: "Axiom Staffing Group; Martinsburg, WV", gradYear: "2015 (Summer)"},
            details: [
                "Cleaned the backs of vending machines under construction (Royal Vendors)",
                "Moved Vending Machines into and out of foaming machines (Royal Vendors)",
                "Scanned packages and loaded them onto pallets and conveyor belts (FedEx Smart Post)",
                "Loaded and unloaded tractor trailers parked at facilities for shipping (FedEx Smart Post)"
            ]
        }
    ]

    const workProjectListTsx = workProjectList.map(convertProject);


    return (
        <Container 
            // style={{
            // backgroundColor:"rgb(63, 227, 248)",
            // backgroundSize: "cover",
            // backgroundRepeat: "repeat-y",
            // minHeight: "100%"
            // }} 
            className={ss.getElementContainerClasses('')}
        >

            <h1 className={ss.getElementItemClasses("")}>About John Lawrence Jacko</h1>

            <div className={ss.getElementItemClasses("")}>
                <h3>Contact</h3>
                <ul>
                    {contactInfoTsx}
                </ul>                
            </div>

            <div className={ss.getElementItemClasses("")}>
                <h3>Education</h3>
                <table>
                    <thead>
                        <tr>
                            <th>School, Degree, GPA</th>
                            <th>Years</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        {educationTsx}
                    </tbody>
                   
                </table>
            </div>


            <div className={ss.getElementItemClasses("")}>
                <h3>Certifications</h3>
                <ul style={{display: "flex", flexFlow: "row wrap",gap: "10px"}}>
                    {certificationsTsx}
                </ul>
            </div>
            
            <div className={ss.getElementItemClasses("")}>
                <h3 onClick={() => toggleRef(pProjectRefImg, pProjectRefDiv)}>
                    <img ref={pProjectRefImg} id="exp1" className={[styles.expand_icon, styles.expand_i_reg, styles.basicImg].join(' ')} src="assets/Less_than.png" /> Personal Projects
                </h3>
                <ul ref={pProjectRefDiv} className={styles.basicList}>
                    {personalProjectsTsx}
                    <li>Evidence for MFA support can be found <a href="https://www.linkedin.com/feed/update/urn:li:activity:7233674723916705792/">at this LinkedIn post</a></li>
                </ul>
            </div>
            
            

            <div className={ss.getElementItemClasses("")}>
                <h3 onClick={() => toggleRef(wProjectRefImg, wProjectRefDiv)}>
                    <img ref={wProjectRefImg} id="exp1" className={[styles.expand_icon, styles.expand_i_reg, styles.basicImg].join(' ')} src="assets/Less_than.png" /> Work Projects
                </h3>
                <ul ref={wProjectRefDiv} className={styles.basicList}>
                    { workListTsx}
                </ul>    
            </div>


            <div className={ss.getElementItemClasses("")}>
                <h3 onClick={() => toggleRef(sProjectRefImg, sProjectRefDiv)}>
                    <img ref={sProjectRefImg} id="exp3" className={[styles.expand_icon, styles.expand_i_reg, styles.basicImg].join(' ')} src="assets/Less_than.png" /> School Projects
                </h3>
                <ul ref={sProjectRefDiv} className={styles.basicList}>
                    {schoolListTsx}
                </ul>
            </div>


            <div className={ss.getElementItemClasses("")}>
                <h3 onClick={()=> toggleRef(oProjectRefImg, oProjectRefDiv)}>
                    <img ref={oProjectRefImg} id="exp1" className={[styles.expand_icon, styles.expand_i_reg, styles.basicImg].join(' ')} src="assets/Less_than.png" /> Personal Projects (on-hold)
                </h3>
                <ul ref={oProjectRefDiv} className={styles.basicList}>
                    {oldProjectsTsx}
                </ul>
            </div>

            <div className={ss.getElementItemClasses("")}>
                <h3 onClick={()=> toggleRef(wpProjectRefImg, wpProjectRefDiv)}>
                    <img ref={wpProjectRefImg} id="exp4" className={[styles.expand_icon, styles.expand_i_reg, styles.basicImg].join(' ')} src="assets/Less_than.png" /> Work
                </h3>
                <ul ref={wpProjectRefDiv} className={styles.basicList}>
                    { workProjectListTsx }
                </ul>
            </div>



        </Container>
    );
}