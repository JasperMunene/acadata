
import { Ruler, BookOpen, BriefcaseBusiness, House, School, Presentation, BellElectric, Library, ScrollText, NotepadText, ChartNoAxesColumn } from 'lucide-react';

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
    icon: "BellElectric",
    route: "/dashboard/classes",
    label: "Classes",
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

export const icons = {
  Ruler,
  BookOpen,
  BriefcaseBusiness,
  House,
  School,
  BellElectric,
  Presentation,
  Library,
  ScrollText,
  NotepadText,
  ChartNoAxesColumn
  };



