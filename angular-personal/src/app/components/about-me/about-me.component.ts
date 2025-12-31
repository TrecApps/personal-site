
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ElementContainerDirective, ElementItemDirective } from '@tc/tc-ngx-general';
import { Education } from '../../models/education';
import { Work } from '../../models/work';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [
    ElementContainerDirective,
    ElementItemDirective,
    CommonModule
],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit{

  contactInfo: string[];
  education: Education[];
  certifications: string[];

  projectsPersonal: Work[];
  projectsPersonalOld: Work[];

  projectsSchool: string[];
  projectsWork: string[];

  
  work: Work[];

  showWork: WritableSignal<boolean>;
  showPProjects: WritableSignal<boolean>;
  showOldProjects: WritableSignal<boolean>;
  showWProjects: WritableSignal<boolean>;
  showSProjects: WritableSignal<boolean>;

  constructor() {
    this.contactInfo = [];
    this.education = [];
    this.work = [];

    this.projectsPersonal = [];
    this.projectsPersonalOld = [];
    this.projectsSchool = [];
    this.projectsWork = [];
    this.certifications = [];

    this.showPProjects = signal(false);

    this.showSProjects = signal(false);
    this.showWProjects = signal(false);
    this.showWork = signal(false);
    this.showOldProjects = signal(false);
  }

  ngOnInit(): void {
    this.contactInfo.push("Phone: (304) 671-9032", "Email: jljacko@outlook.com", "Longmont CO 80504 (temporary)", "Owner of trecapps.com");
    this.certifications.push(
      "Azure Fundamentals (July 2021)", 
      "Azure Developer Associate (Aug 2021)",
      "AWS Cloud Practitioner (Sept 2023)",
      "Azure Solutions Architect Expert (Nov 2021)", 
      "Oracle, Java SE 8 Programmer (Oct 2018)",
      "CompTIA A+ Certified (Sept 2024)"
    );

    this.education.push(
      new Education("West Virginia University - 3.4 GPA - Bachelors of Arts: Biology","2012-2016"),
      new Education("West Virginia University - 4.0 GPA - Masters of Science: Computer Science", "2016-2018")
    );


        this.projectsPersonal.push(
      new Work(new Education("TrecAuth", "Spring Security Library"),
      [
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
      ),
      new Work(new Education("Trec Apps Network", "App Ecosystem built on Microsoft Azure"),
      [
        "Series of Apps and their resources that utilize Azure resources to run and provide their services",
        "Backends utilize Java 17, Spring Boot, MySql, Azure Storage Blob, Application Insights, and Azure App Service",
        "Backends protected behind a Private Endpoint, Azure Monitor Private Link Scope, and TrecAuth/Spring Security",
        "Frontends utilize Angular 17 (HTML/TypeScript), Bootstrap/CSS, and a personal Node library stored on Azure DevOps",
        "Service Access enabled via Azure Front Door, Azure DNS, and a Spring Cloud Gateway Service",
        "Image Service (no dedicated Frontend) utilizes Azure Function (JavaScript/NodeJS) and Azure AI to process newly uploaded images"
      ]),
      new Work(new Education("Trec Apps Suite", "Suite of web apps supported by the Trec Apps Network"),
      [
        "Coffee-Shop (Facebook alternative) utilizes Azure Service Bus to push content to users' home page",
        "Posts, Comments, Reactions, and Messaging supported on Coffeeshop",
        "Coffeeshop pictures available in the Art Gallery (Search 'Coffeeshop')",
        "User Management service provides support for managing Login Sessions, User details (email, phone, etc.), and Multi-Factor Authentication options",
        "Both apps provide an image panel that supports image selection, image cropping, etc.",
        "Falsehood and Brand (wiki) services utilize markdown content with a custom MD Editor",
        "Spring Gateway service now provides a core web-page via Thymeleaf (not Angular)"
      ])
      
      
      );
    
    this.projectsPersonalOld.push(
      new Work(new Education("Anagame (Deprecated in favor of TcAnagame)", "Windows Desktop"),
      ["Developed with Visual C++, Visual Studio, DirectX 11",
      "Contains a basic JavaScript Interpreter, Basic HTML Renderer, and a custom-made UI Engine",
      "Innovates the TML file format used in many of it's UIs",
      "https://github.com/TrecApps/AnaGame"]
    ),
      new Work(new Education("TcAnagame (Cross-platform version of Anagame)", "Cross-platform Desktop"),
      [
        "Developed with Visual C++, GLFW, FreeType, and FFMPEG",
        "Currently uses OpenGL for graphics but is being migrated over to Vulkan",
        "Uses 'TcRunners' to accomplish multi-threading",
        "https://github.com/TrecApps/TcAnagame"
      ]
      ),
      new Work(new Education("Color Shooter", "Godot (previously Unity Mobile)"),
      [
        "Mobile app written in C# (when using Unity) that is currently able to run on an iPhone",
        "Player has to adjust the ship color based off of the enemy being targeted",
        "Reduces Framerate when the battery gets below 20%",
        "Migrated to Godot and GDScript"
      ]),
      new Work(new Education("Personal Chip's Challenge", "Godot Desktop Game"),
      [
        "Godot recreation of tile-based game known as Chip's Challenge",
        "Implemented first 12 levels from the original game, including most of the game play elements and timer support"
      ])
    );


    this.projectsSchool.push("Wrote Rust Application that reads a FAT File System image",
      "Implemented the DES Algorithm using C++ and the standard library",
      "Wrote Linux Socket program that emulates FTP connections, and can manage two sockets",
      "Modified a Game written in Java to look like an old Computer Game called Chip’s Challenge",
      "Developed Prototype of an online election system using PHP",
      "Simple Operating System in C and Assembly - would later use C++ in place of C when becoming a Teacher's Assistant");

    this.projectsWork.push("BestBuy - Developed Jenkins pipelines that incorporate Gradle, Checkmarx, and Sonarqube",
      "BestBuy - Developing applications that Use Spring Boot, Spring WebFlux, and JWTs",
      "BestBuy - gained experience using Openshift and writing Dockerfiles",
      "Walmart - helped develop NodeJs Server software using HAPI and tested it using Wreck and Mocha");
    
    this.work.push(
      new Work(new Education("Accenture Flex/Best Buy; Richfield, MN","March 2021-April 2023"),
        ["Developed RESTful APIs with Spring Web-Flux and Router Functions",
          "Developed Apps that connected to Kafka and wrote integration tests featuring Kafka Streams",
          "Maintaining Jenkins pipelines and continuing to develop Spring Boot Applications",
          "Contributed to the migration of Spring Boot apps from Java 11 to Java 17",
          "Set up and utilize monitoring dashboards and alert mechanisms on Kibana, Grafana, and Splunk"
        ]),
      new Work(new Education("Revature LLC; Reston, VA", "August 2018 - February 2021"),
      [
        "Underwent a coding bootcamp before working for a Revature Client for around 2 years",
        "Bootcamp: Collaborated on an Angular Project and wrote tests and documentation", 
        "Bootcamp: Gained Hands-on experience with Spring (boot, MVC, JPA, Web-Flux), hibernate, JDBC, Tomcat/Servlets, and AWS",
        "Walmart (Bentonville, AR): Helped develop Server software using NodeJS and wrote tests using Mocha",
        "Walmart (Bentonville, AR): Aided development of NodeJS tool that sent base64 images in JSON format over RabbitMQ",
        "Bestbuy (Richfield, MN): Collaborated on a Spring Boot/Web-Flux application and aided in the use of JWT test tokens",
        "Bestbuy (Richfield, MN):	Developed a Build pipeline that utilizes Jenkins, Gradle, Jacoco, Sonarqube, and Openshift"
      ]),
      new Work(new Education("WVU LCSEE Department; Morgantown, WV","2017"),
        ["Taught the lab sections of Intro to Computer Science and Intro to Operating Systems",
          "Aided students in various components of projects and graded software submissions",
          "Innovated the use of C++ in the University OS and introduced the Memory map and CPUID as Extra Credit"]),
      new Work(new Education("Lonza Walkersville, Inc; Walkersville, MD","2016 (Summer)"),
        ["Ran Assays in Lab to observe how changes to a chemical reaction affects its rate",
          "Documented assay results and laboratory procedures in Company notebook",
          "Mixed lysates in a Biological Safety Cabinet and altered proportions to observe effect on assay time"]),
      new Work(new Education("Axiom Staffing Group; Martinsburg, WV","2015 (Summer)"),
        ["Cleaned the backs of vending machines under construction (Royal Vendors)",
          "Moved Vending Machines into and out of foaming machines (Royal Vendors)",
          "Scanned packages and loaded them onto pallets and conveyor belts (FedEx Smart Post)",
          "Loaded and unloaded tractor trailers parked at facilities for shipping (FedEx Smart Post)"])
      );
  }




  toggleShow(num: number) {
    switch(num) {
      case 0:
      this.showPProjects.update((show) => !show);
        return;
      case 1:
        this.showWProjects.update((show) => !show);
        return;
      case 2:
        this.showSProjects.update((show) => !show);
        return;
      case 3:
        this.showOldProjects.update((show) => !show);
        return;
      case 4:
        this.showWork.update((show) => !show)
    }
  }

  toggleWork(work:Work) {
    work.show.update((show) => !show);
  }

}
