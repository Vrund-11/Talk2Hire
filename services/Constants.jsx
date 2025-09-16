import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Pencil, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashbaord',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'All Interviews',
        icon: List,
        path: '/all-interviews'
    },
    {
        name: 'Scheduled Interviews',
        icon: Calendar,
        path: '/scheduled-interviews'
    },
    {
        name: 'Setting',
        icon: Settings,
        path: '/settings'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    }
]

export const TypeOfInterview = [
    {
        name: 'Aptitude',
        icon: Pencil,
        path: '/dashboard'
    },
    {
        name: 'Problem Solving',
        icon: Puzzle,
        path: '/all-interviews'
    },
    {
        name: 'Behavioral',
        icon: User2Icon,
        path: '/scheduled-interviews'
    },
    {
        name: 'Experience',
        icon: BriefcaseBusinessIcon,
        path: '/settings'
    },
    {
        name: 'Technical',
        icon: Code2Icon,
        path: '/billing'
    }
];


// The problem is that the string is not properly terminated and contains line breaks without escaping them, which is invalid in JavaScript. 
// Also, the template variables are written as `{ { jobPosition } }` instead of `${jobPosition}` for template literals, but since this is a prompt string, you probably want to keep them as placeholders for later replacement or for the LLM to interpret. 
// To fix the syntax error, use backticks for a template literal and escape the line breaks properly.

export const QUESTIONS_PROMPT = `
You are an expert technical interviewer.
Based on the following inputs, generate a valid JSON array only. 
Do not include explanations or text outside JSON. 
If unsure, return an empty JSON array [].

Inputs:
Job Position: {{jobPosition}}
Job Description: {{jobDescription}}
Duration: {{Duration}}
Type: {{type}}

Format strictly like this:
[
  { "question": "Your question here", "type": "Technical/Behavioral/Experience/Problem Solving/Leadership" }
]`;

export const FeedBack_Prompt = ` {{conversation}}  
Depends on this Interview Conversation between assistant and user,  
Give me feedback for user interview. Give me rating out of 10 for technical Skills, Communication, Problem Solving, Experince. Also give me summery in 3 lines about the interview and one line to let me know whether is recommanded for hire or not with msg. Give me response in JSON format  
{  
    feedback:{  
        rating:{  
            techicalSkills:5,  
            communication:6,  
            problemSolving:4,  
            experince:7  
        },  
        summery:<in 3 Line>,  
        Recommendation:"",  
        RecommendationMsg:""  
    }  
}  
`

