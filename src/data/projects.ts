/**
 * ============================================================================
 *  THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE PROJECT CARDS
 * ============================================================================
 *
 *  To ADD a project      -> add an entry to `projectSources`
 *  To REMOVE one         -> delete its entry
 *  To REORDER the cards  -> move entries around; array order IS card order
 *  To RENAME / RE-WORD   -> set `label`, `description`, `tools`
 *  To add NON-GITHUB work-> set `repo: null` and author every field
 *
 *  Descriptions, topics, stars and dates are fetched live from GitHub on
 *  page load (see src/lib/github.ts). Anything you author here wins over
 *  the API, so you can override a weak repo description without touching
 *  the repo itself.
 *
 *  NOTE ON ORDER: GitHub only exposes "pinned" through its authenticated
 *  GraphQL API, and a static site cannot hold a token — so pin order is
 *  mirrored here by hand. If you change your pins on GitHub, reorder this
 *  array to match. See docs/adr/0002-runtime-github-fetch.md.
 *  Last mirrored from github.com/NeckerFree pins: 2026-09-10.
 */

import type { ProjectSource } from '../types';

export const GITHUB_USER = 'NeckerFree';

export const projectSources: ProjectSource[] = [
  {
    repo: 'AKS_Pulumi_ACR',
    label: 'AKS + Pulumi + ACR',
    // The GitHub description is three sentences long — too much for a card.
    description:
      'Kubernetes infrastructure on Azure provisioned as C# code with Pulumi, delivered in five cost-controlled stages covering scaling and observability.',
    tools: [
      'Pulumi',
      'C#',
      'Azure Kubernetes Service',
      'Azure Container Registry',
      'Docker',
      'Kubernetes',
      'IaC',
    ],
    highlight: 'Infrastructure as Code in C# — no YAML-only pipelines',
  },
  {
    repo: 'azure-fullstack-automation',
    label: 'Azure Full-Stack Automation',
    description:
      'End-to-end Azure provisioning and deployment: Terraform builds the infrastructure, Ansible configures an API across two VMs behind a load balancer, with Azure MySQL and a Web App front end.',
    tools: ['Terraform', 'Ansible', 'Azure', 'Node.js', 'MySQL', 'Load Balancer', 'CI/CD'],
    highlight: 'Provision and configuration fully automated, zero manual steps',
  },
  {
    repo: 'AdvancedWebAPI',
    label: 'Advanced Web API',
    description:
      'Minimal API showing production-grade data retrieval: pagination, filtering, searching and sorting behind a clean repository/unit-of-work layer.',
    tools: [
      '.NET Core',
      'C#',
      'Minimal APIs',
      'Repository Pattern',
      'Unit of Work',
      'Dependency Injection',
    ],
    highlight: 'Most-starred repo — a reference implementation others reuse',
  },
  {
    repo: 'StudentsWebApp',
    label: 'Students Web App',
    description:
      'Full-stack student records application: a .NET Minimal API over SQLite with an Angular front end.',
    tools: ['.NET Core', 'C#', 'Minimal APIs', 'Angular', 'TypeScript', 'SQLite'],
  },
  {
    repo: 'automated-ui-testing-selenium',
    label: 'Automated UI Testing',
    description:
      'UI regression suite driving a real browser through Selenium WebDriver, structured with the Page Object pattern and run under xUnit.',
    tools: ['C#', 'Selenium WebDriver', 'xUnit', 'Page Object Model', 'UI Automation'],
    highlight: 'Page Objects keep selectors out of the tests',
  },
  {
    repo: 'LeaseMatch-Frontend',
    label: 'LeaseMatch — Front End',
    description:
      'React front end for a rental marketplace built to make housing search fair and transparent, deployed on AWS Amplify.',
    tools: ['React', 'TypeScript', 'Vite', 'AWS Amplify', 'AWS CDK', 'React Router'],
  },
];
