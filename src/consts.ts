import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Alba",
  DESCRIPTION: "I'm a Senior Fullstack Engineer",
  AUTHOR: "alba",
}

// Work Page
export const WORK: Page = {
  TITLE: "Experiences",
  DESCRIPTION: "Places I have worked.",
}

// Certificate Page
export const CERTIFICATE: Page = {
  TITLE: "Certificate",
  DESCRIPTION: "Certificate I have goted.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Experience", 
    HREF: "/work",
  },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
  { 
    TEXT: "Certificate", 
    HREF: "/certificate", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "rifqialba12@gmail.com",
    HREF: "mailto:rifqialba12@gmail.com",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "rifqialbaa",
    HREF: "https://github.com/rifqialbaa"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "rifqialba",
    HREF: "https://www.linkedin.com/in/rifqialba",
  },
  
]

