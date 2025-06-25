import {
    Book,
    Film,
    Tv,
    Music,
    Youtube,
    BookOpen,
    FileText,
    Lightbulb,
    LayoutDashboard,
    PenSquare,
    Users,
    GraduationCap,
    ClipboardList,
    Newspaper,
    Notebook,
    Quote,
    Laugh,
    Hammer,
    File,
    Gamepad2,
    ScrollText,
    Heart,
    Trash2,
} from "lucide-react";

export const menu = [
    {
        category: "Library",
        items: [
            { title: "Favourite", path: "/favourite", icon: Heart },
            { title: "Trash", path: "/trash", icon: Trash2 },
            { title: "Docs", path: "/docs", icon: FileText },
        ],
    },
    {
        category: "Media",
        items: [
            { title: "Manga", path: "/manga", icon: Book },
            { title: "Anime", path: "/anime", icon: ScrollText },
            { title: "Movies", path: "/movies", icon: Film },
            { title: "TV Shows", path: "/tv", icon: Tv },
            { title: "Songs", path: "/songs", icon: Music },
            { title: "YouTube", path: "/youtube", icon: Youtube },
            { title: "Books", path: "/books", icon: BookOpen },
            { title: "Comics", path: "/comics", icon: FileText },
        ],
    },
    {
        category: "Creative",
        items: [
            { title: "Ideas", path: "/ideas", icon: Lightbulb },
            { title: "Projects", path: "/projects", icon: LayoutDashboard },
            { title: "Stories", path: "/stories", icon: PenSquare },
            { title: "Characters", path: "/characters", icon: Users },
        ],
    },
    {
        category: "Learning",
        items: [
            { title: "Guides", path: "/guides", icon: ClipboardList },
            { title: "Courses", path: "/courses", icon: GraduationCap },
            { title: "Articles", path: "/articles", icon: Newspaper },
        ],
    },
    {
        category: "Personal",
        items: [
            { title: "Journal", path: "/journal", icon: Notebook },
            { title: "Quotes", path: "/quotes", icon: Quote },
            { title: "Memes", path: "/memes", icon: Laugh },
        ],
    },
    {
        category: "Utilities",
        items: [
            { title: "Tools", path: "/tools", icon: Hammer },
            { title: "Files", path: "/files", icon: File },
            { title: "Games", path: "/games", icon: Gamepad2 },
        ],
    },
    // {
    //     category: "Misc",
    //     items: [
    //         { title: "NSFW", path: "/nsfw", icon: ShieldOff },
    //         { title: "Home", path: "/", icon: Home },
    //     ],
    // },
];
