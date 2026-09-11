/**
 * CV-derived content. Edit here to change anything the site says about
 * Elio — no component reads hard-coded copy.
 *
 * Source: "Elio Cortés - Backend Developer 17-0.pdf" (rev 17-0).
 * Keep this in step with the PDF in `public/` when the CV is updated.
 */

import type { Profile } from '../types';

/** Resolves an asset in `public/` against the deployed base path
 *  (`/portfolio-2026/` in production, `/` in dev). */
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const profile: Profile = {
  name: 'Elio Cortés',
  title: 'Backend Developer',
  tagline: 'C# · .NET · Cloud',
  location: 'Bogotá, Colombia — open to remote',
  avatar: 'https://avatars.githubusercontent.com/u/8497300?v=4',
  summary:
    'Backend Software Engineer with 15+ years of experience designing, developing and maintaining scalable, secure applications using C#, .NET and ASP.NET Core. Strong expertise in microservices, RESTful APIs, Domain-Driven Design, Clean Architecture, distributed systems and relational databases. I design and integrate cloud solutions on AWS and Azure, and implement CI/CD and Infrastructure as Code with GitHub Actions, Terraform, AWS CDK and Ansible — with enough React to collaborate effectively across full-stack teams.',

  stats: [
    { label: 'Years building software', value: '15+' },
    { label: 'Core stack', value: '.NET / C#' },
    { label: 'Clouds', value: 'AWS · Azure' },
    { label: 'Based in', value: 'Colombia' },
  ],

  contact: {
    email: 'elio.cortes3000@gmail.com',
    phone: '(57) 310 594 2760',
    github: 'https://github.com/NeckerFree',
    linkedin: 'https://www.linkedin.com/in/elionelsoncortes',
    cv: asset('Elio-Cortes-Backend-Developer.pdf'),
  },

  skills: [
    {
      name: 'Backend & Frameworks',
      skills: [
        'C#',
        '.NET 8 / 7',
        '.NET Core',
        '.NET Framework',
        'ASP.NET Core',
        'ASP.NET Web API',
        'Minimal APIs',
        'Entity Framework / EF Core',
        'LINQ',
        'REST APIs',
        'Ruby on Rails',
      ],
    },
    {
      name: 'Frontend',
      skills: [
        'React',
        'Redux',
        'TypeScript',
        'JavaScript (ES6+)',
        'ASP.NET MVC',
        'HTML5',
        'CSS3',
        'Responsive Design',
      ],
    },
    {
      name: 'Databases',
      skills: ['SQL Server', 'PostgreSQL', 'Oracle', 'MySQL', 'Informix', 'Sybase'],
    },
    {
      name: 'Cloud & DevOps',
      skills: [
        'AWS (S3, Lambda)',
        'Azure',
        'Terraform',
        'AWS CDK',
        'Pulumi',
        'GitHub Actions',
        'Azure DevOps',
        'Ansible',
        'Docker',
      ],
    },
    {
      name: 'Tools & Methods',
      skills: [
        'CI/CD',
        'Git / GitHub / GitLab',
        'Swagger / OpenAPI',
        'Postman',
        'TDD',
        'Unit Testing',
        'Integration Testing',
        'SDLC',
        'Scrum',
      ],
    },
    {
      name: 'Architecture & Design',
      skills: [
        'Clean Architecture',
        'Domain-Driven Design',
        'Microservices',
        'Distributed Systems',
        'Design Patterns',
        'Repository / Unit of Work',
      ],
    },
  ],

  experience: [
    {
      title: 'Software Development Engineer',
      company: 'Zemsania — Accenture',
      project: 'Navitaire Project',
      location: 'Remote',
      period: 'Feb 2026 – Jul 2026',
      start: '2026',
      stack: [
        '.NET',
        'C#',
        'ASP.NET Core Web API',
        'REST APIs',
        'Swagger/OpenAPI',
        'xUnit',
        'Azure DevOps',
        'Feature Flags',
      ],
      highlights: [
        'Built Schedule API features in a .NET enterprise application — endpoints, service-layer logic, request/response contracts, converters, validators and Swagger examples.',
        'Wrote unit, component and integration test suites using mocked dependencies plus live-environment validation, covering routing, authentication, validation handling and backend integration.',
        'Applied enterprise standards: feature-gated functionality, nullable reference type compliance, XML documentation and consistent API response patterns.',
        'Reviewed Azure DevOps pull requests against architecture standards, testing requirements and feature-management rules.',
      ],
    },
    {
      title: 'Backend Developer',
      company: 'GoNet USA',
      project: 'AON CoverWallet Project',
      location: 'Remote',
      period: 'Jul 2023 – Jul 2024',
      start: '2023',
      stack: [
        '.NET Core',
        'C#',
        'ASP.NET Web API',
        'PostgreSQL',
        'AWS S3',
        'Datadog',
        'REST APIs',
      ],
      highlights: [
        'Integrated PRI system functionality with CoverWallet applications over REST APIs and web services, with document storage on AWS S3.',
        'Designed PostgreSQL data models and AWS-based logging, improving incident tracking and observability through Datadog.',
        'Raised test coverage with xUnit and Moq, ensuring compliance with PRI business requirements.',
        'Supported deployments across test and production environments for smooth, stable releases.',
      ],
    },
    {
      title: 'Technical Leader',
      company: 'Superintendencia de Sociedades',
      location: 'Bogotá, Colombia',
      period: 'Jan 2021 – Jun 2021',
      start: '2021',
      stack: [
        '.NET Core',
        'C#',
        'ASP.NET MVC',
        'ASP.NET Web API',
        'SQL Server',
        'Informix',
        'Azure DevOps',
        'Scrum',
      ],
      highlights: [
        'Led a development team maintaining and enhancing 20+ enterprise applications, keeping operations continuous and delivery on time.',
        'Ran the full Agile/Scrum workflow — backlog consolidation, sprint definition, assignment and tracking in Azure DevOps.',
        'Coordinated QA and infrastructure teams on production deployments, reducing release issues.',
      ],
    },
    {
      title: 'Senior .NET Developer',
      company: 'Superintendencia de Sociedades',
      location: 'Bogotá, Colombia',
      period: 'Apr 2020 – Dec 2020',
      start: '2020',
      stack: [
        '.NET Core',
        'C#',
        'ASP.NET MVC',
        'SQL Server',
        'Informix',
        'Entity Framework',
        'JWT',
        'SOAP',
      ],
      highlights: [
        'Designed the migration of a legacy Informix database to SQL Server, improving stability and maintainability with uninterrupted service.',
        'Consolidated fragmented SQL across applications into a centralised web-services layer using stored procedures and a SQL translation mechanism.',
        'Implemented JWT-based API authentication and documented deployment procedures for traceability across environments.',
      ],
    },
    {
      title: 'Senior .NET Developer',
      company: 'ITBF Consulting',
      location: 'Bogotá, Colombia',
      period: 'Aug 2019 – Dec 2019',
      start: '2019',
      stack: ['.NET Core', 'C#', 'ASP.NET MVC', 'ASP.NET Web API', 'SQL Server', 'Entity Framework'],
      highlights: [
        'Centralised the Superintendencia de Sociedades web services into a unified, reusable shared project consumed across multiple applications.',
        'Standardised API structures, cutting duplicated code and speeding up onboarding for new teams.',
      ],
    },
    {
      title: 'Senior .NET Developer',
      company: 'ComWare S.A.',
      location: 'Bogotá, Colombia',
      period: 'Aug 2018 – May 2019',
      start: '2018',
      stack: [
        '.NET Core',
        'C#',
        'ASP.NET MVC',
        'SQL Server',
        'Entity Framework',
        'Active Directory',
      ],
      highlights: [
        'Developed the core use cases of the Consumables Registration system for the Ministry of Agriculture.',
        'Built a dynamic form-generation application, removing the need for hard-coded forms and easing future change.',
      ],
    },
    {
      title: 'Senior .NET Developer',
      company: 'DB-System LTDA',
      location: 'Bogotá, Colombia',
      period: 'May 2017 – Feb 2018',
      start: '2017',
      stack: ['.NET Framework', 'C#', 'ASP.NET MVC', 'Web Forms', 'SQL Server', 'Entity Framework'],
      highlights: [
        'Delivered use cases for the Royalties Management application for the Ministry of Finance, secured with certificate-based authentication.',
        'Built backend components and API services, improving data access consistency and performance.',
      ],
    },
    {
      title: '.NET Software Developer',
      company: 'INTERGRUPO',
      location: 'Bogotá, Colombia',
      period: 'Sep 2014 – Jul 2016',
      start: '2014',
      stack: ['.NET Framework', 'C#', 'ASP.NET MVC', 'Web API', 'SQL Server', 'Entity Framework'],
      highlights: [
        'Designed and built the Customers and Affiliates application for Compensar from the ground up in ASP.NET MVC.',
        'Partnered with the solutions architect on the initial architecture and delivered five core use cases in phase one.',
        'Enhanced and maintained critical CITY BANK applications, supporting UAT through to release.',
      ],
    },
    {
      title: '.NET Software Developer & Technical Lead',
      company: 'TATA Consultancy Services',
      location: 'Medellín, Colombia',
      period: 'Sep 2012 – Feb 2014',
      start: '2012',
      stack: ['.NET Framework', 'C#', 'Web Forms', 'MVP Pattern', 'Oracle', 'Sybase', 'SOAP'],
      highlights: [
        'Built internal applications and SOAP/REST services for Claro Colombia on Oracle and Sybase, supporting high-availability telecom operations.',
        'Led six junior developers on the Cobiscorp–HSBC Bank project, assigning work, reviewing code and guiding implementation.',
      ],
    },
    {
      title: '.NET Developer',
      company: 'MAINSOFT',
      location: 'Bogotá, Colombia',
      period: 'Nov 2009 – Jul 2011',
      start: '2009',
      stack: ['.NET Framework', 'C#', 'ASP.NET Web API', 'XML', 'SOAP', 'LINQ', 'SQL Server'],
      highlights: [
        'Contributed to LegisOffice, an enterprise legal management system that won the 2012 Best Computer Solution Award from Computerworld Colombia.',
        'Developed features for the Arancel Web application handling legal and regulatory content.',
      ],
    },
  ],

  education: [
    {
      title: 'Minimal APIs in ASP.NET Core',
      institution: 'Code Maze',
      period: 'May 2025 – Dec 2025',
      detail:
        '.NET 9, Minimal APIs, Onion Architecture, validation, exception handling, Serilog, pagination, filtering, HATEOAS, Swagger/OpenAPI, caching, rate limiting, authentication, integration testing.',
    },
    {
      title: 'EPAM Learning — Dev Fundamentals, Cloud & Automation',
      institution: 'EPAM',
      period: 'May 2025 – Dec 2025',
      detail:
        'Linux, Bash, Docker, Python, CI/CD with Jenkins; Azure fundamentals, Terraform (IaC), Ansible configuration management and cloud automation.',
    },
    {
      title: 'Microservices in .NET',
      institution: 'Code Maze',
      period: 'Oct 2024 – Jan 2025',
      detail:
        'Microservices architecture, service communication, scalability, resilience and deployment patterns in .NET.',
    },
    {
      title: 'Cloud Architecture Bootcamp',
      institution: 'MinTIC Colombia — Talent Tech',
      period: 'Sep 2024 – Nov 2024',
      detail:
        'AWS and Azure architecture, networking and infrastructure automation. Built full-stack cloud apps with AWS Amplify + React and Python services, with Cognito authentication.',
    },
    {
      title: 'Full-Stack Web Development Program',
      institution: 'Microverse',
      period: 'Feb 2022 – Sep 2022',
      detail:
        '1,300+ hours across HTML5, CSS, JavaScript, TypeScript, React, Redux, Ruby on Rails, PostgreSQL and responsive design, with pair programming and Agile workflows.',
    },
    {
      title: 'Systems Engineering — Bachelor’s Degree',
      institution: 'National University of Colombia',
      period: 'Graduated Mar 2000',
      detail: 'Thesis: Fast Fourier Transform (FFT) using parallel processing.',
    },
  ],
};

/** How many roles show before the "show all" control (AC8). */
export const VISIBLE_ROLES = 4;
