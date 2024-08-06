
import { Ruler, BookOpen, BriefcaseBusiness, House, School, Presentation, Library, ScrollText, NotepadText, ChartNoAxesColumn } from 'lucide-react';

interface targetAudience {
  name: string;
  paragraph: string;
  icon: keyof typeof icons;
  style: string; // CSS class for the background color
}

// Array of target audience objects
export const targetAudience: targetAudience[] = [
  {
    name: "Teachers and Educators",
    paragraph: "Easily upload student data, get detailed analytics, identify strengths and weaknesses, and tailor teaching strategies to individual needs.",
    icon: "Ruler",
    style: "bg-amber-300"
  },
  {
    name: "Students",
    paragraph: "Access performance reports, get personalized feedback, focus on specific topics, and take control of your learning journey.",
    icon: "BookOpen",
    style: "bg-blue-300"
  },
  {
    name: "School Administrators",
    paragraph: "Make data-driven decisions, monitor performance trends, improve educational outcomes, and support teachers and students effectively.",
    icon: "BriefcaseBusiness",
    style: "bg-green-300"
  },
  {
    name: "Parents and Guardians",
    paragraph: "Stay informed about your child’s progress, understand their strengths and needs, and support their learning with detailed performance reports.",
    icon: "House",
    style: "bg-indigo-300"
  }
];

interface sidebarLinks {
  icon: keyof typeof icons;
  route: string;
  label: string; 
}

export const sidebarLinks: sidebarLinks[] = [
  {
    icon: "House",
    route: "/dashboard",
    label: "Home",
  },
  {
    icon: "School",
    route: "/dashboard/schools",
    label: "Schools",
  },
  {
    icon: "Presentation",
    route: "/dashboard/subjects",
    label: "Subjects",
  },
  {
    icon: "Library",
    route: "/dashboard/topics",
    label: "Topics",
  },
  {
    icon: "BookOpen",
    route: "/dashboard/subtopics",
    label: "Sub-topics",
  },
  {
    icon: "ScrollText",
    route: "/dashboard/exams",
    label: "Exams",
  },
  {
    icon: "NotepadText",
    route: "/dashboard/performance",
    label: "Performance",
  },
  {
    icon: "ChartNoAxesColumn",
    route: "/dashboard/insights",
    label: "Insights",
  },
  
];

interface Grade {
  name: string;
  path: string;
}

export const grades: Grade[] = [
  { name: 'Grade 1', path: '1' },
  { name: 'Grade 2', path: '2' },
  { name: 'Grade 3', path: '3' },
  { name: 'Grade 4', path: '4' },
  { name: 'Grade 5', path: '5' },
  { name: 'Grade 6', path: '6' },
  { name: 'Grade 7', path: '7' },
  { name: 'Grade 8', path: '8' },
  { name: 'Grade 9', path: '9' },
];

export const icons = {
  Ruler,
  BookOpen,
  BriefcaseBusiness,
  House,
  School,
  Presentation,
  Library,
  ScrollText,
  NotepadText,
  ChartNoAxesColumn
  };



